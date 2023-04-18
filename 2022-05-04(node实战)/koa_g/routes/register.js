const router = require('koa-router')()
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// 当前用户数据的列表，理论上应该存入 DB
let userList = [
]

router.prefix('/api')

router.post('/register', function (ctx, next) {
    const data = ctx.request.body;
    const checkUser = userList.find(item => item.name === data.name)
    if (checkUser) {
        return ctx.body = {
            code: '000002',
            message: "该用户名已存在"
        }
    }
    const user = {
        name: data.name,
        password: crypto.createHash('md5').update(data.password).digest('hex')
    };

    userList.push(user)

    return ctx.body = {
        code: '0',
        message: "注册成功"
    };
})

router.post('/login', (ctx) => {
    const data = ctx.request.body;
    if (!data.name || !data.password) {
      return ctx.body = {
        code: "000002", 
        message: "参数不合法"
      }
    }
    const result = userList.find(item => item.name === data.name && item.password === crypto.createHash('md5').update(data.password).digest('hex'))
    if (result) {
      const token = jwt.sign(
        {
          name: result.name
        },
        "luyi_secret", // secret
        { expiresIn: 60 * 60 } // 60 * 60 s
      );
      return ctx.body = {
        code: "0",
        message: "登录成功",
        data: {
          token
        }
      };
    } else {
      return ctx.body = {
        code: "000002",
        message: "用户名或密码错误"
      };
    }
})

module.exports = router