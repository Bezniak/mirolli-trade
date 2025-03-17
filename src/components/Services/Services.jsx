import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {createStore} from "../../store/store.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {motion} from 'framer-motion';
import {NavLink} from "react-router-dom";
import {handleClick} from "../../common/helpers.js";


const Services = () => {
    const {t} = useTranslation();
    const [store, setStore] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = createStore(t);
            setStore(data);
            setIsLoading(false);
        };

        fetchData();
    }, [t]);

    if (isLoading) {
        return <Preloader/>;
    }


    return (
        <div>
            <motion.div
                className='md:bg-[url(/servicesDesktop.jpg)] h-screen bg-center bg-no-repeat bg-cover bg-[url(/servicesMobile.jpg)] flex items-center justify-center'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="container text-white text-center z-20">
                    {t("servicePage.title")}
                </h1>
            </motion.div>
            <div className='overlay'></div>

            <div className="flex flex-wrap justify-center gap-18 py-10">
                {store.services.map((item) => (
                    <div
                        key={item.id}
                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
                        <NavLink to={`/service/${item.url}`} onClick={handleClick}>
                            <img className="rounded-t-lg" src={item.mobileImg} alt={item.name}/>
                        </NavLink>
                        <div className="p-5 flex flex-col flex-grow">
                            <NavLink to={`/service/${item.url}`} onClick={handleClick}>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                    {item.name}
                                </h5>
                            </NavLink>
                            <p className="mb-3 font-normal text-gray-700">
                                {item.smallDesc}
                            </p>
                            <div className="mt-auto">
                                <NavLink to={`/service/${item.url}`} onClick={handleClick}
                                         className="w-fit flex items-center justify-center bg-orange-500 text-white py-2 px-6 hover:bg-orange-600 transition"
                                >
                                    {t("servicePage.readMore")}
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default Services;