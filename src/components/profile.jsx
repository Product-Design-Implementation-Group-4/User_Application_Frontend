import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { deleteObject, ref, getMetadata } from "firebase/storage";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import Navbar from "./Navbar";
import ProfileForm from "./profileForm";
import "../App.css";
import "../index.css";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    helperType: "",
    description: "",
  });



  const cities = [
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

  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserDetails(data);
            setFormData({
              name: data.name || "",
              email: data.email || user.email,
              phone: data.phone || "",
              location: data.location || "",
              helperType: data.helperType || "",
              description: data.description || "",
            });
          } else {
            alert("No user data found in Firestore.");
          }
        } catch (error) {
          alert(`Error fetching user data: ${error.message}`);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleReauthentication = async () => {
    const user = auth.currentUser;
    if (user) {
      const password = prompt("Please enter your password to confirm deletion:");
      if (!password) {
        alert("Reauthentication cancelled.");
        return false;
      }

      try {
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
        return true;
      } catch (error) {
        alert(`Reauthentication failed: ${error.message}`);
        return false;
      }
    }
    return false;
  };

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmed) return;

    try {
      const userDocRef = doc(db, "Users", user.uid);
      await deleteDoc(userDocRef);

      if (userDetails.photo) {
        const photoRef = ref(storage, `profile_pictures/${user.uid}`);
        try {
          await getMetadata(photoRef);
          await deleteObject(photoRef);
        } catch (error) {
          if (error.code !== "storage/object-not-found") {
            throw error;
          }
        }
      }

      await user.delete();

      alert("Account deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert("Session expired. Please reauthenticate to delete your account.");
        const reauthenticated = await handleReauthentication();
        if (reauthenticated) {
          handleDeleteAccount();
        }
      } else {
        alert(`Error deleting account: ${error.message}`);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (auth.currentUser) {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      try {
        await setDoc(userRef, formData, { merge: true });
        alert("Profile updated successfully!");
      } catch (error) {
        alert(`Error updating profile: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert("User logged out successfully!");
      window.location.href = "/login";
    } catch (error) {
      alert(`Error logging out: ${error.message}`);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <Navbar userDetails={userDetails} handleLogout={handleLogout} handleDeleteAccount={handleDeleteAccount} />
      <div className="profile-container">
        <ProfileForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cityOptions={cities}
          helperOptions={helperOptions}
          handleImageUpload={handleImageUpload}
          uploadedImages={uploadedImages}
          removeImage={removeImage}
        />
      </div>
    </div>
  );
}

export default Profile;