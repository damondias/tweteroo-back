import express, { json } from "express";
import cors from "cors";

const users = [];
const tweets = [];

const app = express();

app.use(json());
app.use(cors());

app.post("/sign-up", (req,res) => {
    const body = req.body;
    users.push(body);
    res.send('Ok');
});

app.listen(5000, () => {
    console.log(`
                Running API Tweteroo on port 5000,
                Url: http://localhost:5000`);
})