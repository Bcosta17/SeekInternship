import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:"seekinternship@gmail.com",
        pass:"jfbcouhtgxzitxzh"
    },
    tls:{
        rejectUnauthorized:false,
    },
})

export default transporter;