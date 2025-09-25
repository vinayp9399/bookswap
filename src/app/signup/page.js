'use client'
import { useState } from 'react'


export default function SignupPage() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


async function handleSubmit(e) {
e.preventDefault()
const res = await fetch('/api/auth/signup', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name, email, password })
})
if (res.ok) {
const data = await res.json()
localStorage.setItem('user', JSON.stringify(data))
window.location.href = '/'
} else {
alert('Signup failed')
}
}


return (
<div style={{textAlign:"center"}}><h2>Sign Up</h2>
<div style={{textAlign:"center"}}><form style={{margin:"auto", width:"500px"}} onSubmit={handleSubmit}>
<input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
<button type="submit">Signup</button>
</form></div></div>
)
}