const express = require('express')
const cors = require('cors')
const axios = require('axios')

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_URL, GITHUB_USER_API_URL, GITHUB_USER_IDENTITY_URL } = require('./utils/config');

const CLIENT_ID = GITHUB_CLIENT_ID;
const CLIENT_SECRET = GITHUB_CLIENT_SECRET;

const app = express();
app.use(express.json())
app.use(cors({ credentials: true, origin: true }));

app.get('/login', (req, res) => {
    res.redirect(`${GITHUB_USER_IDENTITY_URL}?client_id=${GITHUB_CLIENT_ID}`);
    // axios.get(`${GITHUB_USER_IDENTITY_URL}?client_id=${GITHUB_CLIENT_ID}`)
    //     .then((response) => {
    //         return response;
    //     })
});

app.get("/oauth/redirect", (req, res) => {
    axios({
        method: "POST",
        url: `${GITHUB_URL}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${req.query.code}`,
        headers: {
            Accept: "application/json",
        },
    }).then((response) => {
        res.redirect(
            `http://localhost:5173?access_token=${response.data.access_token}`
        );
    });

    // .then((response) => {
    //     res.json(response.data.access_token)
    // })
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});