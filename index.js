#!/usr/bin/env node
const fs = require('fs')

let logPath
let fileContent
let winCount = 0
let loseCount = 0

if (!process.argv[2]) {
  logPath = 'logs.txt'
} else {
  logPath = process.argv[2]
}
fs.readFile(logPath, 'utf8', function (error, data) {
  if (error) throw error
  fileContent = data.split('\n')

  fileContent.forEach(str => {
    if (str.substring(str.lastIndexOf(' ')).trim() === 'LOSE') {
      loseCount++;
    } else {
      winCount++;
    }
  })
  console.log(`Общее количество партий: ${ fileContent.length }`)
  console.log(`Количество выигранных / проигранных партий: ${ winCount } / ${ loseCount }`)
  console.log(`Процентное соотношение выигранных партий: ${ (winCount / fileContent.length) }`)
})