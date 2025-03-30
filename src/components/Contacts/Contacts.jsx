import React from 'react';
import { useTranslation } from "react-i18next";
import { TbDeviceLandlinePhone } from "react-icons/tb";
import { MdOutlineEmail, MdPhoneAndroid } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { handleAddressClick } from "../../common/helpers.js";
import ContactsForm from "./ContactsForm.jsx";

const Contacts = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto my-20 flex flex-col md:flex-row w-full p-5">
            <div className='w-full md:w-1/2 flex flex-col items-start justify-between'>
                <h4 className='text-xs font-bold tracking-widest text-gray-500 uppercase mb-4'>
                    {t("contactsPage.contactsUs")}
                </h4>
                <h2 className='font-bold text-center md:text-left'>
                    {t("contactsPage.haveQuestion")}
                </h2>
                <h2 className='mb-5 font-bold text-center md:text-left'>
                    {t("contactsPage.requestUs")}
                </h2>
                <p className='text-justify leading-relaxed mb-6'>
                    {t("contactsPage.description")}
                </p>
                <p className='leading-relaxed font-bold text-xl !text-blue-400'>
                    {t("contactsPage.workingHours_1")}
                </p>
                <p className='leading-relaxed mb-6 font-bold text-xl !text-red-500'>
                    {t("contactsPage.workingHours_2")}
                </p>

                <ul className='flex flex-col gap-6'>
                    <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition' onClick={handleAddressClick}>
                        <IoLocationOutline className='size-6 text-blue-400' />
                        {t("address")}
                    </li>
                    <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                        <a href={`tel:${t("phone_1")}`} className='flex items-center gap-3'>
                            <TbDeviceLandlinePhone className='size-6 text-blue-400' />
                            {t("phone_1")}
                        </a>
                    </li>
                    <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                        <a href={`tel:${t("phone_2")}`} className='flex items-center gap-3'>
                            <MdPhoneAndroid className='size-6 text-blue-400' />
                            {t("phone_2")}
                        </a>
                    </li>
                    <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                        <a href={`tel:${t("phone_3")}`} className='flex items-center gap-3'>
                            <MdPhoneAndroid className='size-6 text-blue-400' />
                            {t("phone_3")}
                        </a>
                    </li>
                    <li className='font-light flex items-center gap-3 cursor-pointer hover:text-red-600 transition'>
                        <a href={`mailto:${t("email")}`} className='flex items-center gap-3'>
                            <MdOutlineEmail className='size-6 text-blue-400' />
                            {t("email")}
                        </a>
                    </li>
                </ul>
            </div>
            <div className='w-full md:w-1/2 mt-12'>
                <ContactsForm/>
            </div>
        </div>
    );
};

export default Contacts;
