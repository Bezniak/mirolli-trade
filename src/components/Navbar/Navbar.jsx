import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {useTranslation} from "react-i18next";
import useLanguage from "../../hooks/useLanguage.js";
import LanguageSelector from "./LanguageSelector.jsx";

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const {currentLanguage, changeLanguage} = useLanguage();
    const {t} = useTranslation();

    // Закрытие меню при клике вне или прокрутке
    useEffect(() => {
        const handleClickOutside = (event) => {
            const mobileMenu = document.getElementById("mobile-dropdown");
            const languageMenu = document.getElementById("languageDropdown");

            if (mobileMenu && !mobileMenu.contains(event.target) && !event.target.closest(".mobile-toggle") && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
            if (languageMenu && !languageMenu.contains(event.target) && !event.target.closest(".language-toggle") && isLanguageDropdownOpen) {
                setIsLanguageDropdownOpen(false);
            }
        };

        const handleScroll = () => {
            if (isMobileMenuOpen || isLanguageDropdownOpen) {
                setIsMobileMenuOpen(false);
                setIsLanguageDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        window.addEventListener("scroll", handleScroll);

        return () => {
            document.removeEventListener("click", handleClickOutside);
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isMobileMenuOpen, isLanguageDropdownOpen]);

    return (
        <nav className="absolute z-50 top-0 left-0 w-full bg-transparent border-gray-200">
            <div className="md:container md:mx-auto flex items-center justify-between px-4 py-4">
                {/* Кнопка меню (мобильная версия) */}
                <button
                    type="button"
                    className="md:hidden p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mobile-toggle"
                    aria-controls="mobile-dropdown"
                    aria-expanded="false"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                         viewBox="0 0 17 14">
                        <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

                {/* Логотип */}
                <NavLink to={ROUTES.HOME} className="flex items-center">
                    <img src="/logo_3.svg" alt="logo" className="h-16 md:h-24"/>
                </NavLink>

                {/* Меню (десктоп) */}
                <div className="hidden md:flex md:flex-1 justify-center">
                    <ul className="flex space-x-8 text-white">
                        <li>
                            <NavLink to={ROUTES.HOME} className="hover:text-gray-300">{t("home")}</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.ABOUT_US} className="hover:text-gray-300">{t("about_us")}</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.PORTFOLIO} className="hover:text-gray-300">{t("portfolio")}</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.PRICES} className="hover:text-gray-300">{t("prices")}</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.FAQ} className="hover:text-gray-300">{t("Faq")}</NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.CONTACTS} className="hover:text-gray-300">{t("contacts")}</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Переключатель языка */}
                <div className="relative">
                    <LanguageSelector
                        currentLanguage={currentLanguage}
                        changeLanguage={changeLanguage}
                        isOpen={isLanguageDropdownOpen}
                        toggleOpen={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                    />
                </div>
            </div>

            {/* Мобильное меню */}
            <div className={`${isMobileMenuOpen ? "block" : "hidden"} md:hidden w-96 mx-auto bg-black opacity-95`}
                 id="mobile-dropdown">
                <ul className="flex flex-col gap-3 items-s p-6 ml-2 text-white">
                    <li>
                        <NavLink to={ROUTES.HOME}
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="py-2"
                        >
                            {t("home")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.ABOUT_US}
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="py-2"
                        >
                            {t("about_us")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.PORTFOLIO}
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="py-2"
                        >
                            {t("portfolio")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.PRICES}
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="py-2"
                        >
                            {t("prices")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.FAQ}
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="py-2"
                        >
                            {t("Faq")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTES.CONTACTS}
                                 onClick={() => setIsMobileMenuOpen(false)}
                                 className="py-2"
                        >
                            {t("contacts")}
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
