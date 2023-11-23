import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardCom from '../components/card';
import CardNoLog from '../components/CardNoLog';
import Weather from '../components/weather';

function Home() {
    const npm = localStorage.getItem('npm');
    const [data, setData] = useState([])
    const [sapa, setSapa] = useState('')
    const [nama, setNama] = useState('')
    const navigate = useNavigate();
    

   useEffect(() => {
         if (npm !== null) {
           const fetchData = async () => {
               const response = await axios.get(`https://giddy-lamb-kerchief.cyclic.app/mahasiswa/${npm}`)
               const data = []
               data.push(response.data[0]);
               setData(data);
               setNama(response.data[0].nama_mahasiswa);
               localStorage.setItem('nama', response.data[0].nama_mahasiswa)
               localStorage.setItem('kelas', response.data[0].kelas)
           }
           fetchData();
        }
   }, [npm])



   useEffect(() => {       
       const today = new Date()
       if (today.getHours() > 0 && today.getHours() < 12) {
            setSapa('Selamat Pagi')
        }
        else if (today.getHours() >= 12 && today.getHours() < 15) {
            setSapa('Selamat Siang')
        }
        else if (today.getHours() >= 15 && today.getHours() < 18) {
            setSapa('Selamat Sore')
        }
        else {
            setSapa('Selamat Malam')
        }
   }, [])


  return (
    <div>
        <div className='flex sm:ml-[9%] md:ml-[11%] lg:ml-[10%]'>
            <div className='flex flex-col w-[90%]'>
                <div className='flex-col justify-between w-full'>
                    <h3 className='font-extrabold text-xl '>
                        {sapa + ' '}
                        {localStorage.getItem('npm') !== null ? nama : 'User'}
                    <p className='font-normal'>
                        Welcome to Virtual Schedule Class
                    </p>
                    </h3>
                    <div className=''>
                        <Weather />
                    </div>
                </div>
                <div className='mt-1 text-md text-gray-700'>
 
                </div>
            </div>
        </div>
    <div>
        {localStorage.getItem('npm') !== null ? <CardCom /> : <CardNoLog />}         
    </div>
    </div>
  )
}

export default Home