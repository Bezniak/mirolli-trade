import React, {useState} from 'react';
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
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const onSubmit = async (data) => {
        setSubmitError("");
        setIsSubmitting(true);
        setIsSubmitted(false);
        try {
            const body = new URLSearchParams({
                name: data.name || "",
                email: data.email || "",
                phone: data.phone || "",
                subject: data.subject || "",
                message: data.message || ""
            }).toString();

            const phpResponse = await fetch('/send-form.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
                body
            });

            if (!phpResponse.ok) {
                const text = await phpResponse.text();
                throw new Error(text || 'Ошибка при отправке на сервер');
            }

            const contentType = phpResponse.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const json = await phpResponse.json();
                if (json.success === false) throw new Error(json.message || 'Ошибка сервера');
            }

            setIsSubmitted(true);
            reset();
        } catch (error) {
            console.error("Ошибка отправки:", error);
            setSubmitError(error.message || "Не удалось отправить заявку. Попробуйте позже.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-lg">
            {!isSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-12" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <div className="flex items-center border-gray-300 py-2">
                                <FaRegUser className="text-gray-500 mr-4 size-5"/>
                                <input
                                    type="text"
                                    placeholder={t('contactsForm.name')}
                                    {...register('name', {required: t("contactsForm.required")})}
                                    className={`w-full focus:outline-none border-b py-2 ${errors.name ? "border-red-500" : "border-gray-300"}`}
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
                                    className={`w-full focus:outline-none border-b py-2 ${errors.email ? "border-red-500" : "border-gray-300"}`}
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
                                        pattern: {value: /^[+]?[0-9]{10,15}$/, message: t("contactsForm.invalidPhone")}
                                    })}
                                    className={`w-full focus:outline-none border-b py-2 ${errors.phone ? "border-red-500" : "border-gray-300"}`}
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
                                    className={`w-full focus:outline-none border-b py-2 ${errors.subject ? "border-red-500" : "border-gray-300"}`}
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
                                    minLength: {value: 10, message: t("contactsForm.minLength")}
                                })}
                                className={`w-full h-44 resize-none focus:outline-none border-b py-2 ${errors.message ? "border-red-500" : "border-gray-300"}`}
                            />
                        </div>
                        {errors.message && <p className="!text-red-500 text-sm">{errors.message.message}</p>}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-10 space-x-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex items-center justify-center bg-red-600 text-white py-4 px-12 hover:bg-red-800 transition ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                        >
              <span className={`${isSubmitting ? 'animate-spin mr-2' : 'mr-2'}`}>
                <FaPaperPlane/>
              </span>
                            {isSubmitting ? t('contactsForm.sending', {defaultValue: 'Отправка...'}) : t('contactsForm.submit')}
                        </button>

                        <div>
                            <div className='flex items-center justify-center gap-3'>
                                <input
                                    type="checkbox"
                                    {...register('privacyPolicy', {required: t("contactsForm.agree")})}
                                    className="w-6 h-6 accent-red-600"
                                />
                                <label className="text-gray-600 text-sm">
                                    {t('contactsForm.privacyAgreement')}
                                    <NavLink to={ROUTES.PRIVACY_POLICY}
                                             className="hover:text-red-600 underline transition">
                                        {t('contactsForm.pp')}
                                    </NavLink>
                                </label>
                            </div>
                            {errors.privacyPolicy &&
                                <p className="!text-red-500 text-sm">{errors.privacyPolicy.message}</p>}
                        </div>
                    </div>

                    {submitError && <p className="text-red-500 text-sm mt-2">{submitError}</p>}
                </form>
            ) : (
                <p className="text-green-600 text-lg font-medium mt-4">
                    {t('contactsForm.success', {defaultValue: 'Заявка успешно отправлена. Спасибо!'})}
                </p>
            )}
        </div>
    );
};

export default ContactsForm;
