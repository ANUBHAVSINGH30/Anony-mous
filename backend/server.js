const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cors = require("cors")

const app = express()

app.use(cors({
    origin: "*",
    allowedHeaders: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(express.json())

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))