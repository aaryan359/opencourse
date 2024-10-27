

const StartPrep = () => {

    return(
         <div className=' flex flex-col  p-5 '>
                     <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Start Prep Section</h1>
                    
                  
                  <div   className=" gap-5 flex flex-wrap justify-start bg-white p-8 rounded shadow-md mb-6  mx-auto" >

                      {/* Button to Show All Questions */}

                      
   
                    
                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Technology/Skills</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Industry/Domain</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Company</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Job Role</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Question Type</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Difficulty Level</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="interviewType">By Experience Level</label>
                  <select
                      // name="ExperienceLevel"
                      // id="ExperienceLevel"
                      // value={formData.ExperienceLevel}
                      // onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      <option value="Fresher">Fresher</option>
                      <option value="1-5">1-3 years of Experienced</option>
                      <option value="5+">5+ years of Experience</option>
                  </select>
                  </div>

                     
                   <div className=" flex justify-center items-center ">
                 <div className="  h-10 cursor-pointer  rounded bg-orange-500 hover:bg-orange-600  text-white p-2 m-0  flex justify-center items-center " > Show Questions</div>
                 </div>
                  </div>
                  

         </div>
    )
      
};

export default StartPrep;
