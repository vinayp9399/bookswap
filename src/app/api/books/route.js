import connectDB from '../../../../lib/mongoose'
import Book from '../../../../models/Book'




export async function GET(req) {
await connectDB()
const url = new URL(req.url)
const ownerId = url.searchParams.get('ownerId')
const filter = ownerId ? { ownerId } : {}
const books = await Book.find(filter).sort({ createdAt: -1 })
return new Response(JSON.stringify(books), { status: 200 })
}


export async function POST(req) {
await connectDB()
const body = await req.json()
const book = await Book.create(body)
return new Response(JSON.stringify({ id: book._id.toString() }), { status: 201 })
}