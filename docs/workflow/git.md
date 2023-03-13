## 配置 Git 的用户名和邮箱

```
git config user.name 'username1'
git config user.email test1@qq.com
```

## git add

```
# 添加某个文件到暂存区，后面可以跟多个文件，以空格区分
git add xxx
# 添加当前更改的所有文件到暂存区。
git add .
```

## git commit

```
# 提交暂存的更改，会新开编辑器进行编辑
git commit
# 提交暂存的更改，并记录下备注
git commit -m "you message"
# 等同于 git add . && git commit -m
git commit -am
# 对最近一次的提交的信息进行修改,此操作会修改commit的hash值
git commit --amend
```

## git pull

```
# 从远程仓库拉取代码并合并到本地，可简写为 git pull 等同于 git fetch && git merge
git pull <远程主机名> <远程分支名>:<本地分支名>
# 使用rebase的模式进行合并
git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
```

## git fetch

与 git pull 不同的是 git fetch 操作仅仅只会拉取远程的更改，不会自动进行 merge 操作。对你当前的代码没有影响

```
# 获取远程仓库特定分支的更新
git fetch <远程主机名> <分支名>
# 获取远程仓库所有分支的更新
git fetch --all
```

## 修改最近一次提交的作者

```javascript
 git commit --amend --reset-author
```

## 撤销 add

**git add 添加了多余文件**
git add . 表示当前目录所有文件，不小心就会提交其他文件
git add 如果添加了错误的文件的话
撤销操作
git status 先看一下 add 中的文件
git reset HEAD 如果后面什么都不跟的话 就是上一次 add 里面的全部撤销了
git reset HEAD XXX.py 就是对某个 py 文件进行撤销了
git reset HEAD file 即使对 file 文件夹进行撤销

## 如何删除某一个 commit

```
git log

Git rebase -i commitId
```

::: tip
想删除的前一次提交的 commitId
Pick 改成 drop
保存退出 Esc:wq
:::

```
git push origin master --force
```

## 如何撤销上一次 commit

::: tip
取消上一次 commit,加上--hard 则不保留当前更改
:::

```
git reset --hard HEAD~1
```

```
git push --force
```

## 如何撤销 git reset --hard

```
git reflog
```

```
git reset --hard commitId
```

## 暂时存储

```
git stash //把本地的改动暂存起来
git stash save "message" 执行存储时，添加备注，方便查找。
git stash pop // 应用最近一次暂存的修改，并删除暂存的记录
git stash apply  // 应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即 stash@{0}，如果要使用其他个，git stash apply stash@{$num} 。
git stash list // 查看 stash 有哪些存储
git stash clear // 删除所有缓存的 stash
```

## 远程覆盖本地

```
$ git fetch --all
$ git reset --hard origin/master
$ git pull
```

## 本地覆盖远程

```
git push origin master -f
```

## 修改 commit 信息

::: tip
‘C’进入 VIM 编辑状态，修改完成。esc 退出编辑，两次大写字母'Z'保存并退出
:::

```
$ git commit --amend
```

## github

建立 git 仓库，cd 到你的本地项目根目录下，执行 git 命令

```
git init
```

将项目的所有文件添加到仓库中

```
git add .
```

将 add 的文件 commit 到仓库

```
git commit -m "注释语句"
```

去 github 上创建自己的 Repository
复制地址git@github.com:iamporia/\*\*\*.git
将本地的仓库关联到 github 上

```
git remote add origin git@github.com:iamporia/***.git
```

上传 github 之前，要先 pull 一下

```
git pull origin master
```

上传代码到 github 远程仓库

```
git push -u origin master
```

查看尚未暂存的文件更新了哪些部分

```
git diff
```

查看已暂存的将要添加到下次提交里的内容

```
git diff --cached 或者 git diff --staged
```

## 移除文件

要从已跟踪文件清单中移除

```
git rm filename
```

如果删除之前修改过并且已经放到暂存区域的话,force 强制

```
git rm filename -f
```

git 仓库中删除，工作区仍保留

```
git rm --cached filename
```

## 移动文件

```
git mv file to directory
```

rename

```
git mv file_from file_to
```

其实，运行 git mv 就相当于运行了下面三条命令：

```
$ mv README.md README
$ git rm README.md
$ git add README
```

## 查看历史

```
git log
```

- **-p** 显示每次提交的内容差异
- **-2** 显示最近两次提交
- **--stat** 显示提交的简略的统计信息
- **--pretty** 指定使用不同于默认格式的方式展示提交历史，子选项 oneline，short，full，fuller，format

```
git log --pretty=oneline
```

## 撤销

- 取消所有暂存的文件

```
git reset . 或者 git reset HEAD .
```

- 取消暂存的文件

```
git reset HEAD -filename
```

- 你提交后发现忘记了暂存某些需要的修改，可以像下面这样操作：

```
$ git commit -m 'initial commit'
$ git add forgotten_file
$ git commit --amend
```

最终你只会有一个提交——第二次提交将代替第一次提交的结果。

- 撤消对文件的修改

