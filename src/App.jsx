import React from "react";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { useEffect } from "react";






function App() {
  // Refs for all our animated elements
  const titleRef = useRef(null);
  const cricketersButtonRef = useRef(null);
  const cricketerDetailsButtonRef = useRef(null);
  const navLeftRef = useRef(null);
  const navRightRef = useRef(null);

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
      <Navbar ref={{ leftRef: navLeftRef, rightRef: navRightRef }} />
      <div className="text-center mt-40">
        <span ref={titleRef} className="text-5xl text-white font-lexend p-5">
          Welcome to Cricketer's App
        </span>

        <div className="m-5 pb-96 space-x-5">
          <Button ref={cricketersButtonRef} buttonTitle={"Cricketers"} />
          <Button ref={cricketerDetailsButtonRef} buttonTitle={"Cricketers Details"} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;