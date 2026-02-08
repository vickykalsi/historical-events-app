import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { NavLink, useNavigate } from "react-router-dom"

function LikedEventsPage() {
  const [likedEvents, setLikedEvents] = useState([])
  const [hasloaded, setHasLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function getMyLikedEvents() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/liked-events`, {
          credentials: "include",
        })
        const data = await response.json()
        if (response.ok) {
          setLikedEvents(data.data.likedEvents)
          setHasLoaded(true)
        }
        else {
          toast.error(data.message)
          setHasError(true)
        }
      }
      catch (err) {
        toast.error("server error")
        setHasError(true)
      }
    }
    getMyLikedEvents()
  }, [])

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
      <NavLink to="/">Home</NavLink>
      <NavLink to="/input">See new events</NavLink>
      <NavLink to="/edit">edit your username</NavLink>
      <button type="button" onClick={clickHandler}>Logout</button>
      <h1 className="heading">{!hasError ? hasloaded ? likedEvents.length > 0 ? `Here are your liked events` : `You have not liked any event so far` : `Your events are loading...` : `Something went wrong`}</h1>
    </div>
    {likedEvents.length > 0 && likedEvents.map(event => 
      <div key={event.event_description} className="data">
      <h3>{event.event_year}</h3>
      <p>{event.event_description}</p>
    </div>
    )}
  </>
}

export default LikedEventsPage