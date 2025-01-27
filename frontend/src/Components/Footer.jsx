import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 py-8">
      <div className="container mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            OPEN <span className="text-indigo-400">COURSE</span>
          </h2>
          <p className="mt-3 text-sm">
            To conquerer the  fear of placement.
          </p>
        </div>

        {/* Middle Section - Quick Links and Legal */}
        <div className="grid grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 ">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/userpanel" className="hover:text-indigo-400 transition-colors">
                  Courses
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  Terms of use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                    Contribute Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section - Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">GET IN TOUCH</h3>
          <div className="flex items-center">
            <span className="text-xl ">📧</span>
            <a
              href=" aaryanmeena96@gmail.com"
              className="hover:text-indigo-400 transition-colors"
            >
              aaryanmeena96@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p className="text-sm">
          Copyright © 2024 Open course Pvt Ltd. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer