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

const getDataDetails = async function (options, item) {
  const body = await request(options)
  if (!body) {
    return {}
  }
  let $ = cheerio.load(body)
  let cp_body = $(".cp_body")
  let cp_header = $(".cp_header")
  // 标签
  let tags = []
  let tagsArr = cp_header.find('.yj_tags dt')
  for (let i = 0; i < tagsArr.length; i++) {
    if ($(tagsArr[i]).text()) {
      tags.push($(tagsArr[i]).text())
    }
  }
  item.tags = tags

  // 描述
  let describe = cp_body.find('.materials>p').text().replace(/(^“)|(”$)/g, '')
  item.describe = describe

  // 难度
  let difficulty = cp_header.find('a#tongji_nd').text()
  item.difficulty = difficulty

  // 人数
  let peopleNum = cp_header.find('a#tongji_rsh').text()
  item.peopleNum = peopleNum

  // 准备时间
  let preparationTime = cp_header.find('a#tongji_zbsj').text()
  item.preparationTime = preparationTime

  // 烹饪时间
  let cookingTime = cp_header.find('a#tongji_prsj').text()
  item.cookingTime = cookingTime

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

  item.praise = Mock.mock('@float(60, 100, 2, 2)%')
  item.evaluate = Mock.mock('@integer(500, 900)')

  console.log(item.name, 111)
  await cookingModel.update(item)

  return item
}

const getDataDetails2 = async function (options, item) {
  const body = await request(options)
  if (!body) {
    return {}
  }
  let $ = cheerio.load(body)
  let divEl = $('.main-content .lemma-summary .para')
  if (divEl.length) {
    let desc = $(divEl[0]).text().replace(/\[[0-9]+\]/, '')
    item.describe = desc
    await cookingModel.update(item)
  }

  console.log(item.name, 111)
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
      "Host":"baike.baidu.com",
      "Referer":"https://baike.baidu.com",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent": userAgents[parseInt(Math.random() * userAgents.length)],
      "Cookie": 'BIDUPSID=02D04BA73A366C706538BD7F1DAE1E48; PSTM=1534814291; BAIDUID=B376CFFF43F83D2F7DD886ADF10B6313:FG=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; PSINO=6; H_PS_PSSID=1461_21088_26350_26925_20930; pgv_pvi=3591413760; pgv_si=s6803510272; Hm_lvt_55b574651fcae74b0a9f1cf9c8d7c93a=1535361709,1535361752; Hm_lpvt_55b574651fcae74b0a9f1cf9c8d7c93a=1535362347'
    }
  }
  // 获取描述数据
  let query = {'describe': ''}
  // 部分获取数据异常 单独处理
  // let query = {$where: "this.difficulty=='' || this.cookingTime==''"}

  let arr = await cookingModel.find(query)
  let count = await cookingModel.find(query).count()
  console.log(count, 111)

  if (!arr || !arr.length) {
    console.log(query, '查询无结果')
    return 0
  }
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i]
    let url = item.target
    encodeURI(item.name)
    options.uri = 'https://baike.baidu.com/item/' + encodeURI(item.name)

    await sleep(100)
    // await cookingModel.update(item)
    await getDataDetails2(options, item)
  }
}

const fn_details = async (ctx, next) => {
  await details()
}

fn_details()
