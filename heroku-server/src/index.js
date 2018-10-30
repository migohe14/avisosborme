const express = require('express');
const morgan = require('morgan');
const request = require('request');
var rp = require('request-promise').defaults({ encoding: 'latin1' });
const parseString = require('xml2js').parseString;

const app = express();



//Settings
//*process.env.PORT  Esta cogiendo el puerto que te da el sistema operativo
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routes
app.use('/api', require('./routes/api'));


//Static Files
//Enviamos carpeta public al navegador
app.use(express.static(__dirname + '/public'))


//Server is listenning
app.listen(app.get('port'), () => {
    console.log("Server in port", app.get('port'))
})


const Firebase = require('firebase')
require('firebase/firestore')

const firebaseApp = Firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId:"" ,
    storageBucket:"" ,
    messagingSenderId: "", 
})

var schedule = require('node-schedule');
var nodemailer = require('nodemailer');

var j = schedule.scheduleJob('0 8 * * *', function(){
var date = new Date()

var year = date.getFullYear().toString()
var month = date.getMonth() + 1

if(month <= 9) {
    month = "0" + month
} else {
    month = month.toString()
}

var day = date.getDate()

if(day <= 9) {
    day = "0" + day
} else {
    day = day.toString()
}

var urlBorme = 'https://boe.es/diario_borme/xml.php?id=BORME-S-' + year + month + day

rp(urlBorme)
    .then(function (body) {

              //Aquí me traigo DB 

              const db = firebaseApp.firestore()
              db.settings({timestampsInSnapshots: true,})


              db.collection('users').get().then(querySnapshot => {
                  querySnapshot.forEach(doc => {
                   
                    var companiesDb = doc.data()

        parseString(body, (err, result) => {
                 
            for(var k = 0; k < result.sumario.diario[0].seccion.length; k++) {
                if(result.sumario.diario[0].seccion[k].$.nombre === 'SECCIÓN SEGUNDA. Anuncios y avisos legales') {
                 for(var l = 0; l < result.sumario.diario[0].seccion[k].emisor.length; l++) {
 
                     var companies = result.sumario.diario[0].seccion[k].emisor[l].item.forEach(element => {
                         
                         if(element.titulo[0].includes(companiesDb.company)) {
 
                             var title = result.sumario.diario[0].seccion[k].emisor[l].$.nombre
                             var name = element.titulo[0]
                             var urlPdf = element.urlPdf[0]._
                         
 
                 var transporter = nodemailer.createTransport({
                             service: 'gmail',
                             auth: {
                             user: 'consultaborme@gmail.com',
                             pass: ''
                             }
                         });
                         
                         
                         var mailOptions = {
                             from: 'consultaborme@gmail.com',
                             to: companiesDb.email,
                             subject: 'Se ha publicado en el Boletín Oficial del Registro Mercantil (BORME) un anuncio de la empresa ' + name,
                             html: '<p><strong>Empresa: </strong>'+ name + '</p><p><strong>Materia: </strong>'+ title +'</p><a href=' + 'https://boe.es' + urlPdf + '>Acceder a la publicación</a>'
                         };
                         
                         transporter.sendMail(mailOptions, function(error, info){
                             if (error) {
                             console.log(error);
                             } else {
                             console.log('Email sent: ' + info.response);
                             }
                         });
 
                         }
                         
                        });
 
                 }
            
                }
            }
         
        });
    })
})

})
.catch(function (err) {
console.log(err)
});
});
