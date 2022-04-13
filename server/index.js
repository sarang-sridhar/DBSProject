const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs");

// imports for the json data file

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "unbypmeqvuu1e4pk",
  host: "bultwttoppdkfltxkqhf-mysql.services.clever-cloud.com",
  password: "XGDuimrzbKgDJg4vFG8S",
  database: "bultwttoppdkfltxkqhf",
});

// // populating the store
// const inventoryData = [];
// fs.readFile("./inventory.json", "utf-8", (err, jsonString) => {
//   if (err) {
//     console.log(err);
//   } else {
//     try {
//       const data = JSON.parse(jsonString);
//       for (let i = 0; i < data.store.length; i++) {
//         inventoryData.push(data.store[i]);
//         db.query(
//           "INSERT INTO inventory (product_id ,product_name , product_baseprice) VALUES(?,?,?)",
//           [
//             inventoryData[i].productId,
//             inventoryData[i].productName,
//             inventoryData[i].productBasePrice,
//           ]
//         );
//       }
//     } catch (err) {
//       console.log("Error in parsing", err);
//     }
//   }
// });

///Login/signup API

app.post("/login", (req, res) => {
  const name = req.body.name;
  const uid = req.body.uid;
  const balance = req.body.balance;

  let flag = 0;

  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < result.length; i++) {
        if (result[i].uid === uid) {
          flag = 1;
          res.send(result[i]);
        }
      }
      if (flag === 0) {
        db.query(
          "INSERT INTO users (name, uid) VALUES (?,?,?)",
          [name, uid],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              var obj = new Object();
              obj.name = name;
              obj.uid = uid;
              obj.balance = 20000;
              res.send(obj);
              return;
            }
          }
        );
      }
    }
  });
});

app.post("/get_details", (req, res) => {
  const item_id = req.body.item_id;
  const base_price = req.body.base_price;
  db.query(
    "SELECT * from bidding_table where item_id=(?)",
    [item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result.length) {
          // console.log(result[0].current_highest_buyer)
          db.query(
            "SELECT name FROM users WHERE uid=(?) ",
            [result[0].current_highest_buyer],
            (err, result2) => {
              if (err) {
                console.log(err);
              } else {
                // console.log(result2[0].name);
                result[0].current_highest_buyer = result2[0].name;
                // console.log(result[0]);
                res.send(result[0]);
              }
            }
          );
        } else {
          var date = new Date();
          date.setHours(date.getHours() + 4);
          db.query(
            "INSERT INTO bidding_table (item_id , base_price,time) VALUES (? , ? ,? )",
            [item_id, base_price, date],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                // let obj = new Object();
                // obj.item_id = item_id;
                // obj.current_highest_buyer = "null";
                // obj.current_price = "null";
                // obj.base_price = base_price;

                // obj.time = date;
                // res.send(obj);
                db.query(
                  "SELECT * from bidding_table where item_id=(?)",
                  [item_id],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      // console.log(result.length);
                      if (result.length) {
                        res.send(result[0]);
                      }
                    }
                  }
                );
                return;
              }
            }
          );
        }
      }
    }
  );
});

app.post("/update_store", (req, res) => {
  const item_id = req.body.item_id;
  const item_name = req.body.item_name;
  const current_highest_buyer = req.body.current_highest_buyer;
  const current_price = req.body.current_price;
  const base_price = req.body.base_price;

  db.query(
    "SELECT current_highest_buyer,current_price from bidding_table where item_id=(?)",
    [item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result[0].current_highest_buyer != "null") {
          // console.log(result[0]);
          db.query(
            "UPDATE users set balance=balance+(?) where uid=(?)",
            [result[0].current_price, result[0].current_highest_buyer],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Older bidders money given back");
              }
            }
          );
        } else console.log("bleh bleh");
      }
    }
  );

  db.query(
    "UPDATE bidding_table set current_highest_buyer=(?),current_price=(?) where item_id=(?)",
    [current_highest_buyer, current_price, item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
        db.query(
          "UPDATE users set balance=balance-(?) where uid=(?)",
          [current_price, current_highest_buyer],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              console.log("Newer bidders money subtracted");
            }
          }
        );
        var obj = {};
        obj.status = 1;
        res.send(obj);
        return;
      }
    }
  );
});

app.get("/get_store", (req, res) => {
  db.query("SELECT * FROM inventory", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("/get_balance", (req, res) => {
  // console.log(req.query.uid);
  db.query(
    "SELECT balance FROM users WHERE uid=(?)",
    [req.query.uid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

// app.put("/update_balance", (req, res) => {
//   const id = req.body.id;
//   const balance = req.body.balance;
//   db.query(
//     "UPDATE users SET balance = ? WHERE uid = ?",
//     [balance, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

app.listen(3001, () => {
  console.log("server running on 3001");
});
