import React from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { House, CalendarBlank, Buildings, IdentificationCard, CaretCircleDoubleRight } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';
import noPP from '../assets/Default_pfp.jpg'
import axios from 'axios';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';

function navbarcom() {

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [npm, setNpm] = useState('');
  const [checked, setChecked] = useState(false);


  const handleLogout = () => {
    localStorage.removeItem('npm');
    localStorage.removeItem('nama');
    localStorage.removeItem('kelas');
    localStorage.removeItem('token');
    window.location.reload();
}

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
      setOpenModal(false);
    }

    const handleLogin = async (e) => {
      if(!checked){
        e.preventDefault();
        axios.post('https://giddy-lamb-kerchief.cyclic.app/login-mahasiswa', {
            npm: npm,
            password: password
        })
        .then((res) => {
            if (res.data.message === 'Login Success') {
                const data = res.data.result[0]
                localStorage.setItem('npm', data.npm);
                localStorage.setItem('nama', data.nama_mahasiswa);
                localStorage.setItem('kelas', data.kelas);
                localStorage.setItem('showJadwal', 1);
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
    }

    const handleSearch = async (e) => {
      e.preventDefault();
      navigate(`/search/${title}`);
    }
    
  

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center gap-7">
            <div className="flex items-center justify-start rtl:justify-end">
              <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                  <span className="sr-only">Open sidebar</span>
                  <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                  </svg>
              </button>
              <Link to='/' className="flex ms-2 md:me-24">
                <img src={logo}  className="w-12 h-9 me-3" alt="Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white hidden md:flex" >VS Class RIL</span>
              </Link>
            </div>
            <div className='flex justify-between w-full'>

              <div className='w-[80%] flex gap-2 items-center'>
                <input type="text" className='rounded-3xl pl-6 w-full' placeholder='Search ...' onChange={(e) => setTitle(e.target.value)}/>
                <button className='' onClick={handleSearch}>
                <CaretCircleDoubleRight size={40} className='text-gray-500'/>
                </button>
              </div>

            <div className="flex items-center">
                <div className="flex items-center ms-3 md:mr-10">
                  <div>
                    <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                      <span className="sr-only">Open user menu</span>
                      <img className="w-8 h-8 rounded-full " src={noPP} alt="user photo" />
                    </button>
                  </div>
                  <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                    <div className="px-4 py-3" role="none">
                      { localStorage.getItem('npm') ? 
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white" role="none">
                          {localStorage.getItem('nama')}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                          Kelas {localStorage.getItem('kelas')}
                        </p>
                      </div>
                      :
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                      Halo User
                    </p>
                      }
                    </div>
                    { localStorage.getItem('npm') ? 
               
                    <ul className="py-1" role="none">
                      <li>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                          Settings
                        </Link>
                      </li>
              
                      <li>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                          Sign out
                        </button>
                      </li>
                    </ul>
                    : 
                    <li>
                    <button onClick={() => setOpenModal(true)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">
                      Login
                    </button>
                    <Modal show={openModal} size="md" onClose={onCloseModal} popup >
                      <Modal.Header />
                      <Modal.Body className=''>
                        <div className="space-y-6 ">
                          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Login VSC RIL</h3>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="NPM" value="Masukan NPM atau Nomor Hp" />
                            </div>
                            <TextInput
                              type='number'
                              id="NPM"
                              placeholder=""
                              onChange={(event) => setNpm(event.target.value)}
                              required
                            />
                          </div>
                          <div>
                            <div className="mb-2 block">
                              <Label htmlFor="password" value="Masukan Password" />
                            </div>
                            <TextInput id="password" type="password" required onChange={(event) => setPassword(event.target.value)} />
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-2">
                              <Checkbox id="remember" checked={checked} onChange={() => setChecked(!checked)}/>
                              <Label htmlFor="remember">Login Sebagai Dosen</Label>
                            </div>
                            <a href="#" className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                              Lupa Password ?
                            </a>
                          </div>
                          <div className="w-full">
                            <Button onClick={handleLogin}>Login ke Akun</Button>
                          </div>
          
                        </div>
                      </Modal.Body>
                    </Modal>
                  </li>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className="fixed mt-5 top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 ">
            <ul className="space-y-2 font-medium">
              <li>
                  <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <House size={32} />
                    <span className="ms-3">Beranda</span>
                  </Link>
              </li>
              <li>
                  <Link to ="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <div className='relative'>
                      <div className='absolute top-3 right-[9px] text-xs font-extrabold' >{new Date().getDate()}</div>
                      <CalendarBlank size={32} />
                    </div>
                    <span className="flex-1 ms-3 whitespace-nowrap">Jadwal</span>
                    {
                      localStorage.getItem('npm') !== null && localStorage.getItem('countJadwal') !== 30 ? 
                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-100 bg-gray-400 rounded-full dark:bg-gray-700 dark:text-gray-300">{localStorage.getItem('countJadwal')}
                    </span> : null
                    }
                  </Link>
              </li>
              <li>
                  <Link to="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <Buildings size={32} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Fakultas</span>
                  </Link>
              </li>
              <li>
                  <Link to="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <IdentificationCard size={32} />
                    <span className="flex-1 ms-3 whitespace-nowrap">Dosen</span>
                  </Link>
              </li>

            </ul>
        </div>
      </aside>

 

    </div>
  )
}

export default navbarcom