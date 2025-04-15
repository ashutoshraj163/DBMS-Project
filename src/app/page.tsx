"use client";

import { useState } from "react";
import Image from "next/image";
import RoomBooking from "../components/RoomBooking";

export default function Home() {
  const [bgColor, setBgColor] = useState("bg-white");

  const toggleBgColor = () => {
    setBgColor((prevColor) =>
      prevColor === "bg-white" ? "bg-sky-100" : prevColor === "bg-sky-100" ? "bg-green-100" : "bg-white"
    );
  };

  return (
    <div
      className={`transition-colors duration-300 ${bgColor} min-h-screen`}
    >
      <div className="container mx-auto px-4 pt-24 pb-8 text-center max-w-5xl">
        <h1 className="text-4xl font-extrabold mb-6">Welcome to Our Hotel</h1>
        <Image
          src="https://cdn.pixabay.com/photo/2016/11/29/03/53/hotel-1867766_1280.jpg"
          alt="Hotel Room or Exterior"
          width={800}
          height={400}
          className="rounded-lg shadow-lg mb-8 mx-auto"
        />
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Hello, Next.js with Tailwind CSS!</h2>
          <button onClick={toggleBgColor} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Change Background Color
          </button>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Our Rooms</h2>
          <RoomBooking />
        </section>
      </div>
    </div>
  );
}
