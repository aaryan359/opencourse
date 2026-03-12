/**
 * Comprehensive DB Seed Script
 * Populates Fields, Courses, Topics, Videos, InterviewQuestions, and an admin user
 * Run: cd server && npx ts-node src/seed.ts
 */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// ─── Import models ───────────────────────────────────────────────────────────
import { Field } from "./models/Field";
import { Course } from "./models/Course";
import { Topic } from "./models/Topic";
import { Video } from "./models/Video";
import { User } from "./models/User";
import { InterviewQuestion } from "./models/InterviewQuestion";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/opencourse";

// ─── Seed Data ────────────────────────────────────────────────────────────────

const FIELDS = [
  {
    name: "Web Development",
    slug: "web-development",
    description: "Build modern websites and web applications from front to back.",
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Analyze data, build models, and extract meaningful insights.",
  },
  {
    name: "Design",
    slug: "design",
    description: "Master UI/UX and visual design principles for digital products.",
  },
  {
    name: "DevOps & Cloud",
    slug: "devops-cloud",
    description: "Automate, deploy, and scale applications in the cloud.",
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    description: "Build intelligent systems with deep learning and AI.",
  },
  {
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Create cross-platform and native mobile apps for iOS and Android.",
  },
];

const COURSES_BY_FIELD: Record<
  string,
  { title: string; slug: string; description: string; level: string; thumbnail?: string }[]
> = {
  "web-development": [
    {
      title: "React Fundamentals",
      slug: "react-fundamentals",
      description:
        "Learn the core concepts of React including hooks, state, props, context and routing.",
      level: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    },
    {
      title: "Advanced Node.js",
      slug: "advanced-nodejs",
      description:
        "Deep-dive into Node.js — streams, clusters, performance, authentication, and REST APIs.",
      level: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    },
    {
      title: "Full Stack with Next.js",
      slug: "fullstack-nextjs",
      description:
        "Ship production-grade full-stack web apps using Next.js 14, Prisma, and PostgreSQL.",
      level: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800",
    },
  ],
  "data-science": [
    {
      title: "Python for Data Science",
      slug: "python-data-science",
      description:
        "Master NumPy, Pandas, Matplotlib and Seaborn for data analysis and visualization.",
      level: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    },
    {
      title: "Statistical Analysis",
      slug: "statistical-analysis",
      description:
        "Understand probability, hypothesis testing, regression, and statistical inference.",
      level: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    },
  ],
  "design": [
    {
      title: "UI Design with Figma",
      slug: "ui-design-figma",
      description:
        "Design beautiful, accessible interfaces with Figma — from wireframes to prototypes.",
      level: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
    },
    {
      title: "Design Systems at Scale",
      slug: "design-systems",
      description:
        "Build and maintain scalable design systems with tokens, components, and documentation.",
      level: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800",
    },
  ],
  "devops-cloud": [
    {
      title: "Docker & Kubernetes",
      slug: "docker-kubernetes",
      description:
        "Containerize applications and orchestrate deployments with Docker and Kubernetes.",
      level: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800",
    },
    {
      title: "AWS Cloud Practitioner",
      slug: "aws-cloud",
      description:
        "Learn core AWS services — EC2, S3, Lambda, RDS, IAM — and pass the Cloud Practitioner exam.",
      level: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
    },
  ],
  "machine-learning": [
    {
      title: "Machine Learning Fundamentals",
      slug: "ml-fundamentals",
      description:
        "Understand supervised, unsupervised, and reinforcement learning with scikit-learn.",
      level: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    },
    {
      title: "Deep Learning with PyTorch",
      slug: "deep-learning-pytorch",
      description:
        "Build neural networks, CNNs, RNNs, and Transformers using PyTorch from scratch.",
      level: "advanced",
      thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
    },
  ],
  "mobile-development": [
    {
      title: "React Native Essentials",
      slug: "react-native-essentials",
      description:
        "Build cross-platform iOS and Android apps using React Native and Expo.",
      level: "beginner",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
    },
    {
      title: "Flutter Development",
      slug: "flutter-development",
      description:
        "Create beautiful, natively compiled apps for mobile, web, and desktop with Flutter & Dart.",
      level: "intermediate",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800",
    },
  ],
};

