import React from 'react';
import { useTranslation } from "react-i18next";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Process = () => {
    const { t } = useTranslation();

    const steps = [
        {
            id: '01',
            title: t("aboutPage.processTitle_1"),
            description: t("aboutPage.processDesc_1"),
            icon: '🛠️', // Icon for services
            ariaLabel: t("aboutPage.processAria_1") || "Tools icon"
        },
        {
            id: '02',
            title: t("aboutPage.processTitle_2"),
            description: t("aboutPage.processDesc_2"),
            icon: '🛡️', // Icon for quality and safety
            ariaLabel: t("aboutPage.processAria_2") || "Shield icon"
        },
        {
            id: '03',
            title: t("aboutPage.processTitle_3"),
            description: t("aboutPage.processDesc_3"),
            icon: '💼', // Icon for experience and professionalism
            ariaLabel: t("aboutPage.processAria_3") || "Briefcase icon"
        },
        {
            id: '04',
            title: t("aboutPage.processTitle_4"),
            description: t("aboutPage.processDesc_4"),
            icon: '📄', // Icon for documents or contracts
            ariaLabel: t("aboutPage.processAria_4") || "Document icon"
        }
    ];

    return (
        <section className="bg-gray-100 py-20 px-6" aria-labelledby="process-title">
            <div className="max-w-6xl mx-auto text-center">
                <h2 id="process-title" className="text-blue-600 font-semibold text-2xl mb-5">
                    {t("aboutPage.processTitle")}
                </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {steps.map((step) => {
                    const { ref, inView } = useInView({
                        triggerOnce: false,
                        threshold: 0.3,
                    });

                    return (
                        <motion.article
                            key={step.id}
                            ref={ref}
                            initial={{ opacity: 0, y: 90 }}
                            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 90 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="bg-white shadow-lg rounded-lg p-6 text-center relative"
                        >
                            <span
                                className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-white px-3 py-1 rounded-full font-bold"
                                aria-hidden="true"
                            >
                                {step.id}
                            </span>
                            <div role="img" aria-label={step.ariaLabel} className="text-5xl mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-lg leading-6 mb-5 font-semibold text-gray-900">{step.title}</h3>
                            <p className="text-gray-600 mt-2">{step.description}</p>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
};

export default Process;
