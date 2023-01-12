const server = require('./src/app');
const { SERVER_PORT } = require('./src/common/server')

server.listen(SERVER_PORT, () => {
    console.log(`Listening at port ${SERVER_PORT}`);
});