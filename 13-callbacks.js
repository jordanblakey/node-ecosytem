window.onload = function() {
  let fruits = ['banana', 'apple', 'pear']
  const log = console.log

  // SYNCHRONOUS METHOD OF ITERATING OVER AN ARRAY /////////////////////////////
  // fruits.forEach(function(val) {
  //   log(val)
  // })

  // USING A CALLBACK FUNCTION (STILL SYNC) ////////////////////////////////////
  // const callback = val => {
  //   // here's the callback
  //   log(val)
  // }

  // // Here's the iterator and the callback as its function
  // fruits.forEach(callback)
  // log('done')

  // ASYNC CALLBACK ////////////////////////////////////////////////////////////
  // const cb = val => log(val.text)
  // $.get('./input/tweets.json', d => d.forEach(cb))
  // log('done... I finished first!')

  // YE OLDE CALLBACK HELL /////////////////////////////////////////////////////
  // $.ajax({
  //   type: 'GET',
  //   url: './input/tweets.json',
  //   success: d => {
  //     log(d)
  //     $.ajax({
  //       type: 'GET',
  //       url: './input/tweets2.json',
  //       success: d => {
  //         log(d)
  //         $.ajax({
  //           type: 'GET',
  //           url: './input/tweets3.json',
  //           success: d => log(d),
  //           error: (jqXHR, textStatus, err) => log(err)
  //         })
  //       },
  //       error: (jqXHR, textStatus, err) => log(err)
  //     })
  //   },
  //   error: (jqXHR, textStatus, err) => log(err)
  // })
  // CBH REDACTED //////////////////////////////////////////////////////////////
  $.ajax({
    type: 'GET',
    url: './input/tweets.json',
    success: callbackTweets,
    error: handleError
  })

  function callbackTweets(d) {
    log(d)
    $.ajax({
      type: 'GET',
      url: './input/tweets2.json',
      success: callbackFriends,
      error: handleError
    })
  }

  function callbackFriends(d) {
    log(d)
    $.ajax({
      type: 'GET',
      url: './input/tweets3.json',
      success: d => log(d),
      error: handleError
    })
  }

  function handleError(jqXHR, textStatus, err) {
    log(err)
  }
}
