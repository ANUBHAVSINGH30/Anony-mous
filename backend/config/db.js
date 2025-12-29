const mongoose = require("mongoose")

const connectDB = function(){
    mongoose.connect(process.env.MONGO_URI)
}