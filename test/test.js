const {assert} = require('chai');
const {toRoman, validateNumber, replaceBad} = require('../app');

describe('App', function(){
  describe('toRoman', function() {
    const tests = [
      {args: 1,    expected: 'I'},
      {args: 2,    expected: 'II'},
      {args: 3,    expected: 'III'},
      {args: 4,    expected: 'IV'},,
      {args: 5,    expected: 'V'},
      {args: 9,    expected: 'IX'},
      {args: 10,    expected: 'X'},
      {args: 20,   expected: 'XX'},
      {args: 30,   expected: 'XXX'},
      {args: 40,   expected: 'XL'},
      {args: 50,   expected: 'L'},
      {args: 90,   expected: 'XC'},
      {args: 100,  expected: 'C'},
      {args: 200,  expected: 'CC'},
      {args: 300,  expected: 'CCC'},
      {args: 400,  expected: 'CD'},
      {args: 500,  expected: 'D'},
      {args: 900,  expected: 'CM'},
      {args: 1000, expected: 'M'},
      {args: 2000, expected: 'MM'},
      {args: 3000, expected: 'MMM'},
    ];

    tests.forEach(function(test) {
      it('from ' + test.args, function() {
        let result = toRoman(test.args);
        assert.equal(result, test.expected);
      });
    });
  });

  describe('validateNumber', function() {
    const tests = [
      {args: ['CMXCIX', 'MCDXLIV', 'MMDCLXVI', 'MMMCXI','CCXXII', 'CCCXXXIII'],
       expected: true},
      {args: ['CCCCXXII', 'MMMMCCCXXII', 'CCCXXXXII', 'CCCXXIIII', 'CCCMXXII'],
       expected: false},
    ];

    tests.forEach(function(test) {
      for(let i = 0; i < test.args.length; i++){
        it('validate number', function() {
          let result = validateNumber(test.args[i]);
          assert.equal(result, test.expected);
        });
      }
    });
  });

  describe('replaceBad', function() {
    let tests = [
      {args: 'IIII',    expected: 'IV'},
      {args: 'VIV',     expected: 'IX'},
      {args: 'XXXX',    expected: 'XL'},
      {args: 'LXL',     expected: 'XC'},
      {args: 'CCCC',    expected: 'CD'},
      {args: 'DCD',     expected: 'CM'},
    ];

    tests.forEach(function(test) {
      it('from ' + test.args, function() {
        let result = replaceBad(test.args);
        assert.equal(result, test.expected);
      });
    });
  });
});
