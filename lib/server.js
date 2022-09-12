import net from 'net';
import chalk from 'chalk';

const logInfo = (...args) => console.log(chalk.cyan('[server]'), ...args);

export const serve = (host, port) => {
    const server = net.createServer( (socket)  => {
    logInfo('A person connected')
    socket.on('data', (data) => {
        const dataString = data.toString()
        logInfo('Some data:', dataString);
        const lines = dataString.split('\n')
        const startLine = lines[0];
        console.log('TESTING', startLine);
        const [method, path ] = startLine.split(' ');
        if (method === 'GET' && path === '/') {
            const body = `<html>
<main>
<body>
<h1> Soccer </h1>
</body>
</main>
</html>`;
            const values = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html

${body}`
            socket.write(values)
        } else {
            socket.write(data.toString());
        }
    });
});
server.listen(port, host,  () => {
    logInfo('Server is alive');
});
logInfo('Attempting to start server');
return server;
}