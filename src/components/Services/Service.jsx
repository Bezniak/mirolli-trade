import React, {useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createStore} from "../../store/store.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {motion} from 'framer-motion';
import {RiMailSendLine} from "react-icons/ri";
import {Parallax} from 'react-scroll-parallax';
import {ROUTES} from "../../config/routes.js";
import {handleClick} from "../../common/helpers.js";


const Service = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const store = createStore(t);
    const [loading, setLoading] = useState(true);

    const service = store?.services?.find(m => m.url === id);

    useEffect(() => {
        if (service) {
            setLoading(false); // Set loading to false when the service data is available
        }
    }, [service]);

    if (loading) {
        return <Preloader/>;
    }

    if (!service) {
        return <h2 className="text-center mt-10">Услуга не найдена!</h2>;
    }
    console.log(service)

    return (
        <div>
            {/* Background Image for Mobile View */}
            <motion.div
                style={{
                    backgroundImage: `url(${service.mobileImg})`,
                }}
                className="h-screen bg-center bg-no-repeat bg-cover md:hidden flex items-center justify-center relative"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                whileInView="visible"
                viewport={{once: false}}
            >
                {/* Dark overlay */}
                <div className="overlay"></div>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                    className="relative z-20" // Ensure heading is above the overlay
                >
                    <h1 className="text-white text-center">{service.name}</h1>
                </motion.div>
            </motion.div>

            {/* Desktop View */}
            <motion.div
                style={{backgroundImage: `url(${service.desktopImg})`}}
                className="h-screen bg-center bg-no-repeat bg-cover hidden md:flex items-center justify-center"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
                whileInView="visible"
                viewport={{once: false}}
            >
                {/* Dark overlay */}
                <div className="overlay"></div>

                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1}}
                    className="relative z-40"
                >
                    <h1 className='text-white text-center'>
                        {service.name}
                    </h1>
                </motion.div>
            </motion.div>

            <div
                className="container mx-auto p-5 md:p-0 py-10 md:py-20 flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="w-full md:w-1/2">
                    <img src="/logo_3.svg" alt="logo" className='size-32 mx-auto my-10'/>
                    <p className='tracking-widest text-center leading-[2.5]'>
                        {service.desc}
                    </p>
                </div>

                <div className="md:w-1/2 h-[700px] flex justify-center overflow-hidden relative">
                    <Parallax translateY={[-50, 50]}>
                        <img src={service.additionImg} alt={service.name}
                             className="max-w-full h-auto object-cover rounded-xl"/>
                    </Parallax>
                </div>
            </div>

            <div className="bg-gray-900 py-20 mb-20">
                <h2 className="container mx-auto p-5 text-center mb-10 text-white">{service.additionTitle}</h2>
                <div className="container mx-auto p-5 mt-8 flex flex-wrap justify-evenly items-stretch gap-10">
                    {service.additionTitleList.map((service, index) => (
                        <motion.div
                            key={index}
                            className="max-w-sm p-5 bg-gray-800 rounded-lg shadow-sm"
                            initial={{opacity: 0, y: 20}}  // Initial state: hidden and slightly below
                            whileInView={{opacity: 1, y: 0}}  // Animate to fully visible and in place
                            transition={{duration: 0.2, delay: index * 0.2}} // Stagger the animations
                            viewport={{once: false}}  // Trigger animation only once when it comes into view
                        >
                            {service.title && (
                                <h2 className="!text-2xl mb-5 text-white text-center font-bold">
                                    {service.title}
                                </h2>
                            )}
                            <div className="text-lg text-justify text-white flex-grow overflow-auto">
                                {service.text}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>


            <NavLink to={ROUTES.BOOK}
                     onClick={handleClick}
                     className="mx-auto w-fit mt-10 mb-20 flex items-center justify-center bg-red-500 text-white py-4 px-12 hover:bg-red-700 transition"
            >
                <RiMailSendLine className="size-6 mr-4"/> {t('makeRequest')}
            </NavLink>

        </div>
    );
};

export default Service;