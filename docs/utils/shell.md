## 文件目录类

我们知道Mac的[操作系统](https://so.csdn.net/so/search?q=%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F&spm=1001.2101.3001.7020)是基于Unix的，想了解Unix就要从最基本的Unix指令学起。

### pwd
显示当前目录的绝对路径

### ls

```javascript
ls  // 显示全部目录内容
ls bin // 显示bin下的目录内容
ls -a // 显示当前目录下的所有文件包括隐藏文件
ls -l  // 使用长格式显示文件的详细信息，而且一行显示一个文件
```


### cd
[Unix](https://so.csdn.net/so/search?q=Unix&spm=1001.2101.3001.7020)中的目录变更指令

```javascript
cd bin // 将目录变更到bin下
cd 空格 // 切换到家目录
cd .. // 返回上一层目录
cd ../../  // 返回上上级目录
```

### cp

```javascript
cp s1 s2 // 将s1文件复制一份名为s2的文件
cp -r dir1 dir2 // 将dir1的全部内容复制到dir2里面
\cp -r dir1 dir2 // 强制覆盖不提示
```

### mv
mv移动或改名 
::: tip
重命名的前提是两个文件在同一个目录下
:::

```javascript
mv t1 t2 // 将t1的名字换为t2
mv dir1 dir2 // 将dir1的目录变为dir2的目录
mv a.txt test // 移动 a.txt 到 test 目录下
```


注：cp与mv的区别为，cp是拷贝(复制)，mv为移动(剪切)。

### rm
```javascript
rm 文件名 // 删除文件，注意被删除的文件不会出现在废纸篓中哦，谨慎使用！

rm -r dir // 删除dir下的所有档案

rmdir 文件夹名 // 删除文件夹

rm -rf // 删除目录下的所有文件，谨慎使用！
```

### mkdir
```javascript
mkdir 文件夹名 // 在当前目录下创建文件夹\
mkdir -p index/a // 创建 index 目录，其下再创建 a 目录(多级)
touch 文件 // 在当前目录下创建文件
```


### cat
```javascript
cat 文件名 // 在标准输出设备上显示文件内容 注可以同时打开多个文件
cat -b 文件名 // 只显示非空行的行号
cat -n 文件名  //显示所有行的行号
```

### head
```javascript
head 文件名 // 显示文件开头若干行内容，默认显示10行
head -c size 文件名// 显示文件开头的size字节
head -n number 文件名//显示文件开头的number行
```

### tail
```javascript
tail 文件名 // 显示文件末尾若干行内容，默认显示10行
tail -c size 文件名// 显示文件末尾的size字节
tail -n number 文件名//显示文件末尾的number行
```

### more
```javascript
more a.txt  // 查看 a.txt 文件的内容
more 指令是一个基于 vim 编辑器的文本过滤器，可以以全屏幕的方式按页显示文本文件的内容，且有若干快捷键：
space // 向下翻一页
Enter // 向下翻一行
q // 立即离开more，不再显示文件内容
Ctrl+F // 向下滚动以一屏
Ctrl+B // 返回上一屏
= // 输出当前行的行号
:f // 输出文件名和当前行的行号
more 指令也可以结合 cat 指令进行使用，可以让文件内容按百分比显示，使用管道指令 | more：
cat a.txt | more 【查看文件 a.txt 的内容，并以百分比显示]
```
### less
分屏查看文件内容
```javascript
// less 用来分屏查看文件的内容，类似 more 指令但强于 more 指令，支持各种显示终端；
// less 在显示文件内容时，并不是一次将整个文件加载后才显示，而是根据显示需要来加载内容，效率较高。
// 同样它也有相关快捷键：
space // 向下翻动一页

pagedown // 向下翻动一页

pageup // 向上翻动一页

/字符串 // 向下搜寻字符串，n 向下，N 向上

?字符串 // 向上搜寻字符串，n 向下，N 向上

q // 离开 less

```
### echo

### > / >>
```javascript
cat 文件1 > 文件2 // 将文件1的内容覆盖到文件2

ls -l /home > /home/info.txt // 将 /home 下的文件列表写入 info.txt 中

cal >> /time // 将当前日历信息追加到 /time 文件中

重定向 > 会覆盖之前内容，追加 >> 会将新内容添加到之前内容的末尾。

```

### ln
::: tip
软链接也称符号链接，类似 Windows 中的快捷方式，主要存放了链接其他文件的路径，删除软连接的方式与删除文件相同。
:::
```
ln -s /root /myroot // 创建一个软连接 myroot，连接到 /root 目录
rm /myroot // 删除软连接 myroot
```
### history
```javascript
history // 查看最近所有执行过的指令
history 10 // 查看最近执行过的10条指令
!5 // 执行历史编号为5的指令
```
## 搜索查找
### find 
```javascript
find /home -name a.txt // 根据文件名查找 home 下的 a.txt 文件

find /home -user xiaoma // 根据用户查找 home 下用户昵称为 xiaoma 的文件

find / -size 200M // 根据文件大小查找系统中大小为 200M 的文件

find / -size +200M // 查找系统中大于 200M 的文件

find 指令将从指定目录向下递归遍历其各个子目录，将满足条件的文件或目录显示在终端。

```

### locate
```javascript
// locate 指令可以快速定位文件路径，利用事先建立的系统中所有文件名称及路径的 locate 数据库实现快速定位文件，无需遍历整个文件系统；但为了保证查询准确度，管理员须定期更新locate时刻。
updatedb // 创建 locate 数据库，第一次使用 locate指令前必须先创建数据库
locate a.txt // 定位 a.txt 文件的路径
```

### which
which ls 检索 ls 指令所在路径

### grep
```javascript
// grep 过滤查找常和管道符 | 结合使用，表示将前一个命令的处理结果传递给后面处理。

grep "yes" hello.txt // 查找 hello.txt 文件中 “yes” 所在行

cat hello.txt | grep "yes" // 查找 hello.txt 文件中 “yes” 所在行

cat hello.txt | grep -n "yes" // 查找 hello.txt 文件中 “yes” 所在行并显示行号

```

## 压缩解压
### gzip - 压缩文件
gzip hello.txt 【将 hello.txt 文件压缩为 .gz 文件】
### gunzip - 解压文件
gzip hello.txt.gz 【将 hello.txt.gz 文件压缩为 .txt 文件】
### zip - 压缩文件或目录
zip -r myhome.zip /home/ 【将 home 以及它的子目录压缩为 myhome.zip】
-r 递归压缩，用于压缩目录以及目录下的子文件夹。
### unzip - 解压文件或目录
unzip -d /tmp myhome.zip 【将 myhome.zip 解压到 /tmp 目录下】

-d 用于指定解压后文件的存放目录。
### tar - 打包

tar 打包后的文件为 .tar.gz 文件。
```javascript
tar -zcvf a.tar.gz b.txt c.txt // b.txt 和 c.txt 压缩成 a.tar.gz

tar -zcvf a.tar.gz /home/ // /home 下的文件夹压缩为 a.tar.gz

tar -zxvf a.tar.gz // a.tar.gz 解压到当前目录

tar -zxvf a.tar.gz -C /tmp // a.tar.gz 解压到 /tmp 目录下
```

##  帮助
### man
```javascript
man 命令或配置文件
man ls // 查看 ls 命令的帮助手册
man netstat // 查看 netstat 命令的帮助手册
```
### help
```help cd // 查看 cd 命令的相关信息```


## 其他
```javascript
telnet ip地址 // 链接到指定ip上

df // 显示硬盘空间使用情况

dv // 检测一个目录和所有它的子目录中文件占用磁盘情况

date // 显示系统时间

cal // 查看日历

shutdown // 关机
shutdown -h now // 立刻关机
shutdown -h 1 // 1分钟后关机，shutdown后不填默认一分钟后关机
shutdown -r now // 立即重启

reboot // 重启

open . // 在系统文件夹中打开当前目录

sync - 将内存的数据同步到磁盘
```

