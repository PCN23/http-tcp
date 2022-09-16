import net from 'net';
import chalk from 'chalk';

const logInfo = (...args) => console.log(chalk.cyan('[server]'), ...args);

export const jsonServe = (host, port) => {
    const jsonServe = net.createServer( (socket)  => {
    logInfo('A person connected get posts')
    socket.on('data', (data) => {
        const dataString = data.toString()
        logInfo('Some data:', dataString);
        const lines = dataString.split('\n')
        const startLine = lines[0];
        console.log('TESTING', startLine);
        const [method, path ] = startLine.split(' ');
        if (method === 'GET' && path === '/posts') {
            const body = {name: 'joe',
            Home: 'Portland',
            };
            const values = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: application/json

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