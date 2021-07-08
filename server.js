const express = require("express");
const app = express();

app.use(express.json({}));

const {Text} = require("./model");

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
    console.log("");
    console.log("===============================================================================================")

    // Date and Time format
    let date    = new Date().toLocaleDateString("en-US") + " at ";
    let hours   = new Date().getHours().toString() + ":";
    let minutes = new Date().getMinutes().toString() + ":";
    let seconds = new Date().getSeconds().toString();
    let time    = date + hours + minutes + seconds;
    console.log("Time  :", time);

    console.log("Method:", req.method);
    console.log("Path  :", req.originalUrl);
    console.log("Body  :", req.body);
    console.log("");
    next();
})

app.get("/text", function(req, res){
    res.setHeader("Content-Type", "application/json");
    Text.find({},(err, texts)=>{
        if (err){
            res.status(500).json({
                message: "unable to get all text messages",
                error: err
            })
            return
        }
        res.status(200).json(texts);
    })
})

app.post("/text", function(req, res){
    res.setHeader("Content-Type", "application/json");
    console.log(`Creating text message with body`, req.body)

    let newText = {
        author: req.body.author || "",
        text  : req.body.text || "",
    }
    Text.create(newText, (err, text) => {
        if(err){
            res.status(500).json({
                error: err,
                message: "Could not create a new text message",
            })
            return;
        }
        res.status(201).json(text);
    })
})

module.exports = app;