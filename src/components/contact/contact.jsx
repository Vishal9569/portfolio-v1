import React, { useRef } from 'react';
import './contact.css';

export default function Contact() {
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        // allow form to submit normally (HTML POST)
        setTimeout(() => {
            formRef.current.reset(); // clear fields after short delay
        }, 100); // slight delay to ensure Formspree receives data
    };

    return (
        <section id="contact" className="contact-section">
            <h2 className="contact-title">Contact Me</h2>
            <form
                className="contact-form"
                action="https://formspree.io/f/xanjobyk"
                method="POST"
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                />
                <textarea
                    name="message"
                    rows="4"
                    placeholder="Your Message"
                    required
                ></textarea>
                <input
                    type="text"
                    name="_gotcha"
                    style={{ display: "none" }}
                />
                <input
                    type="hidden"
                    name="_redirect"
                    value="https://yourdomain.com/thank-you"
                />
                <button type="submit" className="submit-btn">
                    Send
                </button>
            </form>
        </section>
    );
}
