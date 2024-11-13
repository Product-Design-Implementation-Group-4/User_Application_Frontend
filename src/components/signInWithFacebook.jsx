import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";
import facebookLogo from "../assets/facebook.png"; // Replace with the correct path to your logo

function SignInWithFacebook() {
  function facebookLogin() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (user) {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: user.displayName,
            photo: user.photoURL,
            lastName: "",
          });
          toast.success("User logged in successfully", {
            position: "top-center",
          });
          window.location.href = "/profile";
        }
      })
      .catch((error) => {
        console.error(error.message);
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