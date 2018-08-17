'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const UserModel = dbHandel.getModel('user')

exports.insert = function ({ name, password, nickName, headImg, _userChildren, _userChildrenList }) {
  const user = new UserModel()

  user.name = name
  user.password = password
  user.nick_name = nickName || 'nickName'
  user.head_img = headImg || config.headImg
  user._userChildren = _userChildren
  user._userChildrenList = _userChildrenList

  return user.save()
}

exports.update = function (user) {
  return UserModel.update({
    _id: user._id
  }, {
    $set: {
      nick_name: user.nick_name,
      head_img: user.head_img,
      password: user.password
    }
  })
}

exports.getByName = function (userName) {
  return UserModel.findOne({ name: userName }).populate('_userChildren')
}

exports.getById = function (userId) {
  return UserModel.findById(userId)
}

exports.find = function (query, opt, limit, page) {
  limit = limit || 10
  page = page || 1
  return UserModel.find(query, {}, opt).populate('_userChildren').populate('_userChildrenList').limit(limit).skip(limit * (page - 1))
}

exports.findOne = function (query, opt) {
  return UserModel.findOne(query, {}, opt)
}

exports.count = function (query) {
  return UserModel.count(query)
}
