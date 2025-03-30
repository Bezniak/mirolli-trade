import React from 'react';
import {BsDashLg} from "react-icons/bs";
import {useTranslation} from "react-i18next";
import {motion} from 'framer-motion';
import {useInView} from 'react-intersection-observer';
import { FaTools, FaShieldAlt, FaBriefcase, FaUserAlt } from "react-icons/fa";

const Process = () => {
    const {t} = useTranslation();

    const steps = [
        {
            id: '01',
            title: t("aboutPage.processTitle_1"),
            description: t("aboutPage.processDesc_1"),
            icon: '🛠️' // Icon for services
        },
        {
            id: '02',
            title: t("aboutPage.processTitle_2"),
            description: t("aboutPage.processDesc_2"),
            icon: '🛡️' // Icon for quality and safety
        },
        {
            id: '03',
            title: t("aboutPage.processTitle_3"),
            description: t("aboutPage.processDesc_3"),
            icon: '💼' // Icon for experience and professionalism
        },
        {
            id: '04',
            title: t("aboutPage.processTitle_4"),
            description: t("aboutPage.processDesc_4"),
            icon: '📄' // Icon for documents or contracts
        }
    ];


    return (
        <div className="bg-gray-100 py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-blue-600 font-semibold text-2xl mb-5">
                    {t("aboutPage.processTitle")}
                </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {steps.map((step) => {
                    const {ref, inView} = useInView({
                        triggerOnce: false, // Ensures animation happens every time it enters the view
                        threshold: 0.3, // Animation triggers when 30% of the element is visible
                    });

                    return (
                        <motion.div
                            key={step.id}
                            ref={ref}
                            initial={{opacity: 0, y: 90}} // Initial state: invisible and off-screen
                            animate={{
                                opacity: inView ? 1 : 0,
                                y: inView ? 0 : 90
                            }} // Animate to opacity 1 and bring into place
                            transition={{duration: 1, ease: "easeOut"}} // Duration and easing
                            className="bg-white shadow-lg rounded-lg p-6 text-center relative"
                        >
                            <span
                                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-3 py-1 rounded-full font-bold">
                                {step.id}
                            </span>
                            <div className="text-5xl mb-4">{step.icon}</div>
                            <h3 className="text-lg leading-6 mb-5 font-semibold text-gray-900">{step.title}</h3>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Process;
