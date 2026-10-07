const products = [
  { name: "Mouse", price: 450, stock: 12, category: "accessories" },
  { name: "Laptop", price: 42000, stock: 0, category: "computers" },
  { name: "Keyboard", price: 1800, stock: 5, category: "accessories" },
  { name: "Monitor", price: 9500, stock: 3, category: "computers" },
  { name: "Cable", price: 150, stock: 40, category: "accessories" },
];

function costsUnder5kInStock(arr) {
    
    const result = arr.
        filter(a => a.stock > 0 && a.price < 5000).
        map(a => a.name)
    
    return result
}

console.log(costsUnder5kInStock(products));


//2
const a = products.find(p => p.price > 5000)
const b = products.some(p => p.stock === 0)
const c = products.every(p => p.name.length > 3)

//3
const totalValue = products.reduce((acc, p) =>
     acc += p.price * p.stock 
, 0)

const productsCount = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
}, {})

console.log(totalValue);
console.log(productsCount);


const logs = [
  { path: "/api/users", status: 200, ms: 45 },
  { path: "/api/login", status: 401, ms: 12 },
  { path: "/api/users", status: 500, ms: 310 },
  { path: "/api/orders", status: 200, ms: 80 },
  { path: "/api/users", status: 200, ms: 52 },
  { path: "/api/orders", status: 200, ms: 95 },
];

//5

const d = logs.reduce((acc, l) => {
    acc[l.path] = (acc[l.path] || 0) + 1
    return acc
}, {})

const arr = Object.entries(d).
    map(a => {
        return {'path': a[0], 'count': a[1]}
    }).
    sort((a,b) => b.count - a.count).
    slice(0, 2)

console.log(arr);


//4
const Arr = [10, 9, 1, 100, 25]
const A = [...Arr].sort((a, b) => a - b)
console.log(A);

const B = [...products].sort((a, b) => a.price - b.price)
console.log(B);
console.log(products);


const C = [...products].sort((a, b) => {
    if (a.category === b.category) {
        console.log(true);
        return b.price - a.price
    }

    return a.category.localeCompare(b.category)
})

console.log(C);

/////oct 6 2026

//1
//the formatting of the built
// in map is better

//id say this is 0(n)
function myMap(arr, fn){
    const newArr = []
    for(const a of arr){
        newArr.push(fn(a))
    }
    return newArr
}

//2
// id say its 0(n) for the 
// first one and 0(1) 
// fot the second

const sampleArr = [1, 0, 5, 8]
function containsDuplicate(arr) {
    const seen = {}
    for(const a of arr){
        if(a in seen){
            return true
        }
        seen[a] = a
    }
    return false
}

console.log(containsDuplicate(sampleArr))

function betterDuplicateCheck(arr){
    return new Set(arr).size !== arr.length
}


console.log(betterDuplicateCheck(sampleArr));

//3
//first one is 0(nlogn)
//second is 0(n)
function isAnagram(str1, str2) {
    const a = str1.split('').sort().join('')
    const b = str2.split('').sort().join('')

    return a === b
}

console.log(isAnagram('listen', 'silent'));

function betterIsAnagram(str1, str2) {
    const counter = {}
    
    if (str1.length !== str2.length) return false

    for (let i = 0; i < str1.length; i++) {
        
        counter[str1[i]] = (counter[str1[i]] || 0) - 1
        counter[str2[i]] = (counter[str2[i]] || 0) + 1
    }

    for (const key in counter) {
        if (counter[key] !== 0) {
            return false
        }
    }
    return true
}

console.log(betterIsAnagram('listen', 'silent'));

//4
//brute force reminds me of bubble sorft where the outer
//loop must only go up unitl length -1 
//so that the inner loop doesnt go out of bounds

function bruteTwoSum(arr, target) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if(arr[i] + arr[j] === target){
                return [i, j]
            }
        }
    }
    return false
}

//i think this and the map one 
//are both O(n)
//but i think this one maybe is O(n^2) 
//just because i have the findINdex isnide
//even tho it only runs once when we find the complement
function anotherTwoSum(arr, target) {
    for (const [i, a] of arr.entries()) {
        const complement =  target - a
        if (arr.includes(complement)) {
            return [i, arr.findIndex(i => i === complement )]
        }
    }
}


console.log('----------TWO SUM----------------');
const twosumArr = [2, 15, 11, 7]
console.log(bruteTwoSum(twosumArr, 22))
console.log(anotherTwoSum(twosumArr, 22));


//TO-DO implement using Map above
//put it at another.js



console.log('(-------------------------------');


//5
//O(n log n)

const groupedAngram = ["eat", "tea", "tan", "ate", "nat", "bat"]

function groupAnagrams(arr) {
    const count = {}
    arr.reduce((acc, a) => {
        const sorted = a.split('').sort().join('')

        if (acc[sorted]) {
            acc[sorted].push(a)
        }else{
            acc[sorted] = [a]
        }

        return acc
    }, count)

    const finalCount =  Object.entries(count)
        .map(a => a[1])

    return finalCount
}

console.log(groupAnagrams(groupedAngram));


//6 O(nlogn) due to the sorting
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
console.log(topK([1, 1, 1, 2, 2, 3], 2));

//7








