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
  const email = req.body.email;
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
          "INSERT INTO users (name, uid, email) VALUES (?,?,?)",
          [name, uid, email],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              var obj = new Object();
              obj.name = name;
              obj.email = email;
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
        // console.log(result.length);
        if (result.length) {
          res.send(result[0]);
        } else {
          db.query(
            "INSERT INTO bidding_table (item_id , base_price) VALUES (? , ? )",
            [item_id, base_price],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                let obj = new Object();
                obj.item_id = item_id;
                obj.current_highest_buyer = "null";
                obj.current_price = "null";
                obj.base_price = base_price;
                obj.time = "test_time";
                res.send(obj);
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
    "UPDATE bidding_table set current_highest_buyer=(?),current_price=(?) where item_id=(?)",
    [current_highest_buyer, current_price, item_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // console.log(result);
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

app.listen(3001, () => {
  console.log("server running on 3001");
});
