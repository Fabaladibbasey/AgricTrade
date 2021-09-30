import React from 'react'
import './Footer.css'
const Footer = () => {
    return (
        <footer className="footer">
        <div className="box-container">
<SocialMediaLink />
<Contacts />
<Subscribe />
    </div>
    <div className="credit"> created by <span> GamTech solutionist </span> | all rights reserved </div>
        </footer>
    )
}

export default Footer


function SocialMediaLink() {

    return (
        <div className="box">
            <h3> AgricTech <i className='fab fa-pagelines'></i> </h3>
            <p>We're avalaible in this social media. Don't forget to connect with us with any social media you use so you stay updated</p>
            <div className="share">
                <a href="/" className="fab fa-facebook-f"></a>
                <a href="/" className="fab fa-twitter"></a>
                <a href="/" className="fab fa-instagram"></a>
                <a href="/" className="fab fa-linkedin"></a>
            </div>
        </div>
);
}

function Contacts() {
    return ( <div className="box">
            <h3>contact info</h3>
            <a href="/" className="links"> <i className="fas fa-phone"></i> +220 3539005 </a>
            <a href="/" className="links"> <i className="fas fa-phone"></i> +220 3539005 </a>
            <a href="#home" className="links"> <i className="fas fa-envelope"></i> fd22014182@utg.edu.gm </a>
            <a href="/" className="links"> <i className="fas fa-map-marker-alt"></i>Banjul, The Gambia</a>
        </div> );
}
function Subscribe() {
    return (         <div className="box">
            <h3>newsletter</h3>
            <p>subscribe for latest products</p>
            <input type="email" placeholder="your email" className="email" />
            <input type="submit" value="subscribe" className="btn" />

        </div> );
}

