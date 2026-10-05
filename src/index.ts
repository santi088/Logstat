import * as fs from "node:fs"
console.log("hello world")

async function read(filepath:string) {
    const stream = fs.createReadStream(filepath, {
        encoding: 'utf-8',
    })

    type Counter = Record<string, number>
    const counter: Counter = {}
    let skipped = 0

    for await (const chunk of stream){
        const array: string[] = chunk.split('\n')

        array.reduce((acc, a) => {            
            const split = a.split(' ')

            if (split.length !== 5) {
                console.log(split.length);
                skipped++
                return acc
            }

            const path = split[2]
            if (path) {

                let cleaned = [...path]
                console.log(cleaned);
                
                const startIndex = cleaned.indexOf('?') 
                const stopIndex = cleaned.indexOf('=')  
                
                if (startIndex !== -1 && stopIndex !== -1 && stopIndex > startIndex) {
                    // Calculate exact count of characters between '?' and '=' inclusive
                    const deleteCount = stopIndex - startIndex + 1;
                    cleaned.splice(startIndex, deleteCount);
                }

                
                cleaned = cleaned.filter(char => 
                    ![...'0123456789', ...',.:&', ' '].includes(char))
                
                const finalPath = cleaned[cleaned.length - 1] === '/' ? 
                    cleaned.slice(0, -1).join('') :
                    cleaned.join('')

                // const filteredCleaned = cleaned.filter(char => 
                //     ![...'0123456789', ...',.:&', ' '].includes(char)
                // )

                // // 3. Use the new filtered array for the final step
                // const finalPath = filteredCleaned[filteredCleaned.length - 1] === '/' ? 
                //     filteredCleaned.slice(0, -1).join('') :
                //     filteredCleaned.join('')

                acc[finalPath] = (acc[finalPath] || 0) + 1
            }
            return acc
        }, counter)
    }
    
    stream.destroy()
    const arr = Object.entries(counter)

    const count = arr.map(a => {
        return {
            'path': a[0], 'count': a[1]
        }
    })

    return {count, skipped}
}

const args: string[] = process.argv.slice(2)

async function main() {
    if (args.length > 0 && args[0] !== undefined) {
        const filepath = args[0]
        
        const {count, skipped} = await read(filepath)
        const top10Paths = count
            .sort((a, b) => b.count - a.count)
            .slice(0, 10)
        console.log(top10Paths);
        console.log(skipped);
        
    }
}

main()

