// 服务器配置信息

const server = {
  host: '', // 服务器ip
  port: '22', // 端口一般默认22
  username: 'root', // 用户名
  password: '', // 密码
  //passphrase: 'hxb@19900603', //私钥密码
  //privateKey: '',//使用 私钥密钥登录
  pathNmae: '/usr/local/twitter/dist', // 上传到服务器的位置
  locaPath:'./dist/' // 本地打包文件的位置
};


//引入scp2
const client = require('scp2');
const ora = require('ora');
const fs = require('fs');
const spinner = ora('正在发布到服务器...');

const Client = require('ssh2').Client; // 创建shell脚本
const conn = new Client();

server.privateKey = fs.readFileSync("C:\\Users\\admin\\.ssh\\id_rsa")

console.log('正在建立连接');
conn.on('ready', function () {
  console.log('已连接');
  if(!server.pathNmae){
    console.log('连接已关闭');
    conn.end();
    return false;
  }
  // 这里我拼接了放置服务器资源目录的位置 ，首选通过rm -rf删除了这个目录下的文件
  conn.exec('sudo rm -rf ' + server.pathNmae + '/*', function (err, stream) {
    console.log('删除文件');
    if (err) {
      console.log('发布失败.\n');
      throw err;
    }
    stream.on('close', function (code, signal) {
      console.log('开始上传');
      spinner.start();
      client.scp(server.locaPath, {
        "host": server.host,
        "port": server.port,
        "username": server.username,
        "password": server.password,
        //"passphrase": server.passphrase,
        //"privateKey": server.privateKey,
        "path": server.pathNmae
      }, err => {
        spinner.stop();
        if (!err) {
          console.log('项目发布完毕');
        } else {
          console.log("err", err)
        }
        conn.end() // 结束命令
      })
    }).on('data', function(data) {
      console.log(data)
    });
  })
}).connect({
  host: server.host,
  port: server.port,
  username: server.username,
  password: server.password,
  //passphrase: server.passphrase, //私钥密码
  //privateKey: server.privateKey //使用 私钥密钥登录
});
