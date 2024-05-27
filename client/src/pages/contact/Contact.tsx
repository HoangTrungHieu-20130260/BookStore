import React from "react";
import './Contact.css';
import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";


function Contact () {
    return (
        <>
        <Header />
        <div id="content">
            <div className="contact_area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="contact_message content">
                                <h3>Liên hệ với chúng tôi</h3>
                                <p>Nếu bạn có bất cứ vấn đề hoặc thắc mắc nào có thể phản hồi với chúng tôi qua các cách
                                    thức liên lạc bên dưới.</p>
                                <p>Hoặc có thể điền vào biểu mẫu bên cạnh để mô tả sơ lược về vấn đề mà bạn gặp phải.</p>
                                <ul>
                                    <li><i className="fa-solid fa-location-dot"></i> Địa chỉ liên hệ: Khu phố 6, phường Linh Trung, TP. Thủ
                                        Đức, TP.HCM
                                    </li>
                                    <li><i className="fa-solid fa-envelope"></i> Email nhận phản hồi: 20130260@st.hcmuaf.edu.vn
                                    </li>
                                    <li><i className="fa fa-phone"></i> Số điện thoại liên lạc: 0852995378</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="contact_message form">
                                <h3>Mô tả vấn đề của bạn</h3>
                                <form id="contact-form" method="POST">
                                    <p>
                                        <label> Họ và tên (bắt buộc)</label>
                                        <input type={"text"} placeholder={"Họ và tên*"}/>
                                    </p>
                                    <p>
                                    <label> Địa chỉ email (bắt buộc)</label>
                                        <input type={"text"} placeholder={"Địa chỉ email*"}/>
                                    </p>
                                    <p>
                                    <label> Số điện thoại</label>
                                        <input type={"text"} placeholder={"Số điện thoại*"}/>
                                    </p>
                                    <div className="contact_textarea">
                                        <label> Mô tả vấn đề (bắt buộc)</label>
                                        <textarea placeholder="Mô tả*" name="message" className="form-control2"></textarea>
                                    </div>
                                    <button type="submit"> Gửi</button>
                                    <p className="form-messege"></p>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="map">
                <div className="map_location">
                    <h3>Vị trí trên bản đồ:</h3>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.214525476974!2d106.78957301590339!3d10.87128166040572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175276398969f7b%3A0x9672b7efd0893fc4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOw7RuZyBMw6JtIFRwLiBI4buTIENow60gTWluaA!5e0!3m2!1svi!2s!4v1666705870481!5m2!1svi!2s"
                            width="1200" height="450"
                            ></iframe>
                </div>
            </div>
        </div>
            <Footer />
        </>
    )
}

export default Contact;
