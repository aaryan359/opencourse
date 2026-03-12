import { useEffect, useState } from "react";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats"

import Contributors from "./sections/Contributors";
import CTA from "./sections/CTA";
import Domains from "./sections/Domain";
import Interview from "./sections/Interview";
import { fieldsApi } from "../../api/courses.api";


export default function Home() {
  const [fields, setFields] = useState<any[]>([]);

  useEffect(() => {
    fieldsApi.listFields()
      .then((res: any) => setFields(res.data?.data ?? []))
      .catch(() => {});
  }, []);

	return (
		<>
			<Hero />
      <div className="flex flex-wrap mx-auto gap-8 p-20 max-w-7xl">
        {fields.map((field: any) => (
          <Domains
            key={field._id}
            domain={{ name: field.name, contributors: field.courseCount ?? 0 }}
            index={0}
          />
        ))}
      </div>

     
			
			<Stats/>
			<Interview />
			<Contributors />
			<CTA />
		</>
	);
}
