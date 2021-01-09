function fn(num) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if(typeof num == 'number') {
        resolve(num)
      } else {
        var err = num + ' is not a number'
        reject(err)
      }
    }, 2000)
  })
}

fn(12)
.then(function(result) {
  console.log(result)
  return result+1
})
.then(function(result) {
  console.log(result)
  return result+1
})
.then(function(result) {
  console.log(result)
  return result+1
})
.then(function(result) {
  console.log(result)
  return result+1
})


console.log('next code')
