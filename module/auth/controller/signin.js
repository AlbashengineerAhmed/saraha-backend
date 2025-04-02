const userModel = require("../../../DB/model/User");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }) // {} Null
        if (!user) {
            res.json({ message: "in-valid account email" })
        } else {
            const match = await bcrypt.compare(password, user.password) // T F
            if (!match) {
                res.json({ message: "in-valid password" })
            } else {
                const token = jwt.sign({ id: user._id, isLoggedIn: true },
                    process.env.tokenSignature, { expiresIn: '1h' })
                res.json({ message: "Done", token })
            }
        }
    } catch (error) {
        res.json({ message: "catch error", errors })
    }
}

module.exports = signin