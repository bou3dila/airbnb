import React, { useRef, useState, useEffect } from 'react';

import './ImageUpload.css';

const ImageUpload = ({file, setFile}) => {
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
    //   setPreviewUrl(fileReader.result);
    setPreviewUrl(file[0].name)
    };
    fileReader.readAsDataURL(file[0]);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length > 0) {
      pickedFile = event.target.files;
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    // props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        // id={props.id}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
        multiple="multiple"
      />
      <div className={`image-upload `}>
        
        <button type="button" className="button--upload" onClick={pickImageHandler}>
          PICK IMAGE
        </button> 
      </div>
      {/* {!isValid && <p>{props.errorText}</p>} */}
    </div>
  );
};

export default ImageUpload;
