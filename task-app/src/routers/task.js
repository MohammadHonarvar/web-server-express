const express = require('express')
const taskRouter = new express.Router()
const Task = require('../models/task')

taskRouter.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body)
    const taskSaved = await task.save()
    res.status(201).send(taskSaved)
  }
  catch(error) {
    res.status(500).send()
  }
})

taskRouter.get('/tasks', async (req, res) => {

  try {
    const taskList = await Task.find()
    res.send(taskList)
  }
  catch(error) {
    res.status(500).send()
  }
})

taskRouter.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id
  try {
    const task = await Task.findById(_id)

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  }
  catch(error) {
    res.status(500).send()
  }
})

taskRouter.patch('/tasks/:id', async (req, res) => {
  const incomingUpdateFieldList = Object.keys(req.body)
  const allowedUpdateFieldList = ['description', 'completed']

  let isValidUpdateOperation = incomingUpdateFieldList.every(field => allowedUpdateFieldList.includes(field))

  if (!isValidUpdateOperation) {
    return res.status(400).send({ 'error': 'Invalid update request' })
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!task) {
      return res.status(404).send()
    }

    res.send(task)
  }
  catch(error) {
    if (error.errors) {
      const errorData = error.errors
      const errorKeyList = Object.keys(error.errors)
      const errorList = []
      errorKeyList.forEach(key => {
        errorList.push(errorData[key].message)
      })
      return res.status(400).send({ 'error': errorList })
    }

    res.status(500).send()
  }
})

taskRouter.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).send({ error: 'Task not found' })
    }

    res.send(task)
  }
  catch(error) {
    res.status(500).send()
  }
})

module.exports = taskRouter
