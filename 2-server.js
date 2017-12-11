let fs = require('fs')
let http = require('http')
let server = http.createServer((req, res) => {
  console.log(req.url) // Get the url property from the request object
  // if the url property is the root
  if (req.url === '/') {
    // set the Content-Type header to text/html
    res.setHeader('Content-Type', 'text/html')
    // use fs to read local file index.html, and pipe to the response object
    fs.createReadStream('index.html').pipe(res)
  }
  // if the url property is /bear
  if (req.url === '/bear') {
    // set the content type using the http response objects .setHeader() method
    res.setHeader('Content-Type', 'text/html')
    // use the response objects .end() to respond with arbitrary html
    res.end('<strong>Obligatory bear!</strong>')
  }
})
// let client = http.createClient()

server.listen(8080, () => {
  console.log('listening on port 8080.')
})
