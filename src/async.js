function delay(value, ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value)
        }, ms)
    })
}

function failAfter(ms, message) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error(message))
        }, ms)
    })
}


function fetchId(id) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `user${id}`,
            })
        }, 100)
    })
}

async function getAllParallel(ids) {
    const arr = []

    ids.forEach(id => {
        const validId = (id > 0 && Number.isInteger(id))
        if (validId) {
            arr.push(fetchId(id))
        }else{
            return new Promise(balh naljdsoiahuifauf)
        }
    });

    return Promise.all(arr)
}


async function main() {
    const a = await delay('hi', 50)
    console.log(a);

    const users = await getAllParallel([1, 2, 3])
    console.log(users);
    
}

main()