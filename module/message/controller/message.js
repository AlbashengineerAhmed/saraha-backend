const messageModel = require("../../../DB/model/Message");
const userModel = require("../../../DB/model/User");
const sendMessage = async (req, res) => {
    try {
        const { id } = req.params; // receiverId
        const messageBody = req.body.messageBody
        const { senderId } = req.query
        const user = await userModel.findById(id).select('name') // null {}
        if (!user) {
            res.json({ message: "in-valid receiver account ID" })
        } else {
            if (senderId) {
                const senderUser = await userModel.findById(senderId)
                if (senderUser) {
                    const data = await messageModel.insertMany({ messageBody, receiverId: user._id, senderId })
                    res.json({ message: "Done", data })
                } else {
                    res.json({ message: "in-valid login user" })
                }
            } else {
                const data = await messageModel.insertMany({ messageBody, receiverId: user._id })
                res.json({ message: "Done", data })
            }

        }
    } catch (error) {
        res.json({ message: "catch error", error })

    }
}

const messageList = async (req, res) => {
    try {
    const messages = await messageModel.find({ receiverId: req.user._id }).select("-senderId")
        res.json({ message: "Done", messages })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

const messageByMeList = async (req, res) => {
    try {
        const messages = await messageModel.find({ senderId: req.user._id }).populate([{
            path: "receiverId",
            select: "name email"
        }, {
            path: "senderId",
            select: "name email"
        }])
        res.json({ message: "Done", messages })
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}


const deleteMessage = async (req, res) => {
    try {
        const message = await messageModel.deleteOne({
            receiverId: req.user._id,
            _id: req.params.id
        })
        if (message.deletedCount) {
            res.json({ message: "Done", message })
        } else {
            res.json({ message: "in-valid message id or u are not auth" })
        }
    } catch (error) {
        res.json({ message: "catch error", error })
    }
}

module.exports = { sendMessage, messageList, messageByMeList, deleteMessage }