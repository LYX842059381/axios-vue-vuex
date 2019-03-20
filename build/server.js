
const express = require('express')
const app = express()

// Serve the files on port 3001.
app.get('/', (req, res) => {
  console.log('app listening on port 3001!\n')
  res.send('哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈')
})

app.listen(3001)