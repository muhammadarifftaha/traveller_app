const mongoose = require("mongoose");

const dbConnect = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection.once("open", () => {
    console.log("connected to mongodb");
  });
  mongoose.connection.on("error", () => {
    console.log("mongodb connection error");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("disconnected from mongodb");
  });

  return handler(req, res);
};

export default dbConnect;
