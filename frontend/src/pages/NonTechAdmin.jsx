
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
import { useNavigate } from 'react-router-dom';
    
    const NonTechAdmin = () => {
      const [selectedField, setSelectedField] = useState(null);
    
      const [fields, setFields] = useState({});
      const [user, setUser] = useState(null);
 
      const [error, setError] = useState(null);
   
    const navigate = useNavigate();
    
      const dummyFields = {
        engineering: {
          topics: {
            cse: ['Python', 'Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks'],
            mechanical: ['Thermodynamics', 'Fluid Mechanics', 'Robotics', 'Mechanical Design'],
            electrical: ['Circuit Theory', 'Power Systems', 'Electromagnetics', 'Control Systems'],
            civil: ['Structural Engineering', 'Construction Technology', 'Urban Planning', 'Geotechnical Engineering'],
          },
        },
        medical: {
          topics: {
            anatomy: ['Human Anatomy', 'Pathology', 'Histology', 'Embryology'],
            physiology: ['Exercise Physiology', 'Cardiovascular Physiology', 'Endocrine Physiology', 'Neurophysiology'],
            pharmacology: ['Clinical Pharmacology', 'Pharmacodynamics', 'Toxicology', 'Drug Development'],
            surgery: ['General Surgery', 'Orthopedic Surgery', 'Plastic Surgery', 'Neurosurgery'],
          },
        },
        business: {
          topics: {
            finance: ['Corporate Finance', 'Investment Banking', 'Risk Management', 'Financial Markets'],
            marketing: ['Digital Marketing', 'Brand Management', 'Market Research', 'Advertising Strategies'],
            management: ['Project Management', 'Organizational Behavior', 'Leadership', 'Operations Management'],
            entrepreneurship: ['Startup Strategy', 'Business Models', 'Funding', 'Innovation'],
          },
        },
        law: {
          topics: {
            corporateLaw: ['Contract Law', 'Company Law', 'Corporate Governance', 'Mergers & Acquisitions'],
            criminalLaw: ['Criminal Procedure', 'Forensic Science', 'White Collar Crime', 'Juvenile Justice'],
            intellectualProperty: ['Patent Law', 'Trademark Law', 'Copyright Law', 'Trade Secrets'],
            constitutionalLaw: ['Civil Rights', 'Federalism', 'Judicial Review', 'Freedom of Speech'],
          },
        },
        education: {
          topics: {
            pedagogy: ['Instructional Design', 'Teaching Strategies', 'Curriculum Development', 'Assessment Techniques'],
            specialEducation: ['Learning Disabilities', 'Behavioral Management', 'Inclusion Strategies', 'Autism Spectrum Disorders'],
            edTech: ['Gamification in Education', 'E-learning Platforms', 'AI in Education', 'Blended Learning'],
            higherEducation: ['Academic Research', 'Student Services', 'University Administration', 'Global Education Trends'],
          },
        },
        computerScience: {
          topics: {
            softwareEngineering: ['Agile Methodologies', 'Version Control', 'Software Testing', 'Continuous Integration (CI/CD)'],
            dataScience: ['Data Mining', 'Machine Learning', 'Big Data', 'Data Visualization'],
            cybersecurity: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Incident Response'],
            artificialIntelligence: ['Neural Networks', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning'],
          },
        },
        environmentalScience: {
          topics: {
            ecology: ['Ecosystem Dynamics', 'Biodiversity Conservation', 'Climate Change', 'Wildlife Protection'],
            renewableEnergy: ['Solar Energy', 'Wind Energy', 'Hydropower', 'Geothermal Energy'],
            wasteManagement: ['Recycling Technologies', 'Hazardous Waste Management', 'Composting', 'Landfill Management'],
            environmentalPolicy: ['Sustainable Development', 'Environmental Law', 'Green Energy Policies', 'Carbon Footprint'],
          },
        },
        arts: {
          topics: {
            visualArts: ['Painting', 'Sculpture', 'Art History', 'Photography'],
            performingArts: ['Theater', 'Dance', 'Music Composition', 'Stagecraft'],
            filmStudies: ['Film Theory', 'Screenwriting', 'Cinematography', 'Post-production'],
            design: ['Graphic Design', 'Fashion Design', 'Interior Design', 'Product Design'],
          },
        },
        humanities: {
          topics: {
            history: ['Ancient Civilizations', 'Modern History', 'Renaissance Era', 'World Wars'],
            philosophy: ['Ethics', 'Existentialism', 'Political Philosophy', 'Epistemology'],
            literature: ['Classical Literature', 'Modern Fiction', 'Poetry Analysis', 'Literary Criticism'],
            sociology: ['Social Theory', 'Cultural Sociology', 'Gender Studies', 'Social Movements'],
          },
        },
        economics: {
          topics: {
            microeconomics: ['Supply and Demand', 'Market Structures', 'Consumer Theory', 'Game Theory'],
            macroeconomics: ['National Income', 'Inflation', 'Unemployment', 'Monetary Policy'],
            internationalEconomics: ['Global Trade', 'Foreign Exchange Markets', 'Globalization', 'Balance of Payments'],
            developmentEconomics: ['Economic Growth', 'Poverty Reduction', 'Sustainable Development', 'Inequality'],
          },
        },
      };
      
      
    
      const dummyUser = { name: 'meena' };
     
    
      useEffect(() => {

        const fetchFields = () => setFields(dummyFields);

        const fetchUser = () => setUser(dummyUser);

        fetchFields();
        fetchUser();
        
      }, []);

      const handleFieldClick = (field) => {
        const fieldData = fields[field]; // Get the data for the clicked field
    navigate(`/nontech/${field}`, { state: { topics: fieldData.topics } }); // Pass the topics object in state
      };
    
     
      return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-md">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>
    
         
    
          {user ? (
            <>
              <p className="text-lg mb-4">Welcome, <span className="font-semibold">{user.name}</span>!</p>
    
            
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {Object.keys(fields).map((field) => (
                    <button
                      key={field}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
                      onClick={() => handleFieldClick(field)}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </button>
                  ))}
                </div>
            
    
            </>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      );
    };
    
    export default NonTechAdmin;
    