import * as fs from "node:fs"

type PathCount = Record<string, number>
    type MsCount = Record<string, number>
    type StatusCount = Record<number, number>
    type TotalCounts = {
        'path': PathCount,
        'time': MsCount,
        "code": StatusCount,
    }

async function read(filepath:string) {
    const stream = fs.createReadStream(filepath, {
        encoding: 'utf-8',
    })

    const TotalCount: TotalCounts = {
        'path': {},
        'time': {},
        'code': {}
    }

    let skipped = 0

    for await (const chunk of stream){
        const array: string[] = chunk.split('\n')

        array.reduce((acc, a) => {            
            const split = a.split(' ')

            if (split.length !== 5) {
                skipped++
                return acc
            }

            const path = split[2]
            if (path) {

                let cleaned = [...path]
                
                const startIndex = cleaned.indexOf('?') 
                const stopIndex = cleaned.indexOf('=')
                
                if (startIndex !== -1 && stopIndex !== -1 && stopIndex > startIndex) {
                    // Calculate exact count of characters between '?' and '=' inclusive
                    const deleteCount = stopIndex - startIndex + 1;
                    cleaned.splice(startIndex, deleteCount);
                }

                
                cleaned = cleaned.filter(char => 
                    ![...'0123456789', ...'=,.:&', ' '].includes(char))
                
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

                acc['path'][finalPath] = (acc['path'][finalPath] || 0) + 1
            }
            return acc
            //---------------------PATHs--------------------------------
        }, TotalCount)
    }
    
    stream.destroy()
    return {TotalCount, skipped}
}

const args: string[] = process.argv.slice(2)

async function main() {
    if (args.length > 0 && args[0] !== undefined) {
        const filepath = args[0]
        
        const {TotalCount, skipped} = await read(filepath)
        console.log(TotalCount);
        
        if (TotalCount['path']) {
            const pathArr = Object.entries(TotalCount['path'])
            
            const sortedPath = [...pathArr].sort((a, b) => b[1] - a[1])
            const topPaths = sortedPath
                .map(p => {
                    return {
                        'path': p[0],
                        'count': p[1]
                    }
                    
                })
                .slice(0, 9)
            
            console.log('Top Paths: ')
            topPaths.map(p => {
                console.log(`${p.path}              count: ${p.count}`)
            })
            console.log('skipped' + skipped);
            
        }
        
    }
}

main()

