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
                    let token = jwt.sign({ username: username }, 'secret', { expiresIn: '48h' });

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

router.use((req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).send({ message: "No access token" });

    jwt.verify(token, 'secret', (err, payload) => {
        if (err) {
            console.error(err);
            return res.status(403).send({ message: "Access token expired" });
        }
        req.user = payload;
        next();
    });
});

router.post('/emp/details', function (req, res) {
    let username = req.body.data
    var options = {
        'method': 'GET',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-emp/detail',
        'headers': {
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=9cQh1ydQjkSRsmeAswL56QdoNnF6egF-Y2kA_SAPTuJ11zhIqpPXm0OJ22UDz4fv; JSESSIONMARKID=jHKTVAkG-48-xJPl0BXkIkaafE5HRqC-L3q35jaQA; saplb_*=(J2EE6906720)6906750'
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
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=9cQh1ydQjkSRsmeAswL56QdoNnF6egF-Y2kA_SAPTuJ11zhIqpPXm0OJ22UDz4fv; JSESSIONMARKID=jHKTVAkG-48-xJPl0BXkIkaafE5HRqC-L3q35jaQA; saplb_*=(J2EE6906720)6906750'
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

router.post('/emp/leave-details', function (req, res) {
    let user = req.body.data
    var options = {
        'method': 'GET',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-emp/leave-detail',
        'headers': {
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=PuFq05NQw0qDIZu7f1VrTIRgtP9_egF-Y2kA_SAPShCUqE8-drXV-BPNCv2hUS9T; JSESSIONMARKID=UP6U4QdtPLEhE5dV4vKJEUzV0akl83q2PBAH5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: JSON.stringify({
            "EMPLOYEE_ID": user
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
                    leave_data = data.RESULT.item
                    return res.status(200).json(leave_data);
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

router.post('/emp/leave-request', function (req, res) {
    var options = {
        'method': 'POST',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-emp/leave-request',
        'headers': {
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=1hmhUhLac0PTegfh9KWXieI6poqRegF-Y2kA_SAPYgNS_4muhx8K1I5r_a64ajMU; JSESSIONMARKID=JRviEwb_d60GVlQcWNfEgeDAtB3-WhicRvDH5jaQA; saplb_*=(J2EE6906720)6906750'
        },
        body: JSON.stringify({
            "EMPLOYEE_ID": req.body.data.EmployeeNumber,
            "ENDING_DATE": req.body.data.EndDate,
            "LEAVE_TYPE": req.body.data.LeaveType,
            "STARTING_DATE": req.body.data.StartDate
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
                    leave_data = data.RETURN.MESSAGE
                    return res.status(200).json(leave_data);
                }
                else {
                    return res.status(501).json({ message: ' Leave Request Not Created!' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        }
    });

})

router.post('/emp/leave-types', function (req, res) {
    let username = req.body.data
    var options = {
        'method': 'GET',
        'url': 'http://dxktpipo.kaarcloud.com:50000/RESTAdapter/srk-emp/leave-type',
        'headers': {
            'Authorization': 'Basic UE9VU0VSOlRlY2hAMjAyMQ==',
            'Content-Type': 'application/json',
            'Cookie': 'JSESSIONID=LjU_8yI5oUE8s5Ri6l3wkNHFxuiPegF-Y2kA_SAPR5CKuKP4P-kxG0xDAG5cWVp7; JSESSIONMARKID=QMnmDwBTgpiE-ETLkaHe7Zjuj7QLua52gt_n5jaQA; saplb_*=(J2EE6906720)6906750'
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
                leave_types = data.LEAVE_TYPES.item
                leave_quota = data.LEAVE_QUOTA.item
                leave_data = {
                    leave_types,
                    leave_quota
                }
                if (data.RETURN.TYPE === 'S') {
                    return res.status(200).json(leave_data);
                } else {
                    return res.status(501).json({ message: ' No details Found!' });
                }
            } catch (error) {
                return res.status(500).json({ message: 'SAP Server Error!' })
            }
        }
    });

})

module.exports = router;