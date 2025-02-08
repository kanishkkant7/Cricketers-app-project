import React from "react";
import Button from "./components/Button";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";
import useTitle from "./hooks/useTitle";
import { Link } from "react-router-dom";

function App() {
  // We now only need refs for the title and single button
  const titleRef = useRef(null);
  const cricketersButtonRef = useRef(null);
  const currLocation = useLocation();

  // Title hook remains the same
  useTitle({
    currLocation: location.pathname,
    path: "/",
    docTitle: "Welcome to Cricketer App"
  });

  // Simplified animation timeline for just the title and single button
  useGSAP(() => {
    const timeline = gsap.timeline();
    
    timeline
      // First animate the title fading in
      .from(titleRef.current, {
        opacity: 0,
        duration: 3,
      })
      // Then animate the single button sliding in from the left
      .from(cricketersButtonRef.current, {
        opacity: 0,
        y: 50, // Changed from x to y for a more centered entrance
        duration: 1.5,
        ease: "power2.out"
      });
  });

  return (
    <div className="bg-black">
      <div className="text-center mt-40">
        {/* Title with ref */}
        <span ref={titleRef} className="text-5xl text-white font-lexend p-5">
          Welcome to Cricketer's App
        </span>

        {/* Centered button container */}
        <div className="flex justify-center mt-10 pb-96">
          <Link to="/all-cricketers">
            <Button 
              ref={cricketersButtonRef} 
              buttonTitle="See All Cricketers" 
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;