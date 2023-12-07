import React from 'react'
import { Dropdown } from 'flowbite-react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'
function editJadwal() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [hari, setHari] = useState('')
  const [harinumber, setHarinumber] = useState('')
  const [jamAwal, setJamAwal] = useState('')
  const [matkul, setMatkul] = useState('')
  const [jamAkhir, setJamAkhir] = useState('')
  const [kelas, setKelas] = useState('')
  function getDayNameFromNumber(dayNumber) {
    const daysOfWeek = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    if (dayNumber < 0 || dayNumber > 6) {
        return "Invalid day number";
    }

    return daysOfWeek[dayNumber];
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`https://cute-pink-fish-gear.cyclic.app/get-jadwal/${id}`)
        setMatkul(response.data[0].nama_matkul)
        setHari(getDayNameFromNumber(response.data[0].hari))
        setHarinumber(response.data[0].hari)
        setJamAwal(response.data[0].awal)
        setJamAkhir(response.data[0].akhir)
        setKelas(response.data[0].kelas)
      } catch (error) {
        console.error(error)
        alert('ada masalah di server')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  },[id])

  const handleSubmit = async() => {
    await axios.put(`https://cute-pink-fish-gear.cyclic.app/update-jadwal/${id}`,{
        hari: harinumber,
        jam: jamAwal,
        jam_akhir: jamAkhir
    }) .then((res) => {
        navigate('/jadwal')
    }) .catch((err) => {
        console.log(err)
    })
  }

  return (
    <div>
      <div className='w-full h-full '>
        <div className='flex justify-center mt-20 flex-col items-center'>
          <div className='font-bold text-3xl'>
            Edit Jadwal
          </div>
          <div>
    
            <form action="" className='flex flex-col gap-6 border px-10 py-16 rounded-lg shadow-xl mt-16'>
              <input type="text"value={matkul} className='rounded-xl' readOnly  />
              <h1 className='font-bold text-center'>Kelas {kelas}</h1>
              <div className='flex gap-5' >
                <div>
                  <h1>Hari</h1>
                  <Dropdown label={hari} dismissOnClick={true} className=''>
                    <Dropdown.Item onClick={() => { setHari('Senin'); setHarinumber(1); }}>Senin</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setHari('Selasa'); setHarinumber(2); }}>Selasa</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setHari('Rabu'); setHarinumber(3); }}>Rabu</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setHari('Kamis'); setHarinumber(4); }}>Kamis</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setHari('Jumat'); setHarinumber(5); }}>Jumat</Dropdown.Item>
                    <Dropdown.Item onClick={() => { setHari('Sabtu'); setHarinumber(6); }}>Sabtu</Dropdown.Item>
                  </Dropdown>
                </div>
                <div className='flex gap-2 flex-col'>
                  <h1>Jam Mulai</h1>
                  <input type="time" value={jamAwal} className='rounded-xl' onChange={e => setJamAwal(e.target.value)}/>
                  <h1>Jam Selesai</h1>
                  <input type="time" value={jamAkhir} className='rounded-xl' onChange={e => setJamAkhir(e.target.value)}/>
                </div>
              </div>
              <button onClick={handleSubmit} className='bg-gray-600 p-2 mt-5 text-white rounded-xl mb-4 text-xs font-bold hover:bg-white hover:text-gray-700 transition-all duration-150 hover:border'>
                Simpan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default editJadwal