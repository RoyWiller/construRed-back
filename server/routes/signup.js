const { jsonResponse } = require("../lib/jsonResponse");

const User = require('../schema/user');
const router = require("express").Router();

router.post("/", async function (req, res) {
    const { name, correo, puestoTrabajo, areaTrabajo, password } = req.body;

    if ( !!!name || !!!correo || !!!password || !!!puestoTrabajo || !!!areaTrabajo ){
        return res.status(400).json(jsonResponse(400, {
            error: "Error completar los campos",
        }));
    };

    // Crear usuario en la base de datos
    const user = new User({name, correo, puestoTrabajo, areaTrabajo, password});

    await user.save();
    res.status(200).json(jsonResponse(200, { message : "User created successfully" }));


});

module.exports = router;