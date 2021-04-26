const jwt = require('express-jwt')

const jwtCheck = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
})

module.exports = {
    jwtCheck,
};
