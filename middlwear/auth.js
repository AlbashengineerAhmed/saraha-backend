const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/User");
const roles = {
    User: 'User',
    Admin: 'Admin',
    Hr: "Hr"
}
const {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} = require('http-status-codes');

const auth = (accessRoles) => {
    return async (req, res, next) => {
        try {
            const headerToken = req.headers['authorization'];
            console.log(headerToken);
            if (!headerToken || headerToken == null || headerToken == undefined ||
                !headerToken.startsWith(`${process.env.bearerKey}`)) {
                res.json({ message: "in-valid header token" })
            } else {
                const token = headerToken.split(" ")[1]
                console.log(token);
                const decoded = jwt.verify(token, process.env.tokenSignature)
                console.log(decoded);
                if (!decoded.isLoggedIn) {
                    res.json({ message: "in-valid token payload" })
                } else {
                    const findUser = await userModel.findById(decoded.id).select("name email role")
                    console.log(findUser);
                    if (!findUser) {
                        res.json({ message: "in-valid user ID token" })
                    } else {

                        console.log({ accessRoles });
                        if (accessRoles.includes(findUser.role)) {
                            req.user = findUser
                            next()
                        } else {
                            res.status(StatusCodes.UNAUTHORIZED).json({ message: "not auth role user" })
                        }


                    }
                }
            }
        } catch (error) {
            res.json({ message: "catch error token", error })

        }



    }
}

module.exports = { auth , roles }