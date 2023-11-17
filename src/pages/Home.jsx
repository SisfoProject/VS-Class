import React, { useEffect, useState } from 'react'
import axios from 'axios';


function Home() {
    const npm = localStorage.getItem('npm');
    const [data, setData] = useState([])
   useEffect(() => {
       const fetchData = async () => {
           const response = await axios.get(`https://cute-rose-viper-gear.cyclic.app/mahasiswa/${npm}`)
           const data = []
           data.push(response.data[0]);
           setData(data);
       }
       fetchData();
   }, [])
  return (
    <div className=''>
        {data.map((data) => (
            <div key={data.npm} >
                selamat datang di home 
                <p>{data.nama_mahasiswa}</p>
            </div>
        ))}
        
    </div>
  )
}

export default Home