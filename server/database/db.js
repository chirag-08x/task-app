const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log("Database successfully connnected");
  })
  .catch((error) => {
    console.log(error);
  });
