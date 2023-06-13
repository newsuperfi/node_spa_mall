const express = require('express');
const app = express();
const port = 3000;

const goodsRouter = require('./routes/goods.js');
const cartsRouter = require('./routes/carts.js');
const connect = require('./schemas');
connect();


app.use(express.json());
app.use("/api", goodsRouter, cartsRouter);
app.post('/', (req, res) => {
  console.log(req.body);
  res.send('기본 URI에 POST 메소드가 정상적으로 실행되었습니다.')
})

app.get('/', (req, res) => {
  console.log(req.query);
  res.status(404).json({
    "keykey" : "value입니다.",
    "이름" : "이름입니당ㅇㅇ",
  });
} )


app.get('/:id', (req, res) => {
  console.log(req.params);

  res.send(":id URI에 정상적으로 반환되었습니다.")
})
// // localhost:3000/
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// localhost:3000/api/


app.listen(port, () => {
  console.log(port, `번 포트로 서버 실행`)
})