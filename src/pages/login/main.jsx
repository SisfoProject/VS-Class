import React, { useEffect, useState } from 'react';
import './style.css';
import logo from '../../assets/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [npm, setNpm] = useState(0);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const container = document.getElementById('container');
        container.addEventListener('click', handleButtonClick);

        return () => {
            container.removeEventListener('click', handleButtonClick);
        };
    }, []);

    const handleButtonClick = (event) => {
        const target = event.target;
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        if (target === registerBtn) {
            container.classList.add("active");
        } else if (target === loginBtn) {
            container.classList.remove("active");
        }
    };

    const handleSubmitMahsiswa = (e) => {
        e.preventDefault();
        axios.post('https://cute-rose-viper-gear.cyclic.app/login-mahasiswa', {
            npm: npm,
            password: password
        })
        .then((res) => {
            if (res.data.message === 'Login Success') {
                const data = res.data.result[0].npm
                localStorage.setItem('npm', data);
                navigate('/');
            }else {
                alert(res.data.message);
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Npm or Password is incorrect");
        })
      
    }

    const handleSubmitDosen = (e) => {
        
    }

  return (
    <div className='flex w-screen justify-center items-center'>
    <div className="container max-w-3xl" id="container">
        <div className="form-container sign-up">
            <form>
                <h1>Login Dosen</h1>

                <span><br /></span>
        
                <input type="email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <a href="#">Lupa Password?</a>
                <button onClick={handleSubmitDosen}>Login</button>
            </form>
        </div>
        <div className="form-container sign-in">
            <form>
                <h1>Login Mahasiswa</h1>
    
                <span><br /></span>
                <input type="email" placeholder="Npm" required onChange={(e) => setNpm(e.target.value)}/>
                <input type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
                <a href="#">Lupa Password?</a>
                <button onClick={handleSubmitMahsiswa}>Login</button>
            </form>
        </div>
        <div className="toggle-container">
            <div className="toggle">
                <div className="toggle-panel toggle-left">
                 <img src={logo} className='w-20 invert-[100%] sepia-0 saturate-[7467%] hue-rotate-[48deg] brightness-[109%] contrast-[100%]'/>
                    <h1>Halo bapak/Ibu Dosen</h1>
                    <br />
                    <br />
                    <p>Login Sebagai Mahasiswa</p>
                    <button className="hiddenn" id="login">Login</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <img src={logo} className='w-20 invert-[100%] sepia-0 saturate-[7467%] hue-rotate-[48deg] brightness-[109%] contrast-[100%]'/>
                    <h1>Hallo... Selamat Datang di Virtual Schedule Class</h1>
                    <p>Login Sebagai Dosen</p>

                    <button className="hiddenn" id="register">Login</button>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
};

export default Login;
