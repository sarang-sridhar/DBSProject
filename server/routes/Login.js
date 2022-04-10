const express = require("express");
const router = express.Router();
const { Users } = require("../models");


router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

router.post("/", async (req, res) => {
    const listOfUsers = await Users.findAll();

    const user = req.body;
  
    console.log(user)
    let flag = 0;

    for (let i = 0; i < listOfUsers.length; i++) {
        if (listOfUsers[i].uid === user.uid) {

            res.json(user)
            flag = 1
        }

    }
    if (flag === 0) {
     
        await Users.create(user);
        res.json(user)
    }


    // res.json(post);
});

module.exports = router;