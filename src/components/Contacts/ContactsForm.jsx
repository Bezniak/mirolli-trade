import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FaPaperPlane, FaRegUser} from 'react-icons/fa';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {MdOutlineEmail} from "react-icons/md";
import {LiaPhoneVolumeSolid} from "react-icons/lia";
import {IoInformationCircleOutline} from "react-icons/io5";
import {BsPencil} from "react-icons/bs";

const ContactsForm = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center border-gray-300 py-2">
                            <FaRegUser className="text-gray-500 mr-4 size-5"/>
                            <input
                                type="text"
                                placeholder={t('contactsForm.name')}
                                {...register('name', { required: t("contactsForm.required") })}
                                className={`w-full focus:outline-none border-b py-2 ${
                                    errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                        </div>
                        {errors.name && <p className="!text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center border-gray-300 py-2">
                            <MdOutlineEmail className="text-gray-500 mr-4 size-6"/>
                            <input
                                type="email"
                                placeholder={t('contactsForm.email')}
                                {...register('email', {
                                    required: t("contactsForm.required"),
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: t("contactsForm.invalidEmail")
                                    }
                                })}
                                className={`w-full focus:outline-none border-b py-2 ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                        </div>
                        {errors.email && <p className="!text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <div className="flex items-center border-gray-300 py-2">
                            <LiaPhoneVolumeSolid className="text-gray-500 mr-4 size-6"/>
                            <input
                                type="tel"
                                placeholder={t('contactsForm.phone')}
                                {...register('phone', {
                                    required: t("contactsForm.required"),
                                    pattern: {
                                        value: /^[+]?[0-9]{10,15}$/,
                                        message: t("contactsForm.invalidPhone")
                                    }
                                })}
                                className={`w-full focus:outline-none border-b py-2 ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                        </div>
                        {errors.phone && <p className="!text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <div>
                        <div className="flex items-center border-gray-300 py-2">
                            <IoInformationCircleOutline className="text-gray-500 mr-4 size-6"/>
                            <input
                                type="text"
                                placeholder={t('contactsForm.subject')}
                                {...register('subject', {required: t("contactsForm.required")})}
                                className={`w-full focus:outline-none border-b py-2 ${
                                    errors.phone ? "border-red-500" : "border-gray-300"
                                }`}
                            />
                        </div>
                        {errors.subject && <p className="!text-red-500 text-sm">{errors.subject.message}</p>}
                    </div>
                </div>

                <div>
                    <div className="flex items-start border-gray-300 py-2">
                        <BsPencil className="text-gray-500 mr-4 mt-2 size-5"/>

                        <textarea
                            placeholder={t('contactsForm.textarea')}
                            {...register('message', {
                                required: t("contactsForm.required"),
                                minLength: {
                                    value: 10,
                                    message: t("contactsForm.minLength")
                                }
                            })}
                            className={`w-full h-44 resize-none focus:outline-none border-b py-2 ${
                                errors.message ? "border-red-500" : "border-gray-300"
                            }`}
                        />
                    </div>
                    {errors.message && <p className="!text-red-500 text-sm">{errors.message.message}</p>}
                </div>

                <div className="flex flex-col md:flex-row items-center gap-10 space-x-2">
                    <button type="submit"
                            className="flex items-center justify-center bg-orange-500 text-white py-4 px-12 hover:bg-orange-600 transition"
                    >
                        <FaPaperPlane className="mr-2"/> {t('contactsForm.submit')}
                    </button>

                    <div>
                        <div className='flex items-center justify-center gap-3'>
                            <input
                                type="checkbox"
                                {...register('privacyPolicy', {required: t("contactsForm.agree")})}
                                className="w-6 h-6 accent-orange-500"
                            />
                            <label className="text-gray-600 text-sm">
                                {t('contactsForm.privacyAgreement')}
                                <NavLink to={ROUTES.PRIVACY_POLICY}
                                         className="hover:text-orange-500 underline transition">
                                    {t('contactsForm.pp')}
                                </NavLink>
                            </label>
                        </div>
                        {errors.privacyPolicy &&
                            <p className="!text-red-500 text-sm">{errors.privacyPolicy.message}</p>}
                    </div>
                </div>

            </form>
        </div>
    );
};

export default ContactsForm;
