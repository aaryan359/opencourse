const {NonTechField,NonTechFieldsub} = require("../../models/nonTechModels/Nontechfields");

const NonTechVideo = require('../../models/nonTechModels/NontechVideo');





const AddNonTechCourse = async (req, res) => {
  try {
    const { NontechFieldname, NontechBranchname, NonTechSubTopicname, Videos, qaPair } = req.body;
    const userid = req.user._id;

    // Validate input
    if (!NontechFieldname || !NontechBranchname || !NonTechSubTopicname || !Videos || !qaPair) {
     
      return res.status(403).json({ error: 'Please send all the details' });
    }

    // Create video entries for the subtopic
    const videoIds = [];
    for (let i = 0; i < Videos.length; i++) {
      const { title, url } = Videos[i];

      // Create a new video entry
      const newVideo = await NonTechVideo.create({
        title,
        url,
        userId: userid,
      });

      // Add video ID to the array
      videoIds.push(newVideo._id);
    }

    // Create the subtopic
    const newSubtopic = await NonTechFieldsub.create({
      subtopicname: NonTechSubTopicname,
      userId: userid,
      nonTechvideo: videoIds,
      qaPairs: qaPair,
    });

    // Create the NonTechField and link the subtopic
    const newField = await NonTechField.create({
      fieldname: NontechFieldname,
      branchname: NontechBranchname,
      subtopic: [newSubtopic._id], // Add the single subtopic ID as an array
    });

    // Respond with success
    return res.status(200).json({
      success: true,
      message: 'Field and subtopic added successfully',
      data: newField,
    });

  } catch (error) {
    console.error('Error in AddNonTechCourse:', error);
    return res.status(500).json({ error: 'Failed to add non-tech course' });
  }
};



 const getallcourse = async(req,res)=>{
                 
  
  try{
    const  nontechcourses = await  NonTechField.find().populate({
      path: 'subtopic', // Populate the subtopic array
      populate: {
        path: 'nonTechvideo', // Populate videos within the subtopic
        select: 'title url', // Include only specific fields for videos
      },
    });
    return res.status(200).json({
               
          nontechcourses
    });

  }
  catch(error){
    console.error('Error in getting NonTechCourse:', error);
    return res.status(500).json({ error: 'Failed to add non-tech course' });
  }
}      

// Controller to add a non-technical subtopic with videos and QA pairs
const addNonTechSubtopic = async (req, res) => {
  try {
      const { fieldid,NonTechSubTopicname, NonTechSubTopicnameid, Videos, qaPair } = req.body;
      const userid = req.user._id;
      // Validation
      if (  !Videos || !qaPair) {
          return res.status(400).json({ success: false, message: 'Please provide all required details.' });
      }

      // Check if NonTechSubTopicnameid is either null or a valid ObjectId
    

    // Check if the subtopic already exists (if valid ObjectId is provided)
    let subtopic;
    if (NonTechSubTopicnameid) {
      subtopic = await NonTechFieldsub.findById(validSubTopicId);
    }
            
      if (!subtopic) {

        const videoIds = [];
        for (let i = 0; i < Videos.length; i++) {
          const { title, url } = Videos[i];
    
          // Create a new video entry
          const newVideo = await NonTechVideo.create({
            title,
            url,
            userId: userid,
          });
    
          // Add video ID to the array
          videoIds.push(newVideo._id);
        }

        
          // Create a new subtopic if it doesn't exist
          subtopic = new NonTechFieldsub({
            subtopicname: NonTechSubTopicname,
            userId: userid,
            nonTechvideo: videoIds,
            qaPairs: qaPair,
          });
          await subtopic.save();
          if (fieldid) {
            let fieldModel = await NonTechField.findByIdAndUpdate(
              fieldid, 
              { $push: { subtopic: subtopic._id } },
              { new: true } // Returns the updated document
            );
          }
      } else {

        const videoIds = [];
        for (let i = 0; i < Videos.length; i++) {
          const { title, url } = Videos[i];
    
          // Create a new video entry
          const newVideo = await NonTechVideo.create({
            title,
            url,
            userId: userid,
          });
    
          // Add video ID to the array
          videoIds.push(newVideo._id);
        }
          // Add new videos and QA pairs to the existing subtopic
          let NonTechFieldsub = await NonTechFieldsub.findByIdAndUpdate(
            NonTechSubTopicnameid, 
            { $push: { subtopic: { $each: videoIds } } },
            { new: true } // Returns the updated document
          );
      }

      // Save the subtopic
      await subtopic.save();

      res.status(201).json({ success: true, message: 'Subtopic added successfully.', data: subtopic });
  } catch (error) {
      console.error('Error adding non-technical subtopic:', error);
      res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

module.exports = { AddNonTechCourse,getallcourse,addNonTechSubtopic};