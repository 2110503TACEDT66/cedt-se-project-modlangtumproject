'use client'
import userRegister from '@/libs/userRegister';
import { useState } from 'react'; // Import useState from React
import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleLogin = () => {
//     // Simulate authentication
//     if (username === 'example' && password === 'password') {
//       console.log('Login successful!');
//     } else {
//       setErrorMessage('Invalid username or password');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <div>
//         <label>Username:</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <button onClick={handleLogin}>Login</button>
//       {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
//     </div>
//   );
// };

// export default Login;
