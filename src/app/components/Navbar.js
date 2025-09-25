'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export default function Navbar() {
const [user, setUser] = useState(null)


useEffect(() => {
const u = localStorage.getItem('user')
if (u) setUser(JSON.parse(u))
}, [])


function logout() {
localStorage.removeItem('user')
window.location.href = '/'
}


return (
<nav style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
<div><h2>Book Swap</h2></div>
<div style={{display:"flex", gap:"50px"}}><Link href="/">Home</Link>
{user ? (
<>
<Link href="/post">Post Book</Link>
<Link href="/my-books">My Books</Link>
<Link href="/requests">Requests</Link>
<button onClick={logout}>Logout</button>
</>
) : (
<>
<Link href="/login">Login</Link>
<Link href="/signup">Signup</Link>
</>
)}</div>
</nav>
)
}