'use client'
import { useEffect, useState } from 'react'


export default function RequestsPage() {
const [requests, setRequests] = useState([])
const [currentUser, setcurrentUser] = useState('');


async function fetchRequests() {
const user = JSON.parse(localStorage.getItem('user'))
setcurrentUser(user.name);
console.log(currentUser);
const res = await fetch('/api/requests?userId=' + user.id)
const data = await res.json()
setRequests(data)
}


async function handleAction(id, action) {
const user = JSON.parse(localStorage.getItem('user'))
await fetch('/api/requests/' + id, {
method: 'PUT',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ action, userId: user.id })
})
fetchRequests()
}


useEffect(() => { fetchRequests() }, [])


return (
<div style={{margin:"20px"}}>
<h2>Requests from other users</h2>
    <div className="container">{requests.map(r => (
        <>{r.status === 'pending' && r.requesterName !== currentUser && (<><div key={r._id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 8 }}>
        <p>Book: {r.bookTitle}</p>
        <p>Status: <button style={{backgroundColor: r.status === 'accepted' ? '#4CAF50' : '#bfcc03ff',}}>{r.status}</button></p>
        <p>Requester: {r.requesterName}</p>
            
            <div style={{display:"flex",gap:"10px"}}>
            <button onClick={() => handleAction(r._id, 'accept')}>Accept</button>
            <button onClick={() => handleAction(r._id, 'decline')}>Decline</button>
            </div>
            
        </div></>)}</>
    ))}</div>
<h2>My Requests</h2>
    <div className="container">{requests.map(r => (
        <>{r.requesterName == currentUser && (<><div key={r._id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 8 }}>
        <p>Book: {r.bookTitle}</p>
        <p>Status: <button style={{backgroundColor: r.status === 'accepted' ? '#4CAF50' : '#bfcc03ff',}}>{r.status}</button></p>
        <p>Requester: {r.requesterName}</p>
            
        </div></>)}</>
    ))}</div>
</div>
)
}