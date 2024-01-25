import {useState,useEffect,useRef} from 'react'
import { useCallback } from 'react';
import './App.css'

const App = () => {
  const [length,setLength]=useState("");
  const[numberAllowed,setNumberAllowed]=useState('false');
  const[charAllowed,setCharAllowed]=useState('false');
  const [password,setPassword]=useState("");

  const passwordRef= useRef(null)

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)}
  ,[password])

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed)str+= "0123456789"
    if(charAllowed)str+="!@#$%^&*()_+<>?{}[]~`"

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{passwordGenerator()}
  ,[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <div className='outer-box'>
      <h1>Password Generator</h1>
      <div className='inner-box'>

      <input className='password'
      type="text" 
      value={password}
      placeholder='Password'
      ref={passwordRef}
      readOnly/>

      <button 
      className='copy'
      onClick={copyPasswordToClipboard}
      > Copy </button>

      </div>
      <div className='num-length'>
        <input
         type="range" 
        onChange={(e)=>{setLength(e.target.value)}}/>
        <label>Length:{length}</label>
      <div>

        <input 
        className='num-check'
        type="checkbox" 
        defaultChecked={numberAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=>!prev)
        }} />
        <label>Numbers</label>
      </div>
      <div>
        <input 
        className='char-check'
        type="checkbox" 
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=>!prev)
        }} />
        <label>Characters</label>
      </div>
    </div>
    </div>
  )
}
export default App