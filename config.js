exports.DATABASE_URL = process.env.DATABASE_URL ||
                            global.DATABASE_URL ||
                            'mongodb://localhost/capstone2';
exports.PORT = process.env.PORT || 8080;