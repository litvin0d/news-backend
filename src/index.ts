import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("news-backend");
});

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}! Pid: ${process.pid}`);
});