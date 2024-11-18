const Contact = require("../models/contactModel");
const nodemailer = require("nodemailer");


exports.createContact = async (req, res) => {
    const { name, email, phone, address, subject, message } = req.body;

   
    if (!name || !email || !phone || !address || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

   
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        return res.status(400).json({ error: "Invalid phone number format" });
    }

    try {
        // Save to Database
        const contact = await Contact.create({ name, email, phone, address, subject, message });

        
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
      



        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: `New Contact Us Message: ${subject}`,
            text: `
                You have received a new message:
                
                Name: ${name}
                Email: ${email}
                Phone: ${phone}
                Address: ${address}
                Subject: ${subject}
                Message: ${message}
            `,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ success: "Contact message saved and email sent", data: contact });
    } catch (error) {
        console.error("Error saving contact or sending email:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
