import React, {useRef, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import {BsDashLg} from "react-icons/bs";
import {Parallax} from "react-scroll-parallax";


const Faq = () => {
    const faqRef = useRef(null);
    const {t} = useTranslation();
    const [openIndex, setOpenIndex] = useState(null);
    const faqInView = useInView(faqRef, {once: true, margin: "0px 0px -100px 0px"});


    const faqData = [
        {question: t("question_1"), answer: t("answer_1")},
        {question: t("question_2"), answer: t("answer_2")},
        {question: t("question_3"), answer: t("answer_3")},
        {question: t("question_4"), answer: t("answer_4")},
        {question: t("question_5"), answer: t("answer_5")},
        {question: t("question_6"), answer: t("answer_6")},
    ];

    return (
        <div>
            <motion.div
                className='md:bg-[url(/faqBg.jpg)] h-screen bg-center bg-no-repeat bg-cover bg-[url(/faqBgMobile.jpg)] flex items-center justify-center'
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1}}
            >
                <h1 className="container text-white text-center z-20">
                    {t("Faq")}
                </h1>
            </motion.div>
            <div className='overlay'></div>


            <div
                className="container mx-auto p-5 md:p-0 py-10 md:py-32 flex flex-col md:flex-row justify-between items-center gap-10">
                <motion.div
                    ref={faqRef}
                    initial={{opacity: 0, y: 50}}
                    animate={faqInView ? {opacity: 1, y: 0} : {}}
                    transition={{duration: 0.8}}
                    className='container mx-auto'
                >
                    <p className="mb-4 text-yellow-400 uppercase tracking-widest flex items-center gap-3">
                        <BsDashLg className="size-6 md:size-8"/>
                        {t("gotQuestion")}
                    </p>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md">
                                <button
                                    className="w-full text-left px-4 py-3 font-normal text-lg flex justify-between items-center bg-white hover:bg-blue-100 transition"
                                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                >
                                    {item.question}
                                    <motion.span
                                        animate={{rotate: openIndex === index ? 180 : 0}}
                                        transition={{duration: 0.3}}
                                    >
                                        {openIndex === index ? "−" : "+"}
                                    </motion.span>
                                </button>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.p
                                            initial={{height: 0, opacity: 0}}
                                            animate={{height: "auto", opacity: 1}}
                                            exit={{height: 0, opacity: 0}}
                                            transition={{duration: 0.3}}
                                            className="px-4 py-2 text-gray-700 overflow-hidden"
                                        >
                                            {item.answer}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="md:w-1/2 flex justify-center overflow-hidden relative h-fit">
                    <Parallax translateY={[-50, 50]}>
                        <img src="/faq.jpg" alt="image" className="max-w-full h-auto object-cover rounded-lg"/>
                    </Parallax>
                </div>
            </div>

        </div>
    );
};

export default Faq;