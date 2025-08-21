import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { createStore } from "../../store/store.js";
import { Preloader } from "../Preloader/Preloader.jsx";
import { motion } from 'framer-motion';
import { NavLink } from "react-router-dom";
import { handleClick } from "../../common/helpers.js";
import MetaTags from "../../common/MetaTags.jsx";

const Services = () => {
    const { t } = useTranslation();
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
        return <Preloader />;
    }

    return (
        <main>
            <MetaTags page="seo.services" />
            {/* Hero section */}
            <motion.section
                className='md:bg-[url(/servicesDesktop.jpg)] h-screen bg-center bg-no-repeat bg-cover bg-[url(/servicesMobile.jpg)] flex items-center justify-center relative'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <h1 className="container text-white text-center z-20">{t("servicePage.title")}</h1>
                <div className='overlay'/>
            </motion.section>

            {/* Services list */}
            <section className="container mx-auto flex flex-wrap justify-center gap-10 md:gap-18 py-10 p-5">
                {store.services.map((item) => (
                    <article
                        key={item.id}
                        className="w-full md:max-w-sm lg:max-w-md bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col"
                        aria-labelledby={`service-title-${item.id}`}
                    >
                        <NavLink to={`/service/${item.url}`} onClick={handleClick}>
                            <img
                                className="rounded-t-lg h-64 w-full object-cover"
                                src={item.mobileImg}
                                alt={item.name}
                                loading="lazy"
                            />
                        </NavLink>

                        <div className="p-5 flex flex-col flex-grow">
                            <NavLink to={`/service/${item.url}`} onClick={handleClick}>
                                <h2 id={`service-title-${item.id}`} className="mb-2 !text-2xl font-bold tracking-tight text-gray-900">
                                    {item.name}
                                </h2>
                            </NavLink>
                            <p className="font-normal text-gray-900 mb-10">{item.smallDesc}</p>
                            <div className="mt-auto flex justify-end">
                                <NavLink
                                    to={`/service/${item.url}`}
                                    onClick={handleClick}
                                    className="w-fit flex items-center justify-center rounded-lg bg-red-600 text-white py-2 px-6 hover:bg-red-800 transition"
                                    aria-label={`${t("servicePage.readMore")} ${item.name}`}
                                >
                                    {t("servicePage.readMore")}
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </NavLink>
                            </div>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Services;
