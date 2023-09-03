const { DataTypes } = require("sequelize");
const sequelize = require("./DB");

const Task = sequelize.define("Task", {
  name: {
    type: DataTypes.STRING,
  },
  rollno: {
    type: DataTypes.INTEGER,
  },
  phonenumber: {
    type: DataTypes.STRING,
  },
});

module.exports = Task;
