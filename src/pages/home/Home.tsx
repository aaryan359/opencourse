import Hero from "./sections/Hero"
// import Stats from "./sections/Stats"

import Contributors from "./sections/Contributors"
import CTA from "./sections/CTA"
import Domains from "./sections/Domain"
import Interview from "./sections/Interview"

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Stats /> */}
      <Domains />
      <Interview/>
      <Contributors />
      <CTA />
    </>
  )
}
