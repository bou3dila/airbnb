import { createClient } from "contentful-management";
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from 'react-router-dom';


import ImageUpload from "../../shared/components/UIElements/ImageUpload";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";

import "./NewHouse.css";

export default function NewHouse() {

    const auth = useContext(AuthContext);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState();
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("Al Marsa");

  const [assets, setAssets] = useState([]);
  const createFile = async (f) => {
      setLoading(true)
    const client = await createClient({
      accessToken: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
    });

    const space = await client.getSpace(process.env.REACT_APP_SPACE_ID);
    const environment = await space.getEnvironment("master");

    const asset = await environment.createAssetFromFiles({
      fields: {
        title: {
          "en-US": f.name,
        },
        description: {
          "en-US": "Asset description",
        },
        file: {
          "en-US": {
            contentType: f.type,
            fileName: f.name,
            file: f,
          },
        },
      },
    });

    // console.log(asset);
    await asset
      .processForAllLocales("en-US", {
        processingCheckWait: 2000,
      })
      .then((asset) => {
        asset.publish();
        setAssets((ass) => [...ass, asset.sys.id]) 
        
      });
      
  };

  useEffect(async () => {
    if(assets.length > 0 && assets.length === file.length){
        let tab = [];
        for (let i = 0; i < assets.length; i++) {
          tab[i] = { sys: { type: "Link", linkType: "Asset", id: assets[i] } };
        }
    
        
        const client = await createClient({
          accessToken: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN,
        });
    
        await client
          .getSpace(process.env.REACT_APP_SPACE_ID)
          .then((space) => space.getEnvironment("master"))
          .then((environment) =>
            environment.createEntry("house", {
              fields: {
                name: { "en-US": name },
                price: { "en-US": parseInt(price) },
                description: { "en-US": description },
                 city: { "en-US": `${city}` },
                featuredimage: { "en-US": tab },
                owner: { "en-US" : auth.email }
              },
            })
          )
          .then((entry) => {
            entry.publish();
          })
          .catch(() => {});
          setLoading(false);
          history.push('/');

    }
  },[assets])

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setAssets([]);
    for (let i = 0; i < file.length; i++) {
    await createFile(file[i]);
    }
   
  };

  return (
      <>{loading ? (
        <div className="center">
          <LoadingSpinner />
        </div>
      ) : (
    <div className="newplace_card">
      <div className="card-content">
        <div className="card-title">
          <h2>Add New House</h2>
          <div className="underline-title"></div>
        </div>
        <form className="form" onSubmit={onSubmitHandler}>
          <label htmlFor="user-name" style={{ paddingTop: "13px" }}>
            &nbsp;Title
          </label>
          <input
            className="form-content"
            type="text"
            name="name"
            autoComplete="on"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-border"></div>
          <label htmlFor="user-name" style={{ paddingTop: "13px" }}>
            &nbsp;City
          </label>
          <select
            className="form-content"
            name="location"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          >
            <option value="Al Marsa">Al Marsa</option>
            <option value="Hammamet">Hammamet</option>
            <option value="Tunis">Tunis</option>
            <option value="Hergla">Hergla</option>
          </select>
          <div className="form-border"></div>
          <label htmlFor="user-name" style={{ paddingTop: "13px" }}>
            &nbsp;Price
          </label>
          <input
            className="form-content"
            type="text"
            name="name"
            autoComplete="on"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className="form-border"></div>
          <label htmlFor="user-name" style={{ paddingTop: "13px" }}>
            &nbsp;Description
          </label>
          <textarea
            className="form-content"
            type="text"
            name="name"
            autoComplete="on"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="form-border"></div>
          <div className="image-upload__preview">
            {file &&
              Object.keys(file).map((f, index) => (
                <p key={index}>{file[index].name} </p>
              ))}
            {!file && <p>Please pick an image.</p>}
          </div>
          <ImageUpload file={file} setFile={setFile} />
          <div className="form-border"></div>

          <input
            className="submit-btn"
            type="submit"
            name="submit"
            value="LOGIN"
          />
        </form>
      </div>
    </div>)}
    </>
  );
}