const TOPICS_BY_COURSE: Record<string, { title: string; order: number }[]> = {
  "react-fundamentals": [
    { title: "Introduction to React & JSX", order: 1 },
    { title: "Components, Props & State", order: 2 },
    { title: "React Hooks Deep Dive", order: 3 },
    { title: "React Router & Navigation", order: 4 },
    { title: "State Management with Context", order: 5 },
  ],
  "advanced-nodejs": [
    { title: "Node.js Event Loop & Streams", order: 1 },
    { title: "Building RESTful APIs with Express", order: 2 },
    { title: "Authentication with JWT", order: 3 },
    { title: "Database Integration with MongoDB", order: 4 },
    { title: "Performance & Clustering", order: 5 },
  ],
  "fullstack-nextjs": [
    { title: "Next.js App Router Overview", order: 1 },
    { title: "Server Components & Actions", order: 2 },
    { title: "Database with Prisma & PostgreSQL", order: 3 },
    { title: "Auth with NextAuth.js", order: 4 },
    { title: "Deployment to Vercel", order: 5 },
  ],
  "python-data-science": [
    { title: "Python Refresher for Data Science", order: 1 },
    { title: "NumPy & Array Operations", order: 2 },
    { title: "Pandas for Data Analysis", order: 3 },
    { title: "Data Visualization with Matplotlib", order: 4 },
  ],
  "statistical-analysis": [
    { title: "Probability Theory", order: 1 },
    { title: "Descriptive Statistics", order: 2 },
    { title: "Hypothesis Testing", order: 3 },
    { title: "Linear Regression", order: 4 },
  ],
  "ui-design-figma": [
    { title: "Figma Interface & Basics", order: 1 },
    { title: "Typography & Color Systems", order: 2 },
    { title: "Component Library Setup", order: 3 },
    { title: "Prototyping & Animations", order: 4 },
  ],
  "design-systems": [
    { title: "Design Tokens & Variables", order: 1 },
    { title: "Component Architecture", order: 2 },
    { title: "Documentation with Storybook", order: 3 },
  ],
  "docker-kubernetes": [
    { title: "Docker Basics & Containers", order: 1 },
    { title: "Docker Compose", order: 2 },
    { title: "Kubernetes Architecture", order: 3 },
    { title: "Deploying to a Cluster", order: 4 },
  ],
  "aws-cloud": [
    { title: "AWS Global Infrastructure", order: 1 },
    { title: "EC2 & S3 Fundamentals", order: 2 },
    { title: "IAM & Security", order: 3 },
    { title: "Lambda & Serverless", order: 4 },
  ],
  "ml-fundamentals": [
    { title: "What is Machine Learning?", order: 1 },
    { title: "Supervised Learning Algorithms", order: 2 },
    { title: "Model Evaluation & Metrics", order: 3 },
    { title: "Unsupervised Learning", order: 4 },
  ],
  "deep-learning-pytorch": [
    { title: "PyTorch Tensors & Autograd", order: 1 },
    { title: "Building Neural Networks", order: 2 },
    { title: "Convolutional Neural Networks", order: 3 },
    { title: "Training & Optimisation", order: 4 },
  ],
  "react-native-essentials": [
    { title: "React Native Setup with Expo", order: 1 },
    { title: "Core Components & StyleSheet", order: 2 },
    { title: "Navigation with Expo Router", order: 3 },
    { title: "Fetching Data & APIs", order: 4 },
  ],
  "flutter-development": [
    { title: "Dart Language Fundamentals", order: 1 },
    { title: "Flutter Widgets & Layouts", order: 2 },
    { title: "State Management with Provider", order: 3 },
    { title: "Building & Publishing Your App", order: 4 },
  ],
};

const INTERVIEW_QUESTIONS = [
  {
    company: "Google",
    role: "Frontend Engineer",
    isAnonymous: true,
    status: "approved",
    qaPairs: [
      {
        question: "What is the difference between `let`, `const`, and `var` in JavaScript?",
        answer:
          "`var` is function-scoped and hoisted; `let` and `const` are block-scoped. `const` cannot be reassigned after declaration. Prefer `const` by default, use `let` when re-assignment is needed.",
        difficulty: "easy",
      },
      {
        question: "Explain how the virtual DOM works in React.",
        answer:
          "React maintains a lightweight copy of the real DOM in memory (virtual DOM). When state changes, React diffs the new virtual DOM against the previous snapshot using a reconciliation algorithm and applies only the minimal set of real DOM mutations.",
        difficulty: "medium",
      },
    ],
  },
  {
    company: "Amazon",
    role: "Full Stack Engineer",
    isAnonymous: true,
    status: "approved",
    qaPairs: [
      {
        question: "What is closure in JavaScript?",
        answer:
          "A closure is a function that retains access to variables from its outer lexical scope even after that outer function has returned. This is fundamental to patterns like module pattern, currying, and memoization.",
        difficulty: "medium",
      },
      {
        question: "How does the Node.js event loop work?",
        answer:
          "Node.js has a single-threaded event loop that processes callbacks from the call stack, microtask queue (Promises), and macro-task queue (setTimeout, I/O). Phases: timers → pending callbacks → idle/prepare → poll → check (setImmediate) → close callbacks.",
        difficulty: "hard",
      },
    ],
  },
  {
    company: "Microsoft",
    role: "Backend Engineer",
    isAnonymous: false,
    status: "approved",
    qaPairs: [
      {
        question: "Explain database indexing and when to use it.",
        answer:
          "An index is a data structure (usually a B-tree) that speeds up query lookups by avoiding full-table scans. Use indexes on frequently queried columns, join keys, and columns used in ORDER BY / WHERE. Avoid over-indexing — each index slows down writes.",
        difficulty: "medium",
      },
      {
        question: "What is the difference between SQL JOINs?",
        answer:
          "INNER JOIN returns matching rows from both tables. LEFT JOIN returns all rows from the left + matched rows from right (NULLs for unmatched). RIGHT JOIN is the reverse. FULL OUTER JOIN returns all rows with NULLs where matches don't exist.",
        difficulty: "easy",
      },
    ],
  },
  {
    company: "Meta",
    role: "Frontend Engineer",
    isAnonymous: true,
    status: "approved",
    qaPairs: [
      {
        question: "What's the difference between useMemo and useCallback?",
        answer:
          "`useMemo` memoizes a computed value; `useCallback` memoizes a function reference. Both take a dependency array and recompute only when deps change. Use `useMemo` when a computation is expensive; use `useCallback` when passing stable function references to child components.",
        difficulty: "medium",
      },
    ],
  },
  {
    company: "Netflix",
    role: "Senior Engineer",
    isAnonymous: true,
    status: "approved",
    qaPairs: [
      {
        question: "Explain CAP theorem.",
        answer:
          "In a distributed system you can guarantee at most 2 of: Consistency (every read gets the latest write), Availability (every request gets a non-error response), Partition Tolerance (system continues despite network splits). Since partitions are inevitable, you trade off between CP (MongoDB, HBase) and AP (DynamoDB, Cassandra).",
        difficulty: "hard",
      },
    ],
  },
  {
    company: "Stripe",
    role: "Backend Engineer",
    isAnonymous: false,
    status: "approved",
    qaPairs: [
      {
        question: "How do you handle idempotency in payment APIs?",
        answer:
          "Use idempotency keys — a unique client-supplied key per request. The server stores the result of the first request; subsequent requests with the same key return the cached result without re-processing. This prevents duplicate charges on retries.",
        difficulty: "hard",
      },
    ],
  },
  {
    company: "Airbnb",
    role: "Data Scientist",
    isAnonymous: true,
    status: "approved",
    qaPairs: [
      {
        question: "Explain the bias-variance tradeoff.",
        answer:
          "Bias is error from overly simple models (underfitting); variance is error from models too sensitive to training data (overfitting). As model complexity increases, bias decreases but variance increases. The goal is to find the sweet spot that minimizes total error = bias² + variance + irreducible noise.",
        difficulty: "medium",
      },
    ],
  },
];

