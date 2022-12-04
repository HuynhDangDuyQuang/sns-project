const express = require("express");
const app = express();
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");
const uploadRouter = require("./routes/upload");
const PORT = 5000;
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

// connect with database
mongoose.connect(process.env.MONGOURL)
    .then(() => {
        console.log("DB connected...");
    })
    .catch((err) => {
        console.log(err);
    });

//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));;
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);
app.use("/api/upload", uploadRouter)

app.get("/", (req, res) => {
    res.send("hello express");
});

// app.get("/users", (req, res) => {
//     res.send("users express");
// });

app.listen(PORT, () => console.log("server started"))