import {Router} from "express"
import UserModel from "../models/user.model.js"

const router = Router()


router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, age} = req.body
    try {
        const existeUser = await UserModel.findOne({email: email})
        if(existeUser){
            return res.status(400).send("El correo electronico ya esta registrado")
        }

        const nuevoUser = await UserModel.create({first_name, last_name, email, password, age})

        req.session.user = {...nuevoUser._doc}

        res.status(200).send("Usuario creado con exito")

    } catch (error) {
        res.status(500).send("error interno")
    }
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body
    try {
        const usuario = await UserModel.findOne({email:email})
        if(usuario){
            if(usuario.password === password) {
                req.session.user = {
                    email: usuario.email,
                    age: usuario.age,
                    first_name: usuario.first_name,
                    last_name:usuario.last_name
                }
                res.redirect("/profile")
            }else{
                res.status(401).send("password incorrecto")
            }
        }else{
            res.status(404).send("usuario no encontrado")
        }
    } catch (error) {
        res.status(500).send("error interno")
    }
})


export default router