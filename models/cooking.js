'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const CookingModel = dbHandel.getModel('cooking')

exports.insert = function ({ name, type, typeName, img, target, data}) {
  const cooking = new CookingModel()

  cooking.name = name
  cooking.type = type
  cooking.typeName = typeName
  cooking.img = img
  cooking.target = target
  cooking.data = data

  return cooking.save()
}

exports.update = function (cooking) {
  return CookingModel.update({
    _id: cooking._id
  }, {
    $set: {
      name: cooking.name,
      type: cooking.type,
      typeName: cooking.typeName,
      img: cooking.img,
      target: cooking.target,
      data: cooking.data
    }
  })
}

exports.getByName = function (name) {
  return CookingModel.findOne({ name: name })
}

exports.getById = function (cookingId) {
  return CookingModel.findById(cookingId)
}

exports.find = function (query, opt) {
  return CookingModel.find(query, {}, opt)
}

exports.findOne = function (query, opt) {
  return CookingModel.findOne(query, {}, opt)
}
