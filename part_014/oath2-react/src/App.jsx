import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardGroup";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import config from './utils/config';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null)
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    axios
      .get(config.VITE_GITHUB_USER_API_URL, {
        headers: {
          Authorization: "token " + token,
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
  }, []);



  return (
    <div className="App text-center container-fluid">
      {!loggedIn ? (
        <>
          <img
            className="mb-4"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            width="150"
          ></img>
          <h1 className="h3 mb-3 font-weight-normal">Sign in with GitHub</h1>
          <Button
            type="primary"
            className="btn"
            size="lg"
            href={`${config.VITE_GITHUB_USER_IDENTITY_URL}?client_id=${config.VITE_GITHUB_CLIENT_ID}&redirect_uri=${config.VITE_REDIRECT_URI}`}
          >
            Sign in
          </Button>
        </>
      ) : (
        <>
          <h1>Welcome!</h1>
          <p>
            This is a simple integration between OAuth2 on GitHub with Node.js
          </p>

          <CardDeck>
            {[...Array(3)].map((e, i) => (
              <Card key={i} style={{ maxWidth: "25%", margin: "auto" }}>
                <Card.Img variant="top" src={user.avatar_url} />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>{user.bio}</Card.Text>
                  <Button
                    variant="primary"
                    target="_blank"
                    href={user.html_url}
                  >
                    GitHub Profile
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
        </>
      )}
    </div>
  );
}

export default App;