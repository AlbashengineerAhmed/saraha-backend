const userModel = require("../../../DB/model/User")



const profile = async (req, res) => {
    try {
        console.log({ userAuthData: req.user });
        const user = await userModel.findById(req.user._id);
        res.json({ message: "Done", user })
    } catch (error) {
        res.json({ message: "catch error", error })

    }

}


const updateProfilePic = async (req, res) => {
try {
    if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
    }

    const imageURL = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`;

    const user = await userModel.findByIdAndUpdate(
    req.user._id,
    { profilePic: imageURL },
    { new: true }
    );

    res.json({ message: "Profile picture updated", user });
} catch (error) {
    console.error("Error updating profile pic:", error);
    res.status(500).json({ message: "Server error", error });
}
};


const updateProfilecovPic = async (req, res) => {
    try {
        if (req.fileErr) {
            res.json({ message: "in-valid file format" })
        } else {
            console.log({ contFile: req.files });
            //  const imageURL = `${req.protocol}://${req.headers.host}/uploads/${req.file.filename}`
            const imageURLs = []
            for (let i = 0; i < req.files.length; i++) {
                imageURLs.push(`${req.finalDistination}/${req.files[i].filename}`)
            }
            const user = await userModel.findOneAndUpdate(req.user._id,
                { coverPic: imageURLs }, { new: true });
            res.json({ message: "Done", user })
        }

    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = {
    profile,
    updateProfilePic,
    updateProfilecovPic
}