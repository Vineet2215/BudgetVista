import React, { useState } from 'react';
import styled from 'styled-components';
import login1 from '../../img/login1.png'
import SignupPage from './signUp';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const URL="http://localhost:5000";

const BASE_URL = URL+"/api/v1/users/";

function LoginPage() {
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[error,setError] = useState(false);
  const[loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const handleusernameChange = (e) =>{
    setUsername(e.target.value)
  }
  const handlepasswordChange = (e) =>{
    setPassword(e.target.value)
  }


    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // const RQ_URL=(URL+"/api/v1/users/login");
        const { data } = await axios.post(
          `${BASE_URL}login`,
          {
            username,
            password
          },
        )
        console.log(data);
        localStorage.setItem("token", data.token)
        localStorage.setItem("username", data.username)
        localStorage.setItem("email", data.email)
        navigate("/")
      } 
      catch (err) {
        console.log(err);
        alert("Username or Password is Incorrect")
      }

      e.target.reset();
    };
    


  return (
  <LoginPagestyled bg="background-image-url">
    <form onSubmit={handleSubmit}>
        <div className="signup-box" >
            <h1 className="signup">Login</h1>
            <div className="imgcontainer">
                <img src={login1} alt="Login1" className="avatar" />
            </div>
            <div className="container">
                <input type="text" placeholder="Enter Username" className='uname' required value={username} onChange={(e)=>handleusernameChange(e)} />
                <input type="password" placeholder="Enter Password" name="psw" required value={password} onChange={(e)=>handlepasswordChange(e)}/>
                <button type="submit" >Login</button>
                <button type="button" onClick={() => navigate('/signup')}>Register Here</button>
            </div>
        </div>
    </form>
  </LoginPagestyled>
  );
}

const LoginPagestyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  

  form {
    padding: 30px;

    .imgcontainer {
      text-align: center;
      margin: 24px 0 12px 0;

      img.avatar {
        width: 25%;
        border-radius: 50%;
      }
    }

    .container {
      padding: 16px;
    }

    .signup-box {
      margin: 0 0 0 30px;
      background-color: rgba(255, 255, 255, 0.74);
      padding: 50px;
      border-radius: 8px;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      width: 600px;
      border-radius: 20px;

      h1.signup {
        text-align: center;
        margin-bottom: 20px;
      }

      input[type="text"],
      input[type="password"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        box-sizing: border-box;
        border-radius: 8px;
        font-size: 20px;
      }

      button {
        background-color: #04AA6D;
        color: white;
        padding: 14px 20px;
        margin: 8px 23px;
        border: none;
        cursor: pointer;
        width: 40%;
        font-size: 22px;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 10px;
        box-sizing: border-box;
      }

      button:hover {
        opacity: 0.9;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.2);
      }

      span.psw {
        float: right;
        padding-top: 16px;
      }
    }
  }
`;


export default LoginPage;
