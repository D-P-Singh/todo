
const todos = require("../models/todo_model")
const users = require("../models/user_model")
exports.createTodo = async (req, res) => {
    const todoData = req.body
    todoData.userId = req.user.id
    try {
        const response = await todos.create(todoData)
        const userResponse = await users.findByIdAndUpdate(req.user.id, { $push: { todosId: response._id } }, { new: true })
        return res.json({
            data: userResponse,
            success: true,
            message: "Todo add successfully"
        })
    } catch (error) {
        console.log("error", error);
    }

}
exports.updateTodo = async (req, res) => {
    const todoData = req.body
    const todoId = req.params
    todoData.userId = req.user.id
    try {
        const updateDate = new Date().toISOString()
        todoData.updatedAt = updateDate
        const response = await todos.findOneAndUpdate({ _id: todoId.id, userId: todoData.userId }, req.body, { new: true })
        return res.json({
            data: response,
            success: true,
            message: "Todo update successfully"
        })
    } catch (error) {
        console.log("error", error);
    }
}
exports.deleteTodo = async (req, res) => {
    const todoId = req.params
    userId = req.user.id
    try {
        const response = await todos.findOneAndDelete({ _id: todoId.id, userId: userId },)
        console.log(response);
        if (response == null) {
            return res.json({
                data: response,
                success: false,
                message: "Todo  not found "
            })
        }
        return res.json({
            data: response,
            success: true,
            message: "Todo delete successfully"
        })
    } catch (error) {
        console.log("error", error);
    }

}
exports.getTodo = async (req, res) => {
    const userId = req.user.id
    try {
        const response = await todos.find({ userId })
        //   console.log("respons", response);
        return res.json({
            data: response,
            success: true,
            message: "All todos"
        })
    } catch (error) {
        console.log("error", error);
    }

}
exports.getSingleTodo = async (req, res) => {
    const { id } = req.params
    // console.log("id",id);
    try {
        const response = await todos.findOne({ _id: id })
        //   console.log("respons", response);
        return res.json({
            data: response,
            success: true,
            message: "Single todo"
        })
    } catch (error) {
        console.log("error", error);
    }

}