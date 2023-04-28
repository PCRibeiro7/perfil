import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/cards';

test('returns cards', async () => {
    const response = await axios.get(baseUrl);
    console.log('oie');
    expect(response.status).toBe(200);
});
