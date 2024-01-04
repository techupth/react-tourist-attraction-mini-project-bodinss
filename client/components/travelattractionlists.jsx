import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

export function TravelAttractionList() {
  const [searchMessage, setSearchMessage] = useState("");
  const [travelList, setTravelList] = useState([]);

  const getTravelAttractionList = async () => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${searchMessage}`
      );
      setTravelList(result.data.data ?? []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchMessage = (event) => {
    setSearchMessage(event.target.value);
  };

  const handleTravelTitleClick = (url) => {
    const windowFeatures =
      "width=800,height=600,toolbar=no,location=no,menubar=no,status=no";
    window.open(url, "_blank", windowFeatures);
  };

  const handleCopyLinkClick = (url) => {
    navigator.clipboard.writeText(url);
    alert("📝 คัดลอก URL ของเนื้อหาเรียบร้อย 😊");
  };

  const handleTagClick = (tags) => {
    setSearchMessage((prevSearchMessage) =>
      prevSearchMessage.trim() === "" ? tags : `${prevSearchMessage} ${tags}`
    );
  };

  function limitCharacters(text, maxCharacters) {
    // Split the text into an array of characters
    let characters = Array.from(text);

    // Slice the array to get the desired number of characters
    let truncatedCharacters = characters.slice(0, maxCharacters);

    // Join the truncated characters back into a string
    let truncatedText = truncatedCharacters.join("");

    return truncatedText;
  }

  useEffect(() => {
    getTravelAttractionList();
  }, [searchMessage]);

  return (
    <div className="container">
      <div className="search-section">
        <h2 className="search-topic">ค้นหาที่เที่ยว</h2>
        <img
          className="magnifying-glass-icon"
          src="https://img5.pic.in.th/file/secure-sv1/480px-Magnifying_glass_icon.png"
          alt="Magnifying glass icon"
          border="0"
        />
        <label>
          <input
            id="text"
            name="text"
            type="text"
            className="search-box"
            placeholder="หาที่เที่ยวแล้วไปกัน ..."
            value={searchMessage}
            onChange={handleSearchMessage}
          ></input>
        </label>
      </div>

      {travelList.map((travel) => (
        <div className="travel-lists-container">
          <div className="travel-lists" key={travel.index}>
            <div className="travel-lists-left">
              <img
                className="travel-main-image-preview"
                src={travel.photos[0]}
                alt="travel images"
                width="350"
                height="250"
              />
            </div>

            <div className="travel-lists-right">
              <div
                className="travel-title"
                onClick={() => {
                  handleTravelTitleClick(travel.url);
                }}
              >
                <a className="travel-title-text">{travel.title}</a>
              </div>

              <div className="travel-description">
                {limitCharacters(travel.description, 100)}
                <span className="dot-symbol"> ...</span>
                <div>
                  <a className="read-more" href={travel.url} target="_blank">
                    อ่านต่อ
                  </a>
                </div>
                <img
                  className="copy-link-icon"
                  src="https://img5.pic.in.th/file/secure-sv1/10016986.png"
                  alt="copy link icon.png"
                  height="60"
                  width="60"
                  onClick={() => handleCopyLinkClick(travel.url)}
                />
              </div>

              <div className="travel-tag-list">
                <p className="travel-tag-title">หมวด:</p>
                {travel.tags.map((tags, i) => {
                  return (
                    <div
                      className="travel-tag"
                      key={i}
                      onClick={() => handleTagClick(tags)}
                    >
                      {tags}
                    </div>
                  );
                })}
              </div>

              <div className="travel-image-preview">
                {travel.photos.slice(1).map((photo, i) => {
                  return (
                    <div key={i}>
                      <img
                        className="small-images-preview"
                        src={photo}
                        width="100"
                        height="100"
                        alt="travel images"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
