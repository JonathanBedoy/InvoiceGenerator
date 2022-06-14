const stringToNumbersObject = (obj) => {
  let keysOfDoc = Object.keys(obj);
  const newObj = {};

  keysOfDoc.forEach((key) => {
    // console.log(Number(obj[key]), obj[key])
    // Number(obj[key])
    // newObj[key] = obj[key]
    newObj[key] = stringToNumber(obj[key])
    if (typeof obj[key] === "boolean") {
      newObj[key] = obj[key]
    }
    // let newVal = Number(obj[key])
    // if (newVal || newVal === 0) {
    //   if (obj[key] !== '') {
    //     newObj[key] =newVal
    //   }
    // }
    // newObj[key] = Number(obj[key]) || Number(obj[key]) === 0 ? Number(obj[key]) : obj[key];
    // console.log('new: ',newObj[key])
  });
  return newObj;
};

const stringToNumber = (value) => {
  // return Number(value) ? Number(value) : value;
  // console.log(value, ': ', isNaN(value), ' -> ', Number(value))


  let tempVal = value
  if (typeof value === 'string') {
    if (value.length === 0) {
      tempVal = tempVal.concat(' ')
    }
    tempVal = tempVal.replace(' ', 'a')
  } else return value
  console.log('consensus: ', isNaN(tempVal))
  return isNaN(tempVal) ? value : Number(tempVal)





  // if (typeof value === "boolean") {
  //   return value
  // }
  // return isNaN(value) ? value : Number(value)
};

const checkIfBoolean = (value) => {
  return typeof value === "boolean";
};

const checkIfNumber = (value) => {
  return typeof stringToNumber(value) === "number";
};

exports.stringToNumbersObject = stringToNumbersObject;
exports.stringToNumber = stringToNumber;
exports.checkIfBoolean = checkIfBoolean;
exports.checkIfNumber = checkIfNumber;