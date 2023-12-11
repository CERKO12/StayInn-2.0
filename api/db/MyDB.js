import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

function MyDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
  const myDB = {};

  const connect = () => {
    const client = new MongoClient(uri);
    const db = client.db("project_3");

    return { client, db };
  };

  // users
  myDB.addUser = async (query) => {
    const { client, db } = connect();
    const usersCollection = db.collection("users");

    try {
      return await usersCollection.insertOne(query);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getUser = async (query) => {
    const { client, db } = connect();
    const usersCollection = db.collection("users");
    try {
      return await usersCollection.findOne(query);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateUserById = async (query, updated) => {
    const { client, db } = connect();
    const usersCollection = db.collection("users");

    const filter = { _id: new ObjectId(query) };
    try {
      const result = await usersCollection.updateOne(filter, { $set: updated });
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteUserById = async (query) => {
    const { client, db } = connect();
    const usersCollection = db.collection("users");

    const id = { _id: new ObjectId(query) };
    try {
      const result = await usersCollection.deleteOne(id);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document");
      } else {
        console.log("No documents matched the query");
      }
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getAllUsers = async () => {
    const { client, db } = connect();
    const usersCollection = db.collection("users");

    try {
      return await usersCollection.find().toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // hotels
  myDB.addHotel = async (query) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");
    try {
      return await hotelsCollection.insertOne(query);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateHotelById = async (query, updated) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");

    const filter = { _id: new ObjectId(query) };
    try {
      const result = await hotelsCollection.updateOne(filter, updated);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteHotelById = async (query) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");

    const id = { _id: new ObjectId(query) };
    try {
      const result = await hotelsCollection.deleteOne(id);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document");
      } else {
        console.log("No documents matched the query");
      }
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getHotelById = async (query) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");
    const id = { _id: new ObjectId(query) };
    try {
      return await hotelsCollection.findOne(id);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getAllHotels = async (query) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");
    if (query.featured) query.featured = query.featured === "true" || false;
    const { min, max, limit, ...others } = query;
    try {
      if (limit)
        return await hotelsCollection
          .find({
            ...others,
            cheapestPrice: {
              $gt: parseInt(min) || 1,
              $lt: parseInt(max) || 99999,
            },
          })
          .limit(parseInt(limit))
          .toArray();
      else
        return await hotelsCollection
          .find({
            ...others,
            cheapestPrice: {
              $gt: parseInt(min) || 1,
              $lt: parseInt(max) || 99999,
            },
          })
          .toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getHotelCountByCity = async (city) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");
    const query = { city: city };
    try {
      return await hotelsCollection.countDocuments(query);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getHotelCountByType = async (type) => {
    const { client, db } = connect();
    const hotelsCollection = db.collection("hotels");
    const query = { type: type };
    try {
      return await hotelsCollection.countDocuments(query);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  // rooms
  myDB.addRoom = async (hotelId, newRoom) => {
    const { client, db } = connect();
    const roomsCollection = db.collection("rooms");
    const query = { ...newRoom, hotelId: hotelId };

    try {
      return await roomsCollection.insertOne(query);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateRoomById = async (query, updated) => {
    const { client, db } = connect();
    const roomsCollection = db.collection("rooms");
    const filter = { _id: new ObjectId(query) };
    try {
      const result = await roomsCollection.updateOne(filter, updated);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.updateRoomAvailability = async (hotelId, number, updated) => {
    const { client, db } = connect();
    const roomsCollection = db.collection("rooms");
    const filter = { "hotelId" : hotelId, "roomNumbers.number": number };
    try {
      const result = await roomsCollection.updateOne(filter, updated);
      console.log(
        `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
      );
      return result;
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.deleteRoomById = async (roomId) => {
    const { client, db } = connect();
    const roomsCollection = db.collection("rooms");

    const id = { _id: new ObjectId(roomId) };
    try {
      const result = await roomsCollection.deleteOne(id);
      if (result.deletedCount === 1) {
        console.log("Successfully deleted one document");
      } else {
        console.log("No documents matched the query");
      }
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getRoomById = async (roomId) => {
    const { client, db } = connect();
    const roomsCollection = db.collection("rooms");
    const id = { _id: new ObjectId(roomId) };
    try {
      return await roomsCollection.findOne(id);
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  myDB.getAllRooms = async () => {
    const { client, db } = connect();
    const roomsCollection = db.collection("rooms");

    try {
      return await roomsCollection.find().toArray();
    } finally {
      console.log("db closing connection");
      client.close();
    }
  };

  return myDB;
}
export const myDB = MyDB();
