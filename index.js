const fs = require('fs')
const path = require('path')
const { parse } = require('csv-parse')
const { stringify } = require('csv-stringify')
const outputCSV = './csv/all-teams.output.csv'
const createJSONSha256Hash = require('./hash')


function generateJSONFilePath(filename) {
  const jsonFilePath = path.join(
    __dirname,
    'chip-0007-json',
    `${filename}.json`
  )
  return jsonFilePath
}

const writableStream = fs.createWriteStream(outputCSV).setMaxListeners(0)
const columns = ['Serial Number', 'Filename', 'UUID', 'SHA256 JSON Hash']
const stringifier = stringify({ header: true, columns: columns }).setMaxListeners(0)

function generateJSONAndCSVOutput(csvFileName) {
  fs.createReadStream(`./csv/${csvFileName}`)
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    let data = fs.readFileSync('example.json')
    let parsedData = JSON.parse(data)

    parsedData.series_number = row[0]
    parsedData.name = row[1]
    parsedData.collection.id = row[2]

    fs.open(generateJSONFilePath(row[1]), 'w', (err) => {
      if (err) {
        console.log(err)
        return
      }
      fs.writeFileSync(
        generateJSONFilePath(row[1]),
        JSON.stringify(parsedData),
        (err) => {
          if (err) {
            console.log(err)
            return
          }
        }
      )

      const buffer = fs.readFileSync(generateJSONFilePath(row[1]))
      const hash = createJSONSha256Hash(buffer)
      row.push(hash)
      stringifier.write(row)
      stringifier.pipe(writableStream)
    })
  })
  .on('end', function () {
    console.log('finished')
  })
  .on('error', function (error) {
    console.log(error.message)
  })
}

module.exports = generateJSONAndCSVOutput
