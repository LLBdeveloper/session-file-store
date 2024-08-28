import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import handlebars from "express-handlebars"
import viewsRouter from "./routes/views.router.js"
import sessionRouter from "./routes/sessions.router.js"
import "./database.js" 


const app = express()
const PUERTO = 8080
const fileStore = FileStore(session)

//Handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views","./src/views")


//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(session({
    //3 opciones
    //memory storage:
    secret:"secretCoder",
    resave: true,
    saveUninitialized: true,

    // //file storage
    // store: new fileStore({path: "./src/sessions", ttl: 100, retries: 1}),

    //mongo Storage
//     store: MongoStore.create({
//         mongoUrl:"mongodb+srv://berteralautaro:admiadmi@backend2-cruster.i5dwz3i.mongodb.net/Login?retryWrites=true&w=majority&appName=backend2-Cruster"
//     })
}))

// //Rutas repaso de cookies
// app.get("/crearcuki", (req, res) => {
//     res.cookie("cuki", "esto es una cuki").send('cuki creada')
//     console.log('tuhermana')
// })

// app.get("/borrarcuki", (req,res) => {
//     res.clearCookie("cuki").send("cuki borrada")
// })


// //precticamos con sesion
// //Login
// app.get("/login", (req, res) =>{
//     let usuario = req.query.usuario
//     req.session.usuario = usuario
//     res.send("guardamos el usuario  por medio de una query")
// })

// app.get("/usuario", (req, res) => {
//     if(req.session.usuario){
//         return res.send(`el usuario registrado es el siguiente: ${req.session.usuario}`)
//     }
//     res.send("no tenemos un usuario registrado")
// })
////////////////////////////////



//Mi primer login
app.use("/", viewsRouter)
app.use("/api/sessions", sessionRouter)

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`)
})