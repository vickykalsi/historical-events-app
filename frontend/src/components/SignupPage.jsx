import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate,NavLink } from "react-router-dom"

function SignupPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  async function submitHandler(e) {
    try {
      e.preventDefault()
      const response = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
        method: "POST", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("successful signup, now use your credentials to login")
        navigate("/")
      }
      else { toast.error(data.message) }
      setUsername("")
      setPassword("")
    }
    catch (err) {
      toast.error("server error")
    }
  }

  return <>
    <form onSubmit={submitHandler} className="form-container">
      <label htmlFor="username">Enter your username : </label>
      <input type="text" name="username" id="username" value={username} onChange={e => setUsername(e.target.value)} autoComplete="off" />
      <label htmlFor="password">Enter your password : </label>
      <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="off" />
      <button type="submit">SignUp</button>
      <NavLink to="/">Home</NavLink>
    </form>
  </>
}

export default SignupPage