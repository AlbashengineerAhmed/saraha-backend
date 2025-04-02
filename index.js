require('dotenv').config()
const express = require('express');
const connectDB = require('./DB/connection');
const moduleRouter = require('./module/index.router');
const cors = require('cors');
const path = require("path")
const app = express();
const port = process.env.PORT
app.use(cors({}))
app.use(express.json())
// app.use("/api/v1/uploads", express.static(path.join(__dirname, './services/uploads')))
// app.use(moduleRouter.authRouter,
//     moduleRouter.userRouter,
//     moduleRouter.messageRouter)
app.use('/api/v1/auth',moduleRouter.authRouter)
// app.use('/api/v1/user',moduleRouter.userRouter)
app.use('/api/v1',moduleRouter.messageRouter)



connectDB()
app.listen(port, () => console.log(`server is running on port ${port}`))