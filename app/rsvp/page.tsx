"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RSVPPage() {
const router = useRouter()
const [form, setForm] = useState({
name: "",
email: "",
is_attending: "yes",
guests_count: 1,
message: ""
})
const [loading, setLoading] = useState(false)
const [error, setError] = useState("")

async function handleSubmit(e: React.FormEvent) {
e.preventDefault()
setLoading(true)
setError("")

try {
const res = await fetch("/api/rsvp", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
name: form.name,
email: form.email,
is_attending: form.is_attending === "yes",
guests_count: form.guests_count,
message: form.message
})
})
const data = await res.json()

if (data.success) {
router.push("/thanks")
} else {
setError(data.error || "Erreur lors de l'envoi")
}
} catch (err) {
setError("Erreur réseau")
} finally {
setLoading(false)
}
}

return (
<div className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
<form
onSubmit={handleSubmit}
className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
>
<h1 className="text-2xl font-bold text-center text-pink-600">RSVP</h1>

<input
type="text"
placeholder="Nom complet"
required
value={form.name}
onChange={e => setForm({ ...form, name: e.target.value })}
className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
/>

<input
type="email"
placeholder="Email (optionnel)"
value={form.email}
onChange={e => setForm({ ...form, email: e.target.value })}
className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
/>

<div className="flex flex-col space-y-1">
<label className="font-medium">Venez-vous ?</label>
<select
value={form.is_attending}
onChange={e => setForm({ ...form, is_attending: e.target.value })}
className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
>
<option value="yes">Oui 🎉</option>
<option value="no">Non 😢</option>
</select>
</div>

<div className="flex flex-col space-y-1">
<label className="font-medium">Nombre de personnes</label>
<input
type="number"
min={1}
value={form.guests_count}
onChange={e =>
setForm({ ...form, guests_count: Number(e.target.value) })
}
className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
/>
</div>

<textarea
placeholder="Message pour nous (optionnel)"
value={form.message}
onChange={e => setForm({ ...form, message: e.target.value })}
className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
/>

{error && <p className="text-red-500 text-sm">{error}</p>}

<button
type="submit"
disabled={loading}
className="w-full bg-pink-500 text-white py-2 rounded font-semibold hover:bg-pink-600 disabled:opacity-50"
>
{loading ? "Envoi..." : "Confirmer"}
</button>
</form>
</div>
)
}
