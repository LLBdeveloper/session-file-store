import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'

const app = express()
const PUERTO = 8080

//Middleware
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret:"secretCoder",
    resave: true,
    saveUninitialized: true
}))

//Rutas repaso de cookies
app.get("/crearcuki", (req, res) => {
    res.cookie("cuki", "esto es una cuki").send('cuki creada')
    console.log('tuhermana')
})

app.get("/borrarcuki", (req,res) => {
    res.clearCookie("cuki").send("cuki borrada")
})


//precticamos con sesion
//Login
app.get("/login", (req, res) =>{
    let usuario = req.query.usuario
    req.session.usuario = usuario
    res.send("guardamos el usuario  por medio de una query")
})

app.get("/usuario", (req, res) => {
    if(req.session.usuario){
        return res.send(`el usuario registrado es el siguiente: ${req.session.usuario}`)
    }
    res.send("no tenemos un usuario registrado")
})

app.listen(PUERTO)