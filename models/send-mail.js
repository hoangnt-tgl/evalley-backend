const nodemailer = require('nodemailer')

const EMAIL_ADDRESS = process.env.EMAIL_ADDRESS || 'hoang.nguyen@glowpacific.com';
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || 'matkhaunaykhongdung';

var transporter = nodemailer.createTransport({
	host: 'mail.glowpacific.com',   // hostname
    port: 465, 
    secure: true,   
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// transporter.verify((error, success) => {
// 	if (error) {
// 		console.log(error)
// 	}
// 	else {
// 		console.log('Ready for message');
// 	}
// })

module.exports.sendMail = function(email, subject, body, callback){
    var mailOptions = {
        from: EMAIL_ADDRESS,
        to: email,
        subject: subject,
        html: body
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            callback(null, false)
        }
        else {
            console.log('Email sent: ' + info.response);
            callback(null, true)
        }
    })
}