'use client'
import { useEffect, useState } from 'react'
import BookCard from '../components/BookCard'
import axios from 'axios'
import Navbar from '../components/Navbar'


export default function MyBooksPage() {
const [books, setBooks] = useState([])


async function fetchBooks() {
const user = JSON.parse(localStorage.getItem('user'))

axios.get('/api/books?ownerId=' + user.id).then((res)=>{
    setBooks(res.data)
})
}


async function handleDelete(id) {
const user = JSON.parse(localStorage.getItem('user'))

axios.delete('/api/books/' + id, {data: { requesterId: user.id }}).then((res)=>{
    fetchBooks()
})
}


useEffect(() => { fetchBooks() }, [])


return (
<>
<Navbar/>
<div style={{margin:"20px"}}>
<h2>My Books</h2>
<div className="container">{books.map(b => <BookCard key={b._id} book={b} onDelete={handleDelete} />)}</div>
</div></>
)
}