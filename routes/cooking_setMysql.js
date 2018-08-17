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
const cookingModel = require('../models/cookingMysql')

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
  let data = {}
  for (let i = 0; i < cooking.length; i++) {
    data[cooking[i].value] = require('../data/' + cooking[i].value + '.js')
    let arr = data[cooking[i].value]
    for (let i = 0; i < arr.length; i++) {
      await cookingModel.insert(arr[i])
    }
  }
}

fn_index()
