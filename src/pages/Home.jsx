import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CardCom from '../components/card';
import CardNoLog from '../components/CardNoLog';
import Weather from '../components/weather';
import {motion} from 'framer-motion';
import { Skeleton } from 'antd';

function Home() {
    const npm = localStorage.getItem('npm');
    const [data, setData] = useState([])
    const [sapa, setSapa] = useState('')
    const [nama, setNama] = useState('')
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

   useEffect(() => {
         if (npm !== null) {
           setLoading(true);
           const fetchData = async () => {
               const response = await axios.get(`https://coral-codfish-fez.cyclic.app/mahasiswa/${npm}`)
               const data = []
               data.push(response.data[0]);
               setData(data);
               setNama(response.data[0].nama_mahasiswa);
               localStorage.setItem('nama', response.data[0].nama_mahasiswa)
               localStorage.setItem('kelas', response.data[0].kelas)
               localStorage.setItem('prodi', response.data[0].prodi)
               localStorage.setItem('angkatan', response.data[0].angkatan)
               setLoading(false);
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


   if (loading) {
    return(
      <div className='md:ml-20 mt-8 flex flex-col gap-3'>
        <Skeleton active />
        <Skeleton active />
      </div>
    ) 
  }
  return (
    <div>
        <div className='flex sm:ml-[9%] md:ml-[11%] lg:ml-[10%]'>
            <div className='flex flex-col w-[90%]'>
                <div className='flex-col justify-between w-full'>
                    <motion.h3
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className='font-extrabold text-lg mt-6'>
                        {sapa + ' '}
                        {localStorage.getItem('npm') !== null ? nama : 'User'}
                    <p className='font-normal text-base'>
                        Welcome to Virtual Schedule Class
                    </p>
                    </motion.h3>
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className=''>
                        <Weather />
                    </motion.div>
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