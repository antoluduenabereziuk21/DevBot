const { Resend } = require ('resend');
const htmlTemplateEmail = require('../services/template');


const resend = new Resend(process.env.RESEND_API_KEY);
const sendEmail = async (code) => {
    const { data, error } = await resend.emails.send({
        from: 'Zephyr Cygnus <ljpa@resend.luispeche.me>',
        to: [process.env.EMAIL_TO],
        subject: 'Código de Emparejamiento',
        html: htmlTemplateEmail(code),
    });

    if (error) {
        return console.error({ error });
    }

    console.log(`Email enviado correctamente`,{ data });
};

module.exports = {sendEmail}