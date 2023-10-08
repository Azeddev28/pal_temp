let clients = [];

const requestHandler = (req, res) => {
    // TODO: Add logic to add to clients if its not already added.
    clients.push(res);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for (const client of clients) {
        // Send an event to the client
        const randomValue = Math.random().toFixed(2);
        client.write(`data: Random Value: ${randomValue}\n\n`);
    }

    // Close the connection when the client disconnects
    req.on('close', () => {
        // Remove res from clients list
        clients = clients.filter((client) => client !== res);
        res.end();
    });
};

export default requestHandler;
