const orderTotal = require('./input/order-total.js')

it.only('calls vatapi.com correctly', () => {
  let isFakeFetchCalled = false
  const fakeFetch = (url) => {
    expect(url).toBe('https://vatapi.com/v1/country-code-check?code=DE')
    isFakeFetchCalled = true
    return Promise.resolve({
      json: () => Promise.resolve({
        rates: {
          standard: {
            value: 19
          }
        }
      })
    })
  }
  return orderTotal(fakeFetch, {
    country: 'DE',
    items: [
      { 'name': 'Dragon waffles', price: 20, quantity: 2 }
    ]
  }).then(result => {
    expect(result).toBe(20 * 2 * 1.19)
  })
})
