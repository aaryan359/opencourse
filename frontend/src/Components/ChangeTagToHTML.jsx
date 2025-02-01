// import React from 'react';

// const RawContentDisplay = ({ rawHtml }) => {
//   // Function to strip HTML tags and normalize line breaks
//   const parseToPlainText = (html) => {
//     const doc = new DOMParser().parseFromString(html, 'text/html');
    
//     // Get all elements inside the body of the parsed HTML
//     const elements = doc.body.childNodes;
    
//     let plainText = '';

//     elements.forEach((element) => {
//       if (element.nodeType === 3) {
//         // Text node: Add the content directly
//         plainText += element.textContent;
//       } else if (element.nodeType === 1) {
//         // Element node: Handle line breaks or block elements
//         if (element.nodeName === 'P' || element.nodeName === 'DIV') {
//           plainText += '\n' + element.textContent + '\n'; // Insert line breaks around block-level elements
//         } else {
//           plainText += element.textContent; // Just append for inline elements
//         }
//       }
//     });

//     return plainText;
//   };

//   const plainText = parseToPlainText(rawHtml);

//   return (
//     <div>
//       <h3>Content Without Tags</h3>
//       <pre>{plainText}</pre> {/* Display plain text */}
//     </div>
//   );
// };

// export default RawContentDisplay;
