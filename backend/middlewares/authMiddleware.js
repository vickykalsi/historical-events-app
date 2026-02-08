import jwt from "jsonwebtoken"

function authMiddleware(req, res, next) {
  const token = req.cookies?.token
  if (!token) {
    return res.status(401).json({ success: false, message: `cookie not found, kindly login` })
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: `session expired, kindly login again` })
    }
    req.user = decoded.id
    next()
  })
}

export default authMiddleware