const Field = require('../models/Field');
const SubTopic = require('../models/Topics');
const Video = require('../models/Video'); 





//tested
const getFields = async (req, res) => {
  try {


    // Fetch the fields without populate first
    const fields = await Field.find();

    // console.log("field is",fields)

    // Check if fields are found
    if (!fields || fields.length === 0) {
      return res.status(404).json({ error: 'No fields found' });
    }


    // Now try to populate subtopics and videos
    const populatedFields = await Field.find().populate({
      path: 'subtopic',
      populate: {
        path: 'videos',
        model: 'Video',
      }
    });

    // Return all fields with populated subtopics and videos
    res.json(populatedFields);

  } 
  
  catch (error) {
    console.error('Error fetching fields:', error);
    res.status(500).json({ error: 'Failed to fetch fields' });
  }
};




const addField = async (req, res) => {
  const { name } = req.body;

  // Validate input: check if name is provided
  if (!name || name.trim() === "") {
    return res.status(400).json({ error: 'Field name is required' });
  }

  try {
    // Normalize the field name (optional: lowercase or trim)
    const normalizedFieldName = name.trim();

    // Check if the field already exists
    const existingField = await Field.findOne({ name: normalizedFieldName });
    if (existingField) {
      return res.status(409).json({ error: 'Field already exists' }); // Use 409 Conflict for duplicate resource
    }

    // Create a new field
    const newField = new Field({ name: normalizedFieldName });
    await newField.save();

    res.status(201).json({
      message: 'Field successfully created',
      field: newField, // Return the created field
    });
  } catch (error) {
    console.error('Error adding field:', error);

    // Check if the error is related to validation
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }

    // Handle other types of errors
    res.status(500).json({ error: 'Failed to add field' });
  }
};





const addSubtopic = async (req, res) => {
  const { fieldId } = req.params;
  const { subtopicName } = req.body;

  try {
    // Create a new subtopic
    const newSubtopic = new SubTopic({ name: subtopicName });
    await newSubtopic.save();

    // Find the field by ID and push the new subtopic to it
    const field = await Field.findById(fieldId);
    field.subtopics.push(newSubtopic._id);
    await field.save();

    res.status(201).json(newSubtopic); // Return the newly created subtopic
  } catch (error) {
    console.error('Error adding subtopic:', error);
    res.status(500).json({ error: 'Failed to add subtopic' });
  }
};



const addVideoToSubtopic = async (req, res) => {
  const { fieldId, subtopicId } = req.params;
  const { title, url, description } = req.body;

  try {
    // Create a new video object
    const newVideo = new Video({ title, url, description });
    await newVideo.save();

    // Find the subtopic and push the new video into its videos array
    const subtopic = await SubTopic.findById(subtopicId);
    subtopic.videos.push(newVideo._id);
    await subtopic.save();

    res.status(201).json(newVideo); // Return the newly created video
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ error: 'Failed to upload video' });
  }
};



// // Get all fields
// const getFields = async (req, res) => {
//   try {
//     const fields = await Field.find().populate('subtopic.videos'); // Populate the video details
//     res.status(200).json(fields);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch fields' });
//   }
// };



// Get videos for a specific subtopic
const getVideosBySubtopic = async (req, res) => {
  const { fieldId, subtopicName } = req.params;
  try {
    const field = await Field.findById(fieldId).populate('subtopic.videos');
    if (!field) {
      return res.status(404).json({ error: 'Field not found' });
    }

    // Find the subtopic
    const subtopic = field.subtopic.find(sub => sub.name === subtopicName);
    if (!subtopic) {
      return res.status(404).json({ error: 'Subtopic not found' });
    }

    // Get the video details for this subtopic
    const videos = await Video.find({ _id: subtopic.videos });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};




module.exports = {
  getFields,
  addField,
  addSubtopic,
  addVideoToSubtopic
};

