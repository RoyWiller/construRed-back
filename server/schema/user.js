const Mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const UserSchema = new Mongoose.Schema({
    id: { type: Object },
    name: { type: String, required: true, unique: true },
    correo: { type: String, required: true},
    puestoTrabajo: { type: String, required: true},
    areaTrabajo: { type: String, required: true},
    password: { type: String, required: true},
});

UserSchema.pre("save", function(next){
    if (this.isModified("password") || this.isNew){
        const document = this;

        bcrypt.hash(document.password, 10, (err, hash) =>{
            if (err){
                next(err);
            }else{
                document.password = hash;
                next();
                
            }
        });
    }else{
        next();
    }
});

// UserSchema.methods.usernameExist = async function (name){
//     const result = await Mongoose.model("User").findOne({name})
//     return !!result;
// };
UserSchema.methods.comparePassword = async function (password, hash) {
    const same = await bcrypt.compare(password, hash);
    return same;
};

module.exports = Mongoose.model("User", UserSchema);