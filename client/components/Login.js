import React, { useState } from 'react';

function Login({ setLoggedIn, setUser }) {
  // ************* state *********************//
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [funds, setFunds] = useState('');
  //*************** handle functions ***************/
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
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
        funds: funds,
      }),
    });
    res = await res.json();
    console.log(res);

    setUser({ ...res });
    setLoggedIn(true);
  }

  async function login() {
    let res = await fetch(`/api/user/login/${username}&${password}`);
    res = await res.json();
    console.log(res);
    setUser({ ...res, username: res.username });
    setLoggedIn(true);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-fit h-screen w-screen bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500'>
      <div className=' rounded-lg shadow-lg flex flex-col bg-white justify-center border rounded items-center h-2/5 min-h-fit gap-2 shadow-xl w-1/2 '>
        <div className='text-center text-4xl p-1 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
          Log In
        </div>
        <input
          className='border border-black rounded w-1/4  p-2'
          onChange={(e) => handleUsername(e)}
          // value={username}
          placeholder='username'
          type='text'
        />
        <input
          className='border border-black rounded w-1/4 p-2'
          onChange={(e) => handlePassword(e)}
          // value={password}
          placeholder='password'
          type='password'
        />
        <button
          className='border border-black text-white hover:shadow-2xl hover:inset-3 rounded hover:bg-blue-600 bg-blue-500 p-2'
          onClick={() => login()}
        >
          Log in
        </button>
      </div>

      <h2 className='text-transparent'>Or</h2>
      <div className='rounded-lg shadow-lg flex flex-col bg-white justify-center items-center rounded  border gap-2 h-2/5 min-h-fit shadow-xl w-1/2 '>
        <div className='text-center text-4xl p-1 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent'>
          Create an Account
        </div>
        <input
          className='border border-black rounded w-1/4 p-2'
          onChange={(e) => handleUsername(e)}
          // value={username}
          placeholder='Username'
          type='text'
        ></input>
        <input
          className='border border-black rounded w-1/4 p-2'
          onChange={(e) => handlePassword(e)}
          // value={password}
          placeholder='Password'
          type='password'
        ></input>
        <input
          className='border border-black rounded w-1/4 p-2'
          onChange={(e) => handleFunds(e)}
          value={funds}
          placeholder='Starting Balance'
          type='number'
        ></input>

        <button
          className='border hover:shadow-2xl text-white border-black rounded hover:bg-blue-600 bg-blue-500 p-2'
          onClick={() => signUp()}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
