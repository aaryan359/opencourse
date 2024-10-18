const NonTechField = require("../../models/nonTechModels/Nontechfields");
const NonTechVideo = require('../../models/nonTechModels/NontechVideo');





const AddNonTechvideos = async (req, res) => {

  try {

    const { NontechFieldname, NontechBranchname, NonTechSubTopicname, TitleofVideo, url,qaPair } = req.body;
    const userid = req.user._id;

    // Validate input
   
    if (!NontechFieldname || !NontechBranchname || !NonTechSubTopicname || !TitleofVideo || !url || !qaPair ) {
      return res.status(403).json({ error: 'Please send all the details' });
    }

    // 1. Create a new video entry in the NonTechVideo model
    const newVideo = await NonTechVideo.create({
        title:TitleofVideo,
        url:url,
        userId:userid  // Assuming you store the user who uploads the video
    });

    // 2. Check and update/create NonTechField entry
    const updatedField = await NonTechField.findOneAndUpdate(
      {
         fieldname: NontechFieldname,
        branchname: NontechBranchname,
       subtopicname: NonTechSubTopicname,
       userId:userid
      },
      {
         qaPairs:qaPair,
        $push: { nonTechvideo: newVideo._id }, // Push the video reference to the array
      },
      { new: true, upsert: true } // Create a new document if it doesn't exist (upsert)
    );

    // 3. Respond with success
    return res.status(200).json({
      success: true,
      message: 'Video uploaded successfully',
      data: updatedField, // Return the updated NonTechField entry
    });

  } catch (error) {
    console.error('Error in AddNonTechvideos:', error);
    return res.status(500).json({ error: 'Failed to add nontech video' });
  }
};

module.exports = { AddNonTechvideos };
