// App.jsx
import React from "react";
import Button from "./components/Button";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import useTitle from "./hooks/useTitle";
import { Link } from "react-router-dom";




function App() {
  // Refs for all our animated elements
  const titleRef = useRef(null);
  const cricketersButtonRef = useRef(null);
  const cricketerDetailsButtonRef = useRef(null);
  const navLeftRef = useRef(null);
  const navRightRef = useRef(null);
  // To check current location
  const currLocation = useLocation();

  useTitle({
    currLocation: location.pathname,  
    path: "/",                        
    docTitle: "Welcome to Cricketer App"  
  });
  


  useGSAP(() => {
    const timeline = gsap.timeline();
    
    timeline
      // First animation: title fades in
      .from(titleRef.current, {
        opacity: 0,
        duration: 3,
      })
      // Then animate left side elements together
      .from([cricketersButtonRef.current, navLeftRef.current], {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: "power2.out"
      })
      // Finally animate right side elements together
      .from([cricketerDetailsButtonRef.current, navRightRef.current], {
        opacity: 0,
        x: 100,
        duration: 1.5,
        ease: "power2.out"
      }, "<"); // The "<" makes this animation start at the same time as the previous one

  });

  return (
    <div className="bg-black">
      <div className="text-center mt-40">
        <span ref={titleRef} className="text-5xl text-white font-lexend p-5">
          Welcome to Cricketer's App
        </span>

        <div className="m-5 pb-96 space-x-5">
        <Link to="/all-cricketers">
          <Button ref={cricketersButtonRef} buttonTitle={"See All Cricketers"} />
          </Link>
          <Button ref={cricketerDetailsButtonRef} buttonTitle={"Cricketers Details"} />
        </div>
      </div>
    </div>
  );
}

export default App;