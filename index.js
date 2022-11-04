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
const columns = ['TEAM NAMES', 'Series Number', 'Filename', 'Name', 'Description', 'Gender', 'Attributes', 'UUID', 'SHA256 Hash']
const stringifier = stringify({
  header: true,
  columns: columns,
}).setMaxListeners(0)

function generateJSONAndCSVOutput(csvFileName) {
  let currentTeamName = ''
  fs.createReadStream(`./csv/${csvFileName}`)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      let data = fs.readFileSync('example.json')
      let parsedData = JSON.parse(data)

      if (row[0].length > 1) {
        currentTeamName = row[0]
      }

      parsedData.minting_tool = currentTeamName
      parsedData.series_number = row[1]
      parsedData.series_total = 420
      parsedData.name = row[3]
      parsedData.description = row[4]
      parsedData.attributes.push({ "trait_type": "gender", "value": row[5] })

      let attributes = row[6]
      attributes = attributes.split(';')

      for (let attribute of attributes) {
        let contents = attribute.split(':')
        let obj = {}
        obj.trait_type = contents[0].trim()
        obj.value = String(contents[1]).trim()
        parsedData.attributes.push(obj)
      }

      fs.open(generateJSONFilePath(row[2]), 'w', (err) => {
        if (err) {
          console.log(err)
          return
        }
        fs.writeFileSync(
          generateJSONFilePath(row[2]),
          JSON.stringify(parsedData),
          (err) => {
            if (err) {
              console.log(err)
              return
            }
          }
        )

        const buffer = fs.readFileSync(generateJSONFilePath(row[2]))
        const hash = createJSONSha256Hash(buffer)
        row.push(hash)
        stringifier.write(row)
      })
    })
    .on('end', function () {
      console.log('✔ Done')
    })
    .on('error', function (error) {
      console.log(error.message)
    })
    stringifier.pipe(writableStream)
}

module.exports = generateJSONAndCSVOutput
