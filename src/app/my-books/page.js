'use client'
import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'


export default function MyBooksPage() {
const [books, setBooks] = useState([])


async function fetchBooks() {
const user = JSON.parse(localStorage.getItem('user'))
const res = await fetch('/api/books?ownerId=' + user.id)
const data = await res.json()
setBooks(data)
}


async function handleDelete(id) {
const user = JSON.parse(localStorage.getItem('user'))
await fetch('/api/books/' + id, {
method: 'DELETE',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ requesterId: user.id })
})
fetchBooks()
}


useEffect(() => { fetchBooks() }, [])


return (
<div style={{margin:"20px"}}>
<h2>My Books</h2>
<div className="container">{books.map(b => <BookCard key={b._id} book={b} onDelete={handleDelete} />)}</div>
</div>
)
}