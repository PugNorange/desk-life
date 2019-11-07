var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/face', function(req, res, next) {
  res.render('face');
});

router.get('/data_chart_demo', function(req, res, next) {
  res.render('data_chart_demo');
});
// router.get('/process', function(req, res, next) {
//   res.render('process');
// });

// router.get('/faq', function(req, res, next) {
//   res.render('faq');
// });

// router.get('/contact', function(req, res, next) {
//   res.render('contact');
// });

// router.get('/services/consulting-and-design', function(req, res, next) {
//   res.render('services/consulting-and-design');
// });

// router.get('/services/prototyping', function(req, res, next) {
//   res.render('services/prototyping');
// });

// router.get('/services/mold-construction', function(req, res, next) {
//   res.render('services/mold-construction');
// });

// router.get('/services/injection-molding', function(req, res, next) {
//   res.render('services/injection-molding');
// });

// router.get('/services/assembly-and-packing', function(req, res, next) {
//   res.render('services/assembly-and-packing');
// });

// router.get('/services/warehouse-and-shipping', function(req, res, next) {
//   res.render('services/warehouse-and-shipping');
// });


//  Email //

// const nodemailer = require('nodemailer');

// router.post('/contact-form-submit', function(req, res) {
//   var name = req.body.name
//   var email = req.body.email
//   var message = req.body.message

//   var emailTo = 'isamu36363136@gmail.com';
//   var emailFrom = '1363work@gmail.com'
//   var emailPass = process.env.CRED
//   var emailText = `
//   <b>Name</b> : ${name} <br/>
//   <b>Email</b> : ${email} <br/>
//   <b>Message</b> :
//       ${message}
//   `

//   var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: emailFrom,
//           pass : emailPass,
//       },
//       tls: {
//           rejectUnauthorized: false
//       }
//   });

//   var mailOptions = {
//       from: emailFrom,
//       to: emailTo,
//       subject: 'Scriptly Inquiry',
//       html: emailText
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//           console.log("Send Mail Error")
//           console.log(error);
//           res.json('Oops there was an error')
//       } else {
//           console.log('Email sent: ' + info.response);
//           res.json('Message has been successfully sent! We will get back to you as soon as possible.')
//       }
//   });
// })



// router.post('/main_contact-form-submit', function(req, res) {
//   var name = req.body.name
//   var email = req.body.email
//   var message = req.body.message

//   var emailTo = 'isamu36363136@gmail.com';
//   var emailFrom = '1363work@gmail.com'
//   var emailPass = process.env.CRED
//   var emailText = `
//   <b>Name</b> : ${name} <br/>
//   <b>Email</b> : ${email} <br/>
//   <b>Message</b> :
//       ${message}
//   `

//   var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//           user: emailFrom,
//           pass : emailPass,
//       },
//       tls: {
//           rejectUnauthorized: false
//       }
//   });

//   var mailOptions = {
//       from: emailFrom,
//       to: emailTo,
//       subject: 'Scriptly Inquiry',
//       html: emailText
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//           console.log("Send Mail Error")
//           console.log(error);
//           res.json('Oops there was an error')
//       } else {
//           console.log('Email sent: ' + info.response);
//           res.json('Message has been successfully sent! We will get back to you as soon as possible.')
//       }
//   });
// })

module.exports = router;
