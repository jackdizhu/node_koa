// const router = require('koa-router')()

// router.prefix('/cookingStyle')

const fs = require("fs");
const path = require('path')
const _request = require("request");
const request = require("request-promise");
const cheerio = require("cheerio");
const userAgents = require('../com/userAgents')
const cookingUrl = require('../com/cookingUrl')
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

const getDataDetails = async function (options, item) {
  const body = await request(options)
  if (!body) {
    return {}
  }
  let $ = cheerio.load(body)
  let cp_body = $(".cp_body")
  // 标签
  let tags = []
  let arr = cp_body.find('.yj_tags dt')
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].text()) {
      tags.push(arr[i].text())
    }
  }
  // 描述
  let describe = cp_body.find('.materials>p').text()
  // 难度
  let difficulty = cp_body.find('#tongji_nd').text()
  // 人数
  let peopleNum = cp_body.find('#tongji_rsh').text()
  // 准备时间
  let peopleNum = cp_body.find('#tongji_zbsj').text()
  // 烹饪时间
  let peopleNum = cp_body.find('#tongji_prsj').text()

  // 主料
  let mainMaterial = []
  let arr = cp_body.find('.yl.zl .clearfix li')
  for (let i = 0; i < arr.length; i++) {
    mainMaterial.push($(arr[i]).text().replace(/(^\s*\n*)|(\s*\n*$)/g, ""))
  }
  // 辅料
  let auxiliaryMaterials = []
  let arr2 = cp_body.find('.yl.fuliao .clearfix li')
  for (let i = 0; i < arr2.length; i++) {
    auxiliaryMaterials.push($(arr2[i]).text().replace(/(^\s*\n*)|(\s*\n*$)/g, ""))
  }
  // 做法
  let cookingMethod = []
  if (cp_body.find('.measure .edit .content').length) {
    let arr3 = cp_body.find('.measure .edit .content')
    for (let i = 0; i < arr3.length; i++) {
      let text = $(arr3[i]).find('p').text().replace(/[0-9]+[.、]?/, '').replace(/(^\s*\n*)|(\s*\n*$)/g, "")
      if (text) {
        cookingMethod.push(text)
      }
    }
  } else {
    let arr3 = cp_body.find('.measure .edit p')
    for (let i = 0; i < arr3.length; i++) {
      let text = $(arr3[i]).text().replace(/[0-9]+[.、]?/, '').replace(/(^\s*\n*)|(\s*\n*$)/g, "")
      if (text) {
        cookingMethod.push(text)
      }
    }
  }
  let obj = {
    mainMaterial: mainMaterial,
    auxiliaryMaterials: auxiliaryMaterials,
    cookingMethod: cookingMethod
  }
  item.data = obj
  console.log(item.name, 111)
  await cookingModel.update(item)

  return item
}

const details = async function (ctx, next) {
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

  let arr = await cookingModel.find({'data': undefined}).limit(10000)
  // let arr = await cookingModel.find().count()
  // console.log(arr, 123)

  if (!arr || !arr.length) {
    console.log({'data': undefined}, '查询无结果')
    return 0
  }
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    let url = item.target
    options.uri = url
    await sleep(100)
    await getDataDetails(options, item)
  }
}

const fn_details = async (ctx, next) => {
  await details()
}

fn_details()
