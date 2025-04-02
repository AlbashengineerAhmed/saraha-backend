const { auth } = require('../../middlwear/auth')
const {myMulter , multerValidators , multerPath} = require('../../services/multerRev')
const { profile, updateProfilePic, updateProfilecovPic } = require('./controller/profile')
const endPoint = require('./user.endPoint')

const router = require('express').Router()



router.get("/profile", auth(endPoint.profile), profile)

router.patch("/profile/pic", auth(endPoint.profile  ) , myMulter(multerPath.profilePic , multerValidators.image).single('image'), updateProfilePic)
router.patch("/profile/cover", auth(endPoint.profile) , myMulter(multerPath.covPic , multerValidators.image).array('image' ,5), updateProfilecovPic)



module.exports = router