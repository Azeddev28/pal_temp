import { updateClient } from '@/utils';

const requestHandler = (req, res) => {
    // TODO: Add logic to add to clients if its not already added.
    updateClient(res);
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Close the connection when the client disconnects
    req.on('close', () => {
        // Remove res from clients list
        updateClient({});
        res.end();
    });
};

export default requestHandler;
