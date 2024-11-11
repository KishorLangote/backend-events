const mongoose = require("mongoose")

const eventsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    date: {
        type: String,
    },
    eventMode: {
        type: [String],
        enum: [],
    },
    eventImageUrl: {
        type: String,
    },
    host: {
        type: [String],
        enum: ["Tech Experts", "Design Experts", "Marketing Experts", "Creative Content Experts", "CyberDefend Experts", "Data Pioneer Experts", "AI Pioneers Experts"],
    },
    hostImageUrl : {
        type: String,
    },
    details: {
        type: String,
    },
    dressCode: {
        type: [String],
        enum: [],
    },
    ageRestriction: {
        type: String,
        default: "18 and above",
    },
    eventTags: {
        type: [String],
        enum: [],
    },
    startEvent: {
        type: String,
    }, 
    endEvent: {
        type: String,
    },
    address: {
        type: String,
    },
    entryFee: {
        type: String,
    },
    speakersCount: {
        type: Number,
    },
    speakersImageUrl: {
        type: [String],
    },
    speakersName: {
        type: [String],
    },
    speakersDesignation: {
        type: [String],
    },

},{
    timestamps: true
})

const Event = mongoose.model("Event", eventsSchema)

module.exports = Event
