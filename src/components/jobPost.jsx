import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; 
import NavbarHome from "./NavbarHome";
import "./JobPost.css";

function JobPost() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    helperType: "",
    description: "",
  });

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
  const navigate = useNavigate();

  const helperOptions = ["Person Only", "Person With Van", "Person with Car with Tow Bar"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption?.value || "" });
  };

  const handleHelperTypeChange = (selectedOption) => {
    setFormData({ ...formData, helperType: selectedOption?.value || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Jobs"), {
        ...formData,
        createdAt: new Date(),
      });
      alert("Job posted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        helperType: "",
        description: "",
      });
      navigate("/jobs");
    } catch (error) {
      alert(`Error posting job: ${error.message}`);
    }
  };

  const citySelectOptions = cityOptions.map((city) => ({ value: city, label: city }));
  const helperSelectOptions = helperOptions.map((helper) => ({ value: helper, label: helper }));

  return (
    <div>
      <NavbarHome />
      <h1>Post a Job</h1>
      <div className="form-container">
        
        <form onSubmit={handleSubmit} className="job-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={{   
                width: "550px", 
              }}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              placeholder="Enter your phone number"
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
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobPost;
