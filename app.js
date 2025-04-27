const express=require("express");
const dotenv=require("dotenv").config();
const contactRoutes=require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app=express();

app.use(express.json());
app.use("/api/contacts",contactRoutes)
app.use(errorHandler);


app.listen(process.env.PORT,()=>{
  console.log(`server is running ${process.env.PORT}`);
});

