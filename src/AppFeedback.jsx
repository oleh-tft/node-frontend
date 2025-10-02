import { useState } from 'react'
import './App.css'

function AppFeedback() {
  const [txt, setTxt] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  function validContentType(str) {
      if (typeof str != 'string') return false

      const jsonType = 'application/json'
      if (str.startsWith(jsonType)) {
          if (str === jsonType || str[jsonType.length] == ';') {
              return true
          }
      }

      return false
  }

  const testGet = () => {
    fetch(
      "http://localhost:81/api/feedback"
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  const testPost = () => {
    fetch(
      "http://localhost:81/api/feedback", {
        method: 'POST'
      }
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  const testPut = () => {
    fetch(
      "http://localhost:81/api/feedback", {
        method: 'PUT'
      }
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  const testPatch = () => {
    fetch(
      "http://localhost:81/api/feedback", {
        method: 'PATCH'
      }
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  const testDelete = () => {
    fetch(
      "http://localhost:81/api/feedback", {
        method: 'DELETE'
      }
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  return <>
      <h1>Випробування API Feedback Controller</h1>
      <button onClick={testGet}>GET</button>
      <button onClick={testPost}>POST</button>
      <button onClick={testPut}>PUT</button>
      <button onClick={testPatch}>PATCH</button>
      <button onClick={testDelete}>DELETE</button>
      <p>{txt}</p>
    </>
}

export default AppFeedback

