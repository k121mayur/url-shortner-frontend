import axios from "axios";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";

const Home = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function isValidUrl(string) {
    try {
      if (!string.startsWith("http://") && !string.startsWith("https://")) {
        if (!string.startsWith("www.")) {
          string = "www." + string;
        }
        string = "https://" + string;

        new URL(string);
        return string;
      } else return string;
    } catch (err) {
      return false;
    }
  }

  const shortUrlFunction = async () => {
    // Validate and normalize the URL
    const validUrl = await isValidUrl(url);
    if (!validUrl) {
      alert("Please enter a valid URL");
      return;
    }

    setLoading(true); // Show loading spinner
    axios
      .post("https://url-shortner-backend-kk8u.onrender.com/shortner", {
        original_url: validUrl, // Use the validated and normalized URL
      })
      .then((res) => {
        setShortUrl(
          `https://url-shortner-frontend-3si1.onrender.com/${res.data.hash}`
        ); // Set the shortened URL
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // Hide loading spinner
      });
  };
  return (
    <div
      className="d-flex justify-content-center align-items-center flex-column border m-0"
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src="/images/logo.png"
        className="col-lg-6 col-sm-10 col-md-8 border border-light shadow rounded-3"
        alt="logo"
        style={{ width: "100px", height: "100px" }}
      />
      <h1 className="text-center text-dark m-5"> Short is Sweet </h1>
      <input
        type="text"
        className="col-lg-6 col-sm-10 col-md-8 col-10 border border-light shadow rounded-3"
        style={{ height: "50px" }}
        placeholder="Enter your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value.trim())}
      />
      {url.trim() && !loading && (
        <Button variant="success" className="m-2" onClick={shortUrlFunction}>
          Submit
        </Button>
      )}
      {loading && (
        <Spinner
          animation="border"
          variant="success"
          className="m-4"
          style={{ height: "50px", width: "50px", borderWidth: "5px" }}
        />
      )}
      {shortUrl && (
        <a href={shortUrl} target="_blank">
          <h3 className="text-center text-dark m-5">{shortUrl}</h3>
        </a>
      )}
    </div>
  );
};

export default Home;
