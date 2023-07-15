import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import LOGO from '../src/asset/dan.png'

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const quoteRef = useRef(null);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = () => {
    fetch("http://api.quotable.io/random")
      .then((res) => res.json())
      .then((data) => {
        const words = data.content.split(" ");
        if (words.length <= 15) {
          setQuote(data.content);
          setAuthor(data.author);
        } else {
          fetchQuote(); // Fetch another quote if the current one has more than 15 words
        }
      });
  };

  const generateQuote = () => {
    fetchQuote();
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const quoteText = encodeURIComponent(`${quote} - ${author}`);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${quoteText}`;
    window.open(shareUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`${quote} - ${author}`);
    const shareUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(shareUrl, "_blank");
  };

  const downloadAsImage = () => {
    html2canvas(quoteRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "quote.png";
      link.click();
    });
  };

  return (
    <div className="App">

      
      <h2> Dannys` Quotes </h2>
      <div className="quote" ref={quoteRef}>
        <h2>{quote}</h2>
        <small>- {author} -</small>
      </div>
      <br />

      
        <button className="btn" onClick={generateQuote}>
          Generate Quotes
        </button>
        <button className="btnDownlaod" onClick={downloadAsImage}>
          Download 
        </button>
    

      <div className="share-buttons">
        <button className="btnShare1" onClick={shareOnFacebook}>
          Share on Facebook
        </button>
        <button className="btnShare" onClick={shareOnWhatsApp}>
          Share on WhatsApp
        </button>
      </div>
 <br />
      <div className="deve"> 
        <h5> Developed By: Dan Goodnews~</h5>
      </div>

      <div className="logoIMG"> <img src={LOGO} /></div>
    </div>
    
  );
}

export default App;
