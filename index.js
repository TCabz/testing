// dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// express setup
const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

// starts the server
app.listen(PORT, () => console.log(`The Server Has Started on Port: ${PORT}`));

// mongoose setup
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("MongoDB Connection is Established");
  }
);

// routes setup
app.use("/users", require("./routes/userRouter"));
