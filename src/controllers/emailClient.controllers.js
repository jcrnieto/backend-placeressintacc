const nodemailer = require("nodemailer");

const emailClient = async (req, res) => {
    //const {nombre, email, telefono, de} = req.body
    
    
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
          user: "jcrnietos@gmail.com",
          pass: "fvbdmrviatzjjjko", 
        },
      });

      var mailOptions = {
        from: "consultadepaginaweb@gmail.com",
        to: "jcrnietos@gmail.com",
        subject: "consulta de pedido",
        html:`
          <div>
          <p>Nombre: ${req.body.nombre}</p>
          <p>Email: ${req.body.email}</p>
          <p>Telefono: ${req.body.telefono}</p>
          <p>Dejá tu mensaje: ${req.body.mensaje}</p>
          </div>
        `
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.status(200).json(req.body);
          console.log("Email enviado");
        }
      });
}

module.exports = {
  emailClient
}