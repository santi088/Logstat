function sumEvens(arr) {
    let sum = 0
    for(const num of arr){
        if (num % 2 === 0) {
            sum += num
        }
    }
    return sum
}

console.log(sumEvens([1,2,3,4]))


async function retry(fn, attempts){
    let lastError;
	for(let i = 0; i < attempts; i++){
		try {
            await fn
        } catch (error) {
            lastError = error
        }
	}
    return lastError
}