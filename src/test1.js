function fn(num) {
  return new Promise(function(resolve, reject) {
    if(typeof num == 'num') {
      resolve()
    } else {
      reject()
    }
  }).then(function() {
    console.log('参数是num')
  }).catch(function() {
    console.log('参数不是num')
  })
}

fn('12')
console.log('next code')
