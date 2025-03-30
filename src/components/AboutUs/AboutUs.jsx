import React from 'react';
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {FaCheckCircle} from "react-icons/fa";
import {BsDashLg} from "react-icons/bs";
import dayjs from 'dayjs';
import Process from "./Process.jsx";
import Contacts from "../Contacts/Contacts.jsx";
import Reviews from "../Reviews/Reviews.jsx";

const AboutUs = () => {
    const {t} = useTranslation();

    const benefits = Array.from({length: 7}, (_, i) => ({
        title: t(`aboutPage.aboutBenefitTitle_${i + 1}`),
        description: t(`aboutPage.aboutBenefitDesc_${i + 1}`),
    }));

    // Вычисляем количество полных лет с 20 сентября 2016 года
    const yearsPassed = dayjs().diff(dayjs('2016-09-20'), 'year');

    return (
        <div>
            <motion.div
                className='md:bg-[url(/aboutUs.jpg)] h-screen bg-center bg-no-repeat bg-cover bg-[url(/aboutUsMobile.jpg)] flex items-center justify-center'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="container text-white text-center z-20">
                    {t("about_us")}
                </h1>
            </motion.div>

            <div
                className="container mx-auto p-5 md:py-20 md:px-10 rounded-lg flex flex-col md:flex-row items-center relative"
            >
                <div className="md:w-2/3">
                    <motion.p
                        className="mb-4 text-blue-600 uppercase tracking-widest flex items-center gap-3"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 0.2}}
                        viewport={{once: false}}
                    >
                        <BsDashLg className="size-6 md:size-8"/>
                        {t("aboutPage.about")}
                    </motion.p>
                    <motion.h2
                        className="text-4xl"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 0.3}}
                        viewport={{once: false}}
                    >
                        {t("aboutPage.aboutUsTitle")}
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-gray-600 leading-9"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 0.4}}
                        viewport={{once: false}}
                    >
                        {t("aboutPage.aboutDesc_1")}
                    </motion.p>
                    <motion.p
                        className="mt-4 text-gray-600 leading-9"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 0.5}}
                        viewport={{once: false}}
                    >
                        {t("aboutPage.aboutDesc_2")}
                    </motion.p>
                    <motion.ul
                        className="mt-6 space-y-4"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 0.6}}
                        viewport={{once: false}}
                    >
                        {benefits.map((benefit, index) => (
                            <motion.li
                                key={index}
                                className="flex items-start gap-3 text-gray-700"
                                initial={{opacity: 0}}
                                whileInView={{opacity: 1}}
                                transition={{duration: 1, delay: 0.7 + index * 0.1}}
                                viewport={{once: false}}
                            >
                                <FaCheckCircle className="text-blue-600 w-6 h-6 flex-shrink-0"/>
                                <span>
                                    <strong>{benefit.title}: </strong>
                                    {benefit.description}
                                </span>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
                <div className="md:w-1/2 flex justify-center mt-6 md:mt-0 relative">
                    <motion.img
                        src="/aboutUsExample.jpg"
                        alt="Award Badge"
                        className="rounded-lg shadow-md"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 1}}
                        viewport={{once: false}}
                    />
                    <motion.div
                        className="absolute bottom-0 left-0 transform translate-y-1/2 bg-blue-600 text-white px-4 py-8 md:px-8 md:py-8 rounded-lg text-center shadow-lg"
                        initial={{opacity: 0}}
                        whileInView={{opacity: 1}}
                        transition={{duration: 1, delay: 1.1}}
                        viewport={{once: false}}
                    >
                        <h3 className="text-2xl  md:text-3xl font-bold">{yearsPassed}+</h3>
                        <p className='!text-white font-light'>
                            {t("aboutPage.satisfiedClients")}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-bold mt-5">3K+</h3>
                        <p className='!text-white font-light'>{t("aboutPage.unitsEquipment")}</p>
                    </motion.div>
                </div>
            </div>
            <Process/>
            <div className='py-32 bg-[url(/aboutUsBg.jpg)] bg-no-repeat bg-cover'>
                <div className='container mx-auto h-96 flex flex-col justify-center items-center text-center'>
                    <p className='!text-white leading-10 mb-10 text-lg'>
                        {t("aboutPage.mission_1")}
                    </p>
                    <p className='!text-white leading-10 text-lg'>
                        {t("aboutPage.mission_2")}
                    </p>
                </div>
            </div>
            <Reviews/>
            <Contacts/>
        </div>
    );
};

export default AboutUs;
