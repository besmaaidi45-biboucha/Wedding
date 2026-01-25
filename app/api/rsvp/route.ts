import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function POST(req: Request) {
const body = await req.json()
const { name, email, is_attending, guests_count, message } = body

if (!name || is_attending === undefined) {
return NextResponse.json({ error: "Invalid data" }, { status: 400 })
}

const { error } = await supabase.from('rsvp').insert([
{ name, email, is_attending, guests_count, message }
])

if (error) {
return NextResponse.json({ error }, { status: 500 })
}

return NextResponse.json({ success: true })
}