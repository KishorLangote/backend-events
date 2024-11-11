const express = require("express")
require("dotenv").config()
const app = express()

const cors = require("cors")  // this import the middleware which help to handle cross origin request..
const corsOptions = {
    origin: "*",              // this allows request from any origin..
    credentials: true,        // this allows cookies, authorization headers, TLS certi.. 
    optionSuccessStatus: 200, // set status code 200 for successful requests..
}

app.use(cors(corsOptions))   // this is cors middleware, allowing the brrowser to make cross origin request to the server..

const { initializeDatabase } = require("./db/db.connect")
const Event = require("./models/events.models")

app.use(express.json()) // middleware

initializeDatabase() // call the database..



const newEvent = {
    title: "New Conference",
    date: "Thu Jul 13 202 * 7:00:00 AM IST",
    eventMode: "Offline Event",
    eventImageUrl: "https://media.istockphoto.com/id/1155374981/photo/we-can-make-everything-very-easy-for-ourselves.jpg?s=612x612&w=0&k=20&c=1kG0jdZgUB8RjzSyTfN5MjAJvynTqtar6oKXi6jyM-s=",
    host: "Tech Experts",
    hostImageUrl: "https://media.istockphoto.com/id/1133983188/photo/male-speaker-speaks-in-a-business-seminar.jpg?s=612x612&w=0&k=20&c=00MEYZfi4lc9TvPpa50wAEhmScOaRafXj84YXUf5Ugs=",
    details: "The Tech Conference is a gathering designed to showcase advancements in technology, innovation, and industry trends. It typically features keynote speakers, panels, workshops, and networking events that span fields such as software development, artificial intelligence, cybersecurity, and more. Attendees include industry professionals, tech enthusiasts, and companies seeking to explore and discuss emerging technologies, best practices, and future possibilities.",
    dressCode: ["Smart Casual", "Smart Formal"],
    ageRestriction: "18 and above",
    eventTags: ["marketing", "digital"],
    address: "Tech City, 456 Tech Avenue, City",
    entryFee: "3,500",
    speakersCount: 2,
    speakersImageUrl: ["https://media.istockphoto.com/id/1361340420/photo/portrait-of-a-smiling-african-young-woman-in-a-shirt.jpg?s=612x612&w=0&k=20&c=m9KEh71i_VgPCYZ7ASWp9e9UDr1mjhL-wayVcQFwhe4=", "https://media.istockphoto.com/id/1347368796/photo/studio-portait.jpg?s=612x612&w=0&k=20&c=Ti41F0AD-YgP7tjD4nlTuFcNoqI4RrR57GqF589t_Q8="],
    speakersName: ["Smith Carl", "john Doe"],
    speakersDesignation: ["Tech Manager", "SEO Specialist"]
}


app.get("/", (req, res) => {
    res.send("Hello, Express!")
})

// app.get("/events", (req, res) => {
//     res.send(newEvent)
// })

// create a new events : 

async function createEvent(newEvent){
    try {
        const events = new Event(newEvent)
        const saveEvent = await events.save()
        console.log("new event added:", saveEvent)
    } catch (error) {
        throw error
    }
}

// createEvent(newEvent)

// write route for creating a new event entry in a database via postman. : POST METHOD - 

app.post("/events", async (req, res) => {
    try {
        const saveEvent = await createEvent(req.body)
        res.status(201).json({message: "Event added successfully.", event: saveEvent})
        // console.log(saveEvent)
    } catch (error) {
        res.status(500).json({error: "Failed to add event."})
    }
})

// to get all the events in the database

 async function readAllEvents(){
    try{
        const allEvents = await Event.find()
        return allEvents
    } catch (error){
        console.log(error)
    }
 }

 app.get("/events", async (req, res) => {
    try {
        const events = await readAllEvents()
        if(events.length > 0) {
            res.json(events)
        } else {
            res.status(404).json({error: "No event found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch events."})
    }
 })

//  readAllEvents()

// read event by id : 

async function readEventById(eventId){
    try {
        const eventById = await Event.findById(eventId)
        return eventById
    } catch (error) {
        throw error
    }
}

app.get("/events/:eventId", async (req, res) => {
        try {
            const events = await readEventById(req.params.eventId)
            if(events){
                res.json(events)
            } else {
                res.status(404).json({error: "Event not found."})
            }
        } catch (error) {
            res.status(500).json({error: "Failed to fetch event."})
        }
    })

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on the port ${PORT}`)
})