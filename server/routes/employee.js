const express = require('express');

const parseString = require('xml2js').parseString;

const request = require('request');

const router = express.Router()

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const cors = require('cors')

router.use(cors()) // Use this after the variable declaration

router.use(bodyParser.json());

router.post('/emp/login', function (req, res) {
    let username = req.body.data.Username
    let password = req.body.data.password

    var options = {
        'method': 'GET',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-employee/login',
        'headers': {
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=8JSDAZuMc9vaQA_Rq0z0HyNDK2F1egF-Y2kA_SAPve4vUHtmjneavneVvdOXYa9Y; JSESSIONMARKID=KtA9Egx2w_HuWprz0MUhZUSfvWzg7o89O3Xn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: JSON.stringify({
            "PASSWORD": password,
            "USERNAME": username
        })

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            try {
                data = JSON.parse(response.body)
                if (data.RETURN.TYPE === 'S') {
                    // generate token
                    let token = jwt.sign({ username: username }, 'secret', { expiresIn: '3h' });

                    let emp_token = {
                        username: username,
                        token: token
                    }

                    return res.status(200).json(emp_token);
                }
                else {
                    return res.status(501).json({ message: ' Invalid Credentials' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        }
    });

})

router.post('/emp/details', function (req, res) {

    let username = req.body.data
    var options = {
        'method': 'GET',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-emp/detail',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=DYHXzmEbB2WCS_BSBTlVPjxD4rJ2egF-Y2kA_SAPm2kaQX88LcvvbJmYGwehRslZ; JSESSIONMARKID=k0OC9gEwLK82JQkSZYCUw1jA4zN3AgmPLYcn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: JSON.stringify({
            "EMPLOYEE_ID": username
        })

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            try {
                data = JSON.parse(response.body)
                if (data.RETURN.TYPE === 'S') {
                    emp_data = data.EMPLOYEE_DETAILS
                    return res.status(200).json(emp_data);
                }
                else {
                    return res.status(501).json({ message: ' No details Found!' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        }
    });

})

router.post('/emp/edit', function (req, res) {
    let details = req.body.data

    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-emp/edit',
        'headers': {
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=DYHXzmEbB2WCS_BSBTlVPjxD4rJ2egF-Y2kA_SAPm2kaQX88LcvvbJmYGwehRslZ; JSESSIONMARKID=k0OC9gEwLK82JQkSZYCUw1jA4zN3AgmPLYcn5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: JSON.stringify({
            "EMPLOYEE_ID": details.EMPLOYEE_ID,
            "F_NAME": details.F_NAME,
            "L_NAME": details.L_NAME,
            "TITLE": details.TITLE,
            "NATIONALITY": details.NATIONALITY,
            "STREET": details.STREET,
            "CITY": details.CITY,
            "COUNTRY": details.COUNTRY,
            "POSTAL_CODE": details.POSTAL_CODE,
            "TELEPHONE": details.TELEPHONE,
        })

    };
    request(options, function (error, response) {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server connect ETIMEDOUT 172.17.12.151:50000' })
        }
        else {
            try {
                data = JSON.parse(response.body)
                if (data.RETURN.TYPE === 'S') {
                    emp_res = data.RETURN
                    return res.status(200).json(emp_res);
                }
                else {
                    return res.status(501).json({ message: 'Update Failed!' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        }

    });

})

module.exports = router;
