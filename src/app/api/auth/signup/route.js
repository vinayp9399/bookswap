import connectDB from '../../../../../lib/mongoose'
import User from '../../../../../models/User'
import bcrypt from 'bcryptjs'
import { randomUUID } from 'crypto'


export async function POST(req) {
await connectDB()
const { name, email, password } = await req.json()
if (!name || !email || !password) {
return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 })
}


const existing = await User.findOne({ email })
if (existing) return new Response(JSON.stringify({ message: 'Email used' }), { status: 400 })


const hashed = await bcrypt.hash(password, 10)
const user = await User.create({ id: randomUUID(), name, email, password: hashed })


return new Response(JSON.stringify({ id: user.id, name: user.name, email: user.email }), { status: 201 })
}