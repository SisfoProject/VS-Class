import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jadwal.css';
import {motion} from 'framer-motion';
function Jadwal() {
  const kelas = localStorage.getItem('kelas');
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://coral-codfish-fez.cyclic.app/all-jadwal/${kelas}`);
        const groupedByDay = groupDataByDay(response.data);
        setGroupedData(groupedByDay);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [kelas]);

  const groupDataByDay = (data) => {
    return data.reduce((grouped, item) => {
      const day = item.hari;
      if (!grouped[day]) {
        grouped[day] = [];
      }
      grouped[day].push(item);
      return grouped;
    }, {});
  };

  const getDayName = (day) => {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return days[day];
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='md:ml-16 lg:28 mt-8'>
      <div className="table--wrapper">
        {Object.entries(groupedData).map(([day, schedules], index) => (
          <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          key={day} className='mb-4'>
            <h3 className="main--title">
              <b className='text-gray-500 text-2xl mb-3'>Hari {getDayName(day)}</b>
            </h3>
            <div className="table-container">
              <table className='border-2'>
                <thead>
                  <tr>
                    <th>Matakuliah</th>
                    <th>Lokasi</th>
                    <th>Ruangan</th>
                    <th>Waktu</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((item) => (
                    <tr key={item.id}>
                      <td>{item.nama_matkul}</td>
                      <td>{item.nama_gedung}</td>
                      <td>{item.nama_ruangan}</td>
                      <td>{item.jam}</td>
                      <td>
                        <button>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Jadwal;
