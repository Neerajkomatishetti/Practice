const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const jwtPassword = "123456";
const app = express();

app.use(cors()); // Important to allow frontend access
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "Harkirat Singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman Singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya Kumari",
  },
];

function userExists(username, password) {
  return ALL_USERS.find(user => user.username === username && user.password === password);
}

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({ msg: "User doesn't exist in our DB" });
  }

  const token = jwt.sign({ username }, jwtPassword);
  res.json({ token });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, jwtPassword);
    const currentUser = decoded.username;

    const filteredUsers = ALL_USERS.filter(user => user.username !== currentUser);
    res.json({ users: filteredUsers });
  } catch (err) {
    res.status(403).json({ msg: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
