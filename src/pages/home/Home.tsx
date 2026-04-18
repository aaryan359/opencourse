import { useEffect, useState } from "react";
import Hero from "./sections/Hero";

import Contributors from "./sections/Contributors";
import CTA from "./sections/CTA";
import Domains from "./sections/Domain";
import Interview from "./sections/Interview";
import { fieldsApi } from "../../api/courses.api";


export default function Home() {
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    fieldsApi.getAllFields()
      .then((res: any) => setFields(res.data?.data ?? []))
      .catch(() => {});
  }, []);

	return (
		<>
			<Hero />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {fields.slice(0, 4).map((field: any, index: number) => (
          <Domains
            key={field._id}
            domain={{ name: field.name, contributors: field.courseCount ?? 0 }}
            index={index}
          />
        ))}
      </div>

    
			<Interview />
			<Contributors />
			<CTA />
		</>
	);
}
