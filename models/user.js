const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный Email',
      },
      required: [true, 'Поле "Email" должно быть заполнено'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Поле "Password" должно быть заполнено'],
      select: false,
    },
    name: {
      type: String,
      default: 'Маша',
      minlength: [2, 'Минимальная длина поля 2 символа'],
      maxlength: [30, 'Максимальная длина поля 30 символа'],
      required: [true, 'Поле должно быть заполнено']
    },
  },
  {
    versionKey: false,
  },
)

module.exports = mongoose.model('user', userSchema);