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
