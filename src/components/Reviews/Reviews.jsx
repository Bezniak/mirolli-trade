import React, {useEffect, useRef, useState} from "react";
import {FaUserCircle} from "react-icons/fa";
import {ChevronLeft, ChevronRight, Star} from "lucide-react";
import {useTranslation} from "react-i18next";
import {motion} from "framer-motion";

const Card = ({children}) => (
    <div className="p-6 shadow-lg rounded-xl h-full flex flex-col bg-gray-900">
        {children}
    </div>
);

const Reviews = () => {
    const {t} = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    const reviews = [
        {
            id: 1,
            text: t("reviewsPage.text_1"),
            author: t("reviewsPage.clientName_1"),
            role: t("reviewsPage.role_1"),
            avatar: "https://randomuser.me/api/portraits/men/1.jpg",
            rating: 5
        },
        {
            id: 2,
            text: t("reviewsPage.text_2"),
            author: t("reviewsPage.clientName_2"),
            role: t("reviewsPage.role_1"),
            avatar: "",
            rating: 4
        },
        {
            id: 3,
            text: t("reviewsPage.text_3"),
            author: t("reviewsPage.clientName_3"),
            role: t("reviewsPage.role_2"),
            avatar: "https://randomuser.me/api/portraits/men/3.jpg",
            rating: 5
        },
        {
            id: 4,
            text: t("reviewsPage.text_4"),
            author: t("reviewsPage.clientName_4"),
            role: t("reviewsPage.role_1"),
            avatar: "https://randomuser.me/api/portraits/women/4.jpg",
            rating: 4
        },
        {
            id: 5,
            text: t("reviewsPage.text_5"),
            author: t("reviewsPage.clientName_5"),
            role: t("reviewsPage.role_1"),
            avatar: "",
            rating: 5
        },
        {
            id: 6,
            text: t("reviewsPage.text_6"),
            author: t("reviewsPage.clientName_6"),
            role: t("reviewsPage.role_1"),
            avatar: "https://randomuser.me/api/portraits/women/6.jpg",
            rating: 5
        },
        {
            id: 7,
            text: t("reviewsPage.text_7"),
            author: t("reviewsPage.clientName_7"),
            role: t("reviewsPage.role_1"),
            avatar: "",
            rating: 4
        },
        {
            id: 8,
            text: t("reviewsPage.text_8"),
            author: t("reviewsPage.clientName_8"),
            role: t("reviewsPage.role_1"),
            avatar: "",
            rating: 5
        },
        {
            id: 9,
            text: t("reviewsPage.text_9"),
            author: t("reviewsPage.clientName_9"),
            role: t("reviewsPage.role_1"),
            avatar: "https://randomuser.me/api/portraits/men/9.jpg",
            rating: 5
        },
        {
            id: 10,
            text: t("reviewsPage.text_10"),
            author: t("reviewsPage.clientName_10"),
            role: t("reviewsPage.role_1"),
            avatar: "https://randomuser.me/api/portraits/women/10.jpg",
            rating: 5
        },
    ];

    useEffect(() => {
        if (sliderRef.current) {
            const activeSlide = sliderRef.current.children[currentIndex];
            if (activeSlide) {
                const offsetLeft = activeSlide.offsetLeft;
                const sliderWidth = sliderRef.current.offsetWidth;
                const activeWidth = activeSlide.offsetWidth;

                sliderRef.current.scrollTo({
                    left: offsetLeft - sliderWidth / 2 + activeWidth / 2,
                    behavior: "smooth",
                });
            }
        }
    }, [currentIndex]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

    return (
        <div className="w-full mx-auto py-20 text-center relative overflow-hidden">
            <h2 className="w-full p-5 mx-auto text-3xl font-bold mb-6 flex justify-center gap-12 items-center">
                <button onClick={prevSlide} className="p-3 bg-blue-600 rounded-full hover:bg-blue-800 transition">
                    <ChevronLeft className="w-6 h-6 text-white"/>
                </button>
                <span>{t("reviewsPage.title")}</span>
                <button onClick={nextSlide} className="p-3 bg-blue-600 rounded-full hover:bg-blue-800 transition">
                    <ChevronRight className="w-6 h-6 text-white"/>
                </button>
            </h2>
            <div ref={sliderRef} className="flex gap-6 overflow-hidden scroll-smooth no-scrollbar">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{opacity: 0, scale: 0.8, y: 50}}
                        animate={index === currentIndex ? {opacity: 1, scale: 1, y: 0} : {opacity: 0.5, scale: 0.9}}
                        transition={{type: "spring", stiffness: 100, damping: 10}}
                        className="flex-shrink-0 w-80 py-10"
                    >
                        <Card>
                            <div className="grid grid-rows-[auto_auto_1fr_auto] gap-3">
                                <div className="flex items-center space-x-4">
                                    {review.avatar ? (
                                        <img
                                            src={review.avatar}
                                            alt={review.author}
                                            className="w-14 h-14 rounded-full"
                                            onError={(e) => (e.target.style.display = "none")}
                                        />
                                    ) : (
                                        <FaUserCircle className="w-14 h-14 text-gray-400"/>
                                    )}
                                    <div>
                                        <h3 className="text-lg text-white text-left font-semibold">{review.author}</h3>
                                        <p className="text-gray-500 text-left text-sm">{review.role}</p>
                                    </div>
                                </div>
                                <p className="text-white overflow-hidden text-ellipsis flex-grow text-justify">{review.text}</p>
                                <div className="flex justify-start mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i}
                                              className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}/>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
