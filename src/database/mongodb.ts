import {MongoClient} from "mongodb";

const user = process.env.MONGO_INITDB_ROOT_USERNAME;
const password = encodeURIComponent(`${process.env.MONGO_INITDB_ROOT_PASSWORD}`);
//const password = process.env.MONGO_INITDB_ROOT_PASSWORD;
const url = process.env.MONGO_CONN_URL;
const uri = `mongodb://${user}:${password}@${url}:27017/`;
//const uri = "mongodb://root:example@literalink-mongo-dev-1:27017/";


const dbConnect = new MongoClient(uri);

export  { dbConnect };
