'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar';


export default function RequestsPage() {
const [requests, setRequests] = useState([])
const [currentUser, setcurrentUser] = useState('');


async function fetchRequests() {
const user = JSON.parse(localStorage.getItem('user'))
setcurrentUser(user.name);
console.log(currentUser);

axios.get('/api/requests?userId='+ user.id).then((res)=>{
   setRequests(res.data)
})
}


async function handleAction(id, action) {
const user = JSON.parse(localStorage.getItem('user'))

axios.put('/api/requests/' + id, { action, userId: user.id }).then(()=>{
   fetchRequests() 
})
}


useEffect(() => { fetchRequests() }, [])


return (
<>
<Navbar/>
<div style={{margin:"20px"}}>
<h2>Requests from other users</h2>
    <div className="container">{requests.map(r => (
        <>{r.requesterName !== currentUser && (<><div key={r._id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 8 }}>
        <p>Book: {r.bookTitle}</p>
        <p>Status: <button style={{backgroundColor: r.status === 'accepted'
        ? '#4CAF50'   
        : r.status === 'pending'
        ? '#dca707ff'   
        : r.status === 'declined'
        ? '#F44336'   
        : '#9E9E9E',}}>{r.status}</button></p>
        <p>Requester: {r.requesterName}</p>
            
            <div style={{display:"flex",gap:"10px"}}>
            <button onClick={() => handleAction(r._id, 'accept')}>Accept</button>
            <button onClick={() => handleAction(r._id, 'decline')}>Decline</button>
            <button onClick={() => handleAction(r._id, 'pending')}>Pending</button>
            </div>
            
        </div></>)}</>
    ))}</div>
<h2>My Requests</h2>
    <div className="container">{requests.map(r => (
        <>{r.requesterName == currentUser && (<><div key={r._id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 8 }}>
        <p>Book: {r.bookTitle}</p>
        <p>Status: <button style={{backgroundColor: r.status === 'accepted'
        ? '#4CAF50'   
        : r.status === 'pending'
        ? '#dca707ff'   
        : r.status === 'declined'
        ? '#F44336'   
        : '#9E9E9E',}}>{r.status}</button></p>
        <p>Requester: {r.requesterName}</p>
            
        </div></>)}</>
    ))}</div>
</div>
</>
)
}