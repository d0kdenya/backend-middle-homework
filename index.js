#!/usr/bin/env node
const readline = require('readline')
const {
  stdin: input,
  stdout: output
} = require('process')

const rl = readline.createInterface({ input, output })

const randomNum = limit => {
  return Math.floor(Math.random() * limit + 1)
}

const lim = 100
const riddleNum = randomNum(lim)

console.log(`riddleNum: ${ riddleNum }`)
console.log(`Загадано число в диапазоне от 0 до ${ lim }`)

rl.on('line', answer => {
  if (Number(answer) === riddleNum) {
    console.log(`Отгадано число ${ riddleNum }!`)
    rl.close()
  } else {
    if (Number(answer) < riddleNum) {
      console.log('Больше!')
    } else {
      console.log('Меньше!')
    }
  }
})