const { MongoClient  } = require("mongodb");

const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@literalink-mongo-dev-1:27017/`;
const pool = new MongoClient(uri, { maxPoolSize: 20 });

export { pool };