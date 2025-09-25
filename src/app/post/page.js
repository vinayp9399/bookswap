'use client'
import BookForm from '../components/BookForm'


export default function PostPage() {
async function handlePost(book) {
const user = JSON.parse(localStorage.getItem('user'))
const body = { ...book, ownerId: user.id, ownerName: user.name }
const res = await fetch('/api/books', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(body)
})
if (res.ok) {
window.location.href = '/my-books'
} else {
alert('Failed to post')
}
}


return (
<div>
<h2 style={{textAlign:"center"}}>Post a Book</h2>
<BookForm onSubmit={handlePost} />
</div>
)
}