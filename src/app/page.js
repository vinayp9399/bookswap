'use client'
import { useEffect, useState } from 'react'
import BookCard from './components/BookCard'
import Navbar from './components/Navbar'


export default function Home() {
const [books, setBooks] = useState([])


async function fetchBooks() {
const res = await fetch('/api/books')
const data = await res.json()
setBooks(data)
}


async function handleRequest(book) {
const user = JSON.parse(localStorage.getItem('user'))
await fetch('/api/requests', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({
bookId: book._id,
ownerId: book.ownerId,
requesterId: user.id,
requesterName: user.name
})
})
alert('Request sent!')
}


useEffect(() => { fetchBooks() }, [])


return (
<div>
<Navbar/>
<div style={{margin:"20px"}}><h2>Available Books</h2>
<div className="container">{books.map(b => <BookCard key={b._id} book={b} onRequest={handleRequest} />)}</div>
</div></div>
)
}