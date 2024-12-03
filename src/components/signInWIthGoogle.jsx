import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore"; 
import googleLogo from "../assets/google.png";
import { useNavigate } from "react-router-dom";

function SignInwithGoogle() {
  const navigate = useNavigate();

  async function googleLogin() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          toast.success("User logged in successfully", {
            position: "top-center",
          });
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
    } catch (error) {
      console.error("Error during Google login:", error);
      toast.error("Failed to log in with Google.");
    }
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
