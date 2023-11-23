

import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {motion} from 'framer-motion';
import { WhatsappLogo, Envelope, DotsThreeCircle } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';


export default function  CardNoLog() {

  const [data, setData] = useState([]);


  return (
    <div className='md:pl-20 lg:pl-36 items-center justify-center md:justify-start md:items-start'>
      <div className='flex w-full flex-wrap mt-10 gap-10'>
        <div>
          Harap Login
        </div>
      </div>
    </div>
  );
}
