const express = require('express');

const parseString = require('xml2js').parseString;

const request = require('request');

const router = express.Router()

const bodyParser = require('body-parser');

const jwt = require('jsonwebtoken');

const cors = require('cors')

router.use(cors()) // Use this after the variable declaration

router.use(bodyParser.json());

router.use('/emp/login', function (req, res) {
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

module.exports = router;
