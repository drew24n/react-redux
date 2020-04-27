import React from "react";
import {Container, Copyright, ScrollUp} from "./footer-style";

const Footer = () => {
    const scrollUp = () => window.scrollTo({top: 0, behavior: "smooth"});

    return (
        <Container>
            <ScrollUp onClick={scrollUp} className={"scroll-up-btn"}>&#8593;</ScrollUp>
            <Copyright>Copyright © 2020</Copyright>
        </Container>
    )
};

export default Footer;