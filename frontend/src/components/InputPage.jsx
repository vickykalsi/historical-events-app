import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { useNavigate, NavLink } from "react-router-dom"
import { IoStarOutline } from "react-icons/io5" //unlike
import { MdOutlineStar } from "react-icons/md" //like

function InputPage() {
  const [date, setDate] = useState("2000-01-01")
  const [events, setEvents] = useState([])
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  useEffect(() => {
    try {
      async function getUsername() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/id`, { credentials: "include" })
        const data = await response.json()
        if (response.ok) {
          setUsername(data.data.username)
        }
        else
          toast.error("couldn't load username")
      }
      getUsername()
    }
    catch (err) {
      toast.error("server error")
    }
  }, [])

  function getFullDate(date) {
    return date.split("-")[2] + " " + monthNames[date.split("-")[1] - 1]
  }

  async function submitHandler(e) {
    try {
      e.preventDefault()
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/events`, {
        method: "POST", credentials: "include",
        body: JSON.stringify({ date }),
        headers: { "Content-Type": "application/json" }
      })
      const data = await response.json()
      if (response.ok) {
        toast.success("fetching successful")
        setEvents(data.data.events)
      }
      else {
        toast.error("fetching unsuccesful")
      }
    }
    catch (err) {
      toast.error(`server error`)
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

  function clearHandler() {
    setEvents([])
  }

  async function likeHandler(event) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/add-to-myevents`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ event }),
        headers: { "Content-Type": "application/json" }
      })
      const data = await response.json()
      if (response.ok) {
        setEvents(previousEvents => previousEvents.map(previousEvent => previousEvent.description === event.description ? { ...previousEvent, likedOrNot: !previousEvent.likedOrNot } : previousEvent))
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

  async function unlikeHandler(event) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/remove-from-myevents`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ event }),
        headers: { "Content-Type": "application/json" }
      })
      const data = await response.json()
      if (response.ok) {
        setEvents(previousEvents => previousEvents.map(previousEvent => previousEvent.description === event.description ? { ...previousEvent, likedOrNot: !previousEvent.likedOrNot } : previousEvent))
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
      <p>Logged in as : {username}</p>
      <NavLink to="/edit">edit your username</NavLink>
      <NavLink to="/liked-events">see your liked events</NavLink>
      <h1 className="heading">Chosen date is : {getFullDate(date)}</h1>
      <button type="button" onClick={clearHandler}>Clear events</button>
      <button type="button" onClick={clickHandler}>Logout</button>
      <form onSubmit={submitHandler} className="form-container">
        <label htmlFor="date">Select a date : </label>
        <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} />
        <button type="submit">Get me historical events for this year</button>
      </form >
    </div>
    {events.length > 0 && events.map(event =>
      <div key={event.description} className="data">
        <h3>{event.year}</h3>
        <p>{event.description}</p>
        <button type="button" onClick={() => {
          if (!event.likedOrNot)
            likeHandler(event)
          else
            unlikeHandler(event)
        }}>
          {event.likedOrNot ? <MdOutlineStar /> : <IoStarOutline />}</button>
      </div>)}
  </>
}

export default InputPage