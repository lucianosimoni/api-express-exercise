// Import the respective packages
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

// Start the app
const app = express();
const port = 3030;

//Tell express we want to use these libraries
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// App listener
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

const tasks = [
  {
    id: 1,
    text: "wash the dishes",
    status: "incomplete",
  },
  {
    id: 2,
    text: "mop the floor",
    status: "incomplete",
  },
];

// // CREATE
// CREATE A TASK - EXPECTS A BODY
app.post("/tasks", (req, res) => {
  // Check for an unique id
  let uniqueID = 0;
  tasks.forEach((task) => (uniqueID = task.id + 1));

  const newTask = { ...req.body };
  newTask.id = uniqueID;
  tasks.push(newTask);

  res.json(newTask);
});

// // READ
// GET ALL TASKS: GET http://localhost:3030/tasks
app.get("/tasks", (req, res) => {
  // 1. send back a response with all tasks
  res.json(tasks);
});

// GET A SPECIFIC TASK ( BY ID ): GET http://localhost:3030/tasks/2
app.get("/tasks/:id", (req, res) => {
  // 1. extract the data from the request parameter
  // 2. convert to number
  const id = Number(req.params.id);
  // 3. find the corresponding array item with that id from tasks
  const task = tasks.find((item) => item.id === id);
  // 4. send it back in the response
  res.json(task);
});

// // UPDATE
// UPDATE A TASK BY ID

// // DELETE
// DELETE A TASK BY ID
