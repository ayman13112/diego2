const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || "4000";

const administratorRouter = require("./routes/AdministratorRouter");

const instructorRouter = require("./routes/InstructorRouter");

const guestRouter = require("./routes/GuestRouter");

const individualTraineeRouter = require("./routes/individualTraineeRouter");

const corporateTraineeRouter = require("./routes/corporateTraineeRouter");

const individualTrainee = require("./models/individualTrainee");

const corporateTrainee = require("./models/corporateTrainee");

const instructor = require("./models/instructor");

const administrator = require("./models/administrator");

app.use(express.json());

app.use("/api/administrator", administratorRouter);

app.use("/api/instructor", instructorRouter);

app.use("/api/guest", guestRouter);

app.use("/api/individualTrainee", individualTraineeRouter);

app.use("/api/corporateTrainee", corporateTraineeRouter);

const maxAge = 3 * 24 * 60 * 60;
const createToken = (UserName) => {
  return jwt.sign({ UserName }, "supersecret", {
    expiresIn: maxAge,
  });
};

//login post method for multiple users
app.post("/api/login", async (req, res) => {
  const { UserName, Password } = req.body;
  let user;
  let role;

  try {
    user = await individualTrainee.findOne({ UserName: UserName });
    if (user) {
      role = "individualTrainee";
    }
    if (!user) {
      user = await corporateTrainee.findOne({ UserName: UserName });
      role = "corporateTrainee";
    }
    if (!user) {
      user = await instructor.findOne({ UserName: UserName });
      role = "instructor";
    }
    if (!user) {
      user = await administrator.findOne({ UserName: UserName });
      role = "administrator";
    }

    if (user) {
      const auth = await bcrypt.compare(Password, user.Password);
      if (auth) {
        console.log({ user, role });
        const token = createToken(user.UserName);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user, role, token });
      } else {
        throw Error("incorrect password");
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//logout function
app.get("/api/logout", (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: maxAge * 1000 });
    res.send("log out success");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://ahmed:mongodb@mernapp.ipuh1pe.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening to requests on http://localhost:${port}`);
      console.log("connected done");
    });
  })
  .catch((error) => {
    console.log(error);
  });
