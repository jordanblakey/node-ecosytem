// CHILD_PROCESS CREATION METHODS //////////////////////////////////////////////
const { spawn, exec, fork, execFile } = require('child_process')
// The spawn function launches a command in a new process and we can use it to
// pass that command any arguments. For example, here’s code to spawn a new
// process that will execute the pwd command.
const child = spawn('pwd')
child.on('exit', function(code, signal) {
  console.log(
    'child process exited with ' + `code ${code} and signal ${signal}`
  )
})

// EVENTS //////////////////////////////////////////////////////////////////////
// The 'exit' event is emitted when execution completes.
// The 'disconnect' event is emitted when the parent process
// manually calls the child.disconnect function.
// The 'error' event is emitted if the process could not be spawned
// or killed. The 'close' event is emitted when the stdio streams of a
// child process get closed.

// The 'message' event is the most important one. It’s emitted when the child
// process uses the process.send() function to send messages. This is how
// parent/child processes can communicate with each other.
// We’ll see an example of this below.

// STREAMS /////////////////////////////////////////////////////////////////////
// Every child process also gets the three standard stdio streams:
// child.stdin, child.stdout, and child.stderr.
child.stdout.on('data', data => {
  console.log(`child stdout:\n${data}`)
})
child.stderr.on('data', data => {
  console.error(`child stderr:\n${data}`)
})

const child2 = spawn('find', ['./output', '-type', 'f'])
child2.on('exit', function(code, signal) {
  console.log(
    'child process exited with ' + `code ${code} and signal ${signal}`
  ) // Exits with code 1: error occured
})
child2.stdout.on('data', data => {
  console.log(`child2 stdout:\n${data}`)
})
child2.stderr.on('data', data => {
  console.error(`child2 stderr:\n${data}`)
})

// PIPES /////////////////////////////////////////////////////////////////////
// Takes the processes stdin and pipes it to the child
const child3 = spawn('wc')
process.stdin.pipe(child3.stdin)
child3.stdout.on('data', data => {
  console.log(`child3 stdout:\n${data}`)
})

// We can also pipe the standard input/output of multiple processes on each
// other, just like we can do with Linux commands. For example, we can pipe the
// stdout of the find command to the stdin of the wc command to count all the
// files in the current directory:
const find = spawn('find', ['.', '-type', 'f'])
const wc = spawn('wc', ['-l'])
find.stdout.pipe(wc.stdin)
wc.stdout.on('data', data => {
  console.log(`Number of files ${data}`)
})

exec('find . -type f | wc -l', (err, stdout, sterr) => {
  if (err) {
    console.error(`exec error: ${err}`)
    return
  }
  console.log(`Number of files ${stdout}`)
})

// MORE SPAWN EXAMPLES ////////////////////////////////////////////////////////
const child4 = spawn('find . -type f | wc -l', {
  // Count files in Downloads/
  stdio: 'inherit',
  shell: true,
  cwd: '/home/invisible/Downloads'
})

const child5 = spawn('node', ['input/timer.js'], {
  // Parent can exit leaving this
  detached: true,
  stdio: 'ignore'
})
child.unref()

const child6 = spawn('echo $ANSWER', {
  // Take in an env variable
  stdio: 'inherit',
  shell: true,
  env: { ANSWER: 42 }
})

// FORK EXAMPLES ///////////////////////////////////////////////////////////////
const forked = fork('input/child.js')

forked.on('message', msg => {
  console.log('Message from child', msg)
})

forked.send({ hello: 'world' })
