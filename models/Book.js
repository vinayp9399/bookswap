import mongoose from 'mongoose'


const BookSchema = new mongoose.Schema({
title: String,
author: String,
condition: String,
image: String,
ownerId: String,
ownerName: String,
createdAt: { type: Date, default: Date.now }
})


export default mongoose.models.Book || mongoose.model('Book', BookSchema)