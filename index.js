const server = require('./src/app');
const { SERVER_PORT } = require('./src/common/server')
const db = process.env.DATABASE_URL
//console.log('db',db)

server.listen(SERVER_PORT, () => {
    console.log(`Listening at port ${SERVER_PORT}`);
});

server.timeout = 10000;