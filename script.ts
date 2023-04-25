const { readFileSync, writeFileSync } = require('fs');

const text = readFileSync('./cartas.txt', 'utf8');
const lines = text.split('\n').filter((l: string) => l);

const result: any[] = [];
[...Array(40).keys()].forEach((i: number) => {
    result.push({
        type: lines[12 * i].split(' ')[lines[12 * i].split(' ').length - 1],
        answer: lines[12 * i + 1],
        tips: [
            lines[12 * i + 2],
            lines[12 * i + 3],
            lines[12 * i + 4],
            lines[12 * i + 5],
            lines[12 * i + 6],
            lines[12 * i + 7],
            lines[12 * i + 8],
            lines[12 * i + 9],
            lines[12 * i + 10],
            lines[12 * i + 11],
        ],
    });
});
writeFileSync('./cartas.json', JSON.stringify(result, null, 4));
