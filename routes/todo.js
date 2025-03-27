const express = require("express")
const { createTodo, deleteTodo, getTodo, updateTodo, getSingleTodo } = require("../controllers/todo_controller")
const auth = require("../middleware/authrization")
const todoRouter = express.Router()

todoRouter.post("/createtodo", auth.auth, createTodo)
todoRouter.delete("/deletetodo/:id", auth.auth, deleteTodo);
todoRouter.get("/gettodos", auth.auth, getTodo);
todoRouter.get("/gettodo/:id", getSingleTodo);
todoRouter.put("/todoupdate/:id", auth.auth, updateTodo)
/* todoRouter.get("/gettodos", (req,res,next)=>{
next()
},(req,res)=>{
    console.log("req",req);
}) */

module.exports = todoRouter