// ─── Main Seed Function ────────────────────────────────────────────────────────

async function seed() {
  console.log("🌱 Connecting to MongoDB...");
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected");

  // ── Clear existing data ──────────────────────────────────────────────────────
  console.log("🗑  Clearing existing data...");
  await InterviewQuestion.deleteMany({});
  await Video.deleteMany({});
  await Topic.deleteMany({});
  await Course.deleteMany({});
  await Field.deleteMany({});
  await User.deleteMany({ role: { $in: ["admin", "student"] } });
  console.log("✅ Cleared");

  // ── Create admin user ────────────────────────────────────────────────────────
  console.log("👤 Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await User.create({
    email: "admin@opencourse.dev",
    username: "admin",
    password: "admin123", // will hash via pre-save hook
    role: "admin",
    profile: { firstName: "Admin", lastName: "User" },
  });
  console.log("✅ Admin created:", admin.email);

  // Create a demo student
  const student = await User.create({
    email: "demo@opencourse.dev",
    username: "demostudent",
    password: "demo123",
    role: "student",
    profile: { firstName: "Demo", lastName: "Student" },
  });
  console.log("✅ Demo student created:", student.email);

  // ── Create Fields ────────────────────────────────────────────────────────────
  console.log("📂 Creating fields...");
  const fieldDocs: Record<string, any> = {};
  for (const f of FIELDS) {
    const doc = await Field.create(f);
    fieldDocs[f.slug] = doc;
    console.log("   Field:", doc.name);
  }

  // ── Create Courses ────────────────────────────────────────────────────────────
  console.log("📚 Creating courses...");
  const courseDocs: Record<string, any> = {};
  for (const [fieldSlug, courses] of Object.entries(COURSES_BY_FIELD)) {
    const fieldDoc = fieldDocs[fieldSlug];
    if (!fieldDoc) continue;
    for (const c of courses) {
      const doc = await Course.create({ ...c, field: fieldDoc._id, isPublished: true });
      courseDocs[c.slug] = doc;
      console.log("   Course:", doc.title);
    }
  }

  // ── Create Topics ─────────────────────────────────────────────────────────────
  console.log("📌 Creating topics...");
  const topicDocs: Record<string, any> = {};
  for (const [courseSlug, topics] of Object.entries(TOPICS_BY_COURSE)) {
    const courseDoc = courseDocs[courseSlug];
    if (!courseDoc) continue;
    for (const t of topics) {
      const doc = await Topic.create({ ...t, course: courseDoc._id });
      topicDocs[`${courseSlug}:${t.order}`] = doc;
      console.log("   Topic:", doc.title);
    }
  }

  // ── Seed interview questions ──────────────────────────────────────────────────
  console.log("❓ Seeding interview questions...");
  for (const q of INTERVIEW_QUESTIONS) {
    await InterviewQuestion.create(q);
    console.log("   IQ:", q.company, "-", q.role);
  }

  console.log("\n🎉 Seed complete!\n");
  console.log("Admin login:  admin@opencourse.dev / admin123");
  console.log("Student login: demo@opencourse.dev / demo123");

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
