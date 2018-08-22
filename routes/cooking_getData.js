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
  let data = []
  for (let i = 0; i < cooking.length; i++) {
    let arr = await cookingModel.find({'type': cooking[i].value})
    for (let i = 0; i < arr.length; i++) {
      arr[i].target = undefined
    }
    data.push(...arr)
  }
  let _json = ''
  try {
    _json = JSON.stringify(data)
  } catch (error) {
    _json = '[]'
  }
  let dataStr = 'module.exports = ' + _json
  let filename = filePath + '/' + 'data' + '.js'

  await fs.writeFile(filename, dataStr, { encoding: 'utf-8' })
}

fn_index()
