import React from 'react'
import { FiBookOpen } from "react-icons/fi";
import { PiStudentBold } from "react-icons/pi";
import { Link } from 'react-router-dom';


const EducationCardnon = ({field} ) => {
                  
 
  return (
    <div
                  
                     className= " mt-6 group cursor-pointer bg-[#fa6b6b33] hover:bg-[#fa6b6b]  duration-200 w-[250px]  flex flex-col justify-evenly items-start  opacity-0.5 text-white py-6 px-6 gap-4  rounded-xl  transition-transform transform  hover:no-underline hover:text-white focus:outline-none"
              >          
                      <span className=" flex justify-start items-start relative " >
                            <svg 
   width="54"
   height="54"
   viewBox="0 0 64 64"
   fill="none"
   xmlns="http://www.w3.org/2000/svg"
   >
   <path
   d="M59.4953 32.0006C72.1292 7.29788 56.6698 -8.11304 31.9995 4.5047C7.29678 -8.12918 -8.11414 7.33017 4.5036 32.0006C-8.13028 56.7032 7.33714 72.1141 31.9995 59.4964C56.7021 72.1303 72.113 56.6629 59.4953 32.0006Z"
   fill="#f98080"
   />
                             </svg>
   
                            <svg  className=" absolute top-0 bottom-0 left-0 right-0 m-auto" xmlns="http://www.w3.org/2000/svg" 
   width="36" height="36" 
   viewBox="0 0 36 36" fill="none">
                             <path fillRule="evenodd" clipRule="evenodd" d="M25.93 5.6047C25.5536 5.77453 25.0509 6.04767 24.3049 6.45434C22.0055 7.70783 18.9051 9.11729 16.125 9.34365V20.6564C18.9051 20.8828 22.0055 22.2922 24.3049 23.5457C25.0509 23.9524 25.5536 24.2255 25.93 24.3954C26.1895 24.5125 26.3055 24.5393 26.332 24.5459C26.4266 24.53 26.4762 24.4999 26.5357 24.4231C26.5429 24.3976 26.573 24.2916 26.5935 24.0327C26.6241 23.6474 26.625 23.1136 26.625 22.3106V7.68947C26.625 6.88651 26.6241 6.35266 26.5935 5.96741C26.573 5.70847 26.5429 5.60252 26.5357 5.57698C26.4762 5.50017 26.4266 5.47009 26.332 5.45413C26.3056 5.4608 26.1895 5.48763 25.93 5.6047ZM28.875 8.72399V7.64165C28.875 6.89921 28.875 6.27464 28.8365 5.7892C28.7995 5.32386 28.7169 4.75789 28.385 4.29383C27.942 3.67465 27.3248 3.30813 26.5691 3.21558C25.9941 3.14515 25.4397 3.35751 25.0046 3.5538C24.5413 3.76286 23.9635 4.07784 23.269 4.45645L23.228 4.47881C20.7355 5.83755 17.7149 7.12504 15.375 7.12504H9.75C5.40076 7.12504 1.875 10.6508 1.875 15C1.875 17.5166 3.05539 19.7574 4.8927 21.199C4.89715 21.2237 4.90244 21.2483 4.90859 21.2729L7.28079 30.7617C7.33718 30.9874 7.38098 31.1628 7.43537 31.3234C7.96316 32.8816 9.36638 33.9772 11.0061 34.1113C11.175 34.1251 11.3558 34.1251 11.5885 34.125L11.6307 34.125C11.649 34.125 11.667 34.125 11.6848 34.1251C11.9748 34.1251 12.1982 34.1252 12.3982 34.1058C14.3615 33.9154 15.9153 32.3616 16.1057 30.3983C16.1251 30.1982 16.1251 29.9748 16.125 29.6848L16.125 22.9154C18.3369 23.1433 20.9944 24.3037 23.228 25.5213L23.2689 25.5436C23.9635 25.9222 24.5413 26.2372 25.0046 26.4463C25.4397 26.6426 25.9941 26.8549 26.5691 26.7845C27.3248 26.692 27.942 26.3254 28.385 25.7063C28.7169 25.2422 28.7995 24.6762 28.8365 24.2109C28.875 23.7254 28.875 23.1009 28.875 22.3584V21.2761C31.8593 20.7447 34.125 18.137 34.125 15C34.125 11.8631 31.8593 9.25534 28.875 8.72399ZM28.875 11.0303V18.9698C30.6064 18.4801 31.875 16.8882 31.875 15C31.875 13.1119 30.6064 11.52 28.875 11.0303ZM13.875 20.625V9.37504H9.75C6.6434 9.37504 4.125 11.8934 4.125 15C4.125 18.1066 6.6434 20.625 9.75 20.625H13.875ZM13.875 22.875V29.6307C13.875 30.0001 13.8737 30.1044 13.8662 30.181C13.7797 31.0735 13.0734 31.7797 12.181 31.8663C12.1044 31.8737 12 31.875 11.6307 31.875C11.3362 31.875 11.2546 31.8741 11.1895 31.8688C10.4442 31.8078 9.80634 31.3098 9.56644 30.6016C9.54548 30.5397 9.5248 30.4608 9.45338 30.1751L7.55057 22.5638C8.2486 22.7664 8.98661 22.875 9.75 22.875H13.875Z" fill="white"></path></svg>
                      </span>
                        
                      <span className="highlight w-[]  font-semibold text-3xl group-hover:text-white    text-black " >{field.branchname}</span>
                      <span className="highlight w-[] text-sm font-light group-hover:text-white    text-gray-600 " >Share your knowledge and help others prepare for their journey</span>
                      <Link to="/addnontechsub" state={{ field: field }} // Passing entire field object as state
                    
   className="text-lg flex items-center hover:no-underline no-underline  space-x-2 bg-[#f98080] px-4 py-2 rounded-lg group-hover:text-white font-semibold text-black">
                    <span>Contribute</span>
                      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="h-5 w-5 text-black group-hover:text-white"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       strokeWidth="2"
     >
       <path
         strokeLinecap="round"
         strokeLinejoin="round"
         d="M9 5l7 7-7 7"
       />
                     </svg>
                    </Link>
   
                     
   
   
                </div>
  );
};

export default EducationCardnon;