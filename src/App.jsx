import { useState } from 'react'
import './App.css'

function App() {
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
      "http://localhost:81/api/client"
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  const testPut = () => {
    fetch(
      "http://localhost:81/api/client", {
        method: 'PUT'
      }
    ).then(r => r.text()).then(j => {
      setTxt(j)
    })
  }

  const testPost = () => {
    console.log(name, email, phone)
    // fetch(
    //   "http://localhost:81/api/client", {
    //     method: 'POST'
    //   }
    // ).then(r => r.text()).then(j => {
    //   setTxt(j)
    // })
    fetch("http://localhost:81/api/client", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({name, email, phone})
    })
    .then(r => {
        //console.log(r.headers.get('Content-Type'))
        if (r.status != 200) {
            setTxt(`Сервер відповів помилкою ${r.status}`)
        } else {
            let ct = r.headers.get('Content-Type')
            if (validContentType(ct)) {
                r.json()
                .then(j => {
                    //setTxt(JSON.stringify(j))
                    let txt = ''
                    for (let k in j) {
                        txt += `${k}: ${j[k]}`
                    }
                    setTxt(txt)
                })
            } else {
                setTxt(`Відповідь Сервера не є JSON '${ct}'`)
            }
        }
    })
  }

  return <>
      <h1>Випробування API Client Controller</h1>
      <button onClick={testGet}>GET</button>
      <button onClick={testPut}>PUT</button>
      <div style={{border: "1px solid lightgray", padding: "5px"}}>
          <input type="text" value={name} onChange={e => setName(e.target.value)}/> <br/>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}/> <br/>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}/> <br/>

          <button onClick={testPost}>POST</button>
      </div>
      <p>{txt}</p>
    </>
}

export default App

