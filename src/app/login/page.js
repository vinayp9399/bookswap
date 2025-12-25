'use client'
import { useState } from 'react'
import axios from 'axios'


export default function LoginPage() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')


async function handleSubmit(e) {
e.preventDefault()

axios.post('/api/auth/login', { email, password }).then((res)=>{
   localStorage.setItem('user', JSON.stringify(res.data)) 
   window.location.href = '/'
}).catch((err)=>{
   alert('Login failed')
})
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