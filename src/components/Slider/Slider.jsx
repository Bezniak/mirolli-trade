import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { ROUTES } from "../../config/routes.js";
import { handleClick } from "../../common/helpers.js";
import { Preloader } from "../Preloader/Preloader.jsx";
import "./style.css";

const Slider = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const slides = useMemo(
        () => [
            { image: "/slider_1.jpg", title: t("slider.sliderTitle_1"), alt: t("slider.sliderAlt_1", { defaultValue: t("slider.sliderTitle_1") }) },
            { image: "/slider_2.jpg", title: t("slider.sliderTitle_2"), alt: t("slider.sliderAlt_2", { defaultValue: t("slider.sliderTitle_2") }) },
            { image: "/slider_3.jpg", title: t("slider.sliderTitle_3"), alt: t("slider.sliderAlt_3", { defaultValue: t("slider.sliderTitle_3") }) },
        ],
        [t]
    );

    // Загружаем все картинки перед показом слайдера
    useEffect(() => {
        let loadedCount = 0;
        slides.forEach((slide) => {
            const img = new Image();
            img.src = slide.image;
            img.onload = () => {
                loadedCount += 1;
                if (loadedCount === slides.length) setIsLoading(false);
            };
        });
    }, [slides]);

    if (isLoading) return <Preloader />;

    return (
        <section className="relative w-full h-screen">
            <Helmet>
                <title>{t("seo.home.title")}</title>
                <meta name="description" content={t("seo.home.description")} />
                <meta name="keywords" content={t("seo.home.keyword")} />
                <link rel="preload" as="image" href={slides[0].image} fetchpriority="high" />
            </Helmet>

            <Swiper
                spaceBetween={30}
                effect={"fade"}
                loop={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                speed={2000}
                modules={[Autoplay, EffectFade, Pagination]}
                className="w-full h-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img src={slide.image} alt={slide.alt} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-white z-10 max-w-[90vw] md:max-w-[60vw]">
                <h1 className="w-full md:w-4/5 leading-tight">{slides[activeIndex].title}</h1>
                <div className="mt-8 md:mt-12 flex justify-start flex-wrap gap-4">
                    <NavLink
                        to={ROUTES.SERVICES}
                        onClick={handleClick}
                        className="block text-center px-6 py-3 min-w-64 bg-white text-black font-medium hover:bg-gray-300 transition"
                    >
                        {t("slider.more")}
                    </NavLink>
                    <NavLink
                        to={ROUTES.ABOUT_US}
                        onClick={handleClick}
                        className="block text-center px-6 py-3 min-w-64 bg-white text-black font-medium hover:bg-gray-300 transition"
                    >
                        {t("slider.aboutUs")}
                    </NavLink>
                </div>
            </div>
        </section>
    );
};

export default Slider;
