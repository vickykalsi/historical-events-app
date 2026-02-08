import { useState } from "react"
import toast from "react-hot-toast"
import { NavLink, useNavigate } from "react-router-dom"

function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function submitHandler(e) {
    try {
      e.preventDefault()
      const response = await fetch(`${import.meta.env.VITE_API_URL}/`, {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ username, password }),
        credentials: "include"
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("successful login")
        navigate("/input")
      }
      else { toast.error(data.message) }
      setUsername("")
      setPassword("")
    }
    catch (err) {
      toast.error("server error")
    }
  }

  async function clickHandler() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, { method: "POST", credentials: "include" })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (err) {
      toast.error("server error")
    }
  }

  return <>
    <div className="div-container">
      <h1>Historical Events App</h1>
      <h3>Choose a day and a month and get historical events for that year</h3>
      <form onSubmit={submitHandler} className="form-container">
        <label htmlFor="username">Enter your username : </label>
        <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="off" />
        <label htmlFor="password">Enter your password : </label>
        <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
        <button type="submit">Login</button>
      </form>
      <NavLink to="/signup">Create a new Account</NavLink>
      <button type="button" onClick={clickHandler}>Logout</button>
    </div>
  </>
}

export default LoginPage