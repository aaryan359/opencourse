import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/auth.store";
import type { Testimonial } from "../../components/ui/sign-in";

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Nina Patel",
    handle: "@ninabuilds",
    text: "OpenCourse helped me move from beginner to shipping real projects with confidence.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/22.jpg",
    name: "Kevin Ross",
    handle: "@kevincodes",
    text: "Clear learning paths, great contributors, and a community that actually helps.",
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/71.jpg",
    name: "Ava Williams",
    handle: "@avafrontend",
    text: "I joined for interview prep and stayed for the quality content across domains.",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const firstName = String(formData.get("firstName") || "").trim();
    const lastName = String(formData.get("lastName") || "").trim();
    const username = String(formData.get("username") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const title = String(formData.get("title") || "").trim();
    const bio = String(formData.get("bio") || "").trim();
    const avatar = String(formData.get("avatar") || "").trim();
    const skillsInput = String(formData.get("skills") || "").trim();
    const password = String(formData.get("password") || "");
    const confirmPassword = String(formData.get("confirmPassword") || "");
    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!username || !email || !password) {
      toast.error("Username, email, and password are required.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await register({
        username,
        email,
        password,
        profile: {
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          title: title || undefined,
          bio: bio || undefined,
          avatar: avatar || undefined,
          skills: skills.length ? skills : undefined,
        },
      });
      toast.success("Account created! Welcome to OpenCourse.");
      navigate("/");
    } catch (error: any) {
      toast.error(error?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-dvh flex flex-col md:flex-row w-dvw bg-[#050506] text-white">
      <section className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <h1 className="animate-element animate-delay-100 text-4xl md:text-5xl font-semibold leading-tight">
              Create Account
            </h1>
            <p className="animate-element animate-delay-200 text-neutral-400">
              Join OpenCourse and start contributing, learning, and tracking your progress.
            </p>

            <form className="space-y-5" onSubmit={handleRegister}>
              <div className="animate-element animate-delay-300 grid grid-cols-2 gap-3">
                <InputField name="firstName" type="text" label="First Name" placeholder="John" />
                <InputField name="lastName" type="text" label="Last Name" placeholder="Doe" />
              </div>

              <InputField
                name="username"
                type="text"
                label="Username"
                placeholder="Choose a username"
                delayClass="animate-delay-400"
              />

              <InputField
                name="email"
                type="email"
                label="Email Address"
                placeholder="Enter your email address"
                delayClass="animate-delay-500"
              />

              <InputField
                name="title"
                type="text"
                label="Contributor Title"
                placeholder="Frontend Engineer, Data Analyst, etc."
                delayClass="animate-delay-600"
              />

              <InputField
                name="skills"
                type="text"
                label="Skills (comma separated)"
                placeholder="React, Node.js, System Design"
                delayClass="animate-delay-700"
              />

              <InputField
                name="avatar"
                type="url"
                label="Avatar URL (optional)"
                placeholder="https://..."
                delayClass="animate-delay-800"
              />

              <TextAreaField
                name="bio"
                label="Short Bio"
                placeholder="Tell learners what you contribute and your experience."
                delayClass="animate-delay-900"
              />

              <PasswordField
                name="password"
                label="Password"
                placeholder="Create your password"
                show={showPassword}
                setShow={setShowPassword}
                delayClass="animate-delay-600"
              />

              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                show={showConfirmPassword}
                setShow={setShowConfirmPassword}
                delayClass="animate-delay-700"
              />

              <button
                type="submit"
                className="animate-element animate-delay-800 w-full rounded-2xl bg-violet-600 py-4 font-medium text-white hover:bg-violet-500 transition-colors"
              >
                Create Account
              </button>
            </form>

            <p className="animate-element animate-delay-900 text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link to="/login" className="text-violet-400 hover:underline transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="hidden md:block flex-1 relative p-4">
        <div
          className="animate-slide-right animate-delay-300 absolute inset-4 rounded-3xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518770660439-4636190af475?w=2160&q=80)",
          }}
        ></div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
          <TestimonialCard testimonial={sampleTestimonials[0]} delay="animate-delay-1000" />
          <div className="hidden xl:flex">
            <TestimonialCard testimonial={sampleTestimonials[1]} delay="animate-delay-1200" />
          </div>
          <div className="hidden 2xl:flex">
            <TestimonialCard testimonial={sampleTestimonials[2]} delay="animate-delay-1400" />
          </div>
        </div>
      </section>
    </div>
  );
}

function InputField({
  name,
  label,
  type,
  placeholder,
  delayClass,
}: {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  delayClass?: string;
}) {
  return (
    <div className={`animate-element ${delayClass || ""}`}>
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm p-4 rounded-2xl focus:outline-none"
        />
      </div>
    </div>
  );
}

function PasswordField({
  name,
  label,
  placeholder,
  show,
  setShow,
  delayClass,
}: {
  name: string;
  label: string;
  placeholder: string;
  show: boolean;
  setShow: (value: boolean) => void;
  delayClass?: string;
}) {
  return (
    <div className={`animate-element ${delayClass || ""}`}>
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
        <div className="relative">
          <input
            name={name}
            type={show ? "text" : "password"}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm p-4 pr-12 rounded-2xl focus:outline-none"
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute inset-y-0 right-3 flex items-center">
            {show ? (
              <EyeOff className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
            ) : (
              <Eye className="w-5 h-5 text-neutral-400 hover:text-white transition-colors" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial, delay }: { testimonial: Testimonial; delay: string }) {
  return (
    <div className={`animate-testimonial ${delay} flex items-start gap-3 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/10 p-5 w-64`}>
      <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-2xl" alt="avatar" />
      <div className="text-sm leading-snug">
        <p className="flex items-center gap-1 font-medium text-white">{testimonial.name}</p>
        <p className="text-neutral-300">{testimonial.handle}</p>
        <p className="mt-1 text-neutral-200">{testimonial.text}</p>
      </div>
    </div>
  );
}

function TextAreaField({
  name,
  label,
  placeholder,
  delayClass,
}: {
  name: string;
  label: string;
  placeholder: string;
  delayClass?: string;
}) {
  return (
    <div className={`animate-element ${delayClass || ""}`}>
      <label className="text-sm font-medium text-neutral-400">{label}</label>
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-violet-400/70 focus-within:bg-violet-500/10">
        <textarea
          name={name}
          rows={3}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm p-4 rounded-2xl resize-none focus:outline-none"
        />
      </div>
    </div>
  );
}
