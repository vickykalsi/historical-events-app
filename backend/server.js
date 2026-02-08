import "dotenv/config"
import express from "express"
import cookieParser from "cookie-parser"
import initDB from "./db/initDB.js"
import cors from "cors"
import authMiddleware from "./middlewares/authMiddleware.js"
import { authRouter, publicRouter } from "./routes/emperorRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

await initDB()

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1)
}

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.json())
app.use("/auth", authMiddleware, authRouter)
app.use("/", publicRouter)

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`)
})

