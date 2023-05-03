import { writeFileSync } from 'fs';
import cards from '../src/frontend/assets/cards.json';
import { ICard } from '@/frontend/models/game/ICard';
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

const mapper = {
    'Michael Jackson': ['Música', 'Cultura Pop'],
    'Abraham Lincoln': ['História', 'Política'],
    Telefone: ['Tecnologia'],
    Tigre: ['Natureza'],
    'Forrest Gump': ['Cinema', 'Ficção'],
    Sushi: ['Comida'],
    'Harry Potter': ['Literatura', 'Ficção'],
    'O Poderoso Chefão': ['Cinema'],
    'The Beatles': ['Música', 'Cultura Pop'],
    Brasil: ['Geografia', 'Cultura Pop'],
    'Sherlock Holmes': ['Literatura', 'Ficção'],
    Pizza: ['Comida'],
    Futebol: ['Esporte'],
    'Gabriel García Márquez': ['Literatura'],
    'Vincent van Gogh': ['Arte'],
    'Meryl Streep': ['Cinema'],
    'Usain Bolt': ['Esporte'],
    'J. K. Rowling': ['Literatura', 'Ficção'],
    'Machado de Assis': ['Literatura'],
    'David Bowie': ['Música', 'Cultura Pop'],
    Adele: ['Música', 'Cultura Pop'],
    'Tom Hanks': ['Cinema'],
    'O Senhor dos Anéis: O Retorno do Rei': ['Literatura', 'Ficção'],
    'Friedrich Nietzsche': ['Filosofia'],
    'Aretha Franklin': ['Música', 'Cultura Pop'],
    'Jorge Luis Borges': ['Literatura'],
    Cadeira: ['Tecnologia'],
    'Máquina de Lavar': ['Tecnologia'],
    Relógio: ['Tecnologia'],
    'Relógio de Parede': ['Tecnologia'],
    Cafeteira: ['Tecnologia', 'Comida'],
    Binóculos: ['Tecnologia'],
    'Cidade de Deus': ['Cinema'],
    Austrália: ['Geografia'],
    'Albert Einstein': ['Ciência', 'História'],
    'Zelda Ocarina of Time': ['Cultura Pop', 'Video Games'],
    Paris: ['Viagem', 'Cultura Pop'],
    Girafa: ['Natureza'],
    '1984': ['Literatura', 'Ficção'],
    Leão: ['Natureza'],
    Japão: ['Geografia', 'Cultura Pop'],
    'Lionel Messi': ['Esporte'],
    'Salvador Dalí': ['Arte'],
    'Nova Iorque': ['Geografia'],
    'Clube da Luta': ['Cinema', 'Ficção'],
    Minecraft: ['Video Games'],
    Queen: ['Música', 'Cultura Pop'],
    Matrix: ['Cinema', 'Ficção'],
    Elefante: ['Natureza'],
    'Nova York': ['Geografia'],
    Xadrez: ['Jogo'],
    'Serena Williams': ['Esporte'],
    'Stephen Hawking': ['Ciência'],
    'Nelson Mandela': ['História', 'Política'],
    'Câmera Fotográfica': ['Tecnologia'],
    'Malala Yousafzai': ['História', 'Política'],
    Orangotango: ['Natureza'],
    'Leonardo da Vinci': ['Arte', 'História'],
    'Machu Picchu': ['Geografia'],
};

const cardsWithIds = cards.map((card: ICard, index: number) => {
    const categories = mapper[card.answer as keyof typeof mapper];
    console.log(categories);
    return {
        ...card,
        categories,
    };
});
// .forEach(card => {
//     if (card.categories.length === 0) console.log(card);
// });

writeFileSync(
    './src/frontend/assets/newCards.json',
    JSON.stringify(cardsWithIds),
);
