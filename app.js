const fs = require('fs')
const dir = './2kkwords/'
const { performance } = require('perf_hooks');
let files = fs.readdirSync(dir)


function readAllFiles() {
    let summary = {}
    for (let j = 0; j < files.length; j++) {
        const file = fs.readFileSync(dir + files[j], 'utf-8').split('\n')
        file.forEach(word => {
            if (!summary.hasOwnProperty(word)) {
                summary[word] = {
                    count: 1,
                    inFiles: [files[j]]
                }

            }
            else {
                summary[word].count++
                if (!summary[word].inFiles.includes(files[j])) {
                    summary[word].inFiles.push(files[j])
                }
            }
        })
    }
    return summary
}
function uniqueValues(allWords) {
    let count = 0
    Object.keys(allWords).forEach(key => {
        if (allWords[key].inFiles.length == 1) {
            count++
        }
    });
    return count
}

function existInAllFiles(allWords) {
    let count = 0
    Object.keys(allWords).forEach(key => {
        if (allWords[key].inFiles.length == 20) {
            count++
            delete allWords[key]
        }
    });
    return count
}

function existInAtLeastTen(allWords) {
    let count = 0
    Object.keys(allWords).forEach(key => {
        if (allWords[key].inFiles.length >= 10) {
            count++
            delete allWords[key]
        }
    });
    return count
}
const startTime = performance.now()
const allWords = readAllFiles()
const inAllFiles = existInAllFiles(allWords)
const atLeastTen = existInAtLeastTen(allWords)
const uniqueVal = uniqueValues(allWords)

console.log(`Words in all files = ${inAllFiles} \n Words In At Least Ten = ${atLeastTen + inAllFiles} \n Unique words = ${uniqueVal}`)
const endTime = performance.now()
console.log(`Algo took ${endTime - startTime} miliseconds`)


// code below , faster on ~3-4% (with 2mil words)
//-------------------------------------

// function checkEverything(allWords) {
//     let atLeastTen = 0;
//     let inAll = 0;
//     let unique = 0;

//     Object.keys(allWords).forEach(key => {
//         if (allWords[key].inFiles.length == 20) {
//             inAll++
//         } else if (allWords[key].inFiles.length >= 10) {
//             atLeastTen++
//         } else if (allWords[key].inFiles.length == 1) {
//             unique++
//         }
//     });

//     return `${unique} Unique Values,\n ${inAll} words in all files,\n ${atLeastTen + inAll} in at least ten files`
// }

// const startTime = performance.now()
// const allWords = readAllFiles()
// const result = checkEverything(allWords)

// console.log(result)
// const endTime = performance.now()
// console.log(`Algo took ${endTime - startTime} miliseconds`)
//---------------------------------------------------
