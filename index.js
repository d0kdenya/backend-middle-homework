#!/usr/bin/env node
require('dotenv').config()

const http = require('http')
const myAPIKEY = process.env.myAPIKEY;
let country = process.argv[2];

if (process.argv.length === 2) {
  country = 'Moscow'
} else {
  for (let i = 2; i < process.argv.length; i++) {
    country += '%20' + process.argv[i]
  }
}
const url = `http://api.weatherstack.com/current?access_key=${ myAPIKEY }&query=${ country }`

http.get(url, res => {
  const { statusCode } = res
  if (statusCode !== 200) {
    console.log(`statusCode: ${ statusCode }`)
    return 0
  }
  res.setEncoding('utf8')

  let rowData = ''

  res.on('data', chunk => rowData += chunk)
  res.on('end', () => {
    let parseData = JSON.parse(rowData)
    console.log(parseData)
  })
}).on('error', err => {
  console.log(err)
})
