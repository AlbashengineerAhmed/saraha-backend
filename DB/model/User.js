const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // gender:{
    //     type: String,
    //     required: true
    // },
    age:{
        type: Number,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    profilePic: String,
    coverPic: Array,

    emailConfirm: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'User'
    },
}, {
    timestamps: true
})


userSchema.pre('save', async function (next) {
    console.log(this);
    this.password = await bcrypt.hash(this.password, parseInt(process.env.saltRound))
    console.log(this);
    next()
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel