# Node Ecosystem

## Core Packages

```js
const stream = require('stream') // Streams, buffers, pipes
const fs = require('fs') // File system tools
const util = require('util') // ???
const nodemon = require('nodemon') // Process monitoring
const forever = require('forever') // Resilient processes
```

### Frameworks

```js
const app = require('express') // Web application framework
const lb = require('loopback') // API creation framework
```

### Server/Client

```js
const bodyParser = require('body-parser') // Process forms and other HTTP requests
const http = require('http') // Basic http requests
const axios = require('axios') // Client side requests
const fetch = require('node-fetch') // Client side requests
const socketio = require('socket-io')
```

### Templating

```js
const handlebars = require('handlebars') // Drop in HTML templating. Features.
const pug = require('pug') // Abbreviated HTML syntax + templating. Performant.
```

### DB Drivers & ORM

```js
const postgres = require('pg')
const sequelize = require('sequelize')

const mongodb = require('mongodb')
const mongoose = require('mongoose')

const redis = require('ioredis')

```

### Testing/Security

```js
const jest = require('jest')
const snyk = require('snyk')
```

### Utilities

```js
const joi = require('joi') // Object schema description language and validator
const passport = require('pasport') // Simple authentication
const nodemailer = require('nodemailer') // Simple email handler
const moment = require('moment') // Timestamp utility
const bunyan = require('bunyan') // Logger utility
const execa = require('execa') // Execute shell commands
const globby = require('globby') // Glob files
const del = require('del') // Deletion
const rimraf = require('rimraf') // Recursive deletion
const cpy = require('cpy') // Copy Files
const chokidar = require('chokidar') // Filesystem watcher
```

### Fun Packages

```js
const ora = require('ora')
const cliSpinners = require('cli-spinners')
const listr = require('listr')
```

## Useful shell commands

```sh
# Find node processes occupying ports
sudo netstat -tulpn | grep /node

# Find all node processes
ps | grep node

# Kill the process you want
kill 6193

# Directly find and kill
kill (ps aux | grep '2-server.js' | awk '{print $2}')
```

## Forever (auto restarting process manager)

Start a resilient process

```sh
yarn global add forever
forever 2-server.js # Start a resilient process with forever
forever stop 2-server.js # Stop a process started by forever
forever stopall # Stop all processes started by forever
```

Run a script on boot

```sh
> vi /etc/rc.local # This file runs on boot (Good for server config)
# then, add the line
forever /etc/www/example/2-server.js
```

## NodeJS Process Model

