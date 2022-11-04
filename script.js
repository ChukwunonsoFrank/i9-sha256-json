#!/usr/bin/env node

const fs = require('fs')
const main = require('./index')
const readline = require('readline')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Enter a team CSV filename: ',
})

rl.prompt()

rl.on('line', (line) => {
  switch (line.trim()) {
    case 'exit':
      rl.close()
      break
    default:
      fs.readFileSync(path.join(__dirname, 'csv', `${line}`), 'utf8')
      main(line)
      console.log(
        `✔ Successfully generated SHA256 JSON Hash and CSV output at: ${path.join(
          __dirname,
          './csv/all-teams.output.csv'
        )}`
      )
      rl.close()
      break
  }
})
