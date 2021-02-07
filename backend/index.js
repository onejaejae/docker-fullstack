// 필요한 모듈들을 가져오기
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

// Express 서버를 생성
const app = express();

// json 형태로 오는 요청의 본문을 해석할 수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
// db.pool.query(
//   `CREATE TABLE lists (
//     id INTEGER AUTO_INCREMENT,
//     value Text,
//     PRIMARY  KEY (id)
// )`,
//   (err, results, field) => {
//     console.log("results", results);
//   }
// );

// DB list table에 있는 모든 데이터를 프론트 서버에 보내주기
app.get("api/values", (req, res) => {
  // 데이터베이스에서 모든 정보 가져오기
  db.pool.query("SELECT * FROM lists;", (err, results, field) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).json(results);
    }
  });
});

// 클라이언트에서 입력한 값을 데이터베이스 리스트 테이블에 넣어주기
app.post("api/values", (req, res) => {
  // 데이터베이스에 값 넣어주기
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, filed) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(200).json({
          success: true,
          value: req.body.value,
        });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server is Running 5000");
});
