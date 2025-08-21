import React from "react";
import CountUp from "react-countup";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

const Numbers = () => {
    const {t} = useTranslation();
    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.5});

    // Рассчитываем количество лет с момента основания компании
    const startDate = dayjs("2016-09-20");
    const currentDate = dayjs();
    const totalYears = currentDate.diff(startDate, "year");

    const stats = [
        {label: t("numbers.products"), value: 162},
        {label: t("numbers.people"), value: 140},
        {label: t("numbers.years"), value: totalYears},
        {label: t("numbers.team"), value: 20},
    ];

    return (
        <section
            ref={ref}
            className="container mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-36 py-10 md:py-16"
            aria-label={t("numbers.statistics")}
        >
            <dl className="flex flex-wrap justify-center items-center gap-12 md:gap-36 w-full">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="relative w-1/2 md:w-40 h-28 md:h-44 flex items-center justify-center"
                        role="group"
                        aria-label={`${stat.label}: ${stat.value}`}
                    >
                        {/* Большие числа на фоне */}
                        <span
                            className="text-9xl md:text-9xl font-bold text-gray-900 opacity-10 absolute inset-0 flex items-center justify-center">
                            {inView ? <CountUp start={0} end={stat.value} duration={3}/> : stat.value}
                        </span>
                        {/* Текст поверх числа */}
                        <div className="absolute text-center">
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="text-2xl md:text-base font-semibold">{stat.label}</dd>
                        </div>
                    </div>
                ))}
            </dl>
        </section>
    );
};

export default Numbers;
