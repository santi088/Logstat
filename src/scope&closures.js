const a = { n: 1 }; const b = a; b.n = 2; console.log(a.n);
//2

function reset(o) { o = { n: 0 }; }
function bump(o) { o.n = 99; }
const x = { n: 5 }; reset(x); console.log(x.n); bump(x); console.log(x.n);

//5 99

const arr1 = [1, 2, 3];
const arr2 = arr1; 
arr2.push(4);
console.log(arr1.length, arr1 === arr2, [1, 2, 3] === [1, 2, 3]);

//4 true false

const user = { 
    name: "Ana", 
    tags: ["a"], 
    address: { city: "QC" } 
};

const c1 = { ...user }; 
const c2 = structuredClone(user);
c1.tags.push("b"); 
c2.address.city = "Makati";
console.log(user.tags, user.address.city);

//[a, b] QC

function makeAdder(n) { return (v) => v + n; }
const add5 = makeAdder(5), add10 = makeAdder(10);
console.log(add5(1), add10(1));


// 6 11


function addItem(cart, item) {
    return [...cart, item]
}

function updateCity(user, city) {
    return {...user, address: { city }}
}

function removeByID(items, id) {
    return items.filter(i => i.id !== id)
}

function makeMultipliers(array) {
    const answer = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        answer.push(
            (input) => input * element
        )
    }
    return answer
}

const fns = makeMultipliers([2, 3, 4]);

console.assert(fns[0](10) === 20);
console.assert(fns[1](10) === 30);
console.assert(fns[2](10) === 40);


function makeCounter(start = 0) {
    return {
        inc(){
            start++
        },

        dec(){
            start--
        },

        get(){
            return start
        }
    }
}

function once(fn) {
    let result
    let hasRun = false

    return (...args) => {
        if(hasRun === false){
            hasRun = true
            result = fn(...args)
        }
        return result
    }
}

function memoize(fn) {
    const map = new Map()

    return (arg) => {
        const key = JSON.stringify(arg)

        if(map.has(key)){
            return map.get(key)
        }

        const result = fn(arg)
        map.set(key, result)
        return result
    }
}

function makeStatus() {
    let counts = []

    return ({
        add(ms){
            counts.push(ms)
        },

        report(){
            let sum = 0

            for (let i = 0; i < counts.length; i++) {
                const element = counts[i];
                sum += element
            }

            return {
                count: counts.length,
                avg: sum / counts.length,
                max: [...counts]
                    .sort((a, b) => b - a)[0]
            }
        }
    })
}

function debounce(fn, ms) {
    //dont get the description too
}

//btw today is friday afternoon
//yesterday i was busy and so i was only able to answer one prblem 
//that night, it was the products of array except self