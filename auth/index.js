/*
/api/auth/login - User Login

*/

const {router} = require('./router');
const {basicStrategy, jwtStrategy} = require('./strategies');

module.exports = {router, basicStrategy, jwtStrategy};
