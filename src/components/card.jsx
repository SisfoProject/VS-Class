

import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import { WhatsappLogo, Envelope, DotsThreeCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

export default function  CardCom() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
      setLoading(true);
      const fetchData = async () => {
        const kelas = localStorage.getItem('kelas');
        const hari = new Date().getDay();
  
        try {
          const response = await axios.get(`https://coral-codfish-fez.cyclic.app/jadwal/${hari}/${kelas}`)
          const datas = []
          datas.push(response.data);
        
          if (datas[0].length == 0) {
            setData(['Tidak ada jadwal'])
            localStorage.setItem('countJadwal', 0)
            localStorage.setItem('showJadwal',0)
            localStorage.setItem('showCount', 0)
            setLoading(false);
          }
          else {
            setData(datas[0]);
            localStorage.setItem('countJadwal', datas[0].length);
            localStorage.setItem('showJadwal',1)
            localStorage.setItem('showCount', 1)
            setLoading(false);
          }
          
          
        } catch (error) {
          console.error(error);
        }
      }
    fetchData();
 

  }, []);

  if (loading) {
    return(
      <div className='md:ml-20 mt-8 flex flex-col gap-3'>
        <Skeleton active />
        <Skeleton active />
      </div>
    ) 
  }
  else{

  return (
    <div>
      {data.length !== 30 ? (
        <div className='md:pl-20 lg:pl-36 items-center justify-center md:justify-start md:items-start'>
          <div className='flex w-full flex-wrap mt-10 gap-10'>
            {data.map((data, index) => (
              <motion.div key={data.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5,delay: index*0.1 }}

              >
                <Card className="w-96 shadow-2xl"   horizontal>
                  <div className='flex flex-col'>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {data.nama_matkul}
                    </h5>
                    <p className="font-normal text-sm text-gray-700 dark:text-gray-400 ">
                      {data.dosen_pengampu}
                    </p>
                  </div>
                  <div className='flex flex-col text-xs'>
                    <p>
                      Waktu : {data.jam}
                    </p>
                    <p>
                      Kelas : {data.nama_ruangan}
                    </p>
                    <p>
                      Gedung : {data.nama_gedung}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <Link to={`https://wa.me/62${data.no_hp}`}>
                      <WhatsappLogo size={25} />
                    </Link>
                    <Link>
                      <Envelope size={25} />
                    </Link>
                    <Link>
                      <DotsThreeCircle size={25} />
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}

          </div>
        </div>
        
      )
              : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}

                className='md:pl-20 lg:pl-36 items-center justify-center md:justify-start md:items-start'>
                  Kamu tidak ada jadwal Hari ini
                </motion.div>
              )
    }
    </div>
  );
  }
}
