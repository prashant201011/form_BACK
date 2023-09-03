const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const sequelize = require("./DB");
const Task = require("./types");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = 8080;

app.post("/tasks", async (req, res) => {
  try {
    const { name, rollno, phonenumber } = req.body;
    const task = await Task.create({
      name: name,
      rollno: rollno,
      phonenumber: phonenumber,
    });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create the task." });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch tasks." });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { name, rollno, phonenumber } = req.body;
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    task.name = name || task.name;
    task.rollno = rollno || task.rollno;
    task.phonenumber = phonenumber || task.phonenumber;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update the task." });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found." });
    }
    await task.destroy();
    res.json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete the task." });
  }
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
