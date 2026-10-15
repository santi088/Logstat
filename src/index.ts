import * as readline from "node:readline"
import * as fs from "node:fs"


function mem() {
  const m = process.memoryUsage();
  console.log(
    `RSS: ${(m.rss/1024/1024).toFixed(1)} MB | ` +
    `Heap: ${(m.heapUsed/1024/1024).toFixed(1)}/${(m.heapTotal/1024/1024).toFixed(1)} MB | ` +
    `Ext: ${(m.external/1024/1024).toFixed(1)} MB`
  );
}   

mem()

type PathCount = Record<string, number>
    type MsCount = {
        'max': number,
        'count': number,
        'sum': number
        }
    type StatusCount = Record<string, number>
    type TotalCounts = {
        'path': PathCount,
        'time': MsCount,
        "code": StatusCount,
    }

async function read(filepath:string) {
    const rl = readline.createInterface({
        input: fs.createReadStream(filepath),
        crlfDelay: Infinity,
    })

    

    const TotalCount: TotalCounts = {
        'path': {},
        'time': {
            'max': 0,
            'count': 0,
            'sum': 0
        },
        'code': {}
    }

    let skipped = 0

    for await (const chunk of stream){
        mem()
        //split line by line
        const array: string[] = chunk.split('\n')

        array.reduce((acc, a) => {     
            //a === one string line in the file
            //split === an array from that line
            const split: string[] = a.split(' ')
            if(split.length > 0) {}
            //too short or too long
            if (split.length !== 5
                || split[4]?.slice(-2) !== 'ms'
                || Number.isNaN(parseInt(split[3]))
                || Number.isNaN(parseInt(split[4]))
            ) {
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
                    ![...'0123456789', ...'=,:&', ' '].includes(char))
                
                const finalPath = cleaned[cleaned.length - 1] === '/' ? 
                    cleaned.slice(0, -1).join('') :
                    cleaned.join('')

                acc['path'][finalPath] = (acc['path'][finalPath] || 0) + 1
            }
            //return acc
            //---------------------PATHs--------------------------------

            const currentCode = split[3]

            if(currentCode !== undefined){
                const codeObject = acc['code']
                codeObject[currentCode] = (codeObject[currentCode] || 0) + 1
            } 

            const currentMs = split[4]
            const msNum = parseInt(currentMs)
            if(currentMs !== undefined){
                const timeObject = acc['time']
                timeObject.sum += msNum
                timeObject.max = timeObject.max < msNum ?  msNum : timeObject.max
                timeObject.count += 1
            }

            return acc

        }, TotalCount)
    }
    
    stream.destroy()
    return {TotalCount, skipped}
}

const args: string[] = process.argv.slice(2)

async function main() {
    mem()
    if (args.length > 0 && args[0] !== undefined) {
        const filepath = args[0]
        
        const {TotalCount, skipped} = await read(filepath)
        console.log(TotalCount);
        
        if (TotalCount['path']) {
            const pathArr = Object.entries(TotalCount['path'])
            
            const sortedPath = [...pathArr].sort((a, b) => b[1] - a[1])
            const topPaths = sortedPath
                .slice(0, 10)
                .map(p => {
                    return {
                        'path': p[0],
                        'count': p[1]
                    }
                    
                })
            
            console.log('Top Paths: ')
            topPaths.map(p => {
                console.log(`${p.path}              count: ${p.count}`)
            })
            console.log('\n');
            console.log('skipped: ' + skipped);
            console.log('\n');
            

            const codes = Object.entries(TotalCount['code'])
            codes.map((code) => {
                console.log(`code: ${code[0]}, count: ${code[1]}`);
            })

            console.log('\n');

            const times = TotalCount['time']
            console.log(`max: ${times.max}, avg: ${(times.sum / times.count).toFixed(2)}`);
            
            
        }
        return
    }
    console.log('Must pass a path to the file to be read...');
    return
}

main()

