const express = require('express')
const db = require('../models')
const Todo = db.Todo
const router = express.Router()
const { convertDate } = require('../date-converter')

// Include server-side validation
const validation = require('../express-validator')
// Include isAuthenticated module
const { isAuthenticated } = require('../config/auth')

// Include Controller
const todoController = require('../controllers/todo')

router.get('/', isAuthenticated, todoController.getViewAllTodo)

// show one todo
router.get('/view/:id', isAuthenticated, todoController.getViewOneTodo)

// create todo page
router.get('/new', isAuthenticated, todoController.getNewTodo)

// create todo submit
router.post('/new', isAuthenticated, validation.newTodo, todoController.postNewTodo)

// update todo page
router.get('/edit/:id', isAuthenticated, (req,res) => {
  const userId = req.user.id
  const todoId = req.params.id
  return Todo.findOne({ where: { id: todoId, UserId: userId } })
    .then(todo => {
        todo.dataValues.dueDate = convertDate(todo.dataValues.dueDate)
        return res.render('edit', { todo, todoFormCSS: true, formValidation: true })
      })
    .catch(err => console.error(err))
})

// update todo submit
router.put('/edit/:id', validation.editTodo, isAuthenticated, todoController.putEditTodo)

// delete todo 
router.delete('/delete/:id', isAuthenticated, (req,res)=>{
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => todo.destroy())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router