const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

const jwtPassword = "123456";
const app = express();

app.use(cors()); // Important to allow frontend access
app.use(express.json());

// const ALL_USERS = [
//   {
//     username: "harkirat@gmail.com",
//     password: "123",
//     name: "Harkirat Singh",
//   },
//   {
//     username: "raman@gmail.com",
//     password: "123321",
//     name: "Raman Singh",
//   },
//   {
//     username: "priya@gmail.com",
//     password: "123321",
//     name: "Priya Kumari",
//   },
// ];

mongoose.connect(process.env.MONGODB_URL);

const Users = mongoose.model('Users', {
  name: String,
  email: String,
  password: String
});

app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const existingUSer = await Users.findOne({email: email});

  if (existingUSer){
    return res.status(400).send("User already exists!");
  }

  const user = new Users({
    name: username,
    email: email,
    password: password
  })

  user.save();
  res.json({
    message: "User added successfully!"
  })

});


// app.post("/signin", (req, res) => {
//   const { username, password } = req.body;

//   if (!userExists(username, password)) {
//     return res.status(403).json({ msg: "User doesn't exist in our DB" });
//   }

//   const token = jwt.sign({ username }, jwtPassword);
//   res.json({ token });
// });

// app.get("/users", (req, res) => {
//   const token = req.headers.authorization;

//   try {
//     const decoded = jwt.verify(token, jwtPassword);
//     const currentUser = decoded.username;

//     const filteredUsers = ALL_USERS.filter(user => user.username !== currentUser);
//     res.json({ users: filteredUsers });
//   } catch (err) {
//     res.status(403).json({ msg: "Invalid token" });
//   }
// });

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
