> 思想：根据预先设置好的切片最大数量将文件切分为一个个切片，
> 然后借助 http 的**可并发性**，同时上传多个切片，
> 这样从原本传一个大文件，变成了同时传多个小的文件切片，可以大大减少上传时间
> (源码)[https://github.com/yeyan1996/file-upload]

## 整体思路

### 前端

调用**Blob.prototype.slice**返回某个源文件的切片
另外由于是**并发**，传输到服务端的顺序可能会发生变化，所以我们还需要给每个切片记录顺序。 1.先切片，返回一个切片的数组。 2.记录顺序

### 服务端

服务端需要负责接受这些切片，并在接收到所有切片后**合并**切片 1.何时合并切片，即切片什么时候传输完成

- 前端在每个切片都携带切片最大数量的信息，当服务器接受到这个数量的切片时自动合并。
- 也可以额外发一个请求主动通知服务端进行切片的合并 2.如何合并切片
- nodejs 的 读写流（readStream/writeStream），将所有切片的流传输到最终文件的流里

## 前端部分

### 上传控件

```javascript
<template>
   <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">upload</el-button>
  </div>
</template>
​
<script>
export default {
  data: () => ({
    container: {
      file: null
    }
  }),
  methods: {
     handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      Object.assign(this.$data, this.$options.data());
      this.container.file = file;
    },
    async handleUpload() {}
  }
};
</script>
```

### 请求逻辑

考虑到通用性，这里没有用第三方的请求库，而是用原生 XMLHttpRequest 做一层简单的封装来发请求

```javascript
request({
  url,
  method = "post",
  data,
  headers = {},
  requestList
  }) {
      return new Promise(resolve => {
          const xhr = new XMLHttpRequest();
          xhr.open(method, url);
          Object.keys(headers).forEach(key =>
              xhr.setRequestHeader(key, headers[key])
          );
          xhr.send(data);
          xhr.onload = e => {
              resolve({
              data: e.target.response
          });
      };
  });
}
```

### 上传切片

- 对文件进行切片
- 将切片传输给服务端

```javascript
<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">上传</el-button>
  </div>
</template>
​
<script>
+ // 切片大小
+ // the chunk size
+ const SIZE = 10 * 1024 * 1024;
​
export default {
  data: () => ({
    container: {
      file: null
    }，
+   data: []
  }),
  methods: {
    request() {},
    handleFileChange() {},
+    // 生成文件切片
+    createFileChunk(file, size = SIZE) {
+     const fileChunkList = [];
+      let cur = 0;
+      while (cur < file.size) {
+        fileChunkList.push({ file: file.slice(cur, cur + size) });
+        cur += size;
+      }
+      return fileChunkList;
+    },
+   // 上传切片
+    async uploadChunks() {
+      const requestList = this.data
+        .map(({ chunk，hash }) => {
+          const formData = new FormData();
+          formData.append("chunk", chunk);
+          formData.append("hash", hash);
+          formData.append("filename", this.container.file.name);
+          return { formData };
+        })
+        .map(({ formData }) =>
+          this.request({
+            url: "http://localhost:3000",
+            data: formData
+          })
+        );
+      // 并发请求
+      await Promise.all(requestList);
+    },
+    async handleUpload() {
+      if (!this.container.file) return;
+      const fileChunkList = this.createFileChunk(this.container.file);
+      this.data = fileChunkList.map(({ file }，index) => ({
+        chunk: file,
+        // 文件名 + 数组下标
+        hash: this.container.file.name + "-" + index
+      }));
+      await this.uploadChunks();
+    }
  }
};
</script>
```

当点击上传按钮时，调用 createFileChunk 将文件切片，切片数量通过文件大小控制，这里设置 10MB，也就是说一个 100 MB 的文件会被分成 10 个 10MB 的切片  
createFileChunk 内使用 while 循环和 slice 方法将切片放入 fileChunkList 数组中返回  
在生成文件切片时，需要给每个切片一个标识作为 hash，这里暂时使用文件名 + 下标，这样后端可以知道当前切片是第几个切片，用于之后的合并切片  
随后调用 uploadChunks 上传所有的文件切片，将文件切片，切片 hash，以及文件名放入 formData 中，再调用上一步的 request 函数返回一个 proimise，最后调用 Promise.all 并发上传所有的切片

### 发送合并请求

使用整体思路中提到的第二种合并切片的方式，即前端主动通知服务端进行合并
前端发送额外的合并请求，服务端接受到请求时合并切片

```javascript
<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <el-button @click="handleUpload">upload</el-button>
  </div>
</template>
​
<script>
export default {
  data: () => ({
    container: {
      file: null
    },
    data: []
  }),
  methods: {
    request() {},
    handleFileChange() {},
    createFileChunk() {},
    async uploadChunks() {
      const requestList = this.data
        .map(({ chunk，hash }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
          return { formData };
        })
        .map(({ formData }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData
          })
        );
      await Promise.all(requestList);
+     // 合并切片
+     await this.mergeRequest();
    },
+    async mergeRequest() {
+      await this.request({
+        url: "http://localhost:3000/merge",
+        headers: {
+          "content-type": "application/json"
+        },
+        data: JSON.stringify({
+          filename: this.container.file.name
+        })
+      });
+    },    
    async handleUpload() {}
  }
};
</script>
```

### 显示上传进度条

上传进度分两种，一个是每个切片的上传进度，另一个是整个文件的上传进度，而整个文件的上传进度是基于每个切片上传进度计算而来，所以我们先实现单个切片的进度条

#### 单个切片进度条

XMLHttpRequest 原生支持上传进度的监听，只需要监听 upload.onprogress 即可，我们在原来的 request 基础上传入 onProgress 参数，给 XMLHttpRequest 注册监听事件

```javascript
 // xhr
    request({
      url,
      method = "post",
      data,
      headers = {},
+     onProgress = e => e,
      requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
+       xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
          resolve({
            data: e.target.response
          });
        };
      });
    }
```

由于每个切片都需要触发独立的监听事件，所以需要一个工厂函数，根据传入的切片返回不同的监听函数
在原先的前端上传逻辑中新增监听函数部分

```javascript
    // 上传切片，同时过滤已上传的切片
    async uploadChunks(uploadedList = []) {
      const requestList = this.data
+       .map(({ chunk,hash,index }) => {
          const formData = new FormData();
          formData.append("chunk", chunk);
          formData.append("hash", hash);
          formData.append("filename", this.container.file.name);
+         return { formData,index };
        })
+       .map(({ formData,index }) =>
          this.request({
            url: "http://localhost:3000",
            data: formData，
+           onProgress: this.createProgressHandler(this.data[index]),
          })
        );
      await Promise.all(requestList);
      await this.mergeRequest();
    },
    async handleUpload() {
      if (!this.container.file) return;
      const fileChunkList = this.createFileChunk(this.container.file);
      this.data = fileChunkList.map(({ file }，index) => ({
        chunk: file,
+       index,
        hash: this.container.file.name + "-" + index
+       percentage:0
      }));
      await this.uploadChunks();
    }    
+   createProgressHandler(item) {
+      return e => {
+        item.percentage = parseInt(String((e.loaded / e.total) * 100));
+      };
+   }
```

每个切片在上传时都会通过监听函数更新 data 数组对应元素的 percentage 属性，之后把将 data 数组放到视图中展示即可

#### 总进度条

将每个切片已上传的部分累加，除以整个文件的大小，就能得出当前文件的上传进度，所以这里使用 Vue 的计算属性

```javascript
  computed: {
       uploadPercentage() {
          if (!this.container.file || !this.data.length) return 0;
          const loaded = this.data
            .map(item => item.size * item.percentage)
            .reduce((acc, cur) => acc + cur);
          return parseInt((loaded / this.container.file.size).toFixed(2));
        }
 }
```

### 断点续传

断点续传的原理在于前端/服务端需要记住已上传的切片，这样下次上传就可以跳过之前已上传的部分，有两种方案实现记忆的功能

- 前端使用 localStorage 记录已上传的切片 hash
- 服务端保存已上传的切片 hash，前端每次上传前向服务端获取已上传的切片

第一种是前端的解决方案，第二种是服务端，而前端方案有一个缺陷，如果换了个浏览器就失去了记忆的效果，所以这里选后者

### 生成 hash

<https://juejin.cn/post/6844904046436843527#heading-17>
无论是前端还是服务端，都必须要生成文件和切片的 hash，之前我们使用文件名 + 切片下标作为切片 hash，这样做文件名一旦修改就失去了效果，而事实上只要文件内容不变，hash 就不应该变化，所以正确的做法是根据文件内容生成 hash，所以我们修改一下 hash 的生成规则

这里用到另一个库 spark-md5，它可以根据文件内容计算出文件的 hash 值
另外考虑到如果上传一个超大文件，读取文件内容计算 hash 是非常耗费时间的，并且会引起 UI 的阻塞，导致页面假死状态，所以我们使用 web-worker 在 worker 线程计算 hash，这样用户仍可以在主界面正常的交互

之前我们使用文件名 + 切片下标作为切片 hash，这样做文件名一旦修改就失去了效果，而事实上只要文件内容不变，hash 就不应该变化，所以正确的做法是**根据文件内容生成 hash**

### 文件秒传

即在服务端已经存在了上传的资源，所以当用户再次上传时会直接提示上传成功
文件秒传需要依赖上一步生成的 hash，即在上传前，先计算出文件 hash，并把 hash 发送给服务端进行验证，由于 hash 的唯一性，所以一旦服务端能找到 hash 相同的文件，则直接返回上传成功的信息即可
秒传其实就是给用户看的障眼法，实质上根本没有上传
服务器端：
服务端的逻辑非常简单，新增一个验证接口，验证文件是否存在即可

### 暂停上传

原理是使用 XMLHttpRequest 的 **abort** 方法，可以取消一个 xhr 请求的发送，为此我们需要将上传每个切片的 xhr 对象保存起来，我们再改造一下 request 方法

```javascript
   request({
      url,
      method = "post",
      data,
      headers = {},
      onProgress = e => e,
+     requestList
    }) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = onProgress;
        xhr.open(method, url);
        Object.keys(headers).forEach(key =>
          xhr.setRequestHeader(key, headers[key])
        );
        xhr.send(data);
        xhr.onload = e => {
+          // 将请求成功的 xhr 从列表中删除
+          if (requestList) {
+            const xhrIndex = requestList.findIndex(item => item === xhr);
+            requestList.splice(xhrIndex, 1);
+          }
          resolve({
            data: e.target.response
          });
        };
+        // 暴露当前 xhr 给外部
+        requestList?.push(xhr);
      });
    },
```

- 在上传切片时传入 requestList 数组作为参数，request 方法就会将所有的 xhr 保存在数组中了
- 每当一个切片上传成功时，将对应的 xhr 从 requestList 中删除，所以 requestList 中只保存正在上传切片的 xhr
- 新建一个暂停按钮，当点击按钮时，调用保存在 requestList 中 xhr 的 abort 方法，即取消并清空所有正在上传的切片

```
 handlePause() {
    this.requestList.forEach(xhr => xhr?.abort());
    this.requestList = [];
}
```

### 恢复上传

<https://juejin.cn/post/6844904046436843527#heading-20>

### 进度条改进

#### 单个切片进度条

由于在点击上传/恢复上传时，会调用验证接口返回已上传的切片，所以需要将已上传切片的进度变成 100%  
uploadedList 会返回已上传的切片，在遍历所有切片时判断当前切片是否在已上传列表里即可

#### 总进度条

之前说到总进度条是一个计算属性，根据所有切片的上传进度计算而来，这就遇到了一个问题
点击暂停会取消并清空切片的 xhr 请求，此时如果已经上传了一部分，就会发现文件进度条有**倒退**的现象
当点击恢复时，由于重新创建了 xhr 导致切片进度清零，所以总进度条就会倒退

解决方案是创建一个“假”的进度条，这个假进度条基于文件进度条，但只会停止和增加，然后给用户展示这个假的进度条

这里我们使用 Vue 的监听属性

```javascript
  data: () => ({
+    fakeUploadPercentage: 0
  }),
  computed: {
    uploadPercentage() {
      if (!this.container.file || !this.data.length) return 0;
      const loaded = this.data
        .map(item => item.size * item.percentage)
        .reduce((acc, cur) => acc + cur);
      return parseInt((loaded / this.container.file.size).toFixed(2));
    }
  },  
  watch: {
+    uploadPercentage(now) {
+      if (now > this.fakeUploadPercentage) {
+        this.fakeUploadPercentage = now;
+      }
    }
  },
```

当 uploadPercentage 即真的文件进度条增加时，fakeUploadPercentage 也增加，一旦文件进度条后退，假的进度条只需停止即可

## 总结

大文件上传

- 前端上传大文件时使用 Blob.prototype.slice 将文件切片，并发上传多个切片，最后发送一个合并的请求通知服务端合并切片
- 服务端接收切片并存储，收到合并请求后使用流将切片合并到最终文件
- 原生 XMLHttpRequest 的 upload.onprogress 对切片上传进度的监听
- 使用 Vue 计算属性根据每个切片的进度算出整个文件的上传进度

断点续传

- 使用 spark-md5 根据文件内容算出文件 hash
- 通过 hash 可以判断服务端是否已经上传该文件，从而直接提示用户上传成功（秒传）
- 通过 XMLHttpRequest 的 abort 方法暂停切片的上传
- 上传前服务端返回已经上传的切片名，前端跳过这些切片的上传
