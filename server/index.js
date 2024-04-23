require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')
const routes = require('./routes/routes.js')
const errorHandling = require('./middleware/ErrorHandlingMiddleware')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 9000
const app = express()
app.use(cors({
    credentials: true,
    origin: 'http://localhost:9000'
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use('/api', routes)
// error handling 'cause **return, т.е сбрасывает слушатель сервака
// app.use(authMiddleware)
app.use(errorHandling)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
