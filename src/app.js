import express from "express";

const users = [];
const tweets = [];

const app = express();

app.listen(5000, () => {
    console.log(`Running API tweteroo on port 5000, 
                 Url: http://localhost:5000`)
})