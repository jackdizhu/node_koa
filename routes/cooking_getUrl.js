// const router = require('koa-router')()

// router.prefix('/cookingStyle')

const fs = require("fs");
const path = require('path')
const _request = require("request");
const request = require("request-promise");
const cheerio = require("cheerio");
const userAgents = require('../com/userAgents')
const cooking = require('../com/cooking')
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
  let text = $(".gopage").text().replace(/^[^/]([0-9]+)[^/]+/g, '$1')
  text = Number(text) || 1
  let _arr = []
  for (let i = 0; i < text; i++) {
    _arr.push(options.uri + '?&page=' + (i + 1))
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
  const url = 'https://www.meishij.net/china-food/caixi/'
  for (let i = 0; i < cooking.length; i++) {
    cooking[i].urlData = cooking[i].urlData || []
    options.uri = url + cooking[i].value + '/'
    cooking[i].urlData.push(options.uri)
    await sleep(1000)
    let arr = await getData(options, cooking[i])
    cooking[i].urlData.push(...arr)
  }
  return cooking
}

const fn_index = async () => {
  let R = await index()
  log(R)
}

fn_index()
