import * as readline from "node:readline"
import * as fs from "node:fs"


type PathCount = Record<string, number>
type StatusCount = Record<string, number>
type MsCount = {
    'max': number,
    'count': number,
    'sum': number
}
type TotalCounts = {
    'path': PathCount,
    'time': MsCount,
    "status": StatusCount,
}



function parseLogLine(line: string) {
    const arr: string[] = line.split(' ')

    const httpMethod = ['PUT', 'DELETE', 'GET', 'PATCH', 'POST', 'HEAD', 'OPTIONS']

    if(arr !== undefined){
        if(arr.length !== 5) return null

        const ms = parseInt(arr[4] ?? '0')
        if(isNaN(ms) || ms < 0) return null
        if(line.slice(-2) !== "ms") return null

        const status = parseInt(arr[3] ?? '0')
        if(isNaN(status)) return null
        if( status < 100 || status > 599) return null

        const path = arr[2] ?? ''
        if(path.length <= 0) return null

        const base = path.split("?")[0] ?? path
        const normalized = base.replace(/\/\d+(?=\/|$)/g, "/:id")
        // "/api/users/123?x=1" -> "/api/users/:id"

        if(normalized === '/:id' || !(normalized.startsWith('/'))) return null

        const method = arr[1] ?? ''
        if(!(httpMethod.includes(method))) return null

        return {
            'method': method,
            'path': normalized,
            'status': status,
            'ms': ms
        }    
    }
    return null
}

async function read(filepath: string) {

    const totalCount: TotalCounts = {
        'path': {},
        'time': {
            'max': 0,
            'count': 0,
            'sum': 0
        },
        'status': {},
    }

    let skipped = 0

    const rl = readline.createInterface({
            input: fs.createReadStream(filepath),
            crlfDelay: Infinity,
    })

    for await(const line of rl){
        
        const parsedLine = parseLogLine(line)
        if(parsedLine === null){
            skipped++
            continue
        }


        const path = parsedLine.path
        const status = parsedLine.status
        const ms = parsedLine.ms

        totalCount.path[path] = (totalCount.path[path] || 0) + 1
        totalCount.status[status] = (totalCount.status[status] || 0) + 1
        totalCount.time.max = ms > totalCount.time.max ? ms : totalCount.time.max
        totalCount.time.count += 1
        totalCount.time.sum += ms
    }

    return {totalCount, skipped}
}

const args: string[] = process.argv.slice(2)

async function main() {
    
    if (args.length > 0 && args[0] !== undefined) {
        const filepath = args[0]

        const {totalCount, skipped} = await read(filepath)
        
        console.log('\n');

        console.log('Skipped lines: ', skipped);
        
        console.log('\n');

        console.log('Top Paths'.padEnd(20), 'Count');

        const pathsObject = totalCount.path
        const topPaths = Object.entries(pathsObject)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)

        
        for (const path of topPaths) {
            console.log(path[0].padEnd(20), path[1]);
        }

        console.log('\n');
        
        
        console.log('Top Status'.padEnd(20), 'Count');
        
        const statusObject = totalCount.status
        const sortedStatus = Object.entries(statusObject)
            .sort((a, b) => b[1] - a[1])

        for (const s of sortedStatus) {
            console.log(s[0].padEnd(20), s[1])
        }


        const {max, count, sum} = totalCount.time
        const avg = count === 0 ? 'N/A' : (sum / count).toFixed(2)
        console.log('Max response time: ',  max);
        console.log('Average response time:', avg);
        
        return
    }
    console.log('Pass a path to the file: node src/betterLogStat.ts <file path>');
}

main()