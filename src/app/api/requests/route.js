import connectDB from '../../../../lib/mongoose'
import Request from '../../../../models/Request'
import Book from '../../../../models/Book'
import { randomUUID } from 'crypto'


export async function GET(req) {
await connectDB()
const url = new URL(req.url)
const userId = url.searchParams.get('userId')
const requests = await Request.find({ $or: [{ requesterId: userId }, { ownerId: userId }] }).sort({ createdAt: -1 })
return new Response(JSON.stringify(requests), { status: 200 })
}


export async function POST(req) {
await connectDB()
const { bookId, ownerId, requesterId, requesterName } = await req.json()
const book = await Book.findById(bookId)
const request = await Request.create({
id: randomUUID(),
bookId,
bookTitle: book?.title || 'Unknown',
ownerId,
requesterId,
requesterName,
})
return new Response(JSON.stringify({ id: request._id.toString() }), { status: 201 })
}