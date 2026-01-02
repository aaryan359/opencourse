export const DATA = {
  tech: [
    {
      id: "web",
      title: "Web Development",
      courses: [
        {
          id: "react",
          title: "React Fundamentals",
          description: "Build modern React apps with hooks and best practices.",
          level: "Beginner",
          duration: "6 weeks",
          enrolled: 1200,
          miniTopics: [
            { id: "jsx", title: "JSX & Components", videos: 6 },
            { id: "hooks", title: "Hooks", videos: 8 },
            { id: "state", title: "State Management", videos: 7 },
          ],
        },
      ],
    },
  ],

  nonTech: [
    {
      id: "upsc",
      title: "UPSC",
      courses: [
        {
          id: "polity",
          title: "Indian Polity",
          description: "Complete GS-2 Polity coverage.",
          level: "Intermediate",
          duration: "10 weeks",
          enrolled: 540,
          miniTopics: [
            { id: "constitution", title: "Constitution", videos: 12 },
            { id: "parliament", title: "Parliament", videos: 9 },
          ],
        },
      ],
    },
  ],
};
