import { client } from '@/utils';

export default (req, res) => {
    if (req.method === 'GET') {
        if (client) {
            const randomValue = Math.random().toFixed(2);
            client.write(`data: Random Value: ${randomValue}\n\n`);
        }
        const response = {
            message: 'Message updated successfully',
        };

        // Set the response status code to 200 (OK)
        res.status(200).json(response).end();
    } else {
        // Set the response status code to 405 (Method Not Allowed)
        res.status(405).end();
    }
};
