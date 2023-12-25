import nodemailer from 'nodemailer';
import config from '../config/config.js';
import __dirname from '../utils.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth:{
        user: 'amansilla610@gmail.com',
        pass: 'fjxvgzmhhltosbnr'
    },
    tls: {
        rejectUnauthorized: false // Ignorar errores de certificados no confiables
    }
});


transporter.verify(function(error, success){
    if(error){
        console.log(error);
    }else{
        console.log("el servidor esta listo para enviar mensajes");
    }
});

export const sendEmail = (req, res)=>{

    try {
        //creo el objeto
        const mailOptions={
            from: req.body.from,
            to: req.body.to,
            subject: req.body.subject,
            html: `mensanje ${req.body.html}`,
            attachments: []
        }

        transporter.sendMail(mailOptions,(error, info)=>{
            if (error) {
                console.log(error);
                res.status(400).send({msg:"error", payload: error})
            }
            res.status(200).send({message: "mensaje enviado al correo: " + req.body.to, payload: info});
            console.log("mensaje enviado: %s", info.messageId);
        })
    } catch (error) {
        console.error(error);
        res.status(500).send({error: error,message: "no se pudo enviar el mensaje desde: " + config.gmailAccount});
        
    }
}
