// const router = require('koa-router')()

// router.prefix('/cookingStyle')

const fs = require("fs");
const path = require('path')
const _request = require("request");
const request = require("request-promise");
const cheerio = require("cheerio");
const cookingModel = require('../models/cooking')

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

const downloadUrl = async function (options, name) {
  var filename = path.resolve(__dirname, '../data/' + name)
  await _request(options.uri).pipe(fs.createWriteStream(filename))
  return true
}

let errUrl = []

const image = async function (ctx, next) {
  let options = {
    method: 'GET',
    uri: 'https://www.meishij.net/china-food/caixi/',
    headers: {
      "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language":"zh-CN,zh;q=0.8",
      "Cache-Control":"max-age=0",
      "Connection":"keep-alive",
      "Host":"www.meishij.net",
      "Referer":"https://www.meishij.net/list.php?sortby=renqi&lm=41",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent": 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12'
    }
  }
  let num = 0
  let arr = await cookingModel.find({})

  for (let i = 0; i < arr.length; i++) {
    let url = arr[i].img
    let arr2 = url.split('/')
    let name = arr2[arr2.length - 1]
    options.uri = url
    await sleep(100)
    console.log(url, i + '----' + name)
    arr[i].data = await downloadUrl(options, name)
    if (arr[i].data !== true) {
      num++
      errUrl.push({
        url, name
      })
    }
  }

  log({errUrl: errUrl, msg: '统计 '+ num})
  return true
}

const fn_image = async (ctx, next) => {
  let R = await image()
}

fn_image()
