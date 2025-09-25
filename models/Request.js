import mongoose from 'mongoose'


const RequestSchema = new mongoose.Schema({
id: { type: String, unique: true },
bookId: String,
bookTitle: String,
ownerId: String,
requesterId: String,
requesterName: String,
status: { type: String, default: 'pending' },
createdAt: { type: Date, default: Date.now }
})


export default mongoose.models.Request || mongoose.model('Request', RequestSchema)