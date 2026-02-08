import toast from "react-hot-toast"
import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"

function EditPage() {
  const [username, setUsername] = useState("")
  const [newUsername, setNewUsername] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    try {
      async function getUsername() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/id`, { credentials: "include" })
        const data = await response.json()
        if (response.ok) {
          setUsername(data.data.username)
        }
        else {
          toast.error("couldn't fetch your username")
        }
      }
      getUsername()
    }
    catch (err) {
      toast.error("server error")
    }
  }, [])

  async function submitHandler(e) {
    try {
      e.preventDefault()
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/edit`, { credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ newUsername }), method: "POST" })
      const data = await response.json()
      if (response.ok) {
        toast.success(data.message)
        setUsername(newUsername)
      }
      else {
        toast.error(data.message)
      }
      setNewUsername("")
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
        navigate("/")
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
      <p>signed in as : {username}</p>
      <form onSubmit={submitHandler} className="form-container">
        <label htmlFor="newUsername"></label>
        <input type="text" name="newUsername" id="newUsername" value={newUsername} onChange={e => setNewUsername(e.target.value)} autoComplete="off" />
        <button type="submit">change your username</button>
      </form>
      <NavLink to="/input">see new events</NavLink>
      <NavLink to="/liked-events">see your liked events</NavLink>
      <button type="button" onClick={clickHandler}>Logout</button>
    </div>
  </>
}

export default EditPage