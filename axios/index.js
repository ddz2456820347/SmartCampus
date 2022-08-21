const express = require("express")

const mysql = require("mysql")

const cors = require("cors")

const app = express();

const Data = require("silly-datetime");

const nodemailer = require("nodemailer");

let conn = mysql.createConnection({
    host: 'localhost',
    //用户名
    user: 'root',
    //密码
    password: '',
    //数据库名称
    database: "personnel"
})

//判断数据库是否连接成功
conn.query("select 1", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log("连接成功")
    }
})
// 解决跨域问题
// 使用use挂载一个中间件，当捕获请求时，选通过全局中间件进行一个处理
app.use(cors());




//序列化
const parser = require("body-parser");
// const text = require("body-parser/lib/types/text");

//序列化 在使用get请求时不需要序列化
app.use(parser.json())
//序列化 在使用get请求时不需要序列化
app.use(parser.urlencoded({ extended: true }))

app.post("/code", (req, res) => {
    let sql = 'SELECT * FROM user';
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("查询失败")
        } else {
            // console.log("查询成功")
            // console.log(result)
            res.send(result)
        }
    })
    // conn.end();

})

app.post("/student", (req, res) => {
    let { num } = req.body;
    let sql = `SELECT * FROM demo limit ${num - 1},14`;

    if (num != 1) {
        sql = `SELECT * FROM demo limit ${14 * (num - 1)},14`;
    }

    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("查询失败")
        } else {
            // console.log("查询成功")
            // console.log(result)
            res.send(result)
        }
    })
    // conn.end();

})

app.post("/demo", (req, res) => {
    let sql = `SELECT * FROM demo`;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("查询失败")
        } else {

            res.send(result)
        }
    })
    // conn.end();

})



app.post("/add", (req, res) => {
    let { add } = req.body
    let num = Math.floor(Math.random() * 4000 + 1000)


    let data = Data.format(new Date(), 'YYYY')

    let birthday = Number(data) - add.age

    // console.log(Number(data) - 18)
    let sql = `INSERT INTO demo (id,name,data,age,sex,address,Phone,email) VALUES ('${num}','${add.name}','${birthday}', '${add.age}',' ${add.sex}', '${add.address}','default','default')`
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("添加失败")
        } else {

            res.send(result)
        }
    })
})

app.post("/del", (req, res) => {
    let { name } = req.body
    let sql = `DELETE FROM demo WHERE name = '${name}'`;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("查询失败")
        } else {

            res.send(result)
        }
    })
    // conn.end();

})

app.post("/examine", (req, res) => {
    let sql = `SELECT * FROM demo`;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("查询失败")
        } else {
            // console.log("查询成功")
            // console.log(result)
            res.send(result)
        }
    })
    // conn.end();

})

// app.post("/compile", (req, res) => {
//     let { compile } = req.body;

//     // console.log(compile)
//     let sql = `UPDATE demo SET id='${compile.id}',name='${compile.name}',data='${compile.data}',
//     age='${compile.age}',sex='${compile.sex}',address='${compile.address}',Phone='${compile.Phone}',email='${compile.email}' WHERE id = '${compile.id}'`;
//     conn.query(sql, function (err, result) {
//         if (err) {
//             console.log(err.message);
//             console.log("修改失败")
//         } else {
//             // console.log("修改成功")
//             // console.log(result)
//             res.send(result)
//         }
//     })
//     conn.end();

// })

// 微信小程序注册

app.post("/register", (req, res) => {
    // console.log(11)
    let { information } = req.body
    // console.log(information)
    const id = Math.ceil(Math.random() * 10000 + 2)
    let sql = `INSERT INTO user (id, name, password, img, student, sex) VALUES ('${id}','${information.username}','${information.password}', '${information.tempFileURL}',' ${information.student}', '${information.radio}')`;
    conn.query(sql, function (err, result) {
        if (err) {
            console.log(err.message);
            console.log("添加失败")
            res.send(err)
        } else {
            // console.log("添加成功")
            res.send(result)
        }
    })

})


//微信小程序邮箱注册验证码

app.post("/verification", (req, res) => {
    let { QQ } = req.body;

    // console.log(QQ)
    var ob = QQ.split("@")[1].split(".")[0]
    var math = Math.floor(Math.random() * 900000) + 100000;
    //建立一个smtp链接
    let transport = nodemailer.createTransport({
        host: `smtp.${ob}.com`,
        secureConnection: true,
        port: 465,
        auth: {
            user: "2068077119@qq.com",
            pass: "znjktcdsnjvrcijb"
        }
    })

    let options = {
        from: "2068077119@qq.com",
        to: `2068077119@qq.com,${QQ}`,
        //发邮件的标题
        subject: "你好:欢迎注册智慧校园小程序账号",
        html: `<div>${math}</div>`
    }

    transport.sendMail(options, function (err, msg) {
        if (err) {
            console.log("发送失败")
            console.log(err)
        } else {
            // console.log("发送成功")
            res.send(msg);
        }
        transporter.close();
    })

    res.send(String(math))


})





app.listen(8080, () => {
    console.log("8080服务器启动")
})
