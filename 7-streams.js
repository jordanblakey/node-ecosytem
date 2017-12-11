
const fs = require('fs')

// Seems that Buffers move through Streams

// Buffer class ////////////////////////////////////////////////////////////////
// const bears = fs.createReadStream('input/bears.txt')
//
// bears.on('data', function(data) {
  //   console.log(typeof data); // Says object, but is a Buffer
  //   console.log(data instanceof Buffer); // true
  //   console.log(data); // Raw buffer (each hex chunk is a character 0-255)
  //   console.log(data[2]); // each chunk of the Buffer as base 10
  //   let arr = []
  //   data.map(x => arr.push(x))
  //   console.log(arr)
  //   console.log(data.toString());
// })

// STREAMS & PIPES /////////////////////////////////////////////////////////////

// const bears2 = fs.createReadStream('input/bears.txt')
// const actualbears = fs.createWriteStream('output/actualbears.txt')
// bears2.pipe(process.stdout) // pipe the buffer directly to stdout
// bears2.pipe(actualbears)


// STREAMS /////////////////////////////////////////////////////////////////////
const stream = require('stream')
const inherits = require('util').inherits

function ActualBears() {
  stream.Transform.call(this)
}
inherits(ActualBears, stream.Transform)

const read = fs.createReadStream('input/bears.txt')
const write = fs.createWriteStream('output/actualbears.txt')

ActualBears.prototype._transform = function(chunk, enc, done) {
  chunk = chunk.toString().split('\n').filter(function(bear) {
    return (bear !== 'koala')
  }).join('\n')
  this.push(chunk)
  done()
}

read.pipe(new ActualBears()).pipe(write)