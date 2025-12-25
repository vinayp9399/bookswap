import connectDB from '../../../../../lib/mongoose'
import Book from '../../../../../models/Book'


export async function DELETE(req, { params }) {
await connectDB()
const { id } = await params
const { requesterId } = await req.json()
const book = await Book.findById(id)
if (!book) return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
if (book.ownerId !== requesterId) return new Response(JSON.stringify({ message: 'Not allowed' }), { status: 403 })
await Book.findByIdAndDelete(id)
return new Response(JSON.stringify({ ok: true }), { status: 200 })
}


export async function PUT(req, { params }) {
await connectDB()
const body = await req.json()
await Book.findByIdAndUpdate(params.id, body)
return new Response(JSON.stringify({ ok: true }), { status: 200 })
}