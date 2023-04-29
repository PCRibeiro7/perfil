import { writeFileSync } from 'fs';
import cards from './src/assets/categories.json';
import { ICard } from '@/models/game/ICard';
import { randomUUID } from 'crypto';

// const answers = cards.map(card => {
//     return card.answer;
// });

// writeFileSync('./src/assets/answers.json', JSON.stringify(answers));

// const categoryMapper = {
//     Pessoa: [
//         'Michael Jackson',
//         'Abraham Lincoln',
//         'Forrest Gump',
//         'Gabriel García Márquez',
//         'Vincent van Gogh',
//         'Meryl Streep',
//         'Usain Bolt',
//         'J. K. Rowling',
//         'Machado de Assis',
//         'David Bowie',
//         'Adele',
//         'Tom Hanks',
//         'Friedrich Nietzsche',
//         'Aretha Franklin',
//         'Jorge Luis Borges',
//         'Albert Einstein',
//         'Salvador Dalí',
//         'Serena Williams',
//         'Stephen Hawking',
//         'Nelson Mandela',
//         'Malala Yousafzai',
//         'Leonardo da Vinci',
//     ],
//     Lugar: [
//         'Brasil',
//         'Cidade de Deus',
//         'Austrália',
//         'Paris',
//         'Japão',
//         'Nova Iorque',
//         'Nova York',
//         'Machu Picchu',
//     ],
//     Coisa: [
//         'Telefone',
//         'Tigre',
//         'Sushi',
//         'O Poderoso Chefão',
//         'The Beatles',
//         'Pizza',
//         'Futebol',
//         'Cadeira',
//         'Máquina de Lavar',
//         'Relógio',
//         'Relógio de Parede',
//         'Cafeteira',
//         'Binóculos',
//         'Zelda Ocarina of Time',
//         'Clube da Luta',
//         'Minecraft',
//         'Queen',
//         'Matrix',
//         'Elefante',
//         'Xadrez',
//         'Câmera Fotográfica',
//         'Orangotango',
//     ],
//     Ano: ['1984'],
// };

// const categoryCards = cards.map((card: ICard) => {
//     const category = Object.keys(categoryMapper).find((key: string) => {
//         return categoryMapper[key as keyof typeof categoryMapper].includes(
//             card.answer,
//         );
//     });
//     return {
//         ...card,
//         category,
//     };
// });

// writeFileSync('./src/assets/categories.json', JSON.stringify(categoryCards));

const cardsWithIds = cards.map((card: ICard, index: number) => {
    return {
        ...card,
        id: randomUUID(),
    };
});

writeFileSync('./src/assets/cardsId.json', JSON.stringify(cardsWithIds));
