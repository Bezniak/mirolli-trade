import {animateScroll as scroll} from "react-scroll";

export const handleClick = () => {
    scroll.scrollToTop({
        duration: 0,
        smooth: 'easeInOutQuad',
    });
};

export const handleAddressClick = (event) => {
    event.preventDefault();
    const formattedAddress = encodeURIComponent('г. Новогрудок, ул. Гродненская, 82С');
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
    window.open(googleMapsUrl, '_blank');
};