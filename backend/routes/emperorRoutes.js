import express from "express"
import { loginLogic, getEventsLogic, addEventsLogic, logoutLogic, signupLogic, idLogic,editUsernameLogic,removeEventsLogic,likedEventsLogic } from "../controllers/emperorControllers.js"

const authRouter = express.Router(), publicRouter = express.Router()

publicRouter.post("/", loginLogic)
publicRouter.post("/signup", signupLogic)
authRouter.post("/events", getEventsLogic)
authRouter.post("/add-to-myevents", addEventsLogic)
authRouter.post("/logout", logoutLogic)
authRouter.get("/id", idLogic)
authRouter.post("/edit", editUsernameLogic)
authRouter.post("/remove-from-myevents",removeEventsLogic)
authRouter.get("/liked-events",likedEventsLogic)

export { authRouter, publicRouter }

