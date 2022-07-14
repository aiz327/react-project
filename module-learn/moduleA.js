import { data } from './module/model'
let moduleA = 'This is module A variable';
console.log(data)

function moduleAClick() {
  console.log("module A click function")
  console.log("model module:", data)
}

export {
  moduleAClick
}