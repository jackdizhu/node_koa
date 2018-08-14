// const router = require('koa-router')()

// router.prefix('/cookingStyle')

const fs = require("fs");
const path = require('path')
const _request = require("request");
const request = require("request-promise");
const cheerio = require("cheerio");
const cookingData = require('../com/cookingData')

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

let cooking = [
  {
    "name": "川菜",
    "value": "chuancai"
  },
  {
    "name": "湘菜",
    "value": "xiangcai"
  },
  {
    "name": "粤菜",
    "value": "yuecai"
  },
  {
    "name": "东北菜",
    "value": "dongbeicai"
  },
  {
    "name": "鲁菜",
    "value": "lucai"
  },
  {
    "name": "浙菜",
    "value": "zhecai"
  },
  {
    "name": "苏菜",
    "value": "sucai"
  },
  {
    "name": "清真菜",
    "value": "qingzhencai"
  },
  {
    "name": "闽菜",
    "value": "mincai"
  },
  {
    "name": "沪菜",
    "value": "hucai"
  },
  {
    "name": "京菜",
    "value": "jingcai"
  },
  {
    "name": "湖北菜",
    "value": "hubeicai"
  },
  {
    "name": "徽菜",
    "value": "huicai"
  },
  {
    "name": "豫菜",
    "value": "yucai"
  },
  {
    "name": "西北菜",
    "value": "xibeicai"
  },
  {
    "name": "云贵菜",
    "value": "yunguicai"
  },
  {
    "name": "江西菜",
    "value": "jiangxicai"
  },
  {
    "name": "山西菜",
    "value": "shanxicai"
  },
  {
    "name": "广西菜",
    "value": "guangxicai"
  },
  {
    "name": "港台菜",
    "value": "gangtaicai"
  },
  {
    "name": "其它菜",
    "value": "qitacai"
  }
]

const userAgents = [
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Acoo Browser; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7 Safari/535.20',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.71 Safari/537.1 LBBROWSER',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET CLR 2.0.50727; Media Center PC 6.0) ,Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; QQDownload 732; .NET4.0C; .NET4.0E)',
  'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0b13pre) Gecko/20110307 Firefox/4.0b13pre',
  'Opera/9.80 (Macintosh; Intel Mac OS X 10.6.8; U; fr) Presto/2.9.168 Version/11.52',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.0.12) Gecko/20070731 Ubuntu/dapper-security Firefox/1.5.0.12',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; LBBROWSER)',
  'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.8) Gecko Fedora/1.9.0.8-1.fc10 Kazehakase/0.5.6',
  'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/527+ (KHTML, like Gecko, Safari/419.3) Arora/0.6',
  'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; QQBrowser/7.0.3698.400)',
  'Opera/9.25 (Windows NT 5.1; U; en), Lynx/2.8.5rel.1 libwww-FM/2.14 SSL-MM/1.4.1 GNUTLS/1.2.9',
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
]

// cooking = [
//   {
//     "name": "川菜",
//     "value": "chuancai"
//   }
// ]

const sleep = function (ms) {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve()
      }, ms)
  })
}

const getData = async function (options) {
  const body = await request(options)
  let $ = cheerio.load(body)
  let arr = $("#listtyle1_list .listtyle1")
  let _arr = []
  for (let i = 0; i < arr.length; i++) {
    // console.log($(arr[i]).find('img').attr('alt'))
    let img = $(arr[i]).find('img')
    let a = $(arr[i]).find('a')
    let _obj = {
      name: img.attr('alt'),
      img: img.attr('src'),
      target: a.attr('href')
    }
    _arr.push(_obj)
  }

  return _arr
}
const getDataDetails = async function (options) {
  const body = await request(options)
  if (!body) {
    return {}
  }
  let $ = cheerio.load(body)
  let cp_body = $(".cp_body")
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

  return obj
}
const downloadUrl = async function (options, name) {
  var filename = path.resolve(__dirname, '../log/' + name)
  await _request(options.uri).pipe(fs.createWriteStream(filename))
  return true
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
    options.uri = url + cooking[i].value + '/'
    await sleep(1000)
    cooking[i].data = await getData(options)
  }
  return cooking
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
  for (let i = 0; i < cookingData.length; i++) {
    let arr = cookingData[i].data
    for (let i = 0; i < arr.length; i++) {
      const url = arr[i].target
      options.uri = url
      await sleep(100)
      console.log(url)
      arr[i].data = await getDataDetails(options)
    }
  }
  return cookingData
}
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
      "User-Agent": userAgents[parseInt(Math.random() * userAgents.length)]
    }
  }
  let num = 0
  for (let i = 0; i < cookingData.length; i++) {
    let arr = cookingData[i].data
    num += arr.length
    for (let i = 0; i < arr.length; i++) {
      let url = arr[i].img
      let arr2 = url.split('/')
      let name = arr2[arr2.length - 1]
      options.uri = url
      await sleep(100)
      console.log(url, name)
      arr[i].data = await downloadUrl(options, name)
    }
  }
  console.log(num, '统计')
  return cookingData
}

const fn_index = async () => {
  let R = await index()
  log(R)
}

const fn_details = async (ctx, next) => {
  let R = await details()
  log(R)
}
const fn_image = async (ctx, next) => {
  let R = await image()
  log(R)
}

fn_details()
