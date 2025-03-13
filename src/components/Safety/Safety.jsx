import React from 'react';
import {useTranslation} from "react-i18next";

const Safety = () => {
    const {t} = useTranslation();

    return (
        <div
            className='container mx-auto justify-evenly flex flex-col md:flex-row items-center gap-12 px-5 py-16 overflow-hidden'>
            {/* Images Section */}
            <div className='relative w-full max-w-[480px] h-[600px] flex-shrink-0 md:overflow-visible overflow-hidden'>
                {/* Большая картинка (фон) */}
                <img
                    src="/safety_1.jpg"
                    alt="safety img"
                    className="w-full h-full object-cover "
                />
                {/* Маленькая картинка (поверх) */}
                <img
                    src="/safety_2.jpg"
                    alt="safety img"
                    className="absolute right-0 md:right-[-80px] bottom-[-40px] w-56 h-80 md:w-72 md:h-96 object-cover border-5 border-white md:border-none"
                />
            </div>

            {/* Text Section */}
            <div className='max-w-lg text-center md:text-left'>
                <h4 className='text-xs font-bold tracking-widest text-gray-500 uppercase mb-4'>
                    {t("safety.comfort")}
                </h4>
                <h2 className='text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6'>
                    {t("safety.title")}
                </h2>
                <p className='text-gray-600 leading-relaxed mb-6'>
                    {t("safety.description")}
                </p>
                <ul className='text-gray-700 font-medium mb-6'>
                    <li className='mb-2'>{t("safety.workingHours_1")}</li>
                    <li>{t("safety.workingHours_2")}</li>
                </ul>
                <button
                    className='bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition'>
                    {t("safety.contactUs")}
                </button>
            </div>
        </div>
    );
};

export default Safety;
