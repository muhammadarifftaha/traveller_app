import { compareSync } from "bcrypt";
import dbConnect from "../../middleware/dbConnect.js";
import User from "../../models/userSchema.js";
import Planner from "../../models/plannerSchema";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";

const jwt = require("jsonwebtoken");
const secret = process.env.AUTH_SECRET;

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return new Promise((resolve, reject) => {
        if (req.body.username && req.body.password) {
          User.findOne({ username: req.body.username }, (err, foundUser) => {
            if (err) {
              res.status(500).send("server_error");
            } else if (foundUser || foundUser.length > 0) {
              if (compareSync(req.body.password, foundUser.password)) {
                const userDetails = foundUser.toJSON();
                const token = jwt.sign(userDetails, secret, {
                  expiresIn: 60 * 60 * 24 * 7,
                });

                setCookie("access_token", token, {
                  req,
                  res,
                });
                setCookie("userID", userDetails.uuid, { req, res });
                setCookie("username", userDetails.username, { req, res });
                res.status(200).send();
              } else {
                res.status(401).send("invalid_credentials");
              }
            }
          });
          resolve();
        }
      });

    case "DELETE":
      return new Promise((resolve, reject) => {
        if (hasCookie("access_token", { req, res })) {
          deleteCookie("access_token", { req, res });
        }
        if (hasCookie("userID", { req, res })) {
          deleteCookie("userID", { req, res });
        }
        if (hasCookie("username", { req, res })) {
          deleteCookie("username", { req, res });
        }
        res.status(200).send("log_out_success");
        resolve();
      });

    default:
      return new Promise((resolve, reject) => {
        res.status(422).send("unsupported_req_method");
        resolve();
      });
  }
};

export default dbConnect(handler);
