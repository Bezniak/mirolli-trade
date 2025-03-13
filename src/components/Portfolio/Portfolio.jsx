import React, {useEffect, useRef, useState} from "react";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import {useTranslation} from "react-i18next";

const Portfolio = () => {
    const {t} = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const images = [
        '/portfolio_1.jpg',
        '/portfolio_2.jpg',
        '/portfolio_3.jpg',
        '/portfolio_4.jpg',
        '/portfolio_5.jpg',
        '/portfolio_6.jpg',
    ];

    useEffect(() => {
        if (sliderRef.current) {
            const activeSlide = sliderRef.current.children[currentIndex];
            if (activeSlide) {
                const offsetLeft = activeSlide.offsetLeft;
                const sliderWidth = sliderRef.current.offsetWidth;
                const activeWidth = activeSlide.offsetWidth;

                sliderRef.current.scrollTo({
                    left: offsetLeft - (sliderWidth / 2) + (activeWidth / 2),
                    behavior: "smooth"
                });
            }
        }
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="md:my-20">
            {/* Заголовок и кнопки */}
            <div
                className='container mx-auto p-5 mb-0 md:mb-10 md:p-0 flex flex-col md:flex-row items-center justify-between'>
                <div className='flex-1'>
                    <h4 className='text-xs font-bold tracking-widest text-gray-500 uppercase mb-4'>
                        {t("portfolioPage.ourWork")}
                    </h4>
                    <h2 className='text-3xl text-center md:text-left md:text-4xl font-bold text-gray-900 leading-tight mb-6'>
                        {t("portfolioPage.title")}
                    </h2>
                </div>
                <div className='flex-1'>
                    <p className='text-justify leading-relaxed mb-6'>
                        {t("portfolioPage.description")}
                    </p>
                </div>
                <div className='gap-6 hidden md:flex ml-10'>
                    <button onClick={prevSlide} className="border rounded-full p-3 border-gray-300">
                        <FaArrowLeft className="text-gray-500"/>
                    </button>
                    <button onClick={nextSlide} className="border rounded-full p-3 border-gray-300">
                        <FaArrowRight className="text-gray-500"/>
                    </button>
                </div>
            </div>

            {/* Слайдер */}
            <div className="relative overflow-hidden">
                <div
                    ref={sliderRef}
                    className="flex gap-10 overflow-x-auto scroll-smooth no-scrollbar"
                    style={{scrollbarWidth: "none", msOverflowStyle: "none"}} // Для Safari и IE
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 overflow-hidden transition-transform duration-300 ${index === currentIndex ? '' : 'opacity-70'}`}
                        >
                            <img
                                className="h-80 object-cover"
                                src={image}
                                alt={`portfolio-${index}`}
                            />
                        </div>
                    ))}
                </div>
                <div className='mb-5 flex md:hidden gap-12 justify-center items-center mt-5'>
                    <button onClick={prevSlide} className="border rounded-full p-3 border-gray-300">
                        <FaArrowLeft className="text-gray-500"/>
                    </button>
                    <button onClick={nextSlide} className="border rounded-full p-3 border-gray-300">
                        <FaArrowRight className="text-gray-500"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
