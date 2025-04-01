import React from 'react';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {FaViber, FaWhatsapp} from "react-icons/fa";
import {FaTelegram} from "react-icons/fa6";
import {MdOutlineMailOutline} from "react-icons/md";
import {handleAddressClick, handleClick} from "../../common/helpers.js";
import {createStore} from "../../store/store.js";

const Footer = () => {
    const {t} = useTranslation();
    const year = new Date().getFullYear();
    const store = createStore(t);


    return (
        <footer className="bg-black">
            <div className="mx-auto w-full max-w-screen-2xl pt-10">
                <div className="flex flex-col md:flex-row gap-20 justify-between items-start px-6 py-6">
                    <div>
                        <h2 className="mb-6 !text-2xl font-semibold uppercase text-white">
                            {t("contacts")}
                        </h2>
                        <p className='leading-relaxed font-medium !text-white mb-4'>
                            {t("contactsPage.workingHours_1")}
                        </p>
                        <p className='leading-relaxed font-medium !text-white mb-4'>
                            {t("contactsPage.workingHours_2")}
                        </p>
                        <ul className='flex flex-col gap-4 text-white'>
                            <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'
                                onClick={handleAddressClick}>
                                {t("address")}
                            </li>
                            <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                                <a href={`tel:${t("phone_1")}`} className='flex items-center gap-3'>
                                    {t("phone_1")}
                                </a>
                            </li>
                            <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                                <a href={`tel:${t("phone_2")}`} className='flex items-center gap-3'>
                                    {t("phone_2")}
                                </a>
                            </li>
                            <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                                <a href={`tel:${t("phone_3")}`} className='flex items-center gap-3'>
                                    {t("phone_3")}
                                </a>
                            </li>
                            <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                                <a href={`mailto:${t("email")}`} className='flex items-center gap-3'>
                                    {t("email")}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-6 !text-2xl font-semibold uppercase text-white">
                            {t("about_us")}
                        </h2>
                        <ul className="text-white font-medium">
                            <li className="mb-4" onClick={handleClick}>
                                <NavLink to={ROUTES.ABOUT_US} className="hover:text-red-500 transition">
                                    {t("about_us")}
                                </NavLink>
                            </li>
                            {/*<li className="mb-4" onClick={handleClick}>*/}
                            {/*    <NavLink to={ROUTES.PORTFOLIO} className="hover:text-red-500 transition">*/}
                            {/*        {t("portfolio")}*/}
                            {/*    </NavLink>*/}
                            {/*</li>*/}
                            <li className="mb-4" onClick={handleClick}>
                                <NavLink to={ROUTES.FAQ} className="hover:text-red-500 transition">
                                    {t("Faq")}
                                </NavLink>
                            </li>
                            <li className="mb-4" onClick={handleClick}>
                                <NavLink to={ROUTES.PRIVACY_POLICY} className="hover:text-red-500 transition">
                                    {t("privacyPolicy")}
                                </NavLink>
                            </li>
                            <li className="mb-4" onClick={handleClick}>
                                <NavLink to={ROUTES.CONTACTS} className="hover:text-red-500 transition">
                                    {t("contacts")}
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="md:col-span-2">
                        <h2 className="mb-6 !text-2xl font-semibold uppercase text-white">
                            {t("services")}
                        </h2>
                        <ul className="text-white font-medium">
                            {store.services.map((service) => (
                                <li key={service.id} className="mb-4" onClick={handleClick}>
                                    <NavLink to={`/service/${service.url}`} onClick={handleClick}
                                             className="hover:text-red-500 transition">
                                        {service.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                <div className="px-4 py-6 bg-gray-900 md:flex md:items-center md:justify-between">
                    <span className="text-base text-white text-center font-light">
                        © {year}. <NavLink to={ROUTES.HOME} onClick={handleClick}>{t("companyName")}™</NavLink>.
                        &nbsp;
                        <a href="https://contragent.by/unp/591614779"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="hover:text-red-500 transition font-light"
                        >
                            {t("UNP")}.
                        </a>
                        &nbsp;
                        {t("all_right_reserved")}
                    </span>

                    <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                        <a href="viber://chat?number=%2B375291132228"
                           target='_blank'
                           className="text-white hover:text-red-500">
                            <FaViber className="w-6 h-6"/>
                        </a>
                        <a href="https://t.me/ivan_bezniak" target='_blank'
                           className="text-white hover:text-red-500">
                            <FaTelegram className="w-6 h-6"/>
                        </a>
                        <a href="mailto:tvbr@tut.by" target='_blank'
                           className="text-white hover:text-red-500">
                            <MdOutlineMailOutline className="w-6 h-6"/>
                        </a>
                        <a href="https://wa.me/375291132228" target='_blank'
                           className="text-white hover:text-red-500 transition">
                            <FaWhatsapp className="w-6 h-6"/>
                        </a>
                    </div>
                </div>
                <div className='px-4 pb-5 bg-gray-900 text-center'>
                    <p className='!text-white'>
                        {t("developed_by")} &nbsp;
                        <a href="https://www.linkedin.com/in/ivan-bezniak-2634a11a0/"
                           rel="noreferrer"
                           target="_blank"
                           className='text-white hover:text-red-500 transition'
                        >
                            {t("ivan_bezniak")}
                        </a>
                    </p>
                </div>

            </div>
        </footer>

    );
};

export default Footer;