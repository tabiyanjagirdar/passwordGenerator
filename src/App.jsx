import { useState,useCallback ,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllow,setnumberAllow] = useState(false)
  const [charAllow,setcharAllow] = useState(false)
  const [password,setpassword] = useState("")


  const passwordRef = useRef(null)

  const passwordGen = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIKLMNOPQRSTVXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow){
      str = str + "0123456789"
    }

    if(charAllow){
      str = str + "@$%^&*(){}"
    }

    for( let i =1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

   setpassword(pass)
  },[length,numberAllow,charAllow])

  useEffect(()=>{passwordGen()},[length,numberAllow,charAllow])

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])

  

  return (
    <div className='w-screen h-screen flex justify-center items-center'><div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600'>
      <h1 className='text-white text-center py-5 text-2xl'>Password Generator</h1>
      <div className='flex  rounded-lg overflow-hidden mb-3'>
      <input type="text" 
      value={password} 
      className='outine-none w-full py-1 px-3'
      placeholder='password'
      readOnly
      ref={passwordRef}/>


      <button onClick={copyPasswordToClipBoard} className='outlinr-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>


      </div>
    <div className='flex text-sm gap-x-2 '>
    <div className='flex items-center gap-x-1 mb-5'>
      <input type="range" 
      min={6}
      max={30}
      value={length}
      className='cursor-pointer '
      onChange={(e) => {setlength(e.target.value)}} />
      <label >Length : {length}</label>
      </div>

      
      <div className='flex items-center gap-x-1  mb-5'>
      <input type="checkbox" 
     id='numberInput'
     defaultChecked={numberAllow}
     onClick={() => {
      setnumberAllow((prev) => !prev)
     }} />
     <label >Number </label>
      </div>


      <div className='flex items-center gap-x-1  mb-5'>
      <input type="checkbox" 
     id='charInput'
     defaultChecked={charAllow}
     onClick={() => {
      setcharAllow((prev) => !prev)
     }} />
     <label >Character </label>
      </div>
    </div>
    </div>
   
    </div>
  )
}

export default App
