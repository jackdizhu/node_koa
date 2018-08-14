const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = {
  user: {
    userChildren: {
      type: Schema.Types.ObjectId,
      ref: 'userChildren'
    },
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nick_name: {
      type: String
    },
    head_img: {
      type: String
    }
  },
  userChildren: {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    nick_name: {
      type: String
    },
    head_img: {
      type: String
    }
  }
}
