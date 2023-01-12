const server = require('./src/app');
//const PORT = process.env.PORT || 3001;
console.log(process.env.PORT)

server.listen(3001, () => {
    console.log('%s listening at 3001');
});