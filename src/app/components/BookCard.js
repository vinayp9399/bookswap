'use client'
export default function BookCard({ book, onRequest, onDelete }) {
const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null


return (
<div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, marginBottom: 12 }}>
<h3>{book.title}</h3>
<p>Author: {book.author}</p>
<p>Condition: {book.condition}</p>
{book.image && <img src={book.image} alt={book.title} style={{ maxWidth: '100%' }} />}
<p><small>Posted by: {book.ownerName}</small></p>


{user && user.id !== book.ownerId && (
<button onClick={() => onRequest(book)}>Request</button>
)}
{user && user.id === book.ownerId && onDelete && (
<button onClick={() => onDelete(book._id)}>Delete</button>
)}
</div>
)
}