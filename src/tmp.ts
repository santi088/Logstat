type PathCount = Record<string, number>
type MsCount = Record<string, number>
type StatusCount = Record<number, number>
type TotalCounts = {
    'path': PathCount,
    'time': MsCount,
    "code": StatusCount,
}