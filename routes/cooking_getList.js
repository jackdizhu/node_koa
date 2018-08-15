// const router = require('koa-router')()

// router.prefix('/cookingStyle')

const fs = require("fs");
const path = require('path')
const _request = require("request");
const request = require("request-promise");
const cheerio = require("cheerio");
const userAgents = require('../com/userAgents')
const cookingUrl = require('../com/cookingUrl')
const cookingData = require('../com/cookingData')
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

const getData = async function (options, item) {
  const body = await request(options)
  let $ = cheerio.load(body)
  let arr = $("#listtyle1_list .listtyle1")
  let _arr = []
  for (let i = 0; i < arr.length; i++) {
    // console.log($(arr[i]).find('img').attr('alt'))
    let img = $(arr[i]).find('img')
    let a = $(arr[i]).find('a')
    let _obj = {
      type: item.value,
      typeName: item.name,
      name: img.attr('alt'),
      img: img.attr('src'),
      target: a.attr('href')
    }
    console.log(img.attr('alt'), 111)
    // 数据保存到数据库
    await cookingModel.insert(_obj)
    _arr.push(_obj)
  }

  return _arr
}

const index = async function (ctx, next) {
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
      "User-Agent": userAgents[parseInt(Math.random() * userAgents.length)]
    }
  }
  for (let i = 0; i < cookingUrl.length; i++) {
    let arr = cookingUrl[i].urlData
    for (let j = 0; j < arr.length; j++) {
      options.uri = arr[j]
      await sleep(1000)
      await getData(options, cookingUrl[i])
    }
  }
}

const fn_index = async () => {
  await index()
}

fn_index()
