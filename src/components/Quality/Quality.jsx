import React from 'react';
import {useTranslation} from "react-i18next";
import {TiTickOutline} from "react-icons/ti";

const Quality = () => {
    const {t} = useTranslation();

    const services = [
        "service_1",
        "service_3",
        "service_7",
        "service_8",
        "service_9",
        "service_10",
        "service_11",
    ];

    const imgBlock = [
        {
            id: 1,
            title: t("quality.imgTitle_1"),
            desc: t("quality.imgDesc_1"),
            img: '/quality_1.jpg'
        },
        {
            id: 2,
            title: t("quality.imgTitle_2"),
            desc: t("quality.imgDesc_2"),
            img: '/quality_2.jpg'
        },
        {
            id: 3,
            title: t("quality.imgTitle_3"),
            desc: t("quality.imgDesc_3"),
            img: '/quality_3.jpg'
        },
    ]

    return (
        <div className='bg-[var(--bg-gray)]'>
            <div className='container mx-auto py-10 md:py-20 p-4'>
                <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-30'>
                    <div className='container mx-auto flex flex-col gap-0 md:gap-20'>
                        <div>
                            <h4 className='font-bold leading-tight uppercase mb-10'>
                                {t("quality.quality")}
                            </h4>
                            <h2 className='mb-10 font-bold text-center md:text-left'>
                                {t("quality.title")}
                            </h2>
                            <p className='tracking-widest text-justify'>
                                {t("quality.description")}
                            </p>
                        </div>
                        <div className='flex items-center flex-col md:flex-row'>
                            <img src='/logo.png' alt='logo' className='size-38'/>
                            <p className='text-center md:text-left'>{t("quality.addition")}</p>
                        </div>
                    </div>
                    <div className='container mx-auto'>
                        <h2 className='font-bold mb-5'>{t("quality.servicesTitle")}</h2>
                        <ul className='flex flex-col gap-4 text-[var(--gray)]'>
                            {services.map((service, index) => (
                                <li key={index} className='flex items-center'>
                                    <TiTickOutline className='size-7 mr-3'/>
                                    {t(`quality.${service}`)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-between gap-8 flex-wrap mt-10">
                    {imgBlock.map((img) => (
                        <div
                            className="max-w-sm flex flex-col border-b border-gray-300"
                            key={img.id}
                        >
                            <img className="w-full h-80 object-cover"
                                 src={img.img}
                                 alt={img.title}
                            />
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="mb-3 font-bold">
                                    {img.title}
                                </h3>
                                <p className="text-lg font-normal text-gray-700 dark:text-gray-400 flex-grow">
                                    {img.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </div>
    );
};

export default Quality;
