module.exports = function toReadable(number) {
   let strFromNum = String(number);
   let strLength = strFromNum.length
   let ordinary = { 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9 }
   let teens = { 'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19 };
   let dozens = { 'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90 };
   let res = ''
   function checkTeens(number) {
      for (let opt in teens) {
         if (teens[opt] === number) {
            res += opt;
         }
      }
   }
   function checkDozens(number) {
      for (let k in dozens) {
         if (dozens[k] === number) {
            res += k;
         }
      }
   }

   function wordFromNumber(number) {
      let tens = String(number).slice(0, 1) + '0'
      let rest = String(number).slice(1)
      let wordTensIndex = Object.values(dozens).indexOf(+tens)
      let wordRestIndex = Object.values(ordinary).indexOf(+rest)
      if (Object.values(dozens).includes(+tens) && Object.values(ordinary).includes(+rest)) {
         res = `${Object.keys(dozens)[wordTensIndex]} ${Object.keys(ordinary)[wordRestIndex]}`
      }
      console.log(tens)
   }

   function wordFromHundred(number) {
      let hundredCount = strFromNum.slice(0, 1)
      let restStr = String(number % 100)
      let rest = number % 100
      let restDozen = restStr.slice(0, 1) + '0'
      let restNum = restStr.slice(-1)
      let indexInOrdinary = Object.values(ordinary).indexOf(+hundredCount)
      let indexInDozens = Object.values(dozens).indexOf(+restDozen)
      let indexInTeens = Object.values(teens).indexOf(rest)
      let restNumIndex = Object.values(ordinary).indexOf(+restNum)
      switch (true) {
         case rest === 0:
            res = `${Object.keys(ordinary)[indexInOrdinary]} hundred`
            break;
         case rest < 10:
            res = `${Object.keys(ordinary)[indexInOrdinary]} hundred ${Object.keys(ordinary)[restNumIndex]}`
            break;
         case Object.values(dozens).includes(rest):
            res = `${Object.keys(ordinary)[indexInOrdinary]} hundred ${Object.keys(dozens)[indexInDozens]}`
            break;
         case rest <= 19:
            res = `${Object.keys(ordinary)[indexInOrdinary]} hundred ${Object.keys(teens)[indexInTeens]}`
            break;
         case rest > 19:
            res = `${Object.keys(ordinary)[indexInOrdinary]} hundred ${Object.keys(dozens)[indexInDozens]} ${Object.keys(ordinary)[restNumIndex]}`
            break;
         default:
            break
      }
   }

   if (number === 0) return 'zero';
   if (strLength === 1) {
      for (let key in ordinary) {
         if (ordinary[key] == number) {
            res += key;
         }
      }
   }
   switch (true) {
      case strLength === 2 && number >= 10 && number < 20:
         checkTeens(number);
         break;
      case strLength === 2 && number % 10 === 0:
         checkDozens(number);
         break;
      case strLength === 2 && number > 20 && number < 100:
         wordFromNumber(number);
         break;
      case strLength === 3 && number >= 100:
         wordFromHundred(number);
         break;
      default:
         break
   }
   return res;
}
