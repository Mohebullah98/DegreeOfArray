// 'use strict';

// const fs = require('fs');

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');

// let inputString = '';
// let currentLine = 0;

// process.stdin.on('data', function(inputStdin) {
//     inputString += inputStdin;
// });

// process.stdin.on('end', function() {
//     inputString = inputString.split('\n');

//     main();
// });

// function readLine() {
//     return inputString[currentLine++];
// }

/*
 * Complete the 'degreeOfArray' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function degreeOfArray(arr) {
    // Write your code here
    let maxcount =0;
    let subArray=[];
    let elemntsHighestCount = new Map();
    //Create a map that stores each number along with info of it's count and indeces of first and last appearance.
    let elements = arr.reduce((p,current,index)=>{
       let count,left,right;
       if(p.has(current)){
           const exists = p.get(current);
           count=exists.count+1;
           left=exists.left;
           right=index;
       } 
       else{
           count=1;
           left=index;
           right=index;
       }
       return p.set(current,{count,left,right})
    },new Map());
    //Add elements that have highest degree to seperate map called elmntsHighestCount
    elements.forEach((element,num)=>{
      if(element.count===maxcount){
        elemntsHighestCount.set(num,element)  
      }  else if(element.count>maxcount){//If higher degree, clear the map and add new number 
          elemntsHighestCount.clear();
          elemntsHighestCount.set(num,element);
          maxcount = element.count;
      }
      })
      let result = elemntsHighestCount.values().next().value;
      //If size is one then there is only one degree, set subarray with it's left and right index
      if(elemntsHighestCount.size===1){
          subArray=arr.slice(result.left,result.right+1);
      }
      else{
        //compare each num in the map with the result, which should hold the smallest length of SubArray
        elemntsHighestCount.forEach((element,num)=>{
          let currentDifference = element.right-element.left;
          let previousDifference = result.right-result.left;
          if(currentDifference-previousDifference<0){
            result =elemntsHighestCount.get(num);
          }
        })
        //Set SubArray equal to results indeces.
        subArray=arr.slice(result.left,result.right+1);
      }
      console.log(subArray);
      return subArray.length;
}

function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // const arrCount = parseInt(readLine().trim(), 10);

    // let arr = [];

    // for (let i = 0; i < arrCount; i++) {
    //     const arrItem = parseInt(readLine().trim(), 10);
    //     arr.push(arrItem);
    // }

    // const result = degreeOfArray(arr);
    let ar = [1,2,2,3,1];
    let nums =[1,2,2,3,1,4,2];
    let v =degreeOfArray(ar);
    console.log(v);
    console.log(degreeOfArray(nums));
    // ws.write(result + '\n');

    // ws.end();
}
main()
