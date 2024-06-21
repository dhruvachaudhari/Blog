import express from "express"
import mysql from "mysql2"
import cors from "cors"
// import userrouter from "./routes/user.js"
import postrouter from "./routes/post.js"
import multer from "multer";

const app = express()

app.use(express.json());
app.use(cors())
app.use((req, res, next) => {
    console.log("Incoming request:", req.method, req.url);
    next();
});

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "dhruva",
    database: "blog"
})

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the MySQL database");
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({
    storage: storage
});

app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json(file.filename);
    console.log(res.file)
});



app.use("/api", postrouter)

app.listen(3000, () => {
    console.log("Backend working fine")
})