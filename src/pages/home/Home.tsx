import Hero from "./sections/Hero";
// import Stats from "./sections/Stats"

import Contributors from "./sections/Contributors";
import CTA from "./sections/CTA";
import Domains from "./sections/Domain";
import { domains } from "../../utils/data";
import Interview from "./sections/Interview";


export default function Home() {
	return (
		<>
			<Hero />
      <div className="flex mx-auto gap-8 p-20 max-w-7xl  ">

        {domains.map((d, i) => (
				<Domains
					key={d.name}
					domain={d}
					index={i}
				/>
			))}
      </div>

     
			
			
			<Interview />
			<Contributors />
			<CTA />
		</>
	);
}
