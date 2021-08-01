const express = require('express');
const Chat = require("../models/Chat.model.ts");
const router = express.Router();
const util = require('util') /**use to implement console.dir in CLI */

/**
 *
 * Create and store new academy
 * @param {string} chat.leadEmail
 * @param {string} chat.leadName
 * @param {string} chat.roomId
 * @param {Array<RuleCondition>} chat.messages
 * @param {string} chat.createdAt
 * @param {string} chat.updatedAt
 * @param {boolean} chat.deleted
 * Endpoint : POST http://localhost:<port>/chat
 */

router.post("/", async (req, res) => {
    const {
        leadEmail,
        leadName,
        roomId,
        messages
    } = req.body;


    const chatInstance = new Chat({
        leadEmail,
        leadName,
        roomId,
        messages
    });

    try {
        const resp = await chatInstance.save((err) => console.log(err));
        res.status(201).json(resp);

    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }

});

/**
 * Get a specific rule
 * @param {objectId} id 
 * @return {msgs}
 * Endpoint : GET http://localhost:<port>/chat/<id>
 */
router.get("/getAllRooms/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const resp = await Chat.find({ accountId: parseInt(id) }, 'leadName leadEmail roomId messages');
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

/**
 * Get a specific rule
 * @param {objectId} id 
 * @return {msgs}
 * Endpoint : GET http://localhost:<port>/chat/<id>
 */
router.get("/getMsgs/:id", async (req, res) => {
    try {
        const leadEmail = req.params.id;
        const resp = await Chat.findOne({ leadEmail: leadEmail }, 'messages leadName');
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

/**
 * Update a specific rule
 * @param {Array<msg>} rooms.msgs
 * @param {boolean} rule.deleted
 * @return {Notification}
 * Endpoint : PUT http://localhost:<port>/chat/<id>
 */
router.put("/storeMessage/:id", async (req, res) => {
    try {
        const leadEmail = req.params.id;
        const message = req.body;
        const resp = await Chat.updateOne({ leadEmail: leadEmail }, { $push: { messages: message } });
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(400).json(err.message);
        console.log(err);
    }
});

router.put("/updateRoomId/:id", async (req, res) => {
    try {
        const leadEmail = req.params.id;
        const roomId = req.body.roomId;
        const resp = await Chat.updateOne({ leadEmail: leadEmail }, { roomId: roomId });
        res.status(200).json(resp);
    }
    catch (err) {
        res.status(400).json(err.message);
        console.log(err);
    }
});

module.exports = router