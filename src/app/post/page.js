'use client'
import BookForm from '../components/BookForm'
import axios from 'axios'
import Navbar from '../components/Navbar'


export default function PostPage() {
async function handlePost(book) {
const user = JSON.parse(localStorage.getItem('user'))
const body = { ...book, ownerId: user.id, ownerName: user.name }

axios.post('/api/books', body).then((res)=>{
    window.location.href = '/my-books'
}).catch((err)=>{
    alert('Failed to post')
})
}


return (
<div>
<Navbar/>
<h2 style={{textAlign:"center"}}>Post a Book</h2>
<BookForm onSubmit={handlePost} />
</div>
)
}