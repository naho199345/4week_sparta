const mongoose = require('mongoose');

// const connect = () => {
//     mongoose.connect('mongodb://test:test@3.36.71.17:27017/admin', { ignoreUndefined:true }).catch((err) => {
//         console.error(err);
//     })
// };

// // ec2
const connect = () => {
    mongoose.connect('mongodb://localhost:27017/spa_article', { ignoreUndefined:true }).catch((err) => {
        console.error(err);
    })
};

module.exports = connect;