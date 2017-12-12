console.time('Synchronous JS')
// ASYNCHRONOUS JAVASCRIPT AND XML REQUEST /////////////////////////////////////
window.onload = function() {
  // Wait until DOM loaded
  let http = new XMLHttpRequest() // create instance of native JS XMLHttpRequest
  // console.log(http.onreadystatechange) // null? wtf?
  http.onreadystatechange = function() {
    // set listener for property onreadystatechange (???)
    // console.log(http)
    if (http.readyState === 4 && http.status === 200) {
      console.log(
        'JS object Response to AJAX request (parsed as JS obj):\n',
        JSON.parse(http.response)
      )
    }
  }
  console.time('AJAX Call 1') // this bool is async: true || false
  http.open('GET', 'input/tweets.json', true) // Prepare an AJAX request
  http.send() // Send the prepared request
  // console.log(http)
  console.timeEnd('AJAX Call 1')
}
console.timeEnd('Synchronous JS')
// Notice that the whole sync file executes faster than the single AJAX call.

/* AJAX READY STATES
0 - Request not initialized
1 - Request has been set up
2 - Request has been sent
3 - Request is in process
4 - Request is complete
*/

// SAME AJAX REQ USING JQUERY //////////////////////////////////////////////////
let count = 0
let timer = setInterval(() => {
  console.log('Waiting between requests: ', count)
  if (count < 2) {
    count++
  } else {
    clearInterval(timer)
    $.get('input/tweets.json', function(data) {
      console.log(data)
    })
    console.log('Next request, uring JQuery')
  }
}, 1000)
