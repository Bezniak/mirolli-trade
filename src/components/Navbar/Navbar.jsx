import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../config/routes.js";
import { useTranslation } from "react-i18next";
import useLanguage from "../../hooks/useLanguage.js";
import { RiMailSendLine } from "react-icons/ri";
import { handleClick } from "../../common/helpers.js";

// Utility for conditional classes
function cx(...args) {
    return args.filter(Boolean).join(" ");
}

const NAV_ITEMS = [
    { to: ROUTES.HOME, key: "home" },
    { to: ROUTES.ABOUT_US, key: "about_us" },
    { to: ROUTES.SERVICES, key: "services" },
    { to: ROUTES.FAQ, key: "Faq" },
    { to: ROUTES.CONTACTS, key: "contacts" },
];

const LANGS = [
    { code: "en", label: "English", flag: "/en.svg" },
    { code: "ru", label: "Русский", flag: "/by.svg" },
];

export default function Navbar() {
    const { t } = useTranslation();
    const { currentLanguage, changeLanguage } = useLanguage();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const firstMobileLinkRef = useRef(null);
    const toggleBtnRef = useRef(null);
    const langButtonRef = useRef(null);
    const langMenuRef = useRef(null);
    const optionRefs = useRef([]);

    // Scroll and resize effects
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        const onResize = () => {
            if (window.innerWidth >= 768 && mobileOpen) setMobileOpen(false);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, [mobileOpen]);

    // Lock body scroll for mobile menu
    useEffect(() => {
        const root = document.documentElement;
        if (mobileOpen) {
            const prev = root.style.overflow;
            root.style.overflow = "hidden";
            return () => { root.style.overflow = prev; };
        }
    }, [mobileOpen]);

    // Escape key closes menus
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") {
                if (mobileOpen) setMobileOpen(false);
                if (langOpen) {
                    setLangOpen(false);
                    setFocusedIndex(-1);
                    langButtonRef.current?.focus();
                }
            }
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [mobileOpen, langOpen]);

    // Click outside closes desktop language menu
    useEffect(() => {
        if (!langOpen) return;
        const onDocPointerDown = (e) => {
            if (langMenuRef.current?.contains(e.target) || langButtonRef.current?.contains(e.target)) return;
            setLangOpen(false);
            setFocusedIndex(-1);
        };
        document.addEventListener("pointerdown", onDocPointerDown);
        return () => document.removeEventListener("pointerdown", onDocPointerDown);
    }, [langOpen]);

    // Open language menu helper
    function handleLangToggle() {
        if (langOpen) {
            setLangOpen(false);
            setFocusedIndex(-1);
            return;
        }
        setLangOpen(true);
        const idx = LANGS.findIndex((l) => l.code === currentLanguage);
        const start = idx >= 0 ? idx : 0;
        requestAnimationFrame(() => {
            setFocusedIndex(start);
            optionRefs.current[start]?.focus();
        });
    }

    // Keyboard navigation inside language menu
    function onLangMenuKeyDown(e) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((i) => {
                const next = Math.min(i + 1, LANGS.length - 1);
                optionRefs.current[next]?.focus();
                return next;
            });
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((i) => {
                const prev = Math.max(i - 1, 0);
                optionRefs.current[prev]?.focus();
                return prev;
            });
        } else if (e.key === "Home") {
            e.preventDefault();
            setFocusedIndex(0);
            optionRefs.current[0]?.focus();
        } else if (e.key === "End") {
            e.preventDefault();
            setFocusedIndex(LANGS.length - 1);
            optionRefs.current[LANGS.length - 1]?.focus();
        }
    }

    const baseText = scrolled ? "text-gray-900" : "text-white";
    const hoverText = scrolled ? "hover:text-gray-700" : "hover:text-gray-300";

    const linkClass = ({ isActive }) =>
        cx(
            "px-1 py-0.5 transition outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded-sm",
            baseText,
            hoverText,
            isActive && "font-semibold underline underline-offset-8"
        );

    return (
        <header
            className={cx(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                scrolled
                    ? "bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-black/5 shadow-sm"
                    : "bg-transparent"
            )}
        >
            <nav aria-label="Primary" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Left: Logo */}
                    <NavLink to={ROUTES.HOME} className="flex items-center gap-3" aria-label="Home">
                        <img src="/logo_3.svg" alt="Company logo" className="h-10 md:h-14 w-auto select-none" />
                    </NavLink>

                    {/* Center: Desktop Nav */}
                    <ul className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <li key={item.key} onClick={handleClick}>
                                <NavLink to={item.to} className={linkClass}>
                                    {t(item.key)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Right: CTA + Language + Mobile Toggle */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <NavLink
                            to={ROUTES.BOOK}
                            className={cx(
                                "hidden sm:inline-flex items-center justify-center rounded-xl font-semibold px-4 py-2 transition shadow-sm",
                                scrolled
                                    ? "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600"
                                    : "bg-white text-indigo-600 hover:bg-indigo-50 focus-visible:ring-indigo-600",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            )}
                        >
                            <RiMailSendLine className="size-5 mr-2" /> {t("makeRequest")}
                        </NavLink>

                        {/* Desktop language selector */}
                        <div className="hidden md:block relative" ref={langMenuRef}>
                            <button
                                ref={langButtonRef}
                                type="button"
                                aria-haspopup="menu"
                                aria-expanded={langOpen}
                                onClick={handleLangToggle}
                                onKeyDown={(e) => {
                                    if (e.key === "ArrowDown") {
                                        e.preventDefault();
                                        if (!langOpen) handleLangToggle();
                                    }
                                }}
                                className={cx(
                                    "hidden sm:inline-flex items-center justify-center rounded-xl font-semibold px-4 py-2 transition shadow-sm",
                                    scrolled
                                        ? "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600"
                                        : "bg-white text-indigo-600 hover:bg-indigo-50 focus-visible:ring-indigo-600",
                                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                                )}
                            >
                                <img
                                    src={LANGS.find((l) => l.code === currentLanguage)?.flag || LANGS[0].flag}
                                    alt="language"
                                    className="w-5 h-5 select-none mr-3"
                                    draggable={false}
                                />
                                <span className="hidden lg:inline-block">{LANGS.find((l) => l.code === currentLanguage)?.label || "EN"}</span>
                                <svg
                                    className={cx("w-4 h-4 transform transition-transform", langOpen ? "rotate-180" : "rotate-0")}
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {langOpen && (
                                <div
                                    role="menu"
                                    aria-label={t("chooseLanguage") ?? "Choose language"}
                                    onKeyDown={onLangMenuKeyDown}
                                    className={cx(
                                        "absolute right-0 mt-2 w-44 rounded-lg overflow-hidden shadow-lg ring-1 ring-black/10 focus:outline-none z-50",
                                        scrolled ? "bg-white text-gray-900" : "bg-neutral-900 text-white"
                                    )}
                                >
                                    <div className="py-1">
                                        {LANGS.map((lang, idx) => (
                                            <button
                                                key={lang.code}
                                                ref={(el) => (optionRefs.current[idx] = el)}
                                                role="menuitem"
                                                tabIndex={-1}
                                                onClick={() => {
                                                    changeLanguage(lang.code);
                                                    setLangOpen(false);
                                                    langButtonRef.current?.focus();
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter" || e.key === " ") {
                                                        e.preventDefault();
                                                        changeLanguage(lang.code);
                                                        setLangOpen(false);
                                                        langButtonRef.current?.focus();
                                                    }
                                                }}
                                                className={cx(
                                                    "w-full text-left flex items-center gap-2 px-3 py-2 text-sm leading-6 transition",
                                                    scrolled ? "hover:bg-gray-100" : "hover:bg-white/10",
                                                    currentLanguage === lang.code ? "font-semibold" : ""
                                                )}
                                            >
                                                <img src={lang.flag} alt="" className="w-5 h-5 rounded-full object-cover" draggable={false} />
                                                <span className="flex-1">{lang.label}</span>
                                                {currentLanguage === lang.code && (
                                                    <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            ref={toggleBtnRef}
                            type="button"
                            aria-controls="mobile-panel"
                            aria-expanded={mobileOpen}
                            aria-label={mobileOpen ? t("close") ?? "Close" : t("open") ?? "Open"}
                            className={cx(
                                "md:hidden inline-flex items-center justify-center rounded-lg p-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                scrolled
                                    ? "text-gray-900 hover:bg-gray-100 focus-visible:ring-indigo-600"
                                    : "text-white hover:bg-white/10 focus-visible:ring-white"
                            )}
                            onClick={() => setMobileOpen((v) => !v)}
                        >
                            {mobileOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                                    <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile overlay */}
            <div
                className={cx(
                    "md:hidden fixed inset-0 z-40 transition-opacity",
                    mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                aria-hidden="true"
                onClick={() => {
                    setMobileOpen(false);
                    setLangOpen(false);
                }}
            >
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Mobile panel */}
            <aside
                id="mobile-panel"
                role="dialog"
                aria-modal="true"
                className={cx(
                    "md:hidden fixed top-0 right-0 h-[100svh] w-[85%] max-w-sm z-50 bg-neutral-900 text-white shadow-xl",
                    "transition-transform duration-300",
                    mobileOpen ? "translate-x-0" : "translate-x-full"
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <NavLink
                        to={ROUTES.HOME}
                        onClick={() => {
                            setMobileOpen(false);
                            setLangOpen(false);
                        }}
                        className="flex items-center gap-3"
                    >
                        <img src="/logo_3.svg" alt="Company logo" className="h-9 w-auto" />
                    </NavLink>
                    <button
                        type="button"
                        aria-label="Close menu"
                        className="p-2 rounded-lg hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        onClick={() => {
                            setMobileOpen(false);
                            setLangOpen(false);
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <div className="px-4 pt-4 pb-6 overflow-y-auto h-[calc(100svh-3.5rem)]">
                    {/* Primary CTA */}
                    <NavLink
                        to={ROUTES.BOOK}
                        onClick={() => {
                            setMobileOpen(false);
                            setLangOpen(false);
                        }}
                        className="mb-4 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        <RiMailSendLine className="size-5 mr-2" /> {t("makeRequest")}
                    </NavLink>

                    {/* Links */}
                    <ul className="flex flex-col gap-1">
                        {NAV_ITEMS.map((item, idx) => (
                            <li key={item.key} onClick={handleClick}>
                                <NavLink
                                    ref={idx === 0 ? firstMobileLinkRef : null}
                                    to={item.to}
                                    onClick={() => {
                                        setMobileOpen(false);
                                        setLangOpen(false);
                                    }}
                                    className={({ isActive }) =>
                                        cx(
                                            "block rounded-lg px-3 py-3 text-base transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
                                            isActive ? "bg-white text-neutral-900 font-semibold" : "hover:bg-white/10"
                                        )
                                    }
                                >
                                    {t(item.key)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile languages */}
                    <section aria-label={t("language") ?? "Language"} className="mt-6 border-t border-white/10 pt-4">
                        <div role="radiogroup" aria-label={t("chooseLanguage") ?? "Choose language"} className="flex items-center justify-center gap-6">
                            {/* EN */}
                            <label className="relative inline-flex items-center -m-2 p-2">
                                <input
                                    type="radio"
                                    name="lang-mobile"
                                    value="en"
                                    checked={currentLanguage === "en"}
                                    onChange={() => {
                                        changeLanguage("en");
                                        setMobileOpen(false);
                                    }}
                                    className="peer sr-only"
                                    aria-label="English"
                                />
                                <img src="/en.svg" alt="English" className="w-10 h-10 select-none transition" draggable={false} />
                                <span className="sr-only">English</span>
                            </label>

                            {/* RU */}
                            <label className="relative inline-flex items-center -m-2 p-2">
                                <input
                                    type="radio"
                                    name="lang-mobile"
                                    value="ru"
                                    checked={currentLanguage === "ru"}
                                    onChange={() => {
                                        changeLanguage("ru");
                                        setMobileOpen(false);
                                    }}
                                    className="peer sr-only"
                                    aria-label="Русский"
                                />
                                <img src="/by.svg" alt="Русский" className="w-10 h-10 select-none transition" draggable={false} />
                                <span className="sr-only">Русский</span>
                            </label>
                        </div>
                    </section>
                </div>
            </aside>
        </header>
    );
}
