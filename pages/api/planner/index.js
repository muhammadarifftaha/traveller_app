import { generateCustomUuid } from "custom-uuid";
import dbConnect from "../../../middleware/dbConnect.js";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import Planner from "../../../models/plannerSchema";

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return new Promise((resolve, reject) => {
        if (!hasCookie("userID", { req, res })) {
          res.status(400).send("auth_failed");
          resolve();
        }
        const userID = getCookie("userID", { req, res });
        Planner.find({ userID: userID }, (err, myPlanner) => {
          if (err) {
            res.status(400).send({ err: err.message });
            resolve();
          } else {
            const plannerIDs = myPlanner
              .map((planners) => {
                const { uuid } = planners;
                return uuid;
              })
              .join("_");
            setCookie("PlannerIDs", plannerIDs, { req, res });
            res.status(200).send(myPlanner);
            resolve();
          }
        });
      });

    case "POST":
      return new Promise((resolve, reject) => {
        if (!hasCookie("userID", { req, res })) {
          res.status(400).send("auth_failed");
          resolve();
        }
        const userID = getCookie("userID", { req, res });
        const uuid = generateCustomUuid(process.env.CUSTOM_UUID_DICTIONARY, 8);

        const plannerData = {
          uuid: uuid,
          userID: userID,
          data: [],
          ...req.body,
        };

        Planner.create(plannerData, (err, createdPlanner) => {
          if (err) {
            res.status(400).send({ err: err.message });
          } else {
            Planner.find({ userID: userID }, (err, myPlanner) => {
              if (err) {
              } else {
                const plannerIDs = myPlanner
                  .map((planners) => {
                    const { uuid } = planners;
                    return uuid;
                  })
                  .join("_");
                setCookie("PlannerIDs", plannerIDs, { req, res });
              }
            });
            res.status(201).send(createdPlanner);
          }
        });

        resolve();
      });

    case "PUT":
      return new Promise((resolve, reject) => {
        const uuid = req.body.uuid;
        const data = req.body.data;
        switch (req.body.method) {
          case "ADD":
            Planner.findOneAndUpdate(
              { uuid: uuid },
              { $push: { data: data } },
              { new: true },
              (err, updatedPlanner) => {
                if (err) {
                  res.status(400).send({ err: err.message });
                } else {
                  res.status(200).send(updatedPlanner);
                }
              }
            );

          case "DELETE":
            Planner.findOneAndUpdate(
              { uuid: uuid },
              { $pull: { data: { fsq_id: data } } },
              { new: true },
              (err, updatedPlanner) => {
                if (err) {
                  res.status(400).send({ err: err.message });
                } else {
                  res.status(200).send(updatedPlanner);
                }
              }
            );
        }
      });

    default:
      res.status(422).send("unsupported_req_method");
      break;
  }
};

export default dbConnect(handler);
