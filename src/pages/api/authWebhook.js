import { client } from '@/utils';

export default (req, res) => {
    if (req.method === 'POST') {
        if (client) {
            client.write(`data: ${JSON.stringify({ ...req.body })}\n\n`);
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
