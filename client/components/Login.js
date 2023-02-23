import React, { useState } from 'react'

function Login({ setLoggedIn, setUser }) {
    // ************* state *********************//
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [funds, setFunds] = useState('')
    //*************** handle functions ***************/
    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleFunds = (e) => setFunds(e.target.value);
    // *************** fetch requests ***************//
    async function signUp() {
        let res = await fetch('/api/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/JSON',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                funds: funds
            }),
        })
        res = await res.json();
        console.log(res)
    
        setUser(res.user)
        setLoggedIn(true)

    }

    async function login() {
        let res = await fetch(`/api/user/login/${username}&${password}`)
        res = await res.json();
        setUser(res.user)
        setLoggedIn(true)
    }

    return (

        <div
            className='flex flex-col items-center justify-center min-h-fit h-screen w-screen' >
            <div
                className='flex flex-col justify-center border rounded items-center h-2/5 min-h-fit gap-2 shadow-xl border-black w-1/2 ' >
                <div>Log In</div>
                <input
                    className='border border-black rounded w-1/4  p-2'
                    onChange={(e) => handleUsername(e)}
                    // value={username}
                    placeholder="username"
                    type="text" />
                <input
                    className='border border-black rounded w-1/4 p-2'
                    onChange={(e) => handlePassword(e)}
                    // value={password}
                    placeholder="password"
                    type="password" />
                <button
                    className="border border-black text-white hover:shadow-2xl hover:inset-3 rounded hover:bg-blue-600 bg-blue-500 p-2"
                    onClick={() => login()}
                >Log in</button>
            </div>

         <h2 className='text-xl'>or</h2>
            <div className='flex flex-col justify-center items-center rounded  border gap-2 h-2/5 min-h-fit shadow-xl border-black w-1/2 ' >
                <div >Create an Account</div>
                <input
                    className='border border-black rounded w-1/4 p-2'
                    onChange={(e) => handleUsername(e)}
                    // value={username}
                    placeholder='username'
                    type='text'
                ></input>
                <input
                    className='border border-black rounded w-1/4 p-2'
                    onChange={(e) => handlePassword(e)}
                    // value={password}
                    placeholder='password'
                    type='password'
                ></input>
                <input
                    className='border border-black rounded w-1/4 p-2'
                    onChange={(e) => handleFunds(e)}
                    value={funds}
                    placeholder='funds'
                    type='number'
                ></input>

                <button
                    className="border hover:shadow-2xl text-white border-black rounded hover:bg-blue-600 bg-blue-500 p-2"
                    onClick={() => signUp()}
                >
                    Sign up
                </button>
            </div>

        </div>
    )
}

export default Login