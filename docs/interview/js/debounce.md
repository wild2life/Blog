```javascript
functiondebounce(fn, delay) {
  lettimer = null
  return function() {
      clearTimeout(timer)
      timer = setTimeout(() => {
      fn.apply(this, arguments)
       }, delay)
  }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1639376733393-ea8fff59-2ae7-44fc-a0bb-2ffdc5dc9a9b.png#clientId=ufeb16b6e-4635-4&from=paste&height=614&id=u28c3bd0e&name=image.png&originHeight=614&originWidth=1948&originalType=binary&ratio=1&rotation=0&showTitle=false&size=412868&status=done&style=none&taskId=u4d4fa63f-e9e1-4e61-910d-5df427f25f0&title=&width=1948)

![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1639376828569-8d85b863-18d3-4c94-a57b-3a219774aefc.png#clientId=ufeb16b6e-4635-4&from=paste&height=1036&id=u33fc7c16&name=image.png&originHeight=1036&originWidth=2082&originalType=binary&ratio=1&rotation=0&showTitle=false&size=289076&status=done&style=none&taskId=ud6deda9b-869b-4b86-bf98-88a962728cc&title=&width=2082)
```javascript
function throttle(fn, delay) {
    let valid = true
    return function() {
        if (valid) {
            setTimeout(() => {
                fn.apply(this, arguments)
                valid = true
            }, delay)
            valid = false
        } else {
            return false
        }
    }
}
```
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1639377227431-c8fe307c-fcc1-439b-b91c-0e8b1ad902e6.png#clientId=uf641e32e-fb1e-4&from=paste&height=910&id=u483093ad&name=image.png&originHeight=910&originWidth=1986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=354038&status=done&style=none&taskId=u2681f659-fee6-491f-b3fa-e3410c81f19&title=&width=1986)
