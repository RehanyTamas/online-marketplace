import React, { useState } from 'react'
import { BiSolidErrorCircle } from 'react-icons/bi'
import { Link } from "react-router-dom";


const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState(null);
  const [errorVisibility, setErrorVisibility] = useState('invisible')
  const [succesVisibility, setSuccesVisibility] = useState('invisible')
  function clearInputs() {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password, email: email })
    };

    fetch('http://127.0.0.1:8000/api/register', requestOptions)
      .then(response => response.json())
      .then(data => {
        clearInputs();
        setData(data)
        setSuccesVisibility('visible')
        setTimeout(() => {
          setSuccesVisibility('invisible')
          console.log('hi')
        }, 2500);
      })
      .catch(error => {
        clearInputs();
        setErrorVisibility('visible')
        setTimeout(() => {
          setErrorVisibility('invisible')
          console.log('hi')
        }, 2500);
      })
  };


  return (
    <div className=''>
      <div className={`absolute inset-0 flex items-center justify-center bottom-96 -top-64 ${errorVisibility}`}>
        <div className=' bg-red-400 w-1/3 p-4 rounded-xl ' >
          <p className='text-white flex items-center flex  justify-center  gap-2'><BiSolidErrorCircle /> Something went wrong, try again.</p>
        </div>
      </div>
      <div className={`absolute inset-0 flex items-center justify-center bottom-96 -top-64 ${succesVisibility}`}>
        <div className=' bg-green-400 w-1/3 p-4 rounded-xl ' >
          <p className='text-white flex items-center flex  justify-center  gap-2'><BiSolidErrorCircle /> Succedfull Registration</p>
        </div>
      </div>

        <form class="bg-grey-lighter min-h-screen flex flex-col" onSubmit={handleSubmit}>
            <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 class="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Username" />
                    <input 
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        placeholder="Email" 
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    <input 
                        type="password"
                        class="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <button
                        type="submit"
                        class="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-500 focus:outline-none my-1">Create Account</button> 
                <div class="text-grey-dark mt-6">
                    Already have an account? 
                    <Link class="no-underline border-b border-blue text-blue-600" to="../login/">
                         Log in
                    </Link>.
                </div>
                </div>

            </div>
        </form>
    </div>
  )
}

export default Register
