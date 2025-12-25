'use client'
import { useEffect, useState } from 'react'
import BookCard from './components/BookCard'
import Navbar from './components/Navbar'
import axios from 'axios'


export default function Home() {
const [books, setBooks] = useState([])


async function fetchBooks() {

axios.get('/api/books').then((res)=>{
    setBooks(res.data) 
})
}


async function handleRequest(book) {
const user = JSON.parse(localStorage.getItem('user'))

axios.post('/api/requests', {
bookId: book._id,
ownerId: book.ownerId,
requesterId: user.id,
requesterName: user.name
}).then((res)=>{
    alert('Request sent!')
})
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