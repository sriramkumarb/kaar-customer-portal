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

router.post('/ven/login', function (req, res) {

    let user = req.body.data.email.toUpperCase();
    let pass = req.body.data.password

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_LOGIN_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjAxMTc1NAUABAAAAAgKAAZQT1VTRVL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjAxMTc1NDU3WjAjBgkqhkiG9w0BCQQxFgQUkr!d0wbwNIt5sh36!cNf59%2FeAgEwCQYHKoZIzjgEAwQuMCwCFHm3styzKCLusMHN8ru07Lde3KvzAhRqbl5RKX%2FRmVKtiHWVgLy5h2zTdA%3D%3D; JSESSIONID=6Jv3xVgA0V5LRZ_U3H2hyElK2rbIeQF-Y2kA_SAPrZLKrjMwN32AigFJc34kFnas; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_LOGIN_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <PASSWORD>' + pass + '</PASSWORD>\r\n         <USERNAME>' + user + '</USERNAME>\r\n      </urn:ZBAPI_VEN_LOGIN_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);

        var xml = response.body;
        parseString(xml, (err, result) => {
            try {
                res_status = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_LOGIN_SRK.Response'][0].RETURN[0].TYPE[0]

                if (res_status === 'S') {
                    // generate token
                    let token = jwt.sign({ username: user }, 'secret', { expiresIn: '3h' });

                    let ven_token = {
                        username: user,
                        token: token
                    }

                    return res.status(200).json(ven_token);
                }
                else {
                    return res.status(501).json({ message: ' Invalid Credentials' });
                }

            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        })
    });


})

router.post('/ven/details', function (req, res) {

    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_DETAILS_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjAxMTc1NAUABAAAAAgKAAZQT1VTRVL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjAxMTc1NDU3WjAjBgkqhkiG9w0BCQQxFgQUkr!d0wbwNIt5sh36!cNf59%2FeAgEwCQYHKoZIzjgEAwQuMCwCFHm3styzKCLusMHN8ru07Lde3KvzAhRqbl5RKX%2FRmVKtiHWVgLy5h2zTdA%3D%3D; JSESSIONID=6Jv3xVgA0V5LRZ_U3H2hyElK2rbIeQF-Y2kA_SAPrZLKrjMwN32AigFJc34kFnas; JSESSIONMARKID=SkaGNQl5nGW8wHokCBhFqxne3Wo9nW68zeFX5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_DETAILS_SRK>\r\n         <VENDOR_ID>' + user + '</VENDOR_ID>\r\n      </urn:ZBAPI_VEN_DETAILS_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
        var xml = response.body;
        parseString(xml, (err, result) => {
            try {
                res_status = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_DETAILS_SRK.Response'][0].RETURN[0].TYPE[0]
                res_data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_DETAILS_SRK.Response'][0].VENDOR_DETAILS[0]
                // console.log(res_status);
                if (res_status !== 'E') {
                    res.status(200).json(res_data)
                } else {
                    return res.status(501).json({ message: 'User Details not available!' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        })
    });


})

module.exports = router;