import { Response, Request, Router, NextFunction } from "express";
const nodemailer = require("nodemailer");
import { Contacts } from "../models/Contacts";

const router = Router();

router.post(
  "/contact",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, description } = req.body;
      console.log("REQ.Body", req.body);

      await Contacts.create({
        name: name,
        email: email,
        description: description,
      });

      let contentHTML = `<h1>Nuevo contacto en el portafolio !</h1>
        <h2>${name} te ha escrito</h2> 
        <p> Este es su mensaje: ${description}</p>
        <h2>Escribele a su correo ${email}</h2>`               


        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // upgrade later with STARTTLS
            auth: {
                user: "logiexpressfleet@gmail.com",
                pass: "boilbfullbjrotpf",
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: `${email}`, // sender address
            to: 'rluis747@gmail.com', // list of receivers
            subject: "Correo de contacto en portafolio", // Subject line
            text: "Hello world?", // plain text body
            html: contentHTML, // html body
        });
      res.json({ menssage: "contact created" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
