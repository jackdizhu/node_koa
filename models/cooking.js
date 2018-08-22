'use strict'

const config = require('../config')

const dbHandel = require('../database/index')
const CookingModel = dbHandel.getModel('cooking')

exports.insert = function ({ name, praise, evaluate, type, typeName, img, target, data}) {
  const cooking = new CookingModel()

  cooking.name = name
  cooking.praise = praise
  cooking.evaluate = evaluate
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
      // 只更新 一个字段
      // name: cooking.name,
      // type: cooking.type,
      // typeName: cooking.typeName,
      // img: cooking.img,
      // target: cooking.target,
      praise: cooking.praise,
      evaluate: cooking.evaluate,
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
