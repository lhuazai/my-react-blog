const devMode = process.env.NODE_ENV === 'development'

const config = {
  PORT: 6060, // 启动端口
  ADMIN_GITHUB_LOGIN_NAME: 'lhuazai', // 博主的 github 登录的账户名 user
  GITHUB: {
    client_id: 'Iv1.334560998093b0d8',
    client_secret: 'f667bd7096cda27dd1fbf23eb69a05634cb95314',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user', // 用于 oauth2
    fetch_user: 'https://api.github.com/users/lhuazai' // fetch user url https://api.github.com/users/gershonv
  },
  EMAIL_NOTICE: {
    // 邮件通知服务
    // detail: https://nodemailer.com/
    enable: true, // 开关
    transporterConfig: {
      host: 'smtp.163.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: '18674785073@163.com', // generated ethereal user
        pass: 'PDSYUMAWSUMWEHXY' // generated ethereal password 授权码 而非 密码
      }
    },
    subject: '博客 - 您的评论获得新的回复！', // 主题
    text: '您的评论获得新的回复！',
    WEB_HOST: 'http://127.0.0.1:3000' // email callback url
  },
  TOKEN: {
    secret: 'g74f2e3b4f57c0fa5d885c7585bc3df57a9ec786a', // secret is very important!
    expiresIn: '720h' // token 有效期
  },
  DATABASE: {
    database: 'nodeKoasql',
    user: 'root',
    password: '123',
    options: {
      host: 'localhost', // 连接的 host 地址
      dialect: 'mysql', // 连接到 mysql
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false, // 默认不加时间戳
        freezeTableName: true // 表名默认不加 s
      },
      timezone: '+08:00'
    }
  }
}

// 部署的环境变量设置
if (!devMode) {
  console.log('env production....')

  // ==== 配置数据库
  config.DATABASE = {
    ...config.DATABASE,
    database: '', // 数据库名
    user: '', // 账号
    password: '' // 密码
  }

  // 配置 github 授权
  config.GITHUB.client_id = ''
  config.GITHUB.client_secret = ''

  // ==== 配置 token 密钥
  config.TOKEN.secret = 'g74f2e3b4f57c0fa5d885c7585bc3df57a9ec786a'

  // ==== 配置邮箱

  // config.EMAIL_NOTICE.enable = true
  config.EMAIL_NOTICE.transporterConfig.auth = {
    user: '18674785073@163.com', // generated ethereal user
    pass: 'PDSYUMAWSUMWEHXY' // generated ethereal password 授权码 而非 密码
  }
  config.EMAIL_NOTICE.WEB_HOST = 'https://guodada.fun'
}

module.exports = config
