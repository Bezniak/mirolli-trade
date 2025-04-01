import React, {useState} from 'react';
import Select from 'react-select';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {motion} from "framer-motion";
import serviceOptions from "../../store/services.js";
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {handleClick} from "../../common/helpers.js";

const ServiceRequestForm = () => {
    const {t} = useTranslation();
    const {register, handleSubmit, formState: {errors}, watch, reset, setValue} = useForm();
    const files = watch("files");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);

    const objectTypeOptions = [
        {value: "residential", label: t("serviceRequest.residential")},
        {value: "commercial", label: t("serviceRequest.commercial")},
        {value: "industrial", label: t("serviceRequest.industrial")},
        {value: "agricultural", label: t("serviceRequest.agricultural")}
    ];

    const handleSelectChange = (selectedOptions, name) => {
        setValue(name, selectedOptions.map(option => option.value));
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/upload`, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        return data.secure_url;
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmissionResult(null);
        let fileUrls = [];

        if (files?.length > 0) {
            for (let file of files) {
                const fileUrl = await uploadFile(file);
                fileUrls.push(fileUrl);
            }
        }

        const formatDate = (dateString) => {
            if (!dateString) return "Не указана";
            const [year, month, day] = dateString.split("-");
            return `${day}.${month}.${year}`;
        };

        // Проверка на пустые значения в выпадающих списках
        const selectedServices = data.serviceType && data.serviceType.length > 0
            ? data.serviceType
                .map((service, index) => `             
                ${index + 1}) ${serviceOptions.find(option => option.value === service)?.label || service}`)
                .join("\n")
            : "Не выбрано";


        const selectedObjectTypes = data.objectType && data.objectType.length > 0
            ? data.objectType
                .map(type => objectTypeOptions.find(option => option.value === type)?.label || type)
                .join(", ")
            : "Не выбрано";

        const telegramMessage = `
Новая заявка с формы:
---------------------------------
👤 <b>Имя:</b> ${data.fullName}
📧 <b>Email:</b> ${data.email}
📞 <b>Телефон:</b> ${data.phone}
🏢 <b>Тип объекта:</b> ${selectedObjectTypes}
🛠 <b>Вид услуги:</b> ${selectedServices}
📆 <b>Дата начала:</b> ${formatDate(data.startDate)}
📏 <b>Размер объекта:</b> ${data.objectSize || "Не указан"}
🚪 <b>Расположение объекта (адрес):</b> ${data.accessibility || "Не указан"}
🏗 <b>Сложность:</b> ${data.complexity || "Не указана"}
📝 <b>Комментарий:</b> ${data.comment || "Не указан"}

📎 <b>Файлы:</b>
${fileUrls.length > 0
            ? fileUrls.map((url, index) => `${index + 1}. <a href="${url}">Файл ${index + 1}</a>`).join("\n")
            : "Не прикреплены"}
---------------------------------`;

        const telegramApiUrl = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            const response = await fetch(telegramApiUrl, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    chat_id: import.meta.env.VITE_TELEGRAM_CHAT_ID,
                    text: telegramMessage,
                    parse_mode: "HTML"
                })
            });

            const result = await response.json();
            if (result.ok) {
                setSubmissionResult("success");
                reset();
            } else {
                setSubmissionResult("error");
            }
        } catch (error) {
            setSubmissionResult("error");
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div>
            <motion.div
                className='md:bg-[url(/book.jpg)] h-screen bg-center bg-no-repeat bg-cover bg-[url(/bookMobile.png)] flex items-center justify-center'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="container text-white text-center z-20">
                    {t("book.title")}
                </h1>
            </motion.div>
            <div className='overlay'></div>

            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                {submissionResult === "success" ? (
                    <p className="h-96 flex items-center justify-center text-2xl !text-green-600 text-center">{t("serviceRequest.successMessage")}</p>
                ) : submissionResult === "error" ? (
                    <p className="h-96 flex items-center justify-center text-2xl !text-red-600 text-center">{t("serviceRequest.errorMessage")}</p>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 my-20">
                        <h2 className='text-center'>
                            {t("serviceRequest.title")}
                        </h2>
                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.fullName")}*</label>
                            <input
                                type="text"
                                {...register('fullName', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"
                            />
                            {errors.fullName && <p className="!text-red-600 text-sm">{t("serviceRequest.requiredField")}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.phone")}*</label>
                            <input
                                type="tel"
                                {...register('phone', { required: true })}
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"
                            />
                            {errors.phone && <p className="!text-red-600 text-sm">{t("serviceRequest.requiredField")}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.email")}</label>
                            <input
                                type="email"
                                {...register('email')}
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"
                            />
                            {errors.email && <p className="!text-red-600 text-sm">{t("serviceRequest.requiredField")}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.objectType")}</label>
                            <Select
                                isMulti
                                options={objectTypeOptions}
                                className="basic-multi-select outline-none focus:outline-none"
                                placeholder="Выберите тип объекта"
                                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'objectType')}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.serviceType")}</label>
                            <Select
                                isMulti
                                options={serviceOptions}
                                className="basic-multi-select outline-none focus:outline-none"
                                placeholder="Выберите вид услуги"
                                onChange={(selectedOptions) => handleSelectChange(selectedOptions, 'serviceType')}
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.startDate")}</label>
                            <input type="date" {...register('startDate')}
                                   className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"/>
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.objectSize")}</label>
                            <input type="text" {...register('objectSize')}
                                   className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"/>
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.accessibility")}</label>
                            <input type="text" {...register('accessibility')}
                                   className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"/>
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.complexity")}</label>
                            <textarea {...register('complexity')}
                                      className="w-full p-3 border border-gray-300 rounded-lg h-44 outline-none focus:outline-none"/>
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.comment")}</label>
                            <textarea {...register('comment')}
                                      className="w-full p-3 border border-gray-300 rounded-lg h4 outline-none focus:outline-none"/>
                        </div>

                        <div>
                            <label className="block text-gray-700">{t("serviceRequest.fileUpload")}</label>
                            <input type="file" {...register('files')} multiple
                                   className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:outline-none"/>
                        </div>
                        <div className='flex items-center font-normal !text-black'>
                            <p className='!text-black'>{t("serviceRequest.accept")}</p> &nbsp;
                            <NavLink to={ROUTES.PRIVACY_POLICY} onClick={handleClick} className='underline hover:text-red-600 transition'>{t("serviceRequest.pp")}</NavLink>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 rounded-lg text-white transition ${
                                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-800"
                            }`}
                        >
                            {isSubmitting ? t("serviceRequest.submitting") : t("serviceRequest.submit")}
                        </button>

                    </form>

                )}
            </div>
        </div>
    );
};

export default ServiceRequestForm;
