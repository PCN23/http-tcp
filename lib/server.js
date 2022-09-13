import net from 'net';
import chalk from 'chalk';

const logInfo = (...args) => console.log(chalk.cyan('[server]'), ...args);

export const serve = (host, port) => {
    const server = net.createServer((socket) => {
        logInfo('A person connected')
        socket.on('data', (data) => {
            const dataString = data.toString()
            logInfo('Some data:', dataString);
            const lines = dataString.split('\n')
            const startLine = lines[0];
            console.log('TESTING', startLine);
            const [method, path] = startLine.split(' ');
            if (method === 'GET' && path === '/') {
                const body = `<html>
<main>
<body>
<h1> Soccer </h1>
<h2>Puri FC</h2>
<h2>Schedule</h2>
<h2>Time</h2>
<h2>Place</h2>
</body>
</main>
</html>`;
                const values = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html

${body}`;
                socket.write(values)
            } else if (method === 'GET' && path == '/posts') {
                const jsonBody = JSON.stringify({
                    "name": "Pedro",
                    "age": "28",
                    "occupation": "Software engineer",
                    "city": "Portland",
                });
                const values = `HTTP/1.1 200 Ok
Content-Length: ${jsonBody.length}
Content-Type: application/json

${jsonBody}`
                socket.write(values)
            } else if (method === 'POST' && path == '/mail') {
                const pBody = "You posted with great success"
                const values = `HTTP/1.1 204 Ok
Content-Length: ${pBody.length}
Content-Type: text/plain

${pBody}`
socket.write(values)
            }
        })
            .on('close', () => {
                logInfo('Socket is closed!');
            })
            .on('error', (err) => {
                logInfo('Error with connection', err);
            });
    });
server.listen(port, host,  () => {
    logInfo('Server is alive');
});
logInfo('Attempting to start server');
return server;
}