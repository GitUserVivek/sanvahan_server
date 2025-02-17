// imports
import express from "express";
import { Server as Socket } from "socket.io";
import http from 'http'
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'

// declarations
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ejs
app.set("view engine", "ejs")
console.log(path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());


// APIs
app.use((req, res, next) => {
    console.log(`got call on ${req.path}`)
    next()
})

app.get("/", (req, res) => {

    res.render("index");
})

let server = http.createServer(app)
let io = new Socket(server, {
    cors: {
        origin: "*",  // React development server URL
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

//  socket connections
io.on('connection', (socket) => {
    console.log(`A user connected ${socket.id}`);

    // send the location after taking the location
    socket.on('send-location', (data) => {
        io.emit("get-location", { id: socket.id, ...data })
    })
    // Handle disconnection
    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id)
        console.log(`user disconnected :  ${socket.id}`)
    });
});




// Starting the server on 5000
let PORT = 5000
server.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)

})