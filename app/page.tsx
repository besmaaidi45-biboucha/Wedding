"use client"
import { useState } from "react"

export default function Home() {
const [res, setRes] = useState("")

async function test() {
const r = await fetch("/api/rsvp", {
method: "POST",
body: JSON.stringify({ name: "Test", is_attending: true, guests_count: 1 })
})
const data = await r.json()
setRes(JSON.stringify(data))
}

return (
<div>
<button onClick={test}>Test RSVP</button>
<p>{res}</p>
</div>
)
}







