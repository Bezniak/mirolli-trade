import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {Autoplay, EffectFade, Pagination} from 'swiper/modules';
import {useTranslation} from "react-i18next";
import './style.css';
import {NavLink} from "react-router-dom";
import {ROUTES} from "../../config/routes.js";
import {handleClick} from "../../common/helpers.js";

const Slider = () => {
    const {t} = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);

    const slides = [
        {image: '/slider_1.jpg', title: t("slider.sliderTitle_1")},
        {image: '/slider_2.jpg', title: t("slider.sliderTitle_2")},
        {image: '/slider_3.jpg', title: t("slider.sliderTitle_3")}
    ];

    return (
        <div className="relative w-full h-screen">
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                loop={true}
                pagination={{clickable: true}}
                autoplay={{delay: 4000, disableOnInteraction: false}}
                speed={2000} // Ускоряем смену (0.5 секунды)
                modules={[Autoplay, EffectFade, Pagination]}
                className="w-full h-full"
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index} className="relative">
                        <img src={slide.image} alt={`slide_${index + 1}`}
                             className="w-full h-full object-cover transition-opacity duration-500"/>
                        <div className="absolute inset-0 bg-black opacity-30"/>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Заголовок и кнопки вынесены за пределы Swiper */}
            <div
                className="absolute left-12 top-1/2 transform -translate-y-1/2 text-white z-10 transition-opacity duration-500">
                <h1 className="w-full md:w-1/2">
                    {slides[activeIndex].title}
                </h1>
                <div className="mt-10 md:mt-20 flex justify-center md:justify-start flex-wrap gap-4 w-full">
                    <NavLink to={ROUTES.SERVICES}
                             onClick={handleClick}
                             className="block text-center px-6 py-3 min-w-64 bg-white text-black font-medium hover:bg-gray-300 transition">
                        {t('slider.more')}
                    </NavLink>
                    <NavLink to={ROUTES.ABOUT_US}
                             onClick={handleClick}
                             className="block text-center px-6 py-3 min-w-64 bg-white text-black font-medium hover:bg-gray-300 transition">
                        {t('slider.aboutUs')}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Slider;
