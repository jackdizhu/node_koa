// const router = require('koa-router')()

// router.prefix('/cookingStyle')

const fs = require("fs");
const path = require('path')
const _request = require("request");
const request = require("request-promise");
const cheerio = require("cheerio");
const userAgents = require('../com/userAgents')
const cookingUrl = require('../com/cookingUrl')
const cooking = require('../com/cooking')
const cookingModel = require('../models/cooking')
const Mock = require('mockjs')

const log = require("../com/log")();
/*
// request
request.get(url).pipe(fs.createWriteStream(dir + "/" + filename)).on('close', function() {
  console.log('download success', url);
});
const body = await request(url);
// cheerio
var $ = cheerio.load(body);
*/

const sleep = function (ms) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve()
      }, ms)
  })
}

let filePath = path.resolve(__dirname, '../data/')

const fn_index = async (ctx, next) => {
  for (let i = 0; i < cooking.length; i++) {
    let arr = await cookingModel.find({'type': cooking[i].value})
    for (let i = 0; i < arr.length; i++) {
      arr[i].target = undefined
    }
    let _json = ''
    try {
      _json = JSON.stringify(arr)
    } catch (error) {
      _json = '[]'
    }
    let data = 'module.exports = ' + _json
    let filename = filePath + '/' + cooking[i].value + '.js'
    // console.log(filename)

    await fs.writeFile(filename, data, { encoding: 'utf-8' })
  }

  // // 增加字段 需要先在 mongoose.Schema 增加
  // for (let i = 0; i < cooking.length; i++) {
  //   let arr = await cookingModel.find({'type': cooking[i].value})
  //   for (let i = 0; i < arr.length; i++) {
  //     // let obj = JSON.parse(JSON.stringify(arr[i]))
  //     let obj = arr[i]
  //     obj.praise = Mock.mock('@float(60, 100, 2, 2)%')
  //     obj.evaluate = Mock.mock('@integer(500, 900)')
  //     await cookingModel.update(obj)
  //   }
  // }
  // console.log('增加字段完成', 111)
}

fn_index()
