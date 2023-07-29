const { MongoClient  } = require("mongodb");

const uri = "mongodb://root:example@literalink-mongo-dev-1:27017/";
const pool = new MongoClient(uri, { maxPoolSize: 20 });

export { pool };
