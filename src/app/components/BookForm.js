'use client'
import { useState } from 'react'


export default function BookForm({ onSubmit }) {
const [title, setTitle] = useState('')
const [author, setAuthor] = useState('')
const [condition, setCondition] = useState('')
const [image, setImage] = useState('')


function handleSubmit(e) {
e.preventDefault()
onSubmit({ title, author, condition, image })
}


return (
<div style={{textAlign:"center"}}><form style={{margin:"auto", width:"500px"}} onSubmit={handleSubmit}>
<input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
<input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
<input value={condition} onChange={e => setCondition(e.target.value)} placeholder="Condition" required />
<input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
<button type="submit">Post Book</button>
</form></div>
)
}