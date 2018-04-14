const readline = require('readline');

const romanAndDecimal = {
  'M': 1000,
  'D': 500,
  'C': 100,
  'L': 50,
  'X': 10,
  'V': 5,
  'I': 1,
}

const romanWrongAndRight = {
  'IIII': 'IV',
  'VIV':  'IX',
  'XXXX': 'XL',
  'LXL':  'XC',
  'CCCC': 'CD',
  'DCD':  'CM',
}

function main(){
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '>> ',
  });

  rl.prompt();

  rl.on('line', (line) => {
    switch (line.trim()) {
      case 'exit':
        process.exit(0);
        break;
      default:
        if(line > 3999 || line <= 0) {
          console.log(`Only numbers from 1 to 3999`);
          break;
        }
        let ret = toRoman(line);
        console.log(ret);
        break;
    }
    rl.prompt();
  }).on('close', () => {
    process.exit(0);
  });
}

// converts decimal to roman number
function toRoman(decimalNumber){
  let romanNumber = '';
  while (decimalNumber > 0) {
    for (let roman in romanAndDecimal) {
      let value = romanAndDecimal[roman];
      if (!(decimalNumber % value)) {
        romanNumber += roman;
        decimalNumber -= value;
        break;
      }
    }
  }
  return replaceBad(romanNumber.split("").reverse().join(""));
}

// checks if roman number is valid
function validateNumber(input){
  return /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
    .test(input);
}

// replaces bad roman numbers with the right ones (example: IIII -> IV)
function replaceBad(inputRoman){
  while(!validateNumber(inputRoman)){
    let outputRoman = '';
    for (let wrongRoman in romanWrongAndRight) {
      let rightRoman = romanWrongAndRight[wrongRoman];
      let regex = new RegExp(wrongRoman);
      if (inputRoman.includes(wrongRoman)) {
        outputRoman = inputRoman.replace(regex, rightRoman)
      }
    }
    inputRoman = outputRoman;
  }
  return inputRoman;
}

main();

module.exports = {
  toRoman,
  validateNumber,
  replaceBad,
}
