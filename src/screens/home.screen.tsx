import { Link } from "react-router-dom";
import GuestHeader from "../components/guestHeader/guestHeader";
import "./home.css";
const HomeScreen = () => {
 

  return (
    <div className="Home-screen">
      <GuestHeader activeClass="Home" />
      <section className="landing-section">
        <div className="overlay">
          
        </div>
        <div className="cta-half">
          <h2 className="cta-title">
            Invoice Management<br /> System
          </h2>
          <p className="cta-desc">
            Invoice Management System is a web-based application designed
            <br /> to manage and track invoices for businesses. It provides a
            user-friendly interface for creating, editing, and deleting invoices, as well as generating reports and sending
            notifications.
          </p>
          <Link className="cta-btn" to={"/user/create"}>Start Now</Link>
        </div>
        <div className="cta-img">
          <div className="img-cont">

          </div>

        </div>
      </section>
      <section className="features-section">
        <div className="cta-img">
          <div className="img-cont" id="img2">

          </div>

        </div>
        <div className="features">
          <h3 className="desc-title">
            We offer the best services
          </h3>
          <p className="desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio dolore consectetur corrupti
            odio atque ipsa cupiditate sequi sapiente fuga soluta sed suscipit aut, ad dicta earum pariatur voluptates!
            Hic, laborum.
          </p>
          <ul className="features-list">
            <li className="feature-item">
              <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none">
                <path fill="#36c723" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
              </svg>
              Add your products
            </li>

            <li className="feature-item">
              <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none">
                <path fill="#36c723" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
              </svg>
              Create accounts for your customers
            </li>

            <li className="feature-item">
              <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none">
                <path fill="#36c723" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z" />
              </svg>
              Get back to invoices history any time
            </li>

          </ul>
          <Link className="cta-btn outlined" to={"/user/create"}>Start Now</Link>
        </div>

      </section>
      <section className="steps-section">
        <h2 className="section-title">
          How it works
        </h2>
        <ul className="steps">
          <li className="step">
            <div className="step-icon">

    <svg
      width="34px"
      height="34px"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g id="profile_x2C__person">
          <g>
            <g>
              <g>
                <path
                  d="M16,31C7.729,31,1,24.271,1,16S7.729,1,16,1s15,6.729,15,15S24.271,31,16,31z M16,2C8.28,2,2,8.28,2,16 s6.28,14,14,14s14-6.28,14-14S23.72,2,16,2z"
                  fill="#ffffff"
                ></path>
              </g>
            </g>
          </g>
          <g>
            <g id="team_3_">
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M23.64,20.713l-4.762-1.652l-0.323-2.584c-0.215,0.307-0.523,0.546-0.924,0.671l0.293,2.345 c0.023,0.189,0.152,0.349,0.332,0.41l5.055,1.756c0.9,0.314,1.689,1.427,1.689,2.381v-0.007c0,0.276,0.224,0.5,0.5,0.5 c0.275,0,0.499-0.223,0.5-0.498C25.997,22.656,24.94,21.168,23.64,20.713z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        d="M6.5,24.532c-0.276,0-0.5-0.224-0.5-0.5v0.007c0-1.379,1.059-2.871,2.359-3.326l4.762-1.641 l0.012-0.28c0.034-0.274,0.289-0.465,0.559-0.434c0.273,0.034,0.468,0.284,0.434,0.559l-0.051,0.589 c-0.023,0.189-0.153,0.348-0.333,0.41l-5.054,1.742C7.789,21.973,7,23.086,7,24.039v-0.007C7,24.309,6.776,24.532,6.5,24.532z"
                        fill="#ffffff"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
              <g>
                <g>
                  <g>
                    <g>
                      <g>
                        <path
                          d="M16,18.039c-2.779,0-4.192-1.844-4.201-6.469c-0.002-1.174,0.123-2.363,1.227-3.469 C13.729,7.396,14.729,7.039,16,7.039s2.271,0.357,2.975,1.063c1.104,1.105,1.229,2.295,1.227,3.469 C20.192,16.195,18.779,18.039,16,18.039z M16,8.039c-1.009,0-1.75,0.252-2.267,0.769c-0.632,0.633-0.938,1.2-0.935,2.761 c0.008,4.018,1.055,5.471,3.201,5.471s3.193-1.453,3.201-5.471c0.003-1.561-0.303-2.128-0.935-2.761 C17.75,8.291,17.009,8.039,16,8.039z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
 



            </div>
            <h3 className="step-title">Create Your account</h3>
            <p className="step-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, eius!
            </p>
            <Link className="cta-btn outlined" to={"/user/create"}>Learn more</Link>
          </li>
          <li className="step">
            <div className="step-icon">
            <svg height={"34px"} width={"34px"} fill="#ffffff" 
            viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg"
             stroke="#ffffff">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" 
              strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                <path d="m45.2 19.6a1.6 1.6 0 0 1 1.59 1.45v22.55a4.82 4.82 0 0 1 
                -4.59 4.8h-32.2a4.82 4.82 0 0 1 -4.8-4.59v-22.61a1.6 1.6 0 0 1 1.45-1.59h38.55zm-12.39 6.67-.11.08-9.16 9.93-4.15-4a1.2 1.2 0 0 0 -1.61-.08l-.1.08-1.68 1.52a1 1 0 0 0 -.09 1.44l.09.1 5.86 5.55a2.47 2.47 0 0 0 1.71.71 2.27 2.27 0 0 0 1.71-.71l4.9-5.16.39-.41.52-.55 5-5.3a1.25 1.25 0 0 0 .11-1.47l-.07-.09-1.72-1.54a1.19 1.19 0 0 0 -1.6-.1zm12.39-22.67a4.81 4.81 0 0 1 4.8 4.8v4.8a1.6 1.6 0 0 1 -1.6 1.6h-44.8a1.6 1.6 0 0 1 -1.6-1.6v-4.8a4.81 4.81 0 0 1 4.8-4.8z"></path></g></svg>
            </div>
            <h3 className="step-title">Add your products</h3>
            <p className="step-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, eius!
            </p>
            <Link className="cta-btn outlined" to={"/user/create"}>Learn more</Link>
          </li>
          <li className="step">
            <div className="step-icon">
            <svg 
    width="34px" 
    height="34px" 
    viewBox="0 0 24 24" 
    id="Layer_1" 
    data-name="Layer 1" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <style>
        {`.cls-1{fill:none;stroke:#ffffff;stroke-miterlimit:10;stroke-width:1.91px;}`}
      </style>
      <path 
        className="cls-1" 
        d="M5.32,14.86,3.41,17.73,1.5,14.86V3.41A1.9,1.9,0,0,1,3.41,1.5h0A1.91,1.91,0,0,1,5.32,3.41Z"
      />
      <path 
        className="cls-1" 
        d="M20.59,22.5H8.18a1.92,1.92,0,0,1-1.91-1.91V18.68H18.68v1.91A1.92,1.92,0,0,0,20.59,22.5Z"
      />
      <path 
        className="cls-1" 
        d="M22.5,1.5V20.59a1.91,1.91,0,0,1-3.82,0V18.68H10.09V1.5Z"
      />
      <line className="cls-1" x1="12.95" y1="6.27" x2="19.64" y2="6.27"/>
      <line className="cls-1" x1="12.95" y1="10.09" x2="19.64" y2="10.09"/>
      <line className="cls-1" x1="12.95" y1="13.91" x2="19.64" y2="13.91"/>
    </g>
  </svg>
            </div>
            <h3 className="step-title">Generate invoices</h3>
            <p className="step-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, eius!
            </p>
            <Link className="cta-btn outlined" to={"/user/create"}>Learn more</Link>
          </li>
        </ul>
      </section>
      <section className="reviews">
        <h2 className="section-title">What our customers say</h2>
        <div className="reviews-container">

        
        <div className="review-card">
          
          <div className="avatar">
            <img src="https://t4.ftcdn.net/jpg/05/31/37/89/240_F_531378938_xwRjN9e5ramdPj2coDwHrwk9QHckVa5Y.jpg" alt="Avatar"/>
            <div className="avatar-data">
              <span className="name">Jone Doe</span>
            <span className="country">Spain</span>
            </div>
          
          </div>
          <p className="review">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestib
            ullum magna. Praesent sit amet nulla auctor, vestibulum magna. Praes
          </p>
          </div>
        <div className="review-card">
          
          <div className="avatar">
            <img src="https://t3.ftcdn.net/jpg/02/43/12/34/240_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="Avatar"/>
            <div className="avatar-data">
            <span className="name">Dan Doe</span>
          <span className="country">America</span>
            </div>
         
          </div>
          <p className="review">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestib
            ullum magna. Praesent sit amet nulla auctor, vestibulum magna. Praes
          </p>
          </div>
        <div className="review-card">
          
          <div className="avatar">
            <img src="https://t3.ftcdn.net/jpg/03/02/88/46/240_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg" alt="Avatar"/>
            <div className="avatar-data">
              <span className="name">Tom Doe</span>
              <span className="country">United Kingdom</span>
            </div>
        
          </div>
          <p className="review">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestib
            ullum magna. Praesent sit amet nulla auctor, vestibulum magna. Praes
          </p>
          </div>
          
        </div>
      </section>
      <section className="contact-form">
        <h2 className="section-title">
         Join Us


        </h2>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nostrum repellendus, minima amet exercitationem at iure excepturi ipsum eligendi ipsam!
        </p>
        <div className="form-cont">
           <input type="email" name="" id="" placeholder="Email address" className="email" />
        <button className="cta-btn">Join now</button>
        </div>
       
      </section>
    </div>
  );
};

export default HomeScreen;
