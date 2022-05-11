import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Task from "./models/taskModel.js";
import bodyParser from "body-parser";

dotenv.config();
// nestjs usa o express por debaixo dos panos...

const app = express();

//string de conexão
const db = mongoose.connect("mongodb://127.0.0.1/avanade");

const tasksRouter = express.Router();
//se não instalar o pacote dotenv não conseguimos ler arquivos .env
// process.env é undefined, por que não tem a lib dotenv
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

tasksRouter
  .route("/tasks")
  .post((req, res) => {
    const task = new Task(req.body);

    task.save();
    return res.status(201).json(task);
  })
  .get((req, res) => {
    //queryString - http://localhost:5000/api/tasks?title=REST API&done=false
    const query = {};
    // const { query } = req;
    if (req.query.title) {
      query.title = req.query.title;
    }
    // const response = { title: "NodeJS + Express + REST API" };
    Task.find(query, (err, tasks) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(tasks);
      }
    });
  });

tasksRouter.route("/tasks/:taskId").get((req, res) => {
  //queryString - http://localhost:5000/api/tasks/1

  Task.findById(req.params.taskId, (err, tasks) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(tasks);
    }
  });
});

app.use("/api", tasksRouter);
// localhost:5000/api/tasks
//HATEOAS - Hypermedia as the Engine of Application State
app.get("/", (req, res) => {
  console.log(req);
  res.send("<h1>Bem vindo à REST API</h1>");
});

app.listen(port, () => {
  console.log(`Running Web Server at port: ${port}`);
});
// http://localhost:5000
