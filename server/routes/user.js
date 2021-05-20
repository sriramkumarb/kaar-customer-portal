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

router.post('/userDetails', function (req, res, next) {
    // console.log(req.body.data);
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_DETAILS_SRK&receiverParty=&receiverService=&interface=SI_CUS_DETAILS_SRK&interfaceNamespace=http://srk-portal.com&SOAPAction="http://sap.com/xi/WebService/soap1.1"\n&Content-Type=text/xml',
        'headers': {
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/xml',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTE3MTExNwUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTE3MTExNzQ1WjAjBgkqhkiG9w0BCQQxFgQUkEm%2FsgstVGfcQXaLrMFclgZrhWgwCQYHKoZIzjgEAwQvMC0CFFwE7Q0F!pS8yFemrgrOAnNHARISAhUA93uMT6ziOF!58s9M%2FygU309lxQ0%3D; JSESSIONID=fvTGOjyyrpPXpRJl-UwuHeY60At6eQF-Y2kA_SAPicHyJxoPo0WENVp_Uh7SEVfz; JSESSIONMARKID=2CrASwdae8YwJtlddVx1F5xq8HtMBKo6esY35jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_DETAILS_SRK>\r\n         <CUSTOMER_ID>' + user + '</CUSTOMER_ID>\r\n      </urn:ZBAPI_CUS_DETAILS_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        var xml = response.body;
        parseString(xml, (err, result) => {
            data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DETAILS_SRK.Response'][0].CUSTOMER_DETAILS[0];
            resultStatus = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DETAILS_SRK.Response'][0].RETURN[0].TYPE[0]
            // console.log(JSON.stringify(data))
            if (resultStatus === 'S') {
                res.status(200).json(data)
            } else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }

        })
    });
})

router.post('/editUserDetails', function (req, res, next) {
    const result = req.body.data
    Object.keys(result).forEach((key) => {
        if (result[key] instanceof Array) {
            result[key] = result[key][0]
        }
    })

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_EDIT_SRK&receiverParty=&receiverService=&interface=SI_CUS_EDIT_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Content-Type': 'text/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ=='
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_EDIT_SRK>\r\n         <!--You may enter the following 13 items in any order-->\r\n         <!--Optional:-->\r\n         <ADDRESS>' + result.address + '</ADDRESS>\r\n         <!--Optional:-->\r\n         <CITY>' + result.city + '</CITY>\r\n         <!--Optional:-->\r\n         <COUNTRY>' + result.country + '</COUNTRY>\r\n         <CUSTOMER_ID>' + result.customer_id + '</CUSTOMER_ID>\r\n         <!--Optional:-->\r\n         <FAX_NUMBER>' + result.fax_number + '</FAX_NUMBER>\r\n         <!--Optional:-->\r\n         <NAME>' + result.name + '</NAME>\r\n         <!--Optional:-->\r\n         <NAME_2>' + result.name_2 + '</NAME_2>\r\n         <!--Optional:-->\r\n         <ONE_TIME_ACC>' + result.one_time_acc + '</ONE_TIME_ACC>\r\n         <!--Optional:-->\r\n         <POSTAL_CODE>' + result.postal_code + '</POSTAL_CODE>\r\n         <!--Optional:-->\r\n         <SEARCH_TERM>' + result.search_term + '</SEARCH_TERM>\r\n         <!--Optional:-->\r\n         <STATE>' + result.state + '</STATE>\r\n         <!--Optional:-->\r\n         <STREET>' + result.street + '</STREET>\r\n         <!--Optional:-->\r\n         <TELEPHONE>' + result.telephone + '</TELEPHONE>\r\n      </urn:ZBAPI_CUS_EDIT_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);

        var xml = response.body;
        parseString(xml, (err, resp) => {
            res_data = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_EDIT_SRK.Response'][0].RESULT[0]
            res_status = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_EDIT_SRK.Response'][0].RETURN[0].TYPE[0]

            if (res_data === 'SUCCESS' && res_status === 'S') {
                res.status(200).json({ res_data, message: 'Details Updated Successfully!' })
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }

        })

    });

})

router.post('/getinqlist', function (req, res, next) {
    console.log(req.body.data)
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_INQLIST_SRK&receiverParty=&receiverService=&interface=SI_CUS_INQLIST_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIwMDU1NAUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIwMDU1NDUyWjAjBgkqhkiG9w0BCQQxFgQUJLsbJJFlsZJqNMr8ti!bMYsCIy4wCQYHKoZIzjgEAwQvMC0CFHk5tYhX%2FboQ9W%2FmsHYljzUI!7STAhUAu4qMJVQ62Kwpe!gJL58Qh2py0vg%3D; JSESSIONID=tlBaIiMeMhwUxCCBF2tgzU4nSVeIeQF-Y2kA_SAPskre2sZK5qjbXWsfs9XGmQFR; JSESSIONMARKID=uv6VAATcDbS1VB-Nmp6c_ci-5VG4plcCz3Pn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_INQLIST_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <CUSTOMER_ID>' + user + '</CUSTOMER_ID>\r\n         <!--Optional:-->\r\n         <IT_VBAK>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               <!--Optional:-->\r\n               <VBELN>?</VBELN>\r\n               <!--Optional:-->\r\n               <VBTYP>?</VBTYP>\r\n               <!--Optional:-->\r\n               <KUNNR>?</KUNNR>\r\n            </item>\r\n         </IT_VBAK>\r\n      </urn:ZBAPI_CUS_INQLIST_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        var xml = response.body;
        parseString(xml, (err, resp) => {

            res_data = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_INQLIST_SRK.Response'][0].IT_VBAK[0].item
            resultStatus = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_INQLIST_SRK.Response'][0].RETURN[0].TYPE[0]


            for (i = 0; i < res_data.length; i++) {
                Object.keys(res_data[i]).forEach((key) => {
                    if (res_data[i][key] instanceof Array) {
                        res_data[i][key] = res_data[i][key][0]
                    }
                })
            }


            if (resultStatus === 'S') {
                res.status(200).json(res_data)
            } else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }

        })
    });

})

module.exports = router