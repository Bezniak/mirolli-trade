import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createStore } from "../../store/store.js";
import { Preloader } from "../Preloader/Preloader.jsx";
import { motion } from 'framer-motion';
import { RiMailSendLine } from "react-icons/ri";
import { Parallax } from 'react-scroll-parallax';
import { ROUTES } from "../../config/routes.js";
import { handleClick } from "../../common/helpers.js";
import MetaTags from "../../common/MetaTags.jsx";

const Service = () => {
    const { id } = useParams();
    const { t } = useTranslation();
    const store = createStore(t);

    const [loading, setLoading] = useState(true);
    const [mobileBgLoaded, setMobileBgLoaded] = useState(false);
    const [desktopBgLoaded, setDesktopBgLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);

    const service = store?.services?.find(m => m.url === id);

    // Отслеживаем загрузку сервисных данных
    useEffect(() => {
        if (service) {
            setLoading(false);

            // Загружаем мобильный фон
            const mobileImg = new Image();
            mobileImg.src = service.mobileImg;
            mobileImg.onload = () => setMobileBgLoaded(true);

            // Загружаем десктопный фон
            const desktopImg = new Image();
            desktopImg.src = service.desktopImg;
            desktopImg.onload = () => setDesktopBgLoaded(true);
        }
    }, [service]);

    // Прелоадер показываем, пока все фоны и изображение не загружены
    if (loading || !mobileBgLoaded || !desktopBgLoaded) {
        return <Preloader />;
    }

    if (!service) {
        return <h2 className="text-center mt-10">Услуга не найдена!</h2>;
    }

    return (
        <main>
            <MetaTags
                title={service.name}
                description={service.desc}
                keywords="строительство промышленных объектов, монтаж инженерных систем, установка отопления и водоснабжения, монтаж газопроводов, установка канализации, монтаж систем вентиляции, установка дымоходов, монтаж технологического оборудования, установка компрессоров, монтаж колонных аппаратов, установка холодильных установок, монтаж теплообменников, установка фильтров, монтаж трубопроводов, сварка трубопроводных систем, устройство полов, монтаж покрытий, установка окон и дверей, монтаж электрооборудования, установка распределительных щитов, монтаж освещения, монтаж автоматизации, установка датчиков, техническое обслуживание котельных, проверка теплосчетчиков, модернизация инженерных систем, проектирование фундаментов, строительство конструкций, устройство крыш, установка теплоизоляции, безопасная установка оборудования, монтаж газоснабжения, подключение автоматизированных систем, монтаж внешних сетей, прокладка тепловых сетей, монтаж газовых сетей, устройство тепловых пунктов"
            />

            {/* Hero section */}
            <motion.section
                style={{ backgroundImage: `url(${service.mobileImg})` }}
                className="h-screen bg-center bg-no-repeat bg-cover md:hidden flex items-center justify-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="overlay absolute inset-0"></div>
                <motion.h1
                    className="text-white text-center z-20 text-3xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {service.name}
                </motion.h1>
            </motion.section>

            <motion.section
                style={{ backgroundImage: `url(${service.desktopImg})` }}
                className="h-screen bg-center bg-no-repeat bg-cover hidden md:flex items-center justify-center relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <div className="overlay absolute inset-0"></div>
                <motion.h1
                    className="text-white text-center z-40 text-5xl font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    {service.name}
                </motion.h1>
            </motion.section>

            {/* Description and image */}
            <section className="container mx-auto p-5 md:p-0 py-10 md:py-20 flex flex-col md:flex-row justify-between items-center gap-10">
                <article className="w-full md:w-1/2 text-center md:text-left">
                    <img src="/logo_3.svg" alt="logo" className='mx-auto my-10 w-32 h-32'/>
                    <p className='tracking-widest !text-black leading-relaxed text-lg'>
                        {service.desc}
                    </p>
                </article>

                <article className="md:w-1/2 h-[700px] flex justify-center overflow-hidden relative">
                    {!imgLoaded && <Preloader />} {/* прелоадер пока параллакс изображение не загрузилось */}
                    <Parallax translateY={[-50, 50]}>
                        <img
                            src={service.additionImg}
                            alt={service.name}
                            className={`max-w-full h-auto object-cover rounded-xl transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setImgLoaded(true)}
                        />
                    </Parallax>
                </article>
            </section>

            {/* Additional info */}
            <section className="bg-gray-900 pt-10">
                <h2 className="container mx-auto p-5 text-center mb-10 text-white text-3xl font-semibold">
                    {service.additionTitle}
                </h2>
                <div className="container mx-auto p-5 mt-8 flex flex-wrap justify-evenly items-stretch gap-10">
                    {service.additionTitleList.map((item, index) => (
                        <motion.article
                            key={index}
                            className="max-w-sm p-5 bg-gray-800 rounded-lg shadow-sm flex flex-col"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.2 }}
                            viewport={{ once: false }}
                        >
                            {item.title && (
                                <h3 className="text-2xl mb-5 !text-white text-center font-bold">
                                    {item.title}
                                </h3>
                            )}
                            <p className="text-lg !text-white text-justify flex-grow overflow-auto">
                                {item.text}
                            </p>
                        </motion.article>
                    ))}
                </div>
            </section>

            {/* Request button */}
            <section className='bg-gray-900 py-20'>
                <NavLink
                    to={ROUTES.BOOK}
                    onClick={handleClick}
                    className="mx-auto w-fit flex items-center justify-center bg-red-500 text-white py-4 px-12 hover:bg-red-700 transition text-lg font-medium"
                    aria-label={`${t('makeRequest')} ${service.name}`}
                >
                    <RiMailSendLine className="w-6 h-6 mr-4"/> {t('makeRequest')}
                </NavLink>
            </section>
        </main>
    );
};

export default Service;
