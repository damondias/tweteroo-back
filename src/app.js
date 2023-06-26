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

app.post("/tweets", (req,res) => {
    const body = req.body;

    const { username, tweet} = body;
    const { avatar } = users.find(u => u.username === username)

    tweets.push({
        username,
        avatar,
        tweet,
    });
    res.send('Ok');
});

app.get("/tweets", (req,res) =>{
    if(tweets.length <= 10 ){
        res.send([...tweets].reverse());
    } else {
        res.send([...tweets].reverse().splice(0,10));
    }
});

app.listen(5000, () => {
    console.log(`
                Running API Tweteroo on port 5000,
                Url: http://localhost:5000`);
})