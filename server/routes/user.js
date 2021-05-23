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

    let user = req.body.data.email.toUpperCase();
    let pass = req.body.data.password

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

                let user_token = {
                    username: user,
                    token: token
                }

                return res.status(200).json(user_token);
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

            len = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_INQLIST_SRK.Response'][0].IT_VBAK[0].length
            if (len == undefined && typeof len !== 'number') {

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
                }
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }

        })
    });

})

router.post('/getinqdetails', function (req, res, next) {
    let sd_no = req.body.data;
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_INQDET_SRK&receiverParty=&receiverService=&interface=SI_CUS_INQDET_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIyMTgwMwUABAAAAAgKAAZQT1VTRVL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIyMTgwMzA0WjAjBgkqhkiG9w0BCQQxFgQU7hLWAS0KiM1JYtda%2FWlNwpUxhUswCQYHKoZIzjgEAwQwMC4CFQC8JsAnydP2kbrjAPKxaFSHARXCLQIVAOYwpHmZcDEOma6C0g9qXz8es8RH; JSESSIONID=jfTN50O0j1RDGCy6mNS3gEPwckGVeQF-Y2kA_SAP2QrXmCGGCCvpb3gYab2E4-I9; JSESSIONMARKID=LiFyIw51jLNFsKeC5vLr6z3-MP5H49o9HbAn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_INQDET_SRK>\r\n         <SALES_DOC_NO>' + sd_no + '</SALES_DOC_NO>\r\n  </urn:ZBAPI_CUS_INQDET_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        var xml = response.body;
        parseString(xml, (err, resp) => {

            len = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_INQDET_SRK.Response'][0].ITEMS[0].length
            if (len == undefined && typeof len !== 'number') {
                item = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_INQDET_SRK.Response'][0].ITEMS[0].item[0]
                Object.keys(item).forEach((key) => {
                    if (item[key] instanceof Array) {
                        item[key] = item[key][0]
                    }
                })
                res.status(200).send(item)
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }

        })
    });

})

router.post('/getsolist', function (req, res, next) {
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_SOLIST_SRK&receiverParty=&receiverService=&interface=SI_CUS_SOLIST_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Content-Type': 'text/xml',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIxMTAxOAUABAAAAAgKAAZQT1VTRVL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIxMTAxODE4WjAjBgkqhkiG9w0BCQQxFgQUffAIC8zOF7wZZ8%2FKxYqdHC3rvtEwCQYHKoZIzjgEAwQwMC4CFQC1MrLgnZIOVNdHD9sdXMfByiyGSAIVAOvvyCE%2FFypZ0R6hdrH%2FQBHGJi7G; JSESSIONID=-CHUhO_7GvTy61g9n__mSkIK026OeQF-Y2kA_SAPEZFU8KswrND6AijauCtRlNnv; JSESSIONMARKID=7IKBPAuKOK3HBts1OC0HS49zqZgtIqUHHAmn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_SOLIST_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <CUSTOMER_ID>' + user + '</CUSTOMER_ID>\r\n         <!--Optional:-->\r\n         <IT_VBAK>\r\n            <!--Zero or more repetitions:-->\r\n            <item>\r\n               <!--Optional:-->\r\n               <VBELN>?</VBELN>\r\n               <!--Optional:-->\r\n               <VBTYP>?</VBTYP>\r\n               <!--Optional:-->\r\n               <KUNNR>?</KUNNR>\r\n            </item>\r\n         </IT_VBAK>\r\n      </urn:ZBAPI_CUS_SOLIST_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        var xml = response.body;
        parseString(xml, (err, resp) => {

            len = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_SOLIST_SRK.Response'][0].IT_VBAK[0].length
            if (len == undefined && typeof len !== 'number') {

                res_data = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_SOLIST_SRK.Response'][0].IT_VBAK[0].item
                resultStatus = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_SOLIST_SRK.Response'][0].RETURN[0].TYPE[0]

                for (i = 0; i < res_data.length; i++) {
                    Object.keys(res_data[i]).forEach((key) => {
                        if (res_data[i][key] instanceof Array) {
                            res_data[i][key] = res_data[i][key][0]
                        }
                    })
                }


                if (resultStatus === 'S') {
                    res.status(200).json(res_data)
                }
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }
        })

    });

})