``` js
let c = console.log
let time = []


// SYSTEM
// c(process)
// c(process.config) // configuration for NodeJS
// c(process.release) // node distribution source
// c(process.version) // node version
// c(process.versions) // node version and versions of its dependencies
// c(`This processor architecture is ${process.arch}`) // 32bit, 64, etc. Chip architechture
// c(process.platform) // OS type
// c(process.env) // env variables array
// c(`Current gid: ${process.getgid()}`) // Group ID
// c(`Current uid: ${process.getuid()}`) // User ID
// c(process.pid) // Process Id
// c(process.title) // name of the process

// I/O
// c(process.stdout)
// c(process.stdin)
// c(process.stderr)


// SIGNALS
// SIGUSR1 is reserved by Node.js to start the debugger. It's possible to install a listener but doing so will not stop the debugger from starting.
// SIGTERM and SIGINT have default handlers on non-Windows platforms that resets the terminal mode before exiting with code 128 + signal number. If one of these signals has a listener installed, its default behavior will be removed (Node.js will no longer exit).
// SIGPIPE is ignored by default. It can have a listener installed.
// SIGHUP is generated on Windows when the console window is closed, and on other platforms under various similar conditions, see signal(7). It can have a listener installed, however Node.js will be unconditionally terminated by Windows about 10 seconds later. On non-Windows platforms, the default behavior of SIGHUP is to terminate Node.js, but once a listener has been installed its default behavior will be removed.
// SIGTERM is not supported on Windows, it can be listened on.
// SIGINT from the terminal is supported on all platforms, and can usually be generated with CTRL+C (though this may be configurable). It is not generated when terminal raw mode is enabled.
// SIGBREAK is delivered on Windows when <Ctrl>+<Break> is pressed, on non-Windows platforms it can be listened on, but there is no way to send or generate it.
// SIGWINCH is delivered when the console has been resized. On Windows, this will only happen on write to the console when the cursor is being moved, or when a readable tty is used in raw mode.
// SIGKILL cannot have a listener installed, it will unconditionally terminate Node.js on all platforms.
// SIGSTOP cannot have a listener installed.
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised artificially using kill(2), inherently leave the process in a state from which it is not safe to attempt to call JS listeners. Doing so might lead to the process hanging in an endless loop, since listeners attached using process.on() are called asynchronously and therefore unable to correct the underlying problem.

// EXIT CODES
// Node.js will normally exit with a 0 status code when no more async operations are pending. The following status codes are used in other cases:
// 1 Uncaught Fatal Exception - There was an uncaught exception, and it was not handled by a domain or an 'uncaughtException' event handler.
// 2 - Unused (reserved by Bash for builtin misuse)
// 3 Internal JavaScript Parse Error - The JavaScript source code internal in Node.js's bootstrapping process caused a parse error. This is extremely rare, and generally can only happen during development of Node.js itself.
// 4 Internal JavaScript Evaluation Failure - The JavaScript source code internal in Node.js's bootstrapping process failed to return a function value when evaluated. This is extremely rare, and generally can only happen during development of Node.js itself.
// 5 Fatal Error - There was a fatal unrecoverable error in V8. Typically a message will be printed to stderr with the prefix FATAL ERROR.
// 6 Non-function Internal Exception Handler - There was an uncaught exception, but the internal fatal exception handler function was somehow set to a non-function, and could not be called.
// 7 Internal Exception Handler Run-Time Failure - There was an uncaught exception, and the internal fatal exception handler function itself threw an error while attempting to handle it. This can happen, for example, if a 'uncaughtException' or domain.on('error') handler throws an error.
// 8 - Unused. In previous versions of Node.js, exit code 8 sometimes indicated an uncaught exception.
// 9 - Invalid Argument - Either an unknown option was specified, or an option requiring a value was provided without a value.
// 10 Internal JavaScript Run-Time Failure - The JavaScript source code internal in Node.js's bootstrapping process threw an error when the bootstrapping function was called. This is extremely rare, and generally can only happen during development of Node.js itself.
// 12 Invalid Debug Argument - The --inspect and/or --inspect-brk options were set, but the port number chosen was invalid or unavailable.
// >128 Signal Exits - If Node.js receives a fatal signal such as SIGKILL or SIGHUP, then its exit code will be 128 plus the value of the signal code. This is a standard POSIX practice, since exit codes are defined to be 7-bit integers, and signal exits set the high-order bit, and then contain the value of the signal code. For example, signal SIGABRT has value 6, so the expected exit code will be 128 + 6, or 134.


// c(process.addListener('beforeExit', function(){console.log('EXIT')})) // Not sure, doesn't work

// DIRECTORY, ARGS
// c(process.argv) // List of aguments
// c(process.argv0) // The process.argv0 property stores a read-only copy of the original value of argv[0] passed when Node.js starts.
// c(process.chdir('/home/invisible/Desktop')) // change directory for the process (file doesn't have to be there)
// c(process.cwd()) // return the current working directory of the process
// c(process.execArgv) // any Node execution flags used. Useful for spawning child processes with the same flags/conditions

// PS MGMT
// c(process.abort()) // abort the current procces with SIGABRT
// process.kill(pid[, signal])
// Interesting example, handles SIGHUP by exiting with a timeout, then kills the process
// process.on('SIGHUP', () => { console.log('Got SIGHUP signal.'); });
// setTimeout(() => { console.log('Exiting.'); process.exit(0); }, 100);
// process.kill(process.pid, 'SIGHUP');


// IPC CHANNEL
// c(process.connected) // ???
// c(process.channel) // ???
// c(process.disconnect) // ???

// BENCHMARKS, CPU USAGE
// const now = Date.now()
// while (Date.now() - now < 500) // Spin the CPU for .5 seconds
// c(process.cpuUsage()) // Total CPU Usage (millionths of a second)
// c(time = process.hrtime())
// c(process.memoryUsage()) // method returns an object describing the memory usage of the Node.js process measured in bytes.
// Returns...
// {
//   rss: 4935680, // Resident Set size (5 MB)
//   heapTotal: 1826816,
//   heapUsed: 650472,
//   external: 49879
// }
// c(process.uptime()) // uptime in seconds


// WARNINGS
// process.on('warning', (warning) => { // Configure a process.warning listener
//   console.warn(warning.name);    // Print the warning name
//   console.warn(warning.message); // Print the warning message
//   console.warn(warning.stack);   // Print the stack trace
// });
// // process.emitWarning("I'm a warning!!!")
// process.emitWarning('Warning Message Body') // Triggers the listener
// process.emitWarning('Something happened!', 'CustomWarning', 'WARN001'); // More formatting control


// EVENT LISTENERS
// The 'beforeExit' event is emitted when Node.js empties its event loop and has no additional work to schedule. Normally, the Node.js process will exit when there is no work scheduled, but a listener registered on the 'beforeExit' event can make asynchronous calls, and thereby cause the Node.js process to continue.
// c(process.beforeExit())
// c(process.exitCode) // ???
// process.exit() // Exit the process. Also called when execution complete
// process.nextTick(function(){ // method adds the callback to the "next tick queue". Once the current turn of the event loop turn runs to completion, all callbacks currently in the next tick queue will be called.
//   console.log('Next Tick Started');
// })

// FILESYSTEM
// process.dlopen() // It is primarily used by require() to load C++ Addons, and should not be used directly, except in special cases.

// c(process.hrtime(time)) // seconds, nanoseconds elapsed from argument array (returned by previous process.htrime() call)
```