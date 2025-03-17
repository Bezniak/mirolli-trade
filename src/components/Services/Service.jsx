import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {createStore} from "../../store/store.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {motion} from 'framer-motion';
import {TiTick} from "react-icons/ti";
import {RiMailSendLine} from "react-icons/ri";


const Service = () => {
    const {id} = useParams();
    const {t} = useTranslation();
    const store = createStore(t);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Новая анимация для сдвига снизу вверх с увеличением прозрачности
    const slideUpFade = {
        hidden: {opacity: 0, y: 50},
        visible: {opacity: 1, y: 0, transition: {duration: 0.8, ease: "easeOut"}},
    };

    // Найти нужный массаж по URL
    const service = store.services.find(m => m.url === id);

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

            <div className='container mx-auto py-10 md:py-20 px-4'>
                <img src="/logo_3.svg" alt="logo" className='size-32 mx-auto my-10'/>
                <p className='tracking-widest text-center leading-[2.5]'>
                    {service.desc}
                </p>
            </div>

            <div className="container mx-auto py-10 md:py-20 px-4">
                <h2 className="text-center mb-10">{service.additionTitle}</h2>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    {/* Список */}
                    <div className="w-full md:w-1/2">
                        {service.additionTitleList.map((item) => (
                            <ul key={item.id} className="flex items-center gap-4 mb-12">
                                <TiTick className="size-7 md:size-9 text-orange-500 flex-shrink-0"/>
                                <li className="text-justify">{item.text}</li>
                            </ul>
                        ))}
                    </div>

                    {/* Изображение */}
                    <div className="w-full md:w-1/2">
                        <img
                            src={service.additionImg}
                            alt={service.name}
                            className="w-full h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className='container mx-auto py-10 md:py-20 px-4'>
                <h2 className='mb-10 text-center'>{service.additionTitle}</h2>
                <div className='flex justify-center flex-wrap gap-10'>
                    {service.advantagesTitleList.map((item) => (
                        <div
                            className="max-w-sm p-5 border border-gray-200 shadow-lg "
                            key={item.id}
                        >
                            <h5 className="mb-2 text-2xl font-semibold tracking-tight text-center">
                                {item.title}
                            </h5>
                            <p className="mb-3 font-normal text-gray-500 leading-9 text-justify">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>


            <button type="submit"
                    className="mx-auto mt-10 mb-20 flex items-center justify-center bg-orange-500 text-white py-4 px-12 hover:bg-orange-600 transition"
            >
                <RiMailSendLine className="size-6 mr-4"/> {t('makeRequest')}
            </button>

        </div>
    );
};

export default Service;