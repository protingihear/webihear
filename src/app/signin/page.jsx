import React from "react";
import Head from "next/head";

export default function SignInPage() {
  return (
    <>
      {/* Metadata */}
      <Head>
        <title>Sign In - IHear</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sign in to IHear - Let’s Auth Your Self!" />
      </Head>

      {/* Sign In Page */}
      <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/assets/images/background_hijau.jpg')" }}>
        
        {/* Container */}
        <div className="bg-white/85 rounded-xl shadow-md p-10 w-full max-w-lg">
          <form className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800">Hello Bung!</h2>
              <p className="text-sm text-gray-600 mt-2">Welcome to IHear - Let’s Auth Your Self !!</p>
              <hr className="border-gray-400 my-4" />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Masukkan email"
                required
                className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Masukkan password"
                required
                className="w-full px-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
              />
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Sign In
              </button>
            </div>

            {/* Footer Links */}
            <div className="text-center text-sm text-gray-600">
              <p>
                Don’t have an account?{" "}
                <a href="/signup" className="text-blue-600 font-bold hover:underline">
                  Sign Up
                </a>
              </p>
            </div>

            {/* App Name */}
            <div className="text-center">
              <p id="name-apps" className="text-green-700 text-2xl font-bold mt-4">IHear</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
