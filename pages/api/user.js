import { hashSync, genSaltSync } from "bcrypt";
import { generateShortUuid } from "custom-uuid";
import dbConnect from "../../middleware/dbConnect.js";
import User from "../../models/userSchema.js";

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      return new Promise((resolve, reject) => {
        if (req.body.username && req.body.password) {
          req.body.password = hashSync(req.body.password, genSaltSync(10));
          req.body.uuid = generateShortUuid();

          User.findOne({ username: req.body.username }, (err, foundUser) => {
            if (err) {
              res.status(500).send("Internal server error " + err.message);
              console.log(err);
            } else if (foundUser) {
              res.status(409).send("User exist");
            } else if (
              !foundUser ||
              foundUser.length <= 0 ||
              foundUser === undefined
            ) {
              User.create(req.body, (err, createdUser) => {
                if (err) {
                  res.status(500).send("Unable to create user" + err.message);
                } else {
                  res.status(201).send({
                    message: "Successfully created user",
                    userData: createdUser,
                  });
                }
              });
            }
          });
        } else {
          res.status(422).send("incomplete_data");
        }
        resolve();
      });

    default:
      res.status(422).send("unsupported_req_method");
      break;
  }
};

export default dbConnect(handler);
