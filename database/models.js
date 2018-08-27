const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = {
  user: {
    _userChildren: {
      type: Schema.Types.ObjectId,
      ref: 'userChildren'
    },
    _userChildrenList: [
      {
        type: Schema.Types.ObjectId,
        ref: 'userChildren'
      }
    ],
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
  },
  cooking: {
		name: {
      type: String,
      required: true
    },
		type: {
      type: String,
      required: true
    },
		praise: {
      type: String,
      required: true
    },
		evaluate: {
      type: String,
      required: true
    },
		typeName: {
      type: String,
      required: true
    },
		img: {
      type: String,
      required: true
    },
		target: {
      type: String,
      required: true
    },
    tags: { // 标签
      type: Array
    },
    describe: { // 描述
      type: String
    },
    difficulty: { // 难度
      type: String
    },
    peopleNum: { // 人数
      type: String
    },
    preparationTime: { // 准备时间
      type: String
    },
    cookingTime: { // 烹饪时间
      type: String
    },
		data: {
      type: Object
		}
	}
}
