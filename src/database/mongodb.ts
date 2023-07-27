import {MongoClient} from "mongodb";


//const password = encodeURI(`${process.env.MONGO_INITDB_ROOT_PASSWORD}`);
// const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${password}@literalink-mongo-dev-1:27017`;
const uri = "mongodb://root:example@literalink-mongo-dev-1:27017/";
const dbConnect = new MongoClient(uri);

export  { dbConnect };
