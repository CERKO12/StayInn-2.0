import express from "express";
import { myDB } from "../db/MyDB.js";
import { ObjectId } from "mongodb";

const router = express.Router();


router.post("/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;
  const newRoom = {...req.body};
  const roomNumbers = [{ number: req.body.roomNumbers, unavailableDates: [] }];
  for (let key in newRoom) {
    if (key === "maxPeople" || key === "price") {
        newRoom[key] = parseInt(newRoom[key]);
    } else if (key === "roomNumbers") {
      newRoom[key] = roomNumbers;
    }
  }

  try {
    const savedRoom = await myDB.addRoom(hotelId, newRoom);
    try {
      await myDB.updateHotelById(hotelId, {
        $push: { rooms: savedRoom.insertedId },
      });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put("/:id", async (req, res) => {
  try {
    const updatedRoom = await myDB.updateRoomById(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(updatedRoom);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update availablitiy
router.put("/availability/:hotelId/:number", async (req, res) => {
  try {
    const dates = req.body.dates;
    await dates.map((date) => {
      myDB.updateRoomAvailability(req.params.hotelId, req.params.number, {
        $push: { "roomNumbers.$.unavailableDates": date },
      });
    });
    res.status(200).json("Room dates has been updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:roomId/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;
  const objectId = new ObjectId(req.params.roomId);
  try {
    await myDB.deleteRoomById(req.params.roomId);

    try {
      await myDB.updateHotelById(hotelId, { $pull: { rooms: objectId } });
    } catch (err) {
      res.status(500).json(err);
    }
    res.status(200).json("Room has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a room
router.get("/:id", async (req, res) => {
  try {
    const room = await myDB.getRoomById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all rooms
router.get("/", async (req, res) => {
  try {
    const allRooms = await myDB.getAllRooms();
    res.status(200).json(allRooms);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
