const express = require("express");
const { connection } = require("./config/db");
const {userRouter}=require("./routes/user.route")
const {flightRouter}=require("./routes/flight.route")
const {bookRouter}=require("./routes/booking.route")
const {auth}=require("./middleware/auth")
const app = express();

app.use(express.json());
app.use("/",userRouter)
app.use(auth)
app.use("/",flightRouter)
app.use("/",bookRouter)

app.get("/", (req, res) => {
  res.send("<h1>welcome to air booking system</h1>");
});

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`connect to db atlas at port ${process.env.port}`);
  } catch (error) {
    console.log("error", error.message);
  }
});
