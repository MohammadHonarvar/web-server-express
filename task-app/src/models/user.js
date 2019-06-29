const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      // if (value.length <= 6) {
      //   throw new Error('The password length should be greater than 6 chars')
      // }
      // else if (/password/ig.test(value)) {
      //   throw new Error('The \"password\" word shouldn\'t be used')
      // }
      if (value.toLowerCase().includes('password')) {
        throw new Error('The \"password\" word shouldn\'t be used')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('The age must be a positive value.')
      }
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('The email is invalid.')
      }
    }
  }
})

module.exports = User
