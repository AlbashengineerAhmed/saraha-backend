const { roles } = require("../../middlwear/auth");


const endPoint = {
    profile: [roles.User , roles.Admin, roles.Hr],
    updatename: [roles.Hr]
}

module.exports = endPoint