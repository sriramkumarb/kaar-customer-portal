const express = require('express');

const parseString = require('xml2js').parseString;

const request = require('request');

const router = express.Router()

const bodyParser = require('body-parser');

const { User } = require('../db/models/index')

const jwt = require('jsonwebtoken');

const cors = require('cors')

router.use(cors()) // Use this after the variable declaration

router.use(bodyParser.json());

router.post('/register', function (req, res, next) {

    var user = new User({
        email: req.body.data.email,
        username: req.body.data.username,
        password: req.body.data.password,
        creation_dt: Date.now()
    });

    let promise = user.save();

    promise.then(function (doc) {
        return res.status(201).json(doc);
    })

    promise.catch(function (err) {
        return res.status(501).json({ message: 'Error registering user.' })
    })
})

router.post('/login', function (req, res, next) {

    // let promise = User.findOne({ email: req.body.data.email }).exec();

    // promise.then(function (doc) {
    //     if (doc) {
    //         if (doc.password === req.body.data.password) {
    //             // generate token
    //             let token = jwt.sign({ username: doc.username }, 'secret', { expiresIn: '3h' });

    //             return res.status(200).json(token);

    //         } else {
    //             return res.status(501).json({ message: ' Invalid Credentials' });
    //         }
    //     }
    //     else {
    //         return res.status(501).json({ message: 'User email is not registered.' })
    //     }
    // });

    // promise.catch(function (err) {
    //     return res.status(501).json({ message: 'Some internal error' });
    // })

    let user = req.body.data.email.toUpperCase();
    let pass = req.body.data.password

    // console.log(user)
    // console.log(pass)

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_LOGIN_SRK&receiverParty=&receiverService=&interface=SI_CUS_LOGIN_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Content-Type': 'text/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTE2MDcyNAUABAAAAAgKAAZQT1VTRVL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTE2MDcyNDM5WjAjBgkqhkiG9w0BCQQxFgQUxutr8v%2F1Xj9I8HSBPJTTtlTgoPswCQYHKoZIzjgEAwQwMC4CFQD1eXk4xg20iBLYh32KIdDOiBda3QIVAJwgVehA0T11RMm8IJFs!ejtCoLo; JSESSIONID=w6STK2ESNfIrI5U-y5p6BKdjDhB0eQF-Y2kA_SAPlZXzOANTR1Ty0W3I-gCioSz6; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_LOGIN_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <PASSWORD>' + pass + '</PASSWORD>\r\n         <USERNAME>' + user + '</USERNAME>\r\n      </urn:ZBAPI_CUS_LOGIN_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        var xml = response.body;
        parseString(xml, (err, result) => {
            result = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_LOGIN_SRK.Response'][0]['RESULT'][0];
            if (result == 'SUCCESS') {
                // generate token
                let token = jwt.sign({ username: user }, 'secret', { expiresIn: '3h' });

                return res.status(200).json(token);
            }
            else {
                return res.status(501).json({ message: ' Invalid Credentials' });
            }
        })
    });
})

module.exports = router