exports.DATABASE_URL = process.env.DATABASE_URL ||
                            global.DATABASE_URL ||
                            'mongodb://thejesseshaw:Mbdtf87!@ds139964.mlab.com:39964/capstone2'
exports.PORT = process.env.PORT || 8080;