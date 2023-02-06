#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const argv = yargs(hideBin(process.argv))
  .option('year', {
    alias: "y",
    type: "integer",
    description: "print current year",
    default: 1
  })
  .option('month', {
    alias: "m",
    type: "integer",
    description: "print current month",
    default: 1
  })
  .option('date', {
    alias: "d",
    type: "integer",
    description: "print current date",
    default: 1
  })
  .argv

switch (process.argv[2]) {
  case 'current': {
    const date = new Date()
    if (process.argv[3] === '--year' || process.argv[3] === '-y') {
      console.log(`Текущий год: ${ date.getFullYear() }`)
    } else if (process.argv[3] === '--month' || process.argv[3] === '-m') {
      console.log(`Текущий месяц: ${ date.getMonth() + 1 }`)
    } else if (process.argv[3] === '--date' || process.argv[3] === '-d') {
      console.log(`Текущий день: ${ date.getDate() }`)
    } else {
      console.log(`Текущая дата: ${ date.toISOString() }`)
    }
    break
  }
  case 'add': {
    let date = new Date()
    if (process.argv[3] === '--year' || process.argv[3] === '-y') {
      console.log(`Текущий год: ${ new Date(date.setFullYear(Number(date.getFullYear()) + Number(process.argv[4]))).toISOString() }`)
    } else if (process.argv[3] === '--month' || process.argv[3] === '-m') {
      console.log(`Текущий месяц: ${ new Date(date.setMonth(Number(date.getMonth()) + Number(process.argv[4]))).toISOString() }`)
    } else if (process.argv[3] === '--date' || process.argv[3] === '-d') {
      console.log(`Текущий день: ${ new Date(date.setDate(Number(date.getDate()) + Number(process.argv[4]))).toISOString() }`)
    } else {
      console.log(`Текущая дата: ${ date.toISOString() }`)
    }
    break
  }
  case 'sub': {
    let date = new Date()
    if (process.argv[3] === '--year' || process.argv[3] === '-y') {
      console.log(`Текущий год: ${ new Date(date.setFullYear(Number(date.getFullYear()) - Number(process.argv[4]))).toISOString() }`)
    } else if (process.argv[3] === '--month' || process.argv[3] === '-m') {
      console.log(`Текущий месяц: ${ new Date(date.setMonth(Number(date.getMonth()) - Number(process.argv[4]))).toISOString() }`)
    } else if (process.argv[3] === '--date' || process.argv[3] === '-d') {
      console.log(`Текущий день: ${ new Date(date.setDate(Number(date.getDate()) - Number(process.argv[4]))).toISOString() }`)
    } else {
      console.log(`Текущая дата: ${ date.toISOString() }`)
    }
    break
  }
}