```
git checkout -- filename
```

## 远程仓库

- 查看远程仓库
  ![](https://cdn.nlark.com/yuque/0/2020/png/292785/1607917245342-8c11739c-d421-4bab-a7ed-b0f45eef9dc9.png#height=184&id=Iu3le&originHeight=184&originWidth=692&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=&width=692)
- 添加远程仓库

```
git remote add <shortname> <url>
```

字符串 shortname 来代替整个 URL，拉取仓库信息
git fetch shortname

- 从远程仓库中抓取与拉取

```
git fetch [remote-name]
```

这个命令会访问远程仓库，从中拉取所有你还没有的数据。 执行完成后，你将会拥有那个远程仓库中所有分支的引用，可以随时合并或查看。

```
git fetch origin
```

如果你使用 clone 命令克隆了一个仓库，命令会自动将其添加为远程仓库并默认以 “origin” 为简写。 所以，git fetch origin 会抓取克隆（或上一次抓取）后新推送的所有工作。 必须注意 git fetch 命令会将数据拉取到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。

```
git pull
```

如果你有一个分支设置为跟踪一个远程分支,可以使用 git pull 命令来自动的抓取然后合并远程分支到当前分支。

- 推送到远程仓库

```
git push [remote-name] [branch-name]
```

- 查看某个远程仓库

```
git remote show [remote-name]
```

- 远程仓库的移除与重命名

```
git remote rename pb paul
```

值得注意的是这同样也会修改你的远程分支名字。 那些过去引用 pb/master 的现在会引用 paul/master

- 移除一个远程仓库
  `git remote rm [remote-name]`

## git alias

```
git config --global alias.co checkout
```

## git 拉取远程分支到本地

1.把远程分支拉到本地
`git fetch origin dev（dev为远程仓库的分支名）` 2.在本地创建分支 dev 并切换到该分支
`git checkout -b dev(本地分支名称)` origin/dev(远程分支名称) 3.把某个分支上的内容都拉取到本地
`git pull origin dev(远程分支名称)`

## 将 A 分支上的 commit 复制到 B 分支上

方式一 cherry-pick 推荐

- git checkout B
- git cherry-pick commitID

方式二 rebase
git rebase [startpoint] [endpoint] --onto [branchName]
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1648101985381-a6be5926-5635-4e09-a943-99c11765224c.png#clientId=u1ef2e941-ab25-4&from=paste&height=206&id=ueaa0f3a5&name=image.png&originHeight=206&originWidth=1068&originalType=binary&ratio=1&rotation=0&showTitle=false&size=44685&status=done&style=none&taskId=u0fe3e1ef-9df9-445f-9d8c-964f3b501d3&title=&width=1068)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1648101967741-13d132c0-c0d6-4d65-ae35-2c5404e1ac8c.png#clientId=u1ef2e941-ab25-4&from=paste&height=372&id=u89ee9c5e&name=image.png&originHeight=372&originWidth=1314&originalType=binary&ratio=1&rotation=0&showTitle=false&size=117612&status=done&style=none&taskId=u2617d594-4108-4e53-b776-f68c1366216&title=&width=1314)
**git rebase ad85dc7 30510af --onto main**![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1648102604823-825a9f71-4449-48dc-964e-d533d6392b05.png#clientId=u1ef2e941-ab25-4&from=paste&height=318&id=u23f372fe&name=image.png&originHeight=318&originWidth=930&originalType=binary&ratio=1&rotation=0&showTitle=false&size=90721&status=done&style=none&taskId=u0dba77c2-48d3-49c6-aa9b-f3fde4d0ad3&title=&width=930)
所以，虽然此时 HEAD 所指向的内容正是我们所需要的，但是 main 分支是没有任何变化的，git 只是将 dev1-dev4 部分的提交内容复制一份粘贴到了 master 所指向的提交后面，我们需要做的就是将 main 所指向的提交 id 设置为当前 HEAD 所指向的提交 id 就可以了，即:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1648102767148-940b305a-2806-4577-aade-647d86a9c678.png#clientId=u1ef2e941-ab25-4&from=paste&height=299&id=iRlSf&name=image.png&originHeight=314&originWidth=798&originalType=binary&ratio=1&rotation=0&showTitle=false&size=102696&status=done&style=none&taskId=uec0585ab-ca7b-4c75-8029-a7e32700476&title=&width=760)

## 修改已经提交并 push 后的 commit 注释

把代码 push 到远程后，发现 commit 的注释居然多了几个错别字，不行，必须改了！
搜索了一些答案之后自己做了一个总结如下：

- 修改倒数第 1 次的 commit

```
$ git rebase -i HEAD~1
```

- 修改 pick 为 edit
- 回车后进入一个页面，
  按 i 进入编辑模式，
  将要修改的那一条的 pick 修改成 edit，
  按 esc 退出编辑模式，输入:wq 保存并退出<br/>
- 修改 commit 注释内容

```
git commit --amend
```

按 i 进入编辑模式，修改内容，退出编辑模式，输入:wq 保存并退出

```
git rebase --continue
```

- 强制 push

```
git push --force github
```

## 撤销某次提交

1. 普通撤销

   `git revert commit-id` 版本是叠加的 会生成一个 commit 记录（跟 reset 不一样）
   ![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1616150182838-d8528a81-e250-44e3-8bbd-2f287b422de2.png#height=56&id=BknrE&name=image.png&originHeight=57&originWidth=447&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10859&status=done&style=none&title=&width=442)

2. 撤销 merge 的 commit

   `git revert commit-id -m 1`

## git branch

```
# 新建本地分支，但不切换
git branch <branch-name>
# 查看本地分支
git branch
# 查看远程分支
git branch -r
# 查看本地和远程分支
git branch -a
# 删除本地分支
git branch -D <branch-nane>
# 重新命名分支
git branch -m <old-branch-name> <new-branch-name>
# 删除远程分支
git push origin --delete your_branch
```

### 远程已经删除的分支 本地 git branch -a 还是能查看到

```git fetch origin --prune

```

## 本地修改不想提交的情况下用 stash 暂存

暂存到本地

```
git stash save 'msg'
```

场景：A 在 dev 分支开发新的功能，突然大佬说要优先改个别的问题。新功能没开发完，不想提交。怎么办？
这个时候就可以用 stash 把更改暂存本地 本地工作区 clean 之后就可以随意切换分支了
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1621224060277-2b5cc94f-9496-48d0-97a6-fca3ee59ddb4.png#clientId=u09f03e4b-9868-4&from=paste&height=168&id=u3e9805a5&name=image.png&originHeight=335&originWidth=753&originalType=binary&ratio=1&rotation=0&showTitle=false&size=73049&status=done&style=none&taskId=u373077cb-0de8-447d-b07d-b6ec67593ec&title=&width=376.5)
git stash list 可查看暂存的 list
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1621224081563-a0031304-aaec-4029-9f1b-66f065eea60b.png#clientId=u09f03e4b-9868-4&from=paste&height=44&id=u367e2a8a&name=image.png&originHeight=87&originWidth=525&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10319&status=done&style=none&taskId=u6f13b225-cd05-4a3c-a160-7dc5fd841e8&title=&width=262.5)
git stash pop stash@{id} 不写 stash@{id} 默认 pop 最近的一次
![image.png](https://cdn.nlark.com/yuque/0/2021/png/292785/1621224101912-45efce98-0ba0-49fd-9762-734d4ea66016.png#clientId=u09f03e4b-9868-4&from=paste&height=158&id=ue306c49e&name=image.png&originHeight=316&originWidth=729&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62328&status=done&style=none&taskId=uccaaa0a1-12eb-4fcd-bfea-9c2fa3e520b&title=&width=364.5)
默认情况下，git stash 会缓存下列文件：

- 添加到暂存区的修改（staged changes）
- Git 跟踪的但并未添加到暂存区的修改（unstaged changes）
- 但不会缓存一下文件：
- 在工作目录中新的文件（untracked files）
- 被忽略的文件（ignored files）

git stash 命令提供了参数用于缓存上面两种类型的文件。使用-u 或者--include-untracked 可以 stash untracked 文件。使用-a 或者--all 命令可以 stash 当前目录下的所有修改。
至于 git stash 的其他命令建议参考 Git manual。
[https://www.cnblogs.com/tocy/p/git-stash-reference.html](https://www.cnblogs.com/tocy/p/git-stash-reference.html)

## merge 某些文件

`git checkout branch_name file_url`

## merge 冲突部分以 xx 为准

```javascript
git merge -Xours dev # 冲突部分以当前分支为准
git merge -Xtheirs dev # 冲突部分以待合并分支为准
```

## 合并 commit

![image.png](https://cdn.nlark.com/yuque/0/2022/png/292785/1648100941262-0a596426-4b04-4f36-b74b-bfeb2454c760.png#clientId=u1ef2e941-ab25-4&from=paste&height=284&id=u5b705155&name=image.png&originHeight=284&originWidth=1304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=63198&status=done&style=none&taskId=ue39d5ed0-38fe-4d72-8f51-5a8e2a3ac0d&title=&width=1304)
现在我们在测试分支上添加了五次提交，我们的目标是把最后四个提交合并为一个提交

```
git rebase -i d661c52

pick：保留该commit（缩写:p）
reword：保留该commit，但我需要修改该commit的注释（缩写:r）
edit：保留该commit, 但我要停下来修改该提交(不仅仅修改注释)（缩写:e）
squash：将该commit和前一个commit合并（缩写:s）
fixup：将该commit和前一个commit合并，但我不要保留该提交的注释信息（缩写:f）
exec：执行shell命令（缩写:x）
drop：我要丢弃该commit（缩写:d）
```

根据自己的需要修改注释 提交

## git rebase 让你的提交记录更加清晰可读

rebase 翻译为变基，他的作用和 merge 很相似，用于把一个分支的修改合并到当前分支上。[掘金](https://juejin.cn/post/6974184935804534815)
