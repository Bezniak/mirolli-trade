// MetaTags.jsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const MetaTags = ({ page = "", title, description, keywords }) => {
    const { t } = useTranslation();

    // Если title/description/keywords переданы через пропсы — используем их,
    // иначе берём их из i18n по ключу page
    const metaTitle = title || t(`${page}.title`);
    const metaDescription = description || t(`${page}.description`);
    const metaKeywords = keywords || t(`${page}.keyword`);

    return (
        <Helmet>
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            {metaKeywords && <meta name="keywords" content={metaKeywords} />}
        </Helmet>
    );
};

MetaTags.propTypes = {
    page: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
};

export default MetaTags;
