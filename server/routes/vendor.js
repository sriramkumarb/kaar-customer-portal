const express = require('express');

const parseString = require('xml2js').parseString;

const request = require('request');

const router = express.Router()

const bodyParser = require('body-parser');

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

router.post('/ven/edit-details', function (req, res) {
    const user = req.body.data
    Object.keys(user).forEach((key) => {
        if (user[key] instanceof Array) {
            user[key] = user[key][0]
        }
    })

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_EDIT_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjA1MDUyMgUABAAAAAgKAAZQT1VTRVL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjA1MDUyMjE5WjAjBgkqhkiG9w0BCQQxFgQUQAk!XtNgywCu%2FbOdaYKlzGNSg14wCQYHKoZIzjgEAwQuMCwCFHXDSfatzNtBBYC10m6FmewW1YREAhQiKw9ACFgfjRFSXPJWkYITDflUQw%3D%3D; JSESSIONID=blKpATB9nT0d8-r8lVbKXbyrPJ_aeQF-Y2kA_SAPc7ZoD3F4POQQgb1l8AxnbFP-; JSESSIONMARKID=Tn0LgQdHkZOerNxTSJI_4zclmeLJjGA3dQJX5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_EDIT_SRK>\r\n         <VENDOR_DETAILS>\r\n            <!--Optional:-->\r\n            <VENDOR>' + user.customer_id + '</VENDOR>\r\n            <!--Optional:-->\r\n            <NAME>' + user.name + '</NAME>\r\n            <!--Optional:-->\r\n            <NAME_2>' + user.name_2 + '</NAME_2>\r\n            <!--Optional:-->\r\n            <CITY>' + user.city + '</CITY>\r\n            <!--Optional:-->\r\n            <DISTRICT>' + user.state + '</DISTRICT>\r\n            <!--Optional:-->\r\n            <POSTL_CODE>' + user.postal_code + '</POSTL_CODE>\r\n            <!--Optional:-->\r\n            <REGION>' + user.one_time_acc + '</REGION>\r\n            <!--Optional:-->\r\n            <STREET>' + user.street + '</STREET>\r\n            <!--Optional:-->\r\n            <COUNTRY>' + user.country + '</COUNTRY>\r\n            <!--Optional:-->\r\n            <LANGU>' + user.search_term + '</LANGU>\r\n         <!--Optional:-->\r\n            <TELEPHONE>' + user.telephone + '</TELEPHONE>\r\n         </VENDOR_DETAILS>\r\n      </urn:ZBAPI_VEN_EDIT_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        var xml = response.body;
        parseString(xml, (err, result) => {
            try {
                res_status = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_EDIT_SRK.Response'][0].RETURN[0].TYPE[0]

                if (res_status == 'S') {
                    res.status(200).json({ res_status, message: 'Details Updated Successfully!' })
                }
                else {
                    return res.status(501).json({ res_status, message: 'Some Error Occured !' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP server error!' })
            }
        })
    });

})

router.post('/ven/payment', function (req, res) {
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_PA_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjA1MDUyMgUABAAAAAgKAAZQT1VTRVL%2FAQQwggEABgkqhkiG9w0BBwKggfIwge8CAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBzzCBzAIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjA1MDUyMjE5WjAjBgkqhkiG9w0BCQQxFgQUQAk!XtNgywCu%2FbOdaYKlzGNSg14wCQYHKoZIzjgEAwQuMCwCFHXDSfatzNtBBYC10m6FmewW1YREAhQiKw9ACFgfjRFSXPJWkYITDflUQw%3D%3D; JSESSIONID=blKpATB9nT0d8-r8lVbKXbyrPJ_aeQF-Y2kA_SAPc7ZoD3F4POQQgb1l8AxnbFP-; JSESSIONMARKID=zmVugQ76q33Vr9DhjIeLdGpVgj3FJD68flL35jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_PA_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <VENDOR_ID>' + user + '</VENDOR_ID>\r\n      </urn:ZBAPI_VEN_PA_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);

        var xml = response.body;
        parseString(xml, (err, result) => {

            try {

                len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_PA_SRK.Response'][0].IT_RES[0].length
                if (len == undefined && typeof len !== 'number') {
                    res_data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_PA_SRK.Response'][0].IT_RES[0].item

                    for (i = 0; i < res_data.length; i++) {
                        Object.keys(res_data[i]).forEach((key) => {
                            if (res_data[i][key] instanceof Array) {
                                res_data[i][key] = res_data[i][key][0]
                            }
                        })
                    }

                    res.status(200).json(res_data)
                }
                else {
                    return res.status(501).json({ message: "No data Found for the " + user + "!" });
                }

            } catch (error) {
                return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
            }

        })
    });

})

