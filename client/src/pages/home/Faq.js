// import React, { useState } from "react";
// import '../../../src/assets/css/faq.css';

// const faqs = [
//     { question: "How do I track my order?", answer: "You can track your order in the 'My Orders' section after logging in." },
//     { question: "What is your return policy?", answer: "Returns are accepted within 30 days of purchase with the original receipt." },
//     { question: "Do you offer international shipping?", answer: "Yes, we ship worldwide. Delivery time varies by location." },
//     { question: "Can I modify my order after placing it?", answer: "You can modify your order within 24 hours of placing it." },
// ];

// function FAQSection() {
//     const [openIndex, setOpenIndex] = useState(null);

//     const toggleFAQ = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     return (
//         <div className="faq-container">
//             {/* Left Side: Image */}
//             <div className="faq-image">
//                 <img src={require('../../assets/images/faq.jpg')} alt="FAQ" />
//             </div>

//             {/* Right Side: FAQ Section */}
//             <div className="faq-content">
//                 <h2>Frequently Asked Questions</h2>
//                 {faqs.map((faq, index) => (
//                     <div key={index} className={`faq-item ${openIndex === index ? "active" : ""}`}>
//                         <div className="faq-question" onClick={() => toggleFAQ(index)}>
//                             {faq.question}
//                             <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
//                         </div>
//                         <div className={`faq-answer ${openIndex === index ? "open" : ""}`}>
//                             {faq.answer}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FAQSection;















import React, { useState } from "react";
import { motion } from "framer-motion";
import '../../../src/assets/css/faq.css';

const faqs = [
    { question: "How do I track my order?", answer: "You can track your order in the 'My Orders' section after logging in." },
    { question: "What is your return policy?", answer: "Returns are accepted within 30 days of purchase with the original receipt." },
    { question: "Do you offer international shipping?", answer: "Yes, we ship worldwide. Delivery time varies by location." },
    { question: "Can I modify my order after placing it?", answer: "You can modify your order within 24 hours of placing it." },
];

function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.div 
            className="faq-container"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
        >
            <motion.div 
                className="faq-image"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.3 }}
                viewport={{ once: true }}
            >
                <img src={require('../../assets/images/faq.jpg')} alt="FAQ" />
            </motion.div>

            <div className="faq-content">
                <h2>Frequently Asked Questions</h2>
                {faqs.map((faq, index) => (
                    <motion.div 
                        key={index} 
                        className={`faq-item ${openIndex === index ? "active" : ""}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="faq-question" onClick={() => toggleFAQ(index)}>
                            {faq.question}
                            <span className="faq-toggle">{openIndex === index ? "−" : "+"}</span>
                        </div>
                        <motion.div 
                            className={`faq-answer ${openIndex === index ? "open" : ""}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={openIndex === index ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            {faq.answer}
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQSection;
