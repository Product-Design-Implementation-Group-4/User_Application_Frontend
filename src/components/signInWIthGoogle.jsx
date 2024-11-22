import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore"; 
import googleLogo from "../assets/google.png";
import { useNavigate } from "react-router-dom";

function SignInwithGoogle() {
  const navigate = useNavigate();

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      const user = result.user;
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
          toast.success("User data updated successfully", {
            position: "top-center",
          });
        } else {
          await setDoc(docRef, {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "", 
          });
          toast.success("User logged in Successfully", {
            position: "top-center",
          });
        }

        navigate("/profile");
      }
    }).catch((error) => {
      console.error("Error during Google login:", error);
    });
  }

  return (
    <div>
      <p className="continue-p">--Or--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img src={googleLogo} width={"60%"} />
      </div>
    </div>
  );
}

export default SignInwithGoogle;