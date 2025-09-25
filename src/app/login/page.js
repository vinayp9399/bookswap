'use client'
import { useState } from 'react'


export default function LoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


async function handleSubmit(e) {
e.preventDefault()
const res = await fetch('/api/auth/login', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ email, password })
})
if (res.ok) {
const data = await res.json()
localStorage.setItem('user', JSON.stringify(data))
window.location.href = '/'
} else {
alert('Login failed')
}
}


return (
<div style={{textAlign:"center"}}><h2>Login</h2>
<div style={{textAlign:"center"}}><form style={{margin:"auto", width:"500px"}} onSubmit={handleSubmit}>
<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
<button type="submit">Login</button>
</form></div></div>
)
}