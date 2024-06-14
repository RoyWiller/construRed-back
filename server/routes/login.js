const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

const router = require("express").Router();

router.post("/", async (req, res)=>{
    const { name, password } = req.body;

    if ( !!!name || !!!password ){
        return res.status(400).json(jsonResponse(400, {
            error: "Error completar los campos",
        }));
    };
    
    const user = await User.findOne({name});

    if (user){
        const correctPassword = await user.comparePassword(password, user.password)

        if (correctPassword){
            // Authenticate User
            res.status(200).json(jsonResponse(200, { user }));
        }else{
            res.status(400).json(jsonResponse(400, {
                error: "User or password are Incorrect"
            })
        );
        }
    }else{
        res.status(400).json(jsonResponse(400, {
            error: "User or password are Incorrect"
        })
    );
    }

});

module.exports = router;