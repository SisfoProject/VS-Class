import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import { Envelope, WhatsappLogo} from "@phosphor-icons/react";
import pp from '../assets/Default_pfp.jpg'
import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Skeleton } from "antd";
export function Dosen() {

  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`https://coral-codfish-fez.cyclic.app/dosen`);
        setData(response.data);
        setLoading(false);
    };

    fetchData();
}, []);


if (loading) {
  return(
    <div className='md:ml-20 mt-8 flex flex-col gap-3'>
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
      <Skeleton active />
    </div>
  ) 
}
  return (
    <div className="flex flex-wrap gap-8 lg:ml-20 mt-10 justify-center ">
      {data.map((d, i) => (
        <motion.div key={d.id}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
        >
          <Card className="w-56 shadow-2xl border-2" >
            <CardHeader floated={false} className="w-44 rounded-full">
              <img src={pp} alt="profile-picture" />
            </CardHeader>
            <CardBody className="text-center">
              <Typography variant="p" color="blue-gray" className="mb-2 text-xs font-bold">
                {d.gelar_depan + ' '}
                {d.nama_dosen + ' '} 
                {d.gelar_belakang}
              </Typography>
              <Typography color="blue-gray" className="font-medium flex justify-center items-center gap-3" textGradient>
                <WhatsappLogo size={30} className="text-gray-700" />
                <Envelope size={30} className="text-gray-700" />
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-2">
              <Tooltip content="Like">
                <Typography
                  as="a"
                  href="#facebook"
                  variant="lead"
                  color="blue"
                  textGradient
                >
                  <i className="fab fa-facebook" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#twitter"
                  variant="lead"
                  color="light-blue"
                  textGradient
                >
                  <i className="fab fa-twitter" />
                </Typography>
              </Tooltip>
              <Tooltip content="Follow">
                <Typography
                  as="a"
                  href="#instagram"
                  variant="lead"
                  color="purple"
                  textGradient
                >
                  <i className="fab fa-instagram" />
                </Typography>
              </Tooltip>
            </CardFooter>
          </Card>
        </motion.div>       
      ))}
    </div>
  );
}