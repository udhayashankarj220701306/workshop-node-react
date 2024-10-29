const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const cors = require("cors");
const bodyparser = require("body-parser");
require("dotenv").config();

const db  =new pg.Client({
    host: "localhost",
    port:50013,
    database:"finance_tracker",
    user:"postgres",
    password:"root"
});

db.connect().then(()=>{
    console.log("database connected");
})

const app = express();
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Hello World!");
})

app.post("/add",async (req,res)=>{
    const data = req.body;
    await db.query(`insert into trans(description,mode,amount) values($1,$2,$3)`,[data.description,data.mode,data.amount]);
    res.status(200).send("Record Inserted");
})

app.listen(3000,()=>{
    console.log("Server started at PORT 3000");
})


