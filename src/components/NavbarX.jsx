import React from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  IconButton,
  Input,
  Popover,
  PopoverHandler,
  Dialog,
  Card,
  CardBody,
  Checkbox,
  CardFooter
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";

import { Link } from "react-router-dom";
import { House, CalendarBlank, Buildings, IdentificationCard, CaretCircleDoubleRight } from "@phosphor-icons/react";
import logo from '../assets/logo.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pp from '../assets/Default_pfp.jpg'
 
function ProfileMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
  const navigate = useNavigate();



  const handleLogout = () => {
    localStorage.removeItem('npm');
    localStorage.removeItem('nama');
    localStorage.removeItem('kelas');
    localStorage.removeItem('token');
    window.location.reload();
}






 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="pp"
            className="border border-gray-900 p-0.5"
            src={localStorage.getItem('imgpp') !== null ? localStorage.getItem('imgpp') : pp}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">       
            <MenuItem
              onClick={closeMenu}
              className="flex flex-col gap-2 rounded "
            >
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg "
              >
                {localStorage.getItem('nama')}
                <p>
                 Kelas {localStorage.getItem('kelas')}
                </p>
              </Typography>
 
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg "
              >
                Profile
              </Typography>
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg "
              >
                Settings
              </Typography>
              <Typography
                as="span"
                variant="small"
                className="font-normal hover:bg-gray-200 px-2 w-full rounded-lg text-red-500"
                onClick={handleLogout}
              >
                Logout
              </Typography>
            </MenuItem>
      </MenuList>
    </Menu>
  );
}
 

 
export default function NavbarX() {

  const [password, setPassword] = useState('');
  const [npm, setNpm] = useState('');
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [title, setTitle] = useState('');
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate(`/search/${title}`);
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
              setOpen((cur) => !cur);
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
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <div className="">

        <div className=" w-screen shadow-2xl md:shadow-none border-b z=10 bg-white fixed p-2 lg:pl-6 top-0">
          <div className="relative flex items-center justify-between text-blue-gray-900">
            <img src={logo} width={40} alt="" className="ml-5" />
            <Typography
              as="a"
              href="#"
              className="hidden md:flex mr-4 ml-2 cursor-pointer py-1.5 font-extrabold"
            >
              Virtual Schedule Class
            </Typography>
            <div className="flex items-center justify-center lg:ml-32 w-[50%] xl:w-[60%] 2xl:w-[70%]">
              <input type="text" className=" rounded-3xl w-full" onChange={(e) => setTitle(e.target.value)} />
              <button onClick={handleSearch}>
                <CaretCircleDoubleRight size={42} className="text-gray-500"/>
              </button>
            </div>
            {localStorage.getItem('npm') == null ? (
              <button className="bg-gray-600 mr-3 px-4 py-1 rounded-2xl text-white" onClick={handleOpen}>
                Login
              </button>
              
            ) : (
            <ProfileMenu />
            )}
          </div>
          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                  <Typography variant="h4" color="blue-gray">
                    Sign In
                  </Typography>
                  <Typography
                    className="mb-3 font-normal"
                    variant="paragraph"
                    color="gray"
                  >
                    Masukan Npm dan Password
                  </Typography>
                  <Typography className="-mb-2" variant="h6">
                    Npm Or Phone number
                  </Typography>
                  <Input label="Npm" size="lg" onChange={(e) => setNpm(e.target.value) } />
                  <Typography className="-mb-2" variant="h6">
                    Your Password
                  </Typography>
                  <Input label="Password" size="lg" onChange={(e) => setPassword(e.target.value)}/>
                  <div className="-ml-2.5 -mt-3">
                    <Checkbox label="Login Sebagai Dosen" />
                  </div>
                </CardBody>
                <CardFooter className="pt-0">
                  <Button variant="gradient" onClick={handleLogin} fullWidth>
                    Login
                  </Button>
                  <Typography variant="small" className="mt-4 flex justify-center">
                    Lupa Password?
                    <Typography
                      as="a"
                      href="#signup"
                      variant="small"
                      color="blue-gray"
                      className="ml-1 font-bold"
                      onClick={handleOpen}
                    >
                      Klik disini
                    </Typography>
                  </Typography>
                </CardFooter>
              </Card>
            </Dialog>
        </div>
      <div>
      <div className="fixed pt-10 top-16 h-screen w-52 hidden md:block px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 border-r">
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
        <div className="md:hidden bg-white fixed bottom-1 shadow-2xl w-full border-2 items-center justify-center rounded-full">
          <ul className="space-y-2 font-medium flex items-center justify-between mx-10">
                <li>
                    <Link to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <House size={32} />
                    </Link>
                </li>
                <li>
                    <Link to ="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                      <div className='relative'>
                        <div className='absolute top-3 right-[9px] text-xs font-extrabold' >{new Date().getDate()}</div>
                        <CalendarBlank size={32} />
                      </div>
                    </Link>
                </li>
                <li>
                    <Link to="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <Buildings size={32} />
                    </Link>
                </li>
                <li>
                    <Link to="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                    <IdentificationCard size={32} />
                    </Link>
                </li>

              </ul>
        </div>
      </div>
    </div>
  );
}