import React from 'react';
import {useTranslation} from "react-i18next";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {FaInstagramSquare, FaTiktok, FaViber} from "react-icons/fa";
import {FaTelegram} from "react-icons/fa6";
import {MdOutlineMailOutline} from "react-icons/md";
import {handleClick} from "../../common/helpers.js";

const Footer = () => {
    const {t} = useTranslation();
    const year = new Date().getFullYear();


    return (
        <footer className="bg-black">
            <div className="mx-auto w-full max-w-screen-xl">
                <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-3">
                    <div>
                        <NavLink to={ROUTES.HOME} onClick={handleClick}>
                            <img src="/logo_3.svg" alt="logo" className='size-28 mb-10'/>
                        </NavLink>
                        <ul className="text-gray-500 dark:text-gray-400 font-medium">
                            <li className="mb-4" onClick={handleClick}>
                                <NavLink to={ROUTES.ABOUT_US} className="hover:text-red-500 transition">
                                    {t("about_us")}
                                </NavLink>
                            </li>
                            <li className="mb-4" onClick={handleClick}>
                                <NavLink to={ROUTES.PORTFOLIO} className="hover:text-red-500 transition">
                                    {t("portfolio")}
                                </NavLink>
                            </li>
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
                    {/*<div>*/}
                    {/*    <h2 className="mb-6 text-sm font-semibold uppercase text-white">*/}
                    {/*        {t("website_development")}*/}
                    {/*    </h2>*/}
                    {/*    <ul className="text-gray-500 dark:text-gray-400 font-medium">*/}
                    {/*        <li className="mb-4">*/}
                    {/*            <NavLink to={'sites' + ROUTES.BUSINESS_CARD_WEBSITE} className="hover:underline"*/}
                    {/*                     onClick={handleClick}>*/}
                    {/*                {t("business_card_website")}*/}
                    {/*            </NavLink>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                    {/*<div>*/}
                    {/*    <h2 className="mb-6 text-sm font-semibold uppercase text-white">*/}
                    {/*        {t("services")}*/}
                    {/*    </h2>*/}
                    {/*    <ul className="text-gray-500 dark:text-gray-400 font-medium">*/}
                    {/*        <li className="mb-4">*/}
                    {/*            <NavLink to={'service' + ROUTES.WEBSITE_SUPPORT} className="hover:underline"*/}
                    {/*                     onClick={handleClick}>*/}
                    {/*                {t("website_support")}*/}
                    {/*            </NavLink>*/}
                    {/*        </li>*/}
                    {/*        <li className="mb-4">*/}
                    {/*            <NavLink to={'service' + ROUTES.SMM} className="hover:underline" onClick={handleClick}>*/}
                    {/*                {t("SMM_service")}*/}
                    {/*            </NavLink>*/}
                    {/*        </li>*/}
                    {/*        <li className="mb-4">*/}
                    {/*            <NavLink to={'service' + ROUTES.LOCALIZATION_SUPPORT} className="hover:underline"*/}
                    {/*                     onClick={handleClick}>*/}
                    {/*                {t("localization_and_translation")}*/}
                    {/*            </NavLink>*/}
                    {/*        </li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>

                <div className="px-4 py-6 bg-gray-900 md:flex md:items-center md:justify-between">
                    <span className="text-base text-gray-500 text-center font-light">
                        © {year} <NavLink to={ROUTES.HOME} onClick={handleClick}>{t("companyName")}™</NavLink>.
                        &nbsp;
                        <a href="https://contragent.by/unp/591614779"
                           target="_blank"
                           rel="noopener noreferrer"
                           className="hover:text-red-500 transition font-light"
                        >
                            {t("UNP")}
                        </a>
                        &nbsp;
                        {t("all_right_reserved")}
                    </span>

                    <div className="flex mt-4 sm:justify-center md:mt-0 space-x-5 rtl:space-x-reverse">
                        <a href="viber://chat?number=%2B375295210417"
                           target='_blank'
                           className="text-gray-400 hover:text-red-500">
                            <FaViber className="w-6 h-6"/>
                        </a>
                        <a href="https://t.me/ivan_bezniak" target='_blank'
                           className="text-gray-400 hover:text-red-500">
                            <FaTelegram className="w-6 h-6"/>
                        </a>
                        <a href="mailto:tvbr@tut.by" target='_blank'
                           className="text-gray-400 hover:text-red-500">
                            <MdOutlineMailOutline className="w-6 h-6"/>
                        </a>
                    </div>
                </div>
                <div className='text-center  mt-5 pb-5'>
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