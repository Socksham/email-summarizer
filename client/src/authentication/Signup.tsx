import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignInButton from "../components/GoogleSigninButton";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function goToLogin() {
    navigate("/login");
  }

  async function loginUser() {
    const auth = getAuth();
  
    try {
      if (email !== "" && password !== "") {
        await signInWithEmailAndPassword(auth, email, password);
        // Sign-in successful, you can perform additional actions if needed
      } else {
        // Handle invalid email or password
        console.error("Email and password are required");
      }
    } catch (error: any) {
      // Handle Firebase Authentication errors
      if (error) {
        switch (error.code) {
          case "auth/user-not-found":
            console.error("User not found");
            break;
          case "auth/wrong-password":
            console.error("Incorrect password");
            break;
          case "auth/invalid-email":
            console.error("Invalid email address");
            break;
          default:
            console.error("Error during sign-in:", error.message);
        }
      } else {
        // Handle non-authentication errors
        console.error("Error during sign-in:", error.message);
      }
    }
  }

  return (
    <div className="h-screen max-h-screen flex items-center justify-center bg-black">
      <div className="border flex flex-row h-full w-full">
        <div className="h-full bg-black w-full flex items-center justify-center">
          <div className="flex flex-col space-y-4 w-4/5 px-48">
            <p className="text-gray-100 text-2xl font-light">Please Enter Your Account Details.</p>
            <div className="w-full flex flex-col space-y-2">
              <p className="text-gray-100 font-light">Email</p>
              <input
                className="py-2 px-4 w-full rounded-md focus:outline focus:outline-4 focus:outline-green-500"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="w-full flex flex-col space-y-2">
              <p className="text-gray-100 font-light">Password</p>
              <input
                className="py-2 px-4 w-full rounded-md focus:outline focus:outline-4 focus:outline-green-500"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button onClick={loginUser} className="px-4 py-2 text-xl bg-green-400 rounded-md text-white">Signup</button>
            <GoogleSignInButton />
            <div className="flex justify-end cursor-pointer" onClick={goToLogin}>
                <p className="text-white underline">Login to an existing account</p>
            </div>
          </div>
        </div>
        <div className="h-full bg-black w-3/5 flex items-center justify-center py-6 px-8">
          <div className="bg-green-400 w-full h-full rounded-3xl p-12 flex flex-col justify-between">
            <div className="flex flex-col space-y-2">
              <div>
                <p className="text-4xl font-semibold text-white">What our users said</p>
                <div className="text-white pl-4 py-2">
                  <p className="text-xl"><span className="font-bold font-mono font-2xl">"</span>I can confidently say that this is the best emailing system around! From its user-friendly interface to its powerful summarization tools, every aspect has been meticulously crafted to enhance productivity.<span className="font-mono font-bold text-2xl">"</span></p>
                </div>
                <div className="flex flex-col space-y-0">
                  <p className="text-white font-semibold text-lg">Joe Black</p>
                  <p className="text-white font-light">Chief Executive Officer at Spotify</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <div className="bg-white px-4 py-2 text-green-500 rounded-md cursor-pointer">
                  Back
                </div>
                <div className="bg-green-900 px-4 py-2 text-white rounded-md cursor-pointer">
                  Next
                </div>
              </div>
            </div>
            <div className="bg-white w-full h-1/3 rounded-3xl p-8">
              <div className="flex flex-col space-y-4">
                <p className="text-2xl">Step into the greatest email system ever created.</p>
                <p>Be among the first to experience unparalleled efficiency, seamless communication, and innovative features that redefine the way you connect.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Signup;
