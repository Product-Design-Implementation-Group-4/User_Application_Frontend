import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { auth, db, storage } from "./firebase"; 
import { doc, setDoc } from "firebase/firestore";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import "../index.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

function SubmitForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: auth.currentUser?.email || "",
    phone: "",
    location: "",
    helperType: "",
    description: "",
  });

  const [uploadedImages, setUploadedImages] = useState([]);
  const navigate = useNavigate();

  const cityOptions = [
    "Helsinki", "Tampere", "Espoo", "Turku", "Vantaa", "Oulu", "Jyväskylä", "Kuopio", 
    "Lahti", "Kouvola", "Pori", "Joensuu", "Lappeenranta", "Hämeenlinna", "Vaasa", 
    "Seinäjoki", "Rovaniemi", "Mikkeli", "Salo", "Kotka", "Porvoo", "Kokkola", 
    "Lohja", "Hyvinkää", "Kirkkonummi", "Järvenpää", "Rauma", "Tuusula", "Kajaani", 
    "Savonlinna", "Kerava", "Nokia", "Kaarina", "Ylöjärvi", "Kangasala", 
    "Jyväskylän Maalaiskunta", "Riihimäki", "Raseborg", "Imatra", "Sastamala", 
    "Raahe", "Raisio", "Hollola", "Lempäälä", "Tornio", "Siilinjärvi", "Kurikka", 
    "Iisalmi", "Varkaus", "Klaukkala", "Valkeakoski", "Mäntsälä", "Äänekoski", 
    "Hamina", "Kuusankoski", "Korsholm", "Lieto", "Heinola", "Kemi", "Sipoo", 
    "Jämsä", "Jakobstad", "Naantali", "Haukipudas", "Laukaa", "Pirkkala", 
    "Pieksämäki", "Kempele", "Forssa", "Janakkala", "Kauhava", "Orimattila", 
    "Loimaa", "Pielisjärvi", "Uusikaupunki", "Sippola", "Vammala", "Kontiolahti", 
    "Kuusamo", "Pargas", "Ylivieska", "Nastola", "Lapua", "Loviisa", "Kauhajoki", 
    "Kiiminki", "Ulvila", "Ilmajoki", "Kalajoki", "Liperi", "Eura", "Alavus", 
    "Mikkelin Maalaiskunta", "Vehkalahti", "Kankaanpää", "Sääminki", "Mariehamn", 
    "Lieksa", "Valkeala", "Pedersöre", "Nivala", "Nurmo", "Kivistö", "Joutseno", 
    "Paimio", "Sotkamo", "Hämeenkyrö", "Huittinen", "Liminka", "Muurame", 
    "Alajärvi", "Lapinlahti", "Leppävirta", "Saarijärvi", "Ii", "Oulunsalo", 
    "Kitee", "Masku", "Kauniainen", "Eurajoki", "Orivesi", "Närpes", "Hattula", 
    "Keuruu", "Muhos", "Somero", "Halikko", "Karis", "Sodankylä", "Karkkila", 
    "Pöytyä", "Laitila", "Hanko", "Hausjärvi", "Keminmaa", "Elimäki", "Pudasjärvi", 
    "Loppi", "Laihia", "Toijala", "Suomussalmi", "Nurmes", "Jalasjärvi", 
    "Nurmijärvi", "Mynämäki", "Kuhmo", "Oulainen", "Kiuruvesi", "Kokemäki", 
    "Kemijärvi", "Nykarleby", "Rajamäki", "Jämsänkoski", "Tyrvää", "Pyhäselkä", 
    "Ikaalinen", "Outokumpu", "Säkylä", "Suonenjoki", "Virrat", "Inari", "Tyrnävä", 
    "Parkano", "Harjavalta", "Vörå", "Haapajärvi", "Eno", "Vanaja", "Haapavesi", 
    "Jokela", "Pälkäne", "Piikkiö", "Iitti", "Nilsiä", "Kittilä", "Viitasaari", 
    "Kronoby", "Mänttä", "Kristinestad", "Siuntio", "Mäntyharju", "Tammela", 
    "Pieksämäen Maalaiskunta", "Rusko", "Noormarkku", "Ähtäri", 
  ];

  const helperOptions = ["Person", "Van", "Car with Tow Bar"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, location: selectedOption?.value || "" }));
  };

  const handleHelperTypeChange = (selectedOption) => {
    setFormData((prev) => ({ ...prev, helperType: selectedOption?.value || "" }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedFiles = [];

    for (const file of files) {
      const fileName = uuidv4() + "_" + file.name; 
      const fileRef = ref(storage, `users/cars/${fileName}`); 

      try {
        const uploadTask = uploadBytesResumable(fileRef, file);
        await uploadTask;
        const downloadURL = await getDownloadURL(fileRef);
        uploadedFiles.push(downloadURL);
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Error uploading image, please try again.");
      }
    }

    setUploadedImages((prevState) => [...prevState, ...uploadedFiles]);
  };

  const removeImage = async (imageURL) => {
    try {
      setUploadedImages((prevState) => prevState.filter((image) => image !== imageURL));

      const imageName = decodeURIComponent(imageURL.split("/o/").pop().split("?")[0]);
      const path = imageName.replace("users%2Fcars%2F", "users/cars/");
      const imageRef = ref(storage, path);

      await deleteObject(imageRef);
      alert("Image removed successfully.");
    } catch (error) {
      console.error("Error removing image from storage:", error);
      alert("Error removing image, please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);

      try {
        await setDoc(
          userRef,
          { ...formData, uploadedImages },
          { merge: true }
        );
        alert("Profile updated successfully!");
        navigate("/profile"); 
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Error updating profile: " + error.message);
      }
    } else {
      alert("User not authenticated. Please sign in.");
    }
  };

  const citySelectOptions = cityOptions.map((city) => ({ value: city, label: city }));
  const helperSelectOptions = helperOptions.map((helper) => ({ value: helper, label: helper }));

  return (
    <div className="app-container" >
      <Navbar />
      <button
        onClick={() => navigate("/profile")}
        className="home-button"
        style={{
          position: "fixed", 
          top: "150px", 
          left: "5px", 
          padding: "5px 5px", 
          fontSize: "12px",
          backgroundColor: "#007bff", 
          color: "white", 
          border: "none", 
          borderRadius: "5px",
          cursor: "pointer",
          width: "100px",
          height: "auto",
        }}
      >
        Home
      </button>
      <div className="profile-container" style={{ marginTop: "140px" }}>
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
              required
            />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location:</label>
            <Select
              options={citySelectOptions}
              value={citySelectOptions.find((option) => option.value === formData.location)}
              onChange={handleLocationChange}
              placeholder="Select location"
              isClearable
              required
            />
          </div>
          <div className="form-group">
            <label>Helper Type:</label>
            <Select
              options={helperSelectOptions}
              value={helperSelectOptions.find((option) => option.value === formData.helperType)}
              onChange={handleHelperTypeChange}
              placeholder="Select helper type"
              isClearable
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add details about your service"
              rows="6"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Upload Images:</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              required
            />
            <div className="image-preview-container">
              {uploadedImages.map((image, index) => (
                <div key={index} className="image-preview">
                  <img src={image} alt={`Preview ${index + 1}`} />
                  <button type="button" onClick={() => removeImage(image)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

SubmitForm.propTypes = {
  cityOptions: PropTypes.arrayOf(PropTypes.string),
  helperOptions: PropTypes.arrayOf(PropTypes.string),
};

export default SubmitForm;
