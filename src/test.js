var tag = true;
var p = new Promise(function(resolve, reject) {
  if(tag) {
    resolve('tag is true')
  } else {
    reject('tag is false')
  }
})
p.then(function(result) {
  console.log(result)
})
.catch(function(err) {
  console.log(err)
})
