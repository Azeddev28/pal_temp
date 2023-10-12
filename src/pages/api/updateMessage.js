import { setEventMessage } from '@/store/authSlice';
import { makeStore } from '@/store/store';
import { client } from '@/utils';

export default (req, res) => {
    if (req.method === 'POST') {
        const store = makeStore();
        if (client && store) {
            store.dispatch(setEventMessage({ ...req.body }));
            client.write(
                `data: Message: ${JSON.stringify({ ...req.body })}\n\n`
            );
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
