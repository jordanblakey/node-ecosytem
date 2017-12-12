window.onload = function() {
  function get(url) {
    // define get()
    return new Promise(function(resolve, reject) {
      // create instance of Promise
      const xhttp = new XMLHttpRequest() // create instance of XMLHttpRequest
      xhttp.open('GET', url, true) // prepare the request, url passed in
      xhttp.onload = function() {
        // listen for request ready, the call the function
        if (xhttp.status === 200) {
          // if http status good
          resolve(JSON.parse(xhttp.response)) // resolve the returned Promise
        } else {
          reject(xhttp.statusText) // if not 200, give a status message
        }
      }
      xhttp.onerror = function() {
        // handle error if the xhttp request never loads
        reject(xhttp.statusText)
      }
      xhttp.send() // send the request... wtaf?
    })
  }

  const promise = get('./input/tweets.json') // call get, passing in the target url
  promise
    .then(function(tweets) {
      // handler for the resolved promise
      // on promise resolve, display the tweets
      console.log(tweets)
      return get('./input/tweets2.json')
    })
    .then(function(tweets) {
      // handler for the resolved promise
      console.log(tweets)
      return get('./input/tweets3.json')
    })
    .then(function(tweets) {
      // handler for the resolved promise
      console.log(tweets)
    })
    .catch(function(error) {
      // chained catch for errors
      console.log(error)
    })
}

// Note that these all use the same promise function... once a use case is created,
// you're basically writing synchronous code.
