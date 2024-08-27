import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://berteralautaro:admiadmi@backend2-cruster.i5dwz3i.mongodb.net/Login?retryWrites=true&w=majority&appName=backend2-Cruster")
    .then(() => console.log("Conexion mongoose exitosa!"))
    .catch(()=> console.log("Error al conectar mongoose"))