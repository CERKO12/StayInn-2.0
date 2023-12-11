import express from "express";
import { myDB } from "../db/MyDB.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// create
router.post("/", async (req, res) => {
  const newHotel = { rooms: [], ...req.body };
  const photos = [req.body.photos];
  for (let key in newHotel) {
    if (key === "rating" || key === "cheapestPrice") {
      newHotel[key] = parseInt(newHotel[key]);
    } else if (key === "photos") {
      newHotel[key] = photos;
    }
  }
  try {
    const savedHotel = await myDB.addHotel(newHotel);
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update
router.put("/:id", async (req, res) => {
  const newHotel = req.body;
  for (let key in newHotel) {
    if (key === "rating" || key === "cheapestPrice") {
      newHotel[key] = parseInt(newHotel[key]);
    } 
  }

  try {
    const updatedHotel = await myDB.updateHotelById(req.params.id, {
      $set: newHotel,
    });
    res.status(200).json(updatedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete
router.delete("/:id", async (req, res) => {
  try {
    await myDB.deleteHotelById(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a hotel
router.get("/find/:id", async (req, res) => {
  try {
    const hotel = await myDB.getHotelById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all hotels
router.get("/find/", async (req, res) => {
  try {
    const allHotels = await myDB.getAllHotels(req.query);
    res.status(200).json(allHotels);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get count of hotels by city
router.get("/countByCity", async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return myDB.getHotelCountByCity(city);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get count of hotels by type
router.get("/countByType", async (req, res) => {
  try {
    const hotelCount = await myDB.getHotelCountByType("hotel");
    const apartmentCount = await myDB.getHotelCountByType("apartment");
    const resortCount = await myDB.getHotelCountByType("resort");
    const villaCount = await myDB.getHotelCountByType("villa");
    const cabinCount = await myDB.getHotelCountByType("cabin");

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all rooms of hotel
router.get("/room/:id", async (req, res) => {
  try {
    const hotel = await myDB.getHotelById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        const objectId = new ObjectId(room);
        return myDB.getRoomById(objectId);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
