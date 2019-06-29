const express = require('express')
const userRouter = new express.Router()
const User = require('../models/user')

userRouter.post('/users', async (req, res) => {
  try {
    const user = new User(req.body)
    const userSaved = await user.save()
    res.status(201).send(userSaved)
  }
  catch(error) {
    res.status(400).send('User save error')
    console.error('User not saved')
  }
})

userRouter.get('/users', async (req, res) => {
  try {
    const userList = await User.find()
    res.send(userList)
  }
  catch(error) {
    res.status(500).send()
  }
})

userRouter.get('/users/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id)

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  }
  catch(error) {
    res.status(500).send()
  }
})

userRouter.patch('/users/:id', async (req, res) => {
  const incomingUpdateFieldList = Object.keys(req.body)
  const allowedUpdateFieldList = ['name', 'email', 'age', 'password']

  let isValidUpdateOperation = incomingUpdateFieldList.every(field => allowedUpdateFieldList.includes(field))

  if (!isValidUpdateOperation) {
    return res.status(400).send({ 'error': 'Invalid update request' })
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!user) {
      return res.status(404).send()
    }

    res.send(user)
  }
  catch(error) {
    res.status(400).send()
  }
})

userRouter.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send({ error: 'User not found' })
    }

    res.send(user)
  }
  catch(error) {
    res.status(500).send()
  }
})

module.exports = userRouter
