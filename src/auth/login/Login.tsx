import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SignInPage, type Testimonial } from "../../components/ui/sign-in";
import { useAuthStore } from "../../store/auth.store";
import type { FormEvent } from "react";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity.",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      await login({ email, password });
      toast.success("Welcome back!");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message || "Login failed. Please try again.");
    }
  };

  return (
    <SignInPage
      title={<span className="font-light text-white tracking-tighter">Welcome Back</span>}
      description="Sign in to continue learning, contributing, and tracking your progress."
      heroImageSrc="https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80"
      testimonials={sampleTestimonials}
      onSignIn={handleSignIn}
      onGoogleSignIn={() => toast.info("Google sign-in is not connected yet.")}
      onResetPassword={() => toast.info("Password reset flow is not connected yet.")}
      onCreateAccount={() => navigate("/register")}
    />
  );
}
