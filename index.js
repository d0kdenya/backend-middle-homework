#!/usr/bin/env node
const readline = require('readline')
const fs = require('fs')
const {
  stdin: input,
  stdout: output
} = require('process')

const rl = readline.createInterface({ input, output })

const randomNum = () => {
  return Math.floor(Math.random() * 2 + 1)
}

if (!process.argv[2]) {
  console.log('Имя файла для логирования результатов каждой партии не задано!')
} else {
  const fileName = process.argv[2]
  console.log(`Угадайте случайное число (1 или 2):`)
  rl.on('line', answer => {
    const num = randomNum()
    if (Number(answer) === num) {
      console.log(`Отгадано число ${ num }!`)
      fs.appendFile(fileName, `Загадано число: ${ num } - WIN\n`, function(error) {
        if (error) throw error;
      })
      rl.close()
    } else {
      console.log('Не угадал!\n\nУгадайте случайное число (1 или 2):')
      fs.appendFile(fileName, `Загадано число: ${ num } - LOSE\n`, function(error) {
        if (error) throw error;
      })
    }
  })
}