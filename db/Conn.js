const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })

  .then(() => console.log("database connected"))
  .catch((error) => {
    console.log("error" + error.message);
  });
