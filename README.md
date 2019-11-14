# max-tcp

测试系统 tcp 连接最大值的小工具

## 安装

npm i max-tcp -g

## 使用

### 查看当前系统绑定的 ip 地址

```
max-tcp -l
```

### 启动服务器

```
max-tcp -s 8888
```

8888 为端口号，默认 5000

建议后台运行：

```
nohup max-tcp -s &
```

max-tcp 将利用系统所有 cpu 内核，通过 cluster，多进程复用相同端口处理请求，提高性能。

### 启动客户端

```
max-tcp -c 192.168.0.2,5000
```

参数为服务器 ip 地址和端口号

max-tcp 将利用系统所有 cpu 内核，通过 fork，多进程并发而不停歇的创建tcp连接。
