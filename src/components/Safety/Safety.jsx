import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {Preloader} from "../Preloader/Preloader.jsx";
import {handleClick} from "../../common/helpers.js";

const Safety = () => {
    const {t} = useTranslation();
    const [isLoaded, setIsLoaded] = useState(false);

    // Предзагрузка изображений
    useEffect(() => {
        const images = ["/safety_1.jpg", "/safety_2.jpg"];
        let loaded = 0;
        images.forEach(src => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loaded += 1;
                if (loaded === images.length) setIsLoaded(true);
            };
        });
    }, []);

    if (!isLoaded) return <Preloader/>;

    return (
        <section
            className='container mx-auto flex flex-col md:flex-row justify-evenly items-center gap-12 px-5 py-16 overflow-hidden'
            aria-label={t("safety.title")}
        >

            {/* Images Section */}
            <div className='relative w-full max-w-[480px] h-[600px] flex-shrink-0 md:overflow-visible overflow-hidden'>
                <img
                    src="/safety_1.jpg"
                    alt={t("safety.alt1", {defaultValue: "Safety main image"})}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    loading="lazy"
                    decoding="async"
                />
                <img
                    src="/safety_2.jpg"
                    alt={t("safety.alt2", {defaultValue: "Safety secondary image"})}
                    className="absolute right-0 md:right-[-80px] bottom-[-40px] w-56 h-80 md:w-72 md:h-96 object-cover border-4 border-white md:border-none rounded-lg shadow-lg"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            {/* Text Section */}
            <article className='max-w-lg text-center md:text-left'>
                <header>
                    <h4 className='text-xs font-bold tracking-widest text-gray-500 uppercase mb-4'>
                        {t("safety.comfort")}
                    </h4>
                    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6'>
                        {t("safety.title")}
                    </h2>
                </header>

                <p className='text-gray-600 leading-relaxed mb-6'>
                    {t("safety.description")}
                </p>

                <ul className='text-gray-700 font-medium mb-12 list-disc list-inside'>
                    <li className='mb-2 font-semibold text-lg'>{t("contactsPage.workingHours")}</li>
                    <li className='mb-2 text-blue-500 font-semibold'>{t("contactsPage.workingHours_1")}</li>
                    <li className='text-red-500 font-semibold'>{t("contactsPage.workingHours_2")}</li>
                </ul>

                <div className='flex justify-center md:justify-start'>
                    <NavLink
                        to={ROUTES.BOOK}
                        onClick={handleClick}
                        className="w-fit flex items-center justify-center bg-red-600 text-white py-4 px-12 hover:bg-red-800 transition rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        aria-label={t("leaveMessage")}
                    >
                        {t("leaveMessage")}
                    </NavLink>
                </div>
            </article>
        </section>
    );
};

export default Safety;
