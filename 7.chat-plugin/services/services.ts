const mongoose = require('mongoose');


const COLLECTION_NOT_FOUND = 'NamespaceNotFound';

const InitMongoDB = () => {

    const mongoDBUri = `mongodb://localhost:27017/chat`;
    // console.log(`mongoDBUri : [${mongoDBUri}]`);

    // db
    const mongoInstance = mongoose.connect(mongoDBUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    mongoose.connection.on('connected', function () {
        console.log(`Mongoose default connection is open at : [${mongoDBUri}]`);

    });

    mongoose.connection.on('error', function (err) {
        console.log(`Mongoose default connection has occurred  : ${err.message}`);
    });

    mongoose.connection.on('disconnected', function () {
        console.log(`Mongoose default connection is disconnected`);
    });
}


module.exports = {
    InitMongoDB
}
