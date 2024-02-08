import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const Policy = () => {
    return(
        <>
             <Link to='/dashboard/settings' className="flex items-center gap-2 my-4 cursor-pointer">
                <FaArrowLeft />
                <h2 className="font-bold text-[1.4rem] mb-">Privacy policy</h2>        
            </Link>

            <div className="bg-greyBg p-7 mt-3">
                <p className="text-[1.1rem]">
                    At Wolfgang Stuant, we are committed to safeguarding your privacy. This Privacy Policy explains how we 
                    collect, use, share, and protect your personal information. Please read it carefully to understand our 
                    practices regarding your data.

                </p>
 
                <p className="font-bold mt-4">1. Information We Collect</p>
                <p>We may collect the following types of information:</p>
                <p className="font-bold mt-2">1.1 Personal Information: </p>
                <ul className="list-disc list-inside">
                    <li>Name</li>
                    <li>Contact information (e.g., email address, phone number)</li>
                    <li>Billing and payment details</li>
                </ul>

                <p className="font-bold mt-2">1.2 Usage Data:</p>
                <ul className="list-disc list-inside">
                    <li>Information about how you interact with our website or services</li>
                    <li>Log data (e.g., IP address, browser type, pages visited)</li>
                </ul>

                <p className="font-bold mt-4">2. How We Use Your Information</p>
                <p>We may use your information for the following purposes:</p>
                <p className="font-bold mt-2">2.1 Provide Services:</p>
                <ul className="list-disc list-inside">
                    <li>To provide and maintain our products and services.</li>
                    <li>To process transactions and fulfill orders.</li>
                    <li>To communicate with you about your account and updates</li>
                </ul>

                <p className="font-bold mt-2">2.2 Improve Services:</p>
                <ul className="list-disc list-inside">
                    <li>To analyze and improve our products and services.</li>
                    <li>To personalize your experience and provide tailored content.</li>
                </ul>

                <p className="font-bold mt-2">2.3 Marketing and Promotions:</p>
                <ul className="list-disc list-inside">
                    <li>To send promotional materials, updates, and newsletters (with your consent).</li>
                </ul>

                <p className="font-bold mt-2">2.4 Legal Compliance:</p>
                <ul className="list-disc list-inside">
                    <li>To comply with legal obligations and respond to lawful requests.</li>
                </ul>

                <p className="font-bold mt-4">3. Data Sharing</p>
                <p>We may share your personal information with:</p>
                <ul className="list-disc list-inside">
                    <li>Service providers and partners necessary for our operations.</li>
                    <li>Legal authorities when required by law or to protect our rights.</li>
                </ul>

                <p className="font-bold mt-4">4. Your Choices</p>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside">
                    <li>Access and correct your personal information.</li>
                    <li>Opt-out of marketing communications.</li>
                    <li>Delete your account (subject to legal requirements).</li>
                </ul>

                <p className="font-bold mt-4">5. Security</p>
                <p>We employ security measures to protect your information, but no method is 100% secure. We cannot guarantee the security of your data.</p>

                <p className="font-bold mt-4">6. Cookies and Tracking Technologies</p>
                <p>We use cookies and similar technologies to collect usage data and improve your experience on our website. You can manage your cookie preferences in your browser settings.</p>

                <p className="font-bold mt-4">7. Children's Privacy</p>
                <p>Our services are not directed to individuals under 13. If you are a parent or guardian and believe your child has provided us with their information, please contact us to remove it.</p>

                <p className="font-bold mt-4">8. Changes to this Privacy Policy</p>
                <p>We may update this Privacy Policy to reflect changes in our practices. We will notify you of any material changes via email or a prominent notice on our website.</p>

                <p className="font-bold mt-4">9. Contact Us</p>
                <p>If you have any questions or concerns regarding this Privacy Policy, please contact us at:</p>
                <ul className="list-disc list-inside">
                    <li>Address: 35, Afolabi Awosanya Street, Ikeja, Lagos</li>
                    <li>Email Address: support@companyname.com </li>
                    <li>Phone Number: +234 901 259 8745</li>
                </ul>
                

            
                
                
            </div>
        </>
    )
  
}

export default Policy;