router.post('/ven/credit', function (req, res) {
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_CREDIT_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjA1MTI0MwUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjA1MTI0MzUxWjAjBgkqhkiG9w0BCQQxFgQUSjTdLgZfgzHN6hjUa4mNMc7x5GowCQYHKoZIzjgEAwQvMC0CFQCJdQoIYh5mzxnu61W8UrJka6fELwIUPbi6TKN4heo88P88%2F56EZYFbH!w%3D; JSESSIONID=2q2WssIvkGKQn7Q4nGWD7WhwdzPceQF-Y2kA_SAPa2WjNGCGOCqOr94cfJ7yz4wg; JSESSIONMARKID=CYNdAgGEahigrLQqXeVJjg1kLxF-bN0TZmPX5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_CREDIT_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <VENDOR_ID>' + user + '</VENDOR_ID>\r\n      </urn:ZBAPI_VEN_CREDIT_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);

        var xml = response.body;
        parseString(xml, (err, result) => {
            try {
                len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_CREDIT_SRK.Response'][0].CREDIT[0].length
                if (len == undefined && typeof len !== 'number') {
                    res_data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_CREDIT_SRK.Response'][0].CREDIT[0].item
                    res_status = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_CREDIT_SRK.Response'][0].RETURN[0].TYPE[0]

                    for (i = 0; i < res_data.length; i++) {
                        Object.keys(res_data[i]).forEach((key) => {
                            if (res_data[i][key] instanceof Array) {
                                res_data[i][key] = res_data[i][key][0]
                            }
                        })
                    }
                    if (res_status === 'S') {
                        res.status(200).json(res_data)
                    }
                }
                else {
                    return res.status(501).json({ message: 'Some Error Occured !' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
            }
        })
    });

})

router.post('/ven/debit', function (req, res) {
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_DEBIT_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjA1MTI0MwUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjA1MTI0MzUxWjAjBgkqhkiG9w0BCQQxFgQUSjTdLgZfgzHN6hjUa4mNMc7x5GowCQYHKoZIzjgEAwQvMC0CFQCJdQoIYh5mzxnu61W8UrJka6fELwIUPbi6TKN4heo88P88%2F56EZYFbH!w%3D; JSESSIONID=GYj7-Ra0F9DpD2bhs5QIfa_jLjzceQF-Y2kA_SAPnDA9a6vYiPGjQTheUZmG39kw; JSESSIONMARKID=4w1XQQ6FRJoLhhdAdaQlvDp6I2RTmvBzjrPX5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_DEBIT_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <VENDOR_ID>' + user + '</VENDOR_ID>\r\n      </urn:ZBAPI_VEN_DEBIT_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);

        var xml = response.body;
        parseString(xml, (err, result) => {
            try {
                len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_DEBIT_SRK.Response'][0].DEBIT[0].length
                if (len == undefined && typeof len !== 'number') {
                    res_data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_DEBIT_SRK.Response'][0].DEBIT[0].item
                    res_status = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_DEBIT_SRK.Response'][0].RETURN[0].TYPE[0]

                    for (i = 0; i < res_data.length; i++) {
                        Object.keys(res_data[i]).forEach((key) => {
                            if (res_data[i][key] instanceof Array) {
                                res_data[i][key] = res_data[i][key][0]
                            }
                        })
                    }
                    if (res_status === 'S') {
                        res.status(200).json(res_data)
                    }
                }
                else {
                    return res.status(501).json({ message: 'Some Error Occured !' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
            }
        })
    });

})