router.post('/getsodetails', function (req, res, next) {
    let sd_no = req.body.data;

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_SODET_SRK&receiverParty=&receiverService=&interface=SI_CUS_SODET_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIxMTAxOAUABAAAAAgKAAZQT1VTRVL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIxMTAxODE4WjAjBgkqhkiG9w0BCQQxFgQUffAIC8zOF7wZZ8%2FKxYqdHC3rvtEwCQYHKoZIzjgEAwQwMC4CFQC1MrLgnZIOVNdHD9sdXMfByiyGSAIVAOvvyCE%2FFypZ0R6hdrH%2FQBHGJi7G; JSESSIONID=7Wzg5XBza8j-lF4QNcRIoYDU3X6OeQF-Y2kA_SAP-ZkvAdAule25zMtS-oY98Diw; JSESSIONMARKID=Z8coZQS04Wp77Vejc7RIQUYjL2WTOP7Dm1m35jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_SODET_SRK>\r\n         <SALES_DOC_NO>' + sd_no + '</SALES_DOC_NO>\r\n      </urn:ZBAPI_CUS_SODET_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        var xml = response.body;
        parseString(xml, (err, resp) => {
            len = (resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_SODET_SRK.Response'][0].ITEMS[0]).length
            if (len == undefined && typeof len !== 'number') {
                item = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_SODET_SRK.Response'][0].ITEMS[0].item[0]
                Object.keys(item).forEach((key) => {
                    if (item[key] instanceof Array) {
                        item[key] = item[key][0]
                    }
                })
                res.status(200).send(item)
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });

            }

        })

    });

})

router.post('/getdellist', function (req, res, next) {
    // console.log(req.body.data)
    let user = req.body.data
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_DELLIST_SRK&receiverParty=&receiverService=&interface=SI_CUS_DELLIST_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIyMDc1MAUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIyMDc1MDA3WjAjBgkqhkiG9w0BCQQxFgQUH6u1n30rG%2F2JcelOWFSes6kaUyMwCQYHKoZIzjgEAwQvMC0CFDZxYiCmvv9J9Expn24QHV2Yteh7AhUAnyWLDe4Zxum8HMZlR3L4wpsTa0o%3D; JSESSIONID=3R70crP7YDOybde6yPjSQ1FIhw2TeQF-Y2kA_SAP6VJuuNPQfiF9X64qZpa7Gzmj; JSESSIONMARKID=A8D9eA2M10yx1wsKJTk3Tg0sG35HC-XAj16H5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_DELLIST_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <CUSTOMER_ID>' + user + '</CUSTOMER_ID>\r\n</urn:ZBAPI_CUS_DELLIST_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);

        var xml = response.body;
        parseString(xml, (err, resp) => {

            len = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DELLIST_SRK.Response'][0].IT_VBAK[0].length
            if (len == undefined && typeof len !== 'number') {
                res_data = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DELLIST_SRK.Response'][0].IT_VBAK[0].item
                resultStatus = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DELLIST_SRK.Response'][0].RETURN[0].TYPE[0]

                for (i = 0; i < res_data.length; i++) {
                    Object.keys(res_data[i]).forEach((key) => {
                        if (res_data[i][key] instanceof Array) {
                            res_data[i][key] = res_data[i][key][0]
                        }
                    })
                }


                if (resultStatus === 'S') {
                    res.status(200).json(res_data)
                }
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });

            }

        })
    });

})

