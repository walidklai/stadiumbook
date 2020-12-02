const express = require("express");
const connectDB = require("./config/connectDB");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ extended: false }));

connectDB();

app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/stadium", require("./routes/api/stadium"));
app.use("/api/booking", require("./routes/api/booking"));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Server engaged on port ${PORT} ....`);
});