router.post('/ven/rqlist', function (req, res) {
    let user = req.body.data;

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_RQLIST_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjEwMTgyNgUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjEwMTgyNjE1WjAjBgkqhkiG9w0BCQQxFgQUsoIPaEUAhqxyZDf3QVa20PcVTE0wCQYHKoZIzjgEAwQvMC0CFGOY8pMU85bEjz0h%2Few3Wn8Ymds5AhUA8xujTEQ2gPy5vTW0eXI7JqPymeY%3D; JSESSIONID=dNggm0oNz-FU6WWAAmuZL6fAvyz3eQF-Y2kA_SAPM1jTquiqVoQxRisYrNt6wzGm; JSESSIONMARKID=SY1exQN86d8NGmfa_Nh1OaFMx2uQNwfnb82H5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_RQLIST_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <VENDOR_ID>' + user + '</VENDOR_ID>\r\n      </urn:ZBAPI_VEN_RQLIST_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            var xml = response.body;
            parseString(xml, (err, result) => {
                try {
                    len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_RQLIST_SRK.Response'][0].IT_RES[0].length

                    if (len == undefined && typeof len !== 'number') {
                        res_data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_RQLIST_SRK.Response'][0].IT_RES[0].item
                        resultStatus = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_RQLIST_SRK.Response'][0].RETURN[0].TYPE[0]

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
                } catch (error) {
                    return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
                }
            })
        }
        // console.log(response.body);
    });

})

router.post('/ven/rqdet', function (req, res) {
    let ebeln = req.body.data

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_RQDET_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjEwMTgyNgUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjEwMTgyNjE1WjAjBgkqhkiG9w0BCQQxFgQUsoIPaEUAhqxyZDf3QVa20PcVTE0wCQYHKoZIzjgEAwQvMC0CFGOY8pMU85bEjz0h%2Few3Wn8Ymds5AhUA8xujTEQ2gPy5vTW0eXI7JqPymeY%3D; JSESSIONID=9pkhoHsjnlYi60l3QYUq9rESL1L3eQF-Y2kA_SAP993jqWW0Xeqp0c_a-q9VmP-f; JSESSIONMARKID=7d1YLw57K0kEZp4btgNwXcCJjdKJcNUaw3235jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_RQDET_SRK>\r\n         <!--You may enter the following 3 items in any order-->\r\n         <PURCHASE_DOCUMENT>' + ebeln + '</PURCHASE_DOCUMENT>\r\n      </urn:ZBAPI_VEN_RQDET_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            var xml = response.body;
            parseString(xml, (err, result) => {
                try {
                    len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_RQDET_SRK.Response'][0].ITEMS[0].length
                    if (len == undefined && typeof len !== 'number') {

                        header = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_RQDET_SRK.Response'][0].HEADER[0]
                        item = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_RQDET_SRK.Response'][0].ITEMS[0].item[0]
                        Object.keys(item).forEach((key) => {
                            if (item[key] instanceof Array) {
                                item[key] = item[key][0]
                            }
                        })
                        Object.keys(header).forEach((key) => {
                            if (header[key] instanceof Array) {
                                header[key] = header[key][0]
                            }
                        })
                        res.status(200).send({ item, header })
                    }
                    else {
                        return res.status(501).json({ message: 'Some Error Occured !' });
                    }
                } catch (error) {
                    return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
                }
            })
        }
        // console.log(response.body);
    });

})

