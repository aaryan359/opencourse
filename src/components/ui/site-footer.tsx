"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";
import { FooterBackgroundGradient, TextHoverEffect } from "./hover-footer";

function SiteFooter() {
  const footerLinks = [
    {
      title: "About Us",
      links: [
        { label: "Company History", href: "/about#company-history" },
        { label: "Meet the Team", href: "/about#meet-the-team" },
        { label: "Careers", href: "/about#careers" },
      ],
    },
    {
      title: "Helpful Links",
      links: [
        { label: "FAQs", href: "/about#faqs" },
        { label: "Support", href: "/about#support" },
        {
          label: "Live Chat",
          href: "#",
          pulse: false,
        },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "aaryanmeena96@gmail.com",
      href: "mailto:aaryanmeena96@gmail.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "+91 9799819141",
      href: "tel:+919799819141",
    },
    {
      icon: <MapPin size={18} className="text-[#3ca2fa]" />,
      text: "India",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11]/10 relative h-fit rounded-3xl overflow-hidden max-w-7xl w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] mx-auto my-8 text-neutral-300">
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#3ca2fa] text-3xl font-extrabold">&hearts;</span>
              <span className="text-white text-3xl font-bold">OpenCourse</span>
            </div>
            <p className="text-sm leading-relaxed">
              OpenCourse is a modern learning platform for community-driven courses and interview prep.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a href={link.href} className="hover:text-[#3ca2fa] transition-colors">
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-0 -right-2.5 w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-white text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </a>
                  ) : (
                    <span className="hover:text-[#3ca2fa] transition-colors">{item.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="hover:text-[#3ca2fa] transition-colors">
                {icon}
              </a>
            ))}
          </div>

          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} OpenCourse. All rights reserved.</p>
        </div>
      </div>

      <div className="lg:flex hidden h-120 -mt-52 -mb-36 overflow-hidden">
        <TextHoverEffect text="OpenCourse" className="z-50 w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default SiteFooter;
