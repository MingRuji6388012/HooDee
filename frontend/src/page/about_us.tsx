import { Component } from "react";
import "../css/about_us.css";

class AboutUsPage extends Component{
    render(){
        return(
            <section className="introduction">
            <h3 className="Topic">About us!</h3>
            <p className="Description">Let's meet our team members of Group 2!</p>
            <div className="container-aboutus">
                <div className="profile-box">
                    <img className="profile-pic" src="/ProfilePic/Boat.jpg"></img>
                    <hr></hr>
                    <h5><strong>Phuriwat Angkoondittaphong</strong></h5>
                    <p>Sophomore student at ICT Mahidol</p>
                    <div className="social-media">
                        <a href="https://www.linkedin.com/in/phuriwat-angkoondittaphong/" target="_blank"><img className="LinkedIn" src="Elements/linkedin-2-icon-18-ffffff-32.png"></img></a>
                        <a href="" target="_blank"><img className="Instagram" src="/Elements/instagram-2-icon-18-ffffff-32.png "></img></a>
                    </div>
                    <div className="profile-bottom ">
                        <p className="profile-text">"Kept you waiting, huh?"</p>
                    </div>
                </div>

                <div className="profile-box ">
                    <img className="profile-pic " src="/ProfilePic/Ming.jpg "></img>
                    <hr></hr>
                    <h5><strong>Rujiphart Charatvaraphan</strong></h5>
                    <p>Sophomore student at ICT Mahidol</p>
                    <div className="social-media ">
                        <a href="https://www.linkedin.com/in/rujiphart-charatvaraphan-a1b00920a/" target="_blank"><img className="LinkedIn" src="Elements/linkedin-2-icon-18-ffffff-32.png "></img></a>
                        <a href="#" target="_blank"><img className="Instagram" src="Elements/instagram-2-icon-18-ffffff-32.png "></img></a>
                    </div>
                    <div className="profile-bottom ">
                        <p className="profile-text">" When I went to job fair, I want to drop resumes. But tomorrow after, It's better to drop the faculty "</p>
                    </div>
                </div>

                <div className="profile-box ">
                    <img className="profile-pic " src="/ProfilePic/Oil.jpg "></img>
                    <hr></hr>
                    <h5><strong>Bunradar Chatchaiyadech</strong></h5>
                    <p>Sophomore student at ICT Mahidol</p>
                    <div className="social-media ">
                        <a href="https://www.linkedin.com/in/bunradar-chatchaiyadech-30936b230/" target="_blank"><img className="Instagram " src="Elements/linkedin-2-icon-18-ffffff-32.png "></img></a>
                        <a href="#" target="_blank"><img className="LinkedIn " src="Elements/instagram-2-icon-18-ffffff-32.png "></img></a>
                    </div>
                    <div className="profile-bottom ">
                        <p className="profile-text">" The human brain is awesome. It functions 24 hours a day from the day we are born and all the stops when we are taking the exam "</p>
                    </div>
                </div>
            </div>
        </section>
        )
    }
}

export default AboutUsPage;