router.post('/ven/grlist', function (req, res) {
    let user = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_GRLIST_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjExMTA1MgUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjExMTA1MjI1WjAjBgkqhkiG9w0BCQQxFgQUW5l!z3f1XU64FWfbsf7bC6DYV!YwCQYHKoZIzjgEAwQvMC0CFAO49nk6YNSlHNZorlOWrqSpLD%2FRAhUA6G5wgIf!kWX6HX%2FhXwVpi1s6lBc%3D; JSESSIONID=WTjSAj5OOXEJ-bzi22r0Gvj1nbP6eQF-Y2kA_SAPz1z-Nf03tYl1enlrM2ht4SV0; JSESSIONMARKID=mlElXAvXuekYeDcVMn2YC_eFleHvGBliLNDn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_GRLIST_SRK>\r\n         <!--You may enter the following 2 items in any order-->\r\n         <VENDOR_ID>' + user + '</VENDOR_ID>\r\n      </urn:ZBAPI_VEN_GRLIST_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            var xml = response.body;
            parseString(xml, (err, result) => {
                try {
                    len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_GRLIST_SRK.Response'][0].IT_RES[0].length
                    if (len == undefined && typeof len !== 'number') {
                        res_data = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_GRLIST_SRK.Response'][0].IT_RES[0].item
                        resultStatus = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_GRLIST_SRK.Response'][0].RETURN[0].TYPE[0]

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
                } catch (error) {
                    return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
                }
            })
        }
        // console.log(response.body);
    })
});

router.post('/ven/grdet', function (req, res) {
    let number = req.body.data[1]
    let year = req.body.data[0]

    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VEN_SRK&receiverParty=&receiverService=&interface=SI_VEN_GRDET_SRK&interfaceNamespace=http://srk-vendor-portal.com',
        'headers': {
            'Content-Type': 'text/xml',
            'SOAPAction': '"http://sap.com/xi/WebService/soap1.1"',
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Cookie': 'MYSAPSSO2=AjExMDAgAA1wb3J0YWw6UE9VU0VSiAAHZGVmYXVsdAEABlBPVVNFUgIAAzAwMAMAA0tQTwQADDIwMjEwNjExMTA1MgUABAAAAAgKAAZQT1VTRVL%2FAQUwggEBBgkqhkiG9w0BBwKggfMwgfACAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGB0DCBzQIBATAiMB0xDDAKBgNVBAMTA0tQTzENMAsGA1UECxMESjJFRQIBADAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMjEwNjExMTA1MjI1WjAjBgkqhkiG9w0BCQQxFgQUW5l!z3f1XU64FWfbsf7bC6DYV!YwCQYHKoZIzjgEAwQvMC0CFAO49nk6YNSlHNZorlOWrqSpLD%2FRAhUA6G5wgIf!kWX6HX%2FhXwVpi1s6lBc%3D; JSESSIONID=WTjSAj5OOXEJ-bzi22r0Gvj1nbP6eQF-Y2kA_SAPz1z-Nf03tYl1enlrM2ht4SV0; JSESSIONMARKID=Xe697g1Z_iDE2fRFTsITW94JdBeRqtlmHBEn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <urn:ZBAPI_VEN_GRDET_SRK>\r\n         <!--You may enter the following 4 items in any order-->\r\n         <MATERIAL_DOCUMENT>' + number + '</MATERIAL_DOCUMENT>\r\n         <MATERIAL_YEAR>' + year + '</MATERIAL_YEAR>\r\n      </urn:ZBAPI_VEN_GRDET_SRK>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>'

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            var xml = response.body;
            parseString(xml, (err, result) => {
                try {
                    len = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_GRDET_SRK.Response'][0].ITEMS[0].length
                    if (len == undefined && typeof len !== 'number') {

                        header = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_GRDET_SRK.Response'][0].HEADER[0]
                        item = result['SOAP:Envelope']['SOAP:Body'][0]['ns0:ZBAPI_VEN_GRDET_SRK.Response'][0].ITEMS[0].item[0]

                        Object.keys(item).forEach((key) => {
                            if (item[key] instanceof Array) {
                                item[key] = item[key][0]
                            }
                        })
                        Object.keys(header).forEach((key) => {
                            if (header[key] instanceof Array) {
                                header[key] = header[key][0]
                            }
                        })
                        res.status(200).send({ item, header })
                    }
                    else {
                        return res.status(501).json({ message: 'Some Error Occured !' });
                    }
                } catch (error) {
                    return res.status(500).json({ message: 'Length of SAP result cannot be identified' })
                }
            })
        }
        // console.log(response.body);
    });

})

module.exports = router;