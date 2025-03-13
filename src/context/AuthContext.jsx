import React, {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import i18n from "i18next";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [locale, setLocale] = useState(Cookies.get('i18nextLng') || 'ru'); // Добавляем локаль

    useEffect(() => {
        i18n.changeLanguage(locale); // Обновляем язык в i18next
        Cookies.set('i18nextLng', locale, {expires: 365}); // Обновляем куку локали
    }, [locale]);


    const changeLocale = (newLocale) => {
        setLocale(newLocale); // Изменяем локаль
    };

    return (
        <AuthContext.Provider value={{locale, changeLocale}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
