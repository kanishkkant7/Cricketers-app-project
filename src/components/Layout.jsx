// components/Layout.jsx 
// A better approach to abstraction
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Outlet } from "react-router-dom";
function Layout({ children }) {
  const navLeftRef = useRef(null);
  const navRightRef = useRef(null);

  //Animation hooks
  useGSAP(() => {
    const timeline = gsap.timeline();
    
    // Animate
    timeline
      .from(navLeftRef.current, {
        opacity: 0,
        x: -100,
        duration: 1.5,
        ease: "power2.out"
      })
      .from(navRightRef.current, {
        opacity: 0,
        x: 100,
        duration: 1.5,
        ease: "power2.out"
      }, "<");
  });

  return (
    <div className="bg-black">
      <Navbar ref={{ leftRef: navLeftRef, rightRef: navRightRef }} />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Layout;