import connectDB from '../../../../../lib/mongoose'
import Request from '../../../../../models/Request'

// import connectDB from '../../../../lib/mongoose'
// import Request from '../../../../models/Request'

export async function PUT(req, { params }) {
  await connectDB()

  const { id } = await params
  const { action, userId } = await req.json()

  const r = await Request.findById(id)
  if (!r) {
    return new Response(JSON.stringify({ message: 'Not found' }), { status: 404 })
  }

  if (r.ownerId !== userId && r.requesterId !== userId) {
    return new Response(JSON.stringify({ message: 'Not allowed' }), { status: 403 })
  }

  r.status =
    action === 'accept'
      ? 'accepted'
      : action === 'decline'
      ? 'declined'
      : action === 'pending'
      ? 'pending'
      : r.status

  await r.save()

  return new Response(JSON.stringify({ ok: true }), { status: 200 })
}
