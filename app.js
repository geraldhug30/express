const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: fname,
					LNAME: lname
				}
			}
		]
	};

	const jsonData = JSON.stringify(data);

	let options = {
		url: "https://us4.api.mailchimp.com/3.0/lists/b6b63f68e4",
		method: 'POST',
		headers: {
			"Authorization": "gerald 790837f73a4ade3fe659e330e2f1352f-us4"
		},
		body: jsonData
	}

	//res.send(fname + ' ' + lname + ' ' + email);
	request(options, (error, response, body) => {
		if(response.statusCode === 200){
			res.sendFile(__dirname + '/success.html');
		} else {
			res.sendFile(__dirname + '/TryAgain.html');
		}
	});

});

app.listen(process.env.PORT || 3000, (err) => {
	if(err){
		console.log(err);
	} else {
		console.log('app is running');
	}
})