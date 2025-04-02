const userModel = require("../../../DB/model/User")
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const signup = async (req, res) => {
    try {
        const { name, email, password , age , phone } = req.body
        // name =5
        const newUser = new userModel({ name, email, password ,age , phone  });
        const savedUser = await newUser.save()
        res.status(201).json({ message: "Done" })
    } catch (error) {
        console.log(error.keyValue);
        const validationErrorArr = [{message:"email exist"}]
        if (error.keyValue?.email) {
            res.status(StatusCodes.NOT_FOUND).json({ message: "email exist" , err: validationErrorArr })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "catch error", error , status: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) })
        }
    }
}
module.exports = signup