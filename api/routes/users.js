import express from "express"
import {myDB} from "../db/MyDB.js";
import { ObjectId} from "mongodb";

const router = express.Router();

// update
router.put("/:id", async (req, res) => {
    console.log(req.body);
    try {
        const updatedUser = await myDB.updateUserById(req.params.id, req.body);
        res.status(200).json(updatedUser)
    } catch(err){
        res.status(500).json(err)
    }
})

// delete
router.delete("/:id", async (req, res) => {
    try {
        await myDB.deleteUserById(req.params.id);
        res.status(200).json("User has been deleted.")
    } catch(err){
        res.status(500).json(err)
    }
})

// get a user
router.get("/:id", async (req, res) => {
    try {
        const id = {_id: new ObjectId(req.params.id)};
        const user = await myDB.getUser(id);
        res.status(200).json(user)
    } catch(err){
        res.status(500).json(err)
    }
})

// get all users
router.get("/", async (req, res) => {
    try {
        const allUsers = await myDB.getAllUsers();
        res.status(200).json(allUsers)
    } catch(err){
        res.status(500).json(err)
    }
})

export default router