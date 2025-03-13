import React from 'react';
import ruFlag from '../../assets/ru.svg';
import enFlag from '../../assets/en.svg';

const LanguageSelector = ({currentLanguage, changeLanguage, isOpen, toggleOpen}) => {
    return (
        <div className="relative">
            <button
                className="flex items-center space-x-4 text-sm bg-transparent p-2 rounded-lg transition language-toggle"
                onClick={toggleOpen}
            >
                <img
                    src={currentLanguage === 'ru' ? ruFlag : enFlag}
                    alt="language flag"
                    className="w-9"
                />
            </button>

            {/* Language dropdown */}
            {isOpen && (
                <div
                    id="languageDropdown"
                    className="absolute right-0 z-10 mt-2 bg-white rounded-lg shadow-lg w-40"
                >
                    <ul className="text-sm text-gray-700 dark:text-gray-400 dark:bg-gray-900">
                        <li
                            onClick={() => {
                                changeLanguage('ru');
                                toggleOpen(false);
                            }}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <img src={ruFlag} alt="Русский" className="w-6 h-6 mr-2"/>
                            Русский
                        </li>
                        <li
                            onClick={() => {
                                changeLanguage('en');
                                toggleOpen(false);
                            }}
                            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <img src={enFlag} alt="English" className="w-6 h-6 mr-2"/>
                            English
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageSelector;
