import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "../db/db.js"

export async function loginLogic(req, res) {
  try {
    const username = req.body.username.trim().toLowerCase(), password = req.body.password
    const response = await pool.query(`select id,username,password_hash from he_users where username=$1`, [username])
    if (response.rows.length === 0)
      return res.status(400).json({ success: false, message: `no user exists with this username` })
    if (await bcrypt.compare(password, response.rows[0].password_hash)) {
      jwt.sign({ id: response.rows[0].id }, process.env.JWT_SECRET_KEY, (err, token) => {
        if (err)
          return res.status(500).json({ success: false, message: `unable to create cookie` })
        res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" })
        return res.status(200).json({ success: true, message: `successful login` })
      })
    }
    else {
      res.status(403).json({ success: false, message: `incorrect credentials entered` })
    }
  }
  catch (err) {
    res.status(500).json({ success: false, message: `internal server error` })
  }
}

export async function signupLogic(req, res) {
  try {
    const username = req.body.username.trim().toLowerCase(), password = req.body.password
    if (password && password.length >= 8) {
      const password_hash = await bcrypt.hash(password, 10)
      const response = await pool.query(`insert into he_users(username,password_hash) values($1,$2)`, [username, password_hash])
      return res.status(201).json({ sucess: true, message: `successful signup` })
    }
    else
      res.status(400).json({ sucess: false, message: `password must be atleast 8 characters long` })
  }
  catch (err) {
    if (err.code === "23502")
      return res.status(400).json({ success: false, message: `username must not be empty` })
    else if (err.code === "23505")
      return res.status(409).json({ success: false, message: `username must be unique` })
    else if (err.code === "23514")
      return res.status(400).json({ success: false, message: `username must be without spaces, lowercase and more than 3 characters long` })
    else res.status(500).json({ success: false, message: `internal server error` })
  }
}

export function logoutLogic(req, res) {
  res.clearCookie("token", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax" })
  res.status(200).json({ sucess: true, message: `successful logout` })
}

export async function addEventsLogic(req, res) {
  try {
    const id = req.user, event = req.body.event;
    const response = await pool.query(`insert into he_bookmarks(user_id,event_description,event_year) values($1,$2,$3)`, [id, event.description, event.year])
    res.status(200).json({ success: true, message: `event successfully bookmarked` })
  }
  catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ success: false, message: `event already liked` })
    else res.status(500).json({ success: false, message: `internal server error` })
  }
}

export async function getEventsLogic(req, res) {
  try {
    const id = req.user, date = req.body.date, day = +(date.split("-")[2]), month = +(date.split("-")[1])
    const response1 = await pool.query(`select username from he_users where id=$1`, [id])
    const username = response1.rows[0].username
    const response2 = await pool.query(`select event_description from he_bookmarks where user_id=$1`, [id])
    const likedEvents = response2.rows.map(row => row.event_description)
    const response3 = await fetch(`https://byabbe.se/on-this-day/${month}/${day}/events.json`)
    const data = await response3.json()
    const events = data.events.map(event => ({ year: event.year, description: event.description, likedOrNot: likedEvents.includes(event.description) }))
    res.status(200).json({ success: true, data: { username, events } })
  }
  catch (err) {
    res.status(500).json({ success: false, message: `internal server error` })
  }
}

export async function idLogic(req, res) {
  try {
    const id = req.user
    const response = await pool.query(`select username from he_users where id=$1`, [id])
    const username = response.rows[0].username
    res.status(200).json({ success: true, data: { username } })
  }
  catch (err) {
    res.status(500).json({ success: false, message: `internal server error` })
  }
}

export async function editUsernameLogic(req, res) {
  try {
    const id = req.user, newUsername = req.body.newUsername.trim().toLowerCase()
    const response = await pool.query(`update he_users set username=$1,updated_at=NOW() where id=$2`, [newUsername, id])
    res.status(200).json({ success: true, message: `username successfully updated` })
  }
  catch (err) {
    if (err.code === "23502")
      return res.status(400).json({ success: false, message: `username must not be empty` })
    else if (err.code === "23505")
      return res.status(409).json({ success: false, message: `username must be unique` })
    else if (err.code === "23514")
      return res.status(400).json({ success: false, message: `username must be without spaces, lowercase and more than 3 characters long` })
    else res.status(500).json({ success: false, message: `internal server error` })
  }
}

export async function removeEventsLogic(req, res) {
  try {
    const id = req.user, event = req.body.event;
    const response = await pool.query(`delete from he_bookmarks where user_id=$1 and event_description=$2`, [id, event.description])
    res.status(200).json({ success: true, message: `event removed from bookmarks` })
  }
  catch (err) {
    res.status(500).json({ success: false, message: `internal server error` })
  }
}

export async function likedEventsLogic(req, res) {
  try {
    const id = req.user
    const response = await pool.query(`select event_description,event_year from he_bookmarks where user_id=$1`, [id])
    res.status(200).json({ success: true, data: { likedEvents: response.rows } })
  }
  catch (err) {
    res.status(500).json({ success: false, message: `internal server error` })
  }
}