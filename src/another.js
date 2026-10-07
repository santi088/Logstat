function betterTwoSum(arr, target) {
    const map = new Map()

    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i]
        const value = arr[i]

        if (map.has(complement)) {
            return [i, map.get(complement)]
        }

        map.set(arr[i], i)
    }
    return []
}

console.log(betterTwoSum([1, 2, 3, 1], 2));


function topK(arr, k) {
    const count = {}

    arr.reduce((acc, a) => {
        acc[a] = (acc[a] || 0) + 1
        return acc
    }, count)

    const arrCount = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .map(([v]) => Number(v))
        .slice(0, k)
    return arrCount
}
console.log(topK([1, 1, 1, 2, 10, 10, 2, 3], 3));


const groupedAngram = ["eat", "tea", "tan", "ate", "nat", "bat"]

function groupAnagrams(array) {
    const mapped = array.reduce((acc, a) => {
        const sorted = a.split('').sort().join('')

        if (acc.has(sorted)) {
            acc.get(sorted).push(a)
            return acc
        }

        acc.set(sorted, [a])

        return acc

    }, new Map())



    return Array.from(mapped, ([key, value]) => {
        return value
    })
}

console.log(groupAnagrams(groupedAngram));


function chunk(arr, n) {
    let pairs = []
    let pair = []

    for (let i = 0; i < arr.length; i += n) {
        // if (arr.slice(i, arr.length).length < n) {
        //     pairs.push([arr.slice(i, arr.length)])
        // }
        pair = arr.slice(i, i + n)
        console.log(pair);
        
        pairs.push(pair)
    }

    // let i = 0
    // let j = 0

    // while (j < arr.length / 2 + 1) {
    //     pair = arr.slice(i, n)
    //     console.log(pair);
        
    //     pairs.push(pair)
    //     i + n
    //     j++ 
    // }

    return pairs
}

console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3));


//object, object, number, object
//10 521 33 6
//NaN NaN 12 0 NaN
//fasle, false, false, fasle, ngl i think this is just not useful info even if i know it
//false false false true even this is pretty useful practically the last one i mean same at the top the last one were pretty useless
// 5 0 x (empty) d
//false 0.300...04
//false false true

// a) getRetries({ retries: 0 }) should return 0, not 3
const getRetries = (opts) => opts.retries ?? 3;

// b) isEmpty([]) should be true, isEmpty([1]) false. Right now both return false.
const isEmpty = (arr) => arr.length === 0;

// c) sumAll(["10", "20", "5"]) should be 35, not "10205"
const sumAll = (values) => values.reduce((a, b) => Number(a) + Number(b), 0);
console.log(sumAll(["10", "20", "5"]));

function parseLogLine(line) {
    const arr = line.split(' ')
    if(arr.length !== 5) return null
    const ms = parseInt(arr[4])
    if(line.slice(-2) !== "ms") return null
    if(Number.isNaN(ms)) return null
    const status = parseInt(arr[3])
    if( status < 100 || status > 599) return null
    return {
        'time': arr[0],
        'method': arr[1],
        'path': arr[2],
        'status': status,
        'ms': ms
    }    
}

console.log("here");

console.log(parseLogLine("2026-10-05T10:21:03Z GET /api/users 100 200ms"));
console.log(parseLogLine("garbage") === null);
console.log(parseLogLine("2026-10-05T10:21:03Z GET /x abc 45ms") === null);
console.log(parseLogLine("2026-10-05T10:21:03Z GET /x 200 45") === null);


function toCentavos(string) {
    return Math.round(string * 100)
}

console.log(toCentavos("19.99"));
console.log(toCentavos("0.1") + toCentavos("0.2") === toCentavos("0.3"));
//we must not use decimals bc computers cannot
//stay accurate for a lot of decimals
//thus we have to turn them into whole numbers
//then we make our calculations

function formatPeso(num) {
    return `P${num / 100}`
}

function typeOf(x) {
    if(Number.isNaN(x)) return "nan"
    if(Array.isArray(x)) return "array"
    if(x === null) return "null"
    if(x instanceof Function) return "function"
    return typeof(x)
}

console.log(typeOf((a) => a));
