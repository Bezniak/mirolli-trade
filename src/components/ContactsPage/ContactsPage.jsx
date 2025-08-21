import React from 'react';
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import Contacts from "../Contacts/Contacts.jsx";
import Map from "./Map/Map.jsx";
import MetaTags from "../../common/MetaTags.jsx";

const ContactsPage = () => {
    const {t} = useTranslation();


    return (
        <>
            <MetaTags page="seo.contacts" />
            <motion.div
                className='md:bg-[url(/contacts.jpg)] h-screen bg-center bg-no-repeat bg-cover bg-[url(/contactsMobile.jpg)] flex items-center justify-center'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="container text-white text-center z-20">
                    {t("contacts")}
                </h1>
            </motion.div>
            <div className='overlay'></div>
            <Contacts/>
            <Map/>
        </>
    );
};

export default ContactsPage;