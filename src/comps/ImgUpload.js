import React, { useState } from 'react';
import ProgressBar from './Progress';

const ImgUpload = () => {
  const [file, setFile] = useState(null);

  const types = ['image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  return (
    <form>
      <label>
        <input type="file" onChange={handleChange} />
        <span>Lisa Pilte</span>
      </label>
      <div className="output">
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default ImgUpload;