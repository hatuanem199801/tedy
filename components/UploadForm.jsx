import Image from "next/image";
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = ({ setImage }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleSetUrl = (url) => {
    if (url) {
      setImage(url);
      setImageUrl(imageUrl);
    }
  };

  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <form>
      <label>
        <input
          type="file"
          onChange={handleChange}
          accept="image/jpeg"
          required
        />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && (
          <ProgressBar file={file} setFile={setFile} setUrl={handleSetUrl} />
        )}
        {imageUrl && (
          <div>
            <img key={imageUrl} src={imageUrl} height={150} width={150} />
            <p>{imageUrl}</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default UploadForm;
