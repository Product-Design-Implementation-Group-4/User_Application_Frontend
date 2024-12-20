import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore";  
import facebookLogo from "../assets/facebook.png";
import { useNavigate } from "react-router-dom";

function SignInWithFacebook() {
  const navigate = useNavigate();

  function facebookLogin() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            toast.success("User logged in successfully", {
              position: "top-center",
            });;
          } else {
            await setDoc(docRef, {
              email: user.email,
              firstName: user.displayName,
              photo: user.photoURL,
              lastName: "",
            });
            toast.success("User logged in successfully", {
              position: "top-center",
            });
          }

          navigate("/profile");
        }
      })
      .catch((error) => {
        console.error("Error during Facebook login:", error.message);
        toast.error(error.message, {
          position: "bottom-center",
        });
      });
  }

  return (
    <div>
      <p className="continue-p">--Or--</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={facebookLogin}
      >
        <img src={facebookLogo} width={"60%"} alt="Facebook Logo" />
      </div>
    </div>
  );
}

export default SignInWithFacebook;
