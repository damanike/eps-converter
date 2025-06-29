import React, { useState } from "react"

export default function App() {
  const [message, setMessage] = useState("Drop your EPS files here");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white shadow rounded text-center">
        <h1 className="text-2xl font-bold text-indigo-600 mb-4">EPS Converter Pro</h1>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
