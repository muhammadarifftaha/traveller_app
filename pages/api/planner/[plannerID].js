import dbConnect from "../../../middleware/dbConnect.js";
import Planner from "../../../models/plannerSchema";

async function handler(req, res) {
  console.log("here");

  const { plannerID } = req.query;
  switch (req.method) {
    case "GET":
      return new Promise((resolve, reject) => {
        Planner.findOne({ uuid: plannerID }, (err, myPlanner) => {
          if (err) {
            res.status(400).send({ err: err.message });
          } else if (myPlanner) {
            res.status(200).send(myPlanner);
          } else {
            console.log("empty");
          }
        });
        resolve();
      });

    case "DELETE":
      return new Promise((resolve, reject) => {
        Planner.findOneAndDelete({ uuid: uuid }, (err, deletePlanner) => {
          if (err) {
            res.status(400).send({ err: err.message });
          } else {
            res.status(200).send();
          }
        });
        resolve();
      });

    default:
      res.status(422).send("unsupported_req_method");
      break;
  }
}

export default dbConnect(handler);
