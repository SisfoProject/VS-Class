import React from 'react'
import pp from '../assets/Default_pfp.jpg'
import {motion} from 'framer-motion'
function profile() {

  const nama = localStorage.getItem('nama')
  const npm = localStorage.getItem('npm')
  const kelas = localStorage.getItem('kelas')
  const prodi = localStorage.getItem('prodi')
  const tahun = localStorage.getItem('angkatan')
  const email = localStorage.getItem('email')

  return (
    <motion.div
    initial={{ opacity: 0 , y: -50 }}
    animate={{ opacity: 1 , y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
    className='md:ml-20 mt-8 flex flex-col md:flex-row gap-3 border p-6 rounded-3xl shadow-2xl'>
        <div className='border-r-2 pr-6 border-gray-700'>
          <img src={pp} alt="" width={200} />
        </div>
        <div className='flex flex-col justify-center gap-3 ml-4'>
          <h1 className='flex font-extrabold text-5xl'>{nama}</h1>
          <div>
            {npm}
          </div>
          <div>
            {tahun-2020 + ' - ' + kelas + ' ' + prodi}
          </div>
          <div>
            Email : {email}
          </div>
        </div>
    </motion.div>
  )
}

export default profile