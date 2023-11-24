
import { useState} from 'react';
import {motion} from 'framer-motion';

export default function  CardNoLog() {

  const [data, setData] = useState([]);


  return (
    <div className='md:pl-20 lg:pl-36 items-center justify-center md:justify-start md:items-start'>
      <div className='flex w-full flex-wrap mt-10 gap-10'>
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        >
          Harap Login
        </motion.div>
      </div>
    </div>
  );
}
