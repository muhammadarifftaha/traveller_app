const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plannerSchema = new Schema({
  uuid: { type: String, required: true },
  userID: { type: String, required: true },
  name: { type: String, default: "Untitled", required: true },
  travelPeriod: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  destination: { type: String, required: true },
  data: [{ type: Object }],
});

const Planner =
  mongoose.models.Planner || mongoose.model("Planner", plannerSchema);

module.exports = Planner;
