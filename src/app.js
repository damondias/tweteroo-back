import express, { json } from "express";
import cors from "cors";

const users = [];
const tweets = [];

const app = express();

app.use(json());
app.use(cors());

app.post("/sign-up", (req,res) => {
    const {username, avatar} = req.body;
    if(!username || !avatar) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
      }

    users.push({username, avatar});
    res.status(201).send('Ok');
});

app.post("/tweets", (req,res) => {
    const body = req.body;
    if (!users.find(u => u.username === body.username)) {
        res.status(401).send("UNAUTHORIZED");
        return
    }

    const { username, tweet} = body;
    if(!username || !tweet) {
        res.status(400).send("Todos os campos são obrigatórios!");
        return;
    }

    const { avatar } = users.find(u => u.username === username)
    tweets.push({
        username,
        avatar,
        tweet,
    });
    res.status(201).send('Ok');
});

app.get("/tweets", (req,res) =>{
    
    if(tweets.length <= 10 ){
        res.send([...tweets].reverse());
    } else {
        res.send([...tweets].reverse().splice(0,10));
    }
});

app.get("/tweets/:username", (req, res) => {
    const {username} =  req.params;
    const tweetsFiltrados = tweets.filter(tweet => tweet.username === username);
    res.send(tweetsFiltrados);
});


app.listen(5000, () => {
    console.log(`
                Running API Tweteroo on port 5000,
                Url: http://localhost:5000`);
})