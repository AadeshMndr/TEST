import { MongoClient } from "mongodb";

const accessDB = async ({ DB, collection, action, data }) => {
  try { 

    const client = await MongoClient.connect(
      `mongodb+srv://admin:admin@cluster0.yehti2l.mongodb.net/${DB}?retryWrites=true&w=majority`
    );

    const db = client.db();

    const selectedCollection = db.collection(collection);


    let result = await action(data, selectedCollection);

    client.close();

    return result;

  } catch (err) {
    console.log(err.message);

    return err;
  }
};

export default accessDB;

export const getAll = async ({ DB, collection }) => {

  const action = async (data, collection) => {
    let result = await collection.find().toArray();
    return result;
  }

  let result = [];
  
  try {
    result = await accessDB( {DB, collection, data: null, action} );

  } catch (err) {
    console.log(err);
  }

  return result;
}



