import connectDB from '../../../../../lib/mongoose'
import User from '../../../../../models/User'
import bcrypt from 'bcryptjs'


export async function POST(req) {
await connectDB()
const { email, password } = await req.json()
if (!email || !password) {
return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 })
}


const user = await User.findOne({ email })
if (!user) return new Response(JSON.stringify({ message: 'Invalid' }), { status: 401 })


const ok = await bcrypt.compare(password, user.password)
if (!ok) return new Response(JSON.stringify({ message: 'Invalid' }), { status: 401 })


return new Response(JSON.stringify({ id: user.id, name: user.name, email: user.email }), { status: 200 })
}