router.post('/getcredit', function (req, res, next) {
    console.log(req.body.data)
    let user = req.body.data
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_CREDIT_DEBIT_SRK&receiverParty=&receiverService=&interface=SI_CUS_CREDIT_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIyMTgwMwUABAAAAAgKAAZQT1VTRVL%2FAQYwggECBgkqhkiG9w0BBwKggfQwgfECAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0TCBzgIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIyMTgwMzA0WjAjBgkqhkiG9w0BCQQxFgQU7hLWAS0KiM1JYtda%2FWlNwpUxhUswCQYHKoZIzjgEAwQwMC4CFQC8JsAnydP2kbrjAPKxaFSHARXCLQIVAOYwpHmZcDEOma6C0g9qXz8es8RH; JSESSIONID=Kqvy-DQw4I0c9xfPUdTcyYKIsj6VeQF-Y2kA_SAPYg5_PMD-OYr0UeD3toG4_vUV; JSESSIONMARKID=M5iOlAmK7rwon1xCUIgUQPOoYnfJusPtWxAn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_CREDIT_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <CUSTOMER_ID>' + user + '</CUSTOMER_ID>\r\n         <!--Optional:-->\r\n \r\n      </urn:ZBAPI_CUS_CREDIT_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        var xml = response.body;
        parseString(xml, (err, resp) => {
            len = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_CREDIT_SRK.Response'][0].MEMO[0].length;
            if (len == undefined && typeof len !== 'number') {
                res_data = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_CREDIT_SRK.Response'][0].MEMO[0].item;
                resultStatus = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_CREDIT_SRK.Response'][0].RETURN[0].TYPE[0]

                for (i = 0; i < res_data.length; i++) {
                    Object.keys(res_data[i]).forEach((key) => {
                        if (res_data[i][key] instanceof Array) {
                            res_data[i][key] = res_data[i][key][0]
                        }
                    })
                }
                if (resultStatus === 'S') {
                    res.status(200).json(res_data)
                }
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }
        })
    });

})

router.post('/getdebit', function (req, res, next) {
    let user = req.body.data
    // console.log('debit ' + user)
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_CUS_CREDIT_DEBIT_SRK&receiverParty=&receiverService=&interface=SI_CUS_DEBIT_SRK&interfaceNamespace=http://srk-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNTIzMTcwNgUABAAAAAgKAAZQT1VTRVL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNTIzMTcwNjA3WjAjBgkqhkiG9w0BCQQxFgQUg0ek0ZFSJ7POeVpgu6zLG5vARrQwCQYHKoZIzjgEAwQuMCwCFEOpsl2maYyfKyHZrdAHXnKPUN%2FeAhRpdVH%2FlmvVLh0fstEpQhhqDcbYkA%3D%3D; JSESSIONID=Qd1kOAw6WeZjb-c9jwD1qC3Cjw6YeQF-Y2kA_SAPZfwiNnPiVaAV1Dta7_A_PEWS; JSESSIONMARKID=hBirdw_TqM7uwqDoCuUBJKwyA15X_OTbQqTn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_CUS_DEBIT_SRK>\r\n         <CUSTOMER_ID>' + user + '</CUSTOMER_ID>\r\n      </urn:ZBAPI_CUS_DEBIT_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        var xml = response.body;
        parseString(xml, (err, resp) => {
            len = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DEBIT_SRK.Response'][0].MEMO[0].length;
            if (len == undefined && typeof len !== 'number') {
                res_data = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DEBIT_SRK.Response'][0].MEMO[0].item;
                resultStatus = resp['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_CUS_DEBIT_SRK.Response'][0].RETURN[0].TYPE[0]

                for (i = 0; i < res_data.length; i++) {
                    Object.keys(res_data[i]).forEach((key) => {
                        if (res_data[i][key] instanceof Array) {
                            res_data[i][key] = res_data[i][key][0]
                        }
                    })
                }
                if (resultStatus === 'S') {
                    res.status(200).json(res_data)
                }
            }
            else {
                return res.status(501).json({ message: 'Some Error Occured !' });
            }
        })
    });

})

module.exports = router