import CourseCard from "./CourseCard";

export default function CourseList({ domains, type }: any) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {domains.map((d: any) => (
        <CourseCard
          key={d.id}
          course={d}
          href={`/course/${type}/${d.id}`}
        />
      ))}
    </div>
  );
}
