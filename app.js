const readline = require('readline');

let romanMap = {
  'M': 1000,
  'D': 500,
  'C': 100,
  'L': 50,
  'X': 10,
  'V': 5,
  'I': 1,
}

let changeMap = {
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

function toRoman(number){
  let romanNumber = '';
  while (number > 0) {
    for (let roman in romanMap) {
      let value = romanMap[roman];
      if (!(number % value)) {
        romanNumber += roman;
        number -= value;
        break;
      }
    }
  }
  return replaceBad(romanNumber.split("").reverse().join(""));
}

function validateNumber(input){
  return /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
    .test(input);
}

function replaceBad(inputRoman){
  while(!validateNumber(inputRoman)){
    let outputRoman = '';
    for (let roman in changeMap) {
      let rep = changeMap[roman];
      let regex = new RegExp(roman);
      if (inputRoman.includes(roman)) {
        outputRoman = inputRoman.replace(regex, rep)
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
