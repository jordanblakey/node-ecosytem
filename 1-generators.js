// function* bears() {
//   // Asterisk tells the function to run as a generator
//   // returns an object with properties 'value', and boolean 'done'
//   let kind = yield 'grizzly' // return grizzly on .next()
//   yield kind + ' polar' // return the concatenated value of kind + ' polar'
//   console.log('kind: ' + kind) // execute independently
//   console.log('You should not see me until the third .next().')
//   return 'done'
// }

// let bear = bears()
// console.log(bear.next().value)
// console.log(bear.next('ferocious').value)
// console.log(bear.next().value)

////////////////////////////////////////////////////////////////////////////////
// GENERATOR IMPLEMENTATION FOR HANDLING ASYNC CALLS
////////////////////////////////////////////////////////////////////////////////

let fs = require('fs')

run(function*(resume) {
  let contents = yield fs.readFile('input/big.file', 'utf8', resume)
  let uppercase = contents.toUpperCase()
  yield fs.writeFile('output/uppercase.file', uppercase, resume)
  console.log('All done!')
})

function run(generator) {
  let data = null,
    yielded = false
  let iterator = generator(function() {
    data = arguments
    check()
  })
  yielded = !!iterator.next()
  check()

  function check() {
    while (data && yielded) {
      let err = data[0],
        item = data[1]
      data = null
      yielded = false
      if (err) return iterator.throw(err)
      yielded = !!iterator.next(item)
    }
  }
}
