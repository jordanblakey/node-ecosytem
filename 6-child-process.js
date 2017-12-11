
const fs = require('fs')
const c = console.log

// __FILENAME __DIRNAME ////////////////////////////////////////////////////////
// process.stderr
// process.stdout
// process.stdin
// c(__filename) // full path including file this is called from
// c(__dirname) // full path to file this is called from

// const msg = 'This is a stdout message.'
// process.stdout.write(msg + '\n')


// FS.CREATEREADSTREAM /////////////////////////////////////////////////////////
// fs.createReadStream(__filename)
//   .pipe(process.stdout) // Reads this file and pipes it to stdout

// setTimeout(function() {
//   process.stdout.write('Hooray bears!')
// }, 1000)

// let count = 0
// setInterval(function() {
//   c('Interval elpased...' + count++)
//   if (count > 10) {
//     process.exit()
//   }
// }, 100)


// CHILD_PROCESS.EXEC //////////////////////////////////////////////////////////
// const exec = require('child_process').exec
// exec('cat 2-server.js', function(err, stdout, stderr) {
//   console.log('we got our catted file', stdout)
//   setInterval(function() {
//     c('running the child process...' + count++ )
//   }, 100)
//   console.log(err)
// })

// CHILD_PROCESS.SPAWN /////////////////////////////////////////////////////////
// const spawn = require('child_process').spawn
// if (process.argv[2] === 'child') {
//   console.log('I\'m inside the child')
// } else {
//   let child = spawn(process.execPath, [__filename, 'child'])
//   // child.stdout.on('data', function(data) {
//   //   console.log('Printed by child.stdout.on listener:', data.toString())
//   // })

//   // child.stdout.pipe(process.stdout)
//      stdio: 'inherit'
//   }
// }

// CHILD_PROCESS.SPAWN W/ PIPE /////////////////////////////////////////////////
const childProcess = require('child_process')

let bears = 0
bears += 1

if (process.argv[2] === 'child') {
  let net = require('net')
  let pipe = new net.Socket({ fd: 3 })
  pipe.write('killme')
  console.log('child', bears)
} else {
  let child = childProcess.spawn(process.execPath, [__filename, 'child'], {
    stdio: [null, null, null, 'pipe']
  })
  child.stdio[3].on('data', function(data) {
    if (data.toString() === 'killme') {
      console.log('RIP')
      child.kill()
    }
  })
  // console.log('parent', bears)
}
