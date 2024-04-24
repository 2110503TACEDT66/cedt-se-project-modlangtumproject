const Session = require('../models/Session');
const fs = require('fs')

// @desc        Get all sessions
// @route       GET /sessions
// @access      Public
exports.getSessions = async (req, res, next) => {
  let query;

  // General users can see only their Sessions!
  if (req.user.role !== 'admin') {
    query = Session.find({ user: req.user.id }).populate({
      path: 'company',
      select: 'name address website desc tel picture',
    });
  }
  // If you are an admin, you can see all!
  else {
    if (req.params.companyId) {
      query = Session.find({ company: req.params.companyId }).populate({
        path: 'company',
        select: 'name address website desc tel picture',
      });
    } else {
      query = Session.find().populate({
        path: 'company',
        select: 'name address website desc tel picture',
      });
    }
  }
  try {
    const sessions = await query;

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot find session',
    });
  }
};

// @desc        Get single session
// @route       GET /sessions/:id
// @access      Public
exports.getSession = async (req, res, next) => {
  let query;
  if (req.user.role !== 'admin') {
    query = Session.find({ _id: req.params.id, user: req.user.id }).populate({
      path: 'company',
      select: 'name address website desc tel picture',
    });
  } else {
    query = Session.findById(req.params.id).populate({
      path: 'company',
      select: 'name address website desc tel picture',
    });
  }

  try {
    const session = await query;
    if (!session) {
      return res.status(404).json({
        success: false,
        message: `No session with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot find session',
    });
  }
};

// @desc        Add session
// @route       POST /sessions
// @access      Private
exports.addSession = async (req, res, next) => {
  // Add user id to req.body
  if (req.user.role !== 'admin') {
    req.body.user = req.user.id;
  } else if (!req.body.user) {
    req.body.user = req.user.id;
  }

  const date = new Date(req.body.date);
  if (!checkDate(date)) {
    return res.status(400).json({
      success: false,
      message: 'Date must be between May 10th - 13th, 2022',
    });
  }
  console.log(req)

  let check = null
  if (req.file) {
    const extension = req.file.originalname.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      check = 'pdf';
    } else {
      check = 'no'
    }
  }

  try {
    // Check for existed session
    if (check !== 'no'){
      const existedSessions = await Session.find({ user: req.user.id });

      // If the user is not an admin, they can only create 3 session.
      if (existedSessions.length >= 3 && req.user.role !== 'admin') {
        return res.status(400).json({
          success: false,
          message: `The user with ID ${req.user.id} has already made 3 sessions`,
        });
      }
      
      let resumeBase64 = null
      if (req.file) {
        resumeBase64 = await convertToBase64(req.file.path)
      }
        req.body.resume = resumeBase64

      const session = await Session.create(req.body);

      // const session = await Session.create(req.body);
      res.status(201).json({
        success: true,
        data: session,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Only .pdf file supported',
      });
    }
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot create session',
    });
  }
};

// @desc        Update session
// @route       PUT /sessions/:id
// @access      Private
exports.updateSession = async (req, res, next) => {
  let check = null
  if (req.file) {
    const extension = req.file.originalname.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      check = 'pdf';
    } else {
      check = 'no'
    }
  }
  try {
    if (check !== 'no'){
      let session = await Session.findById(req.params.id);

      if (!session) {
        return res.status(404).json({
          success: false,
          message: `No session with the id of ${req.params.id}`,
        });
      }

      if (req.body.date) {
        const date = new Date(req.body.date);
        if (!checkDate(date)) {
          return res.status(400).json({
            success: false,
            message: 'Date must be between May 10th - 13th, 2022',
          });
        }
      }
      
      let resumeBase64 = null
      if (req.file) {
        resumeBase64 = await convertToBase64(req.file.path)
        req.body.resume = resumeBase64
      }

      //Make sure user is the session owner
      if (session.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return res.status(401).json({
          success: false,
          message: `User ${req.user.id} is not authorized to update this session`,
        });
      }

      session = await Session.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
        data: session,
      });
    } else {
        res.status(500).json({
          success: false,
          message: 'Only .pdf file supported',
        });
    }
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot update session',
    });
  }
};

// @desc        Delete session
// @route       DELETE /sessions/:id
// @access      Private
exports.deleteSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: `No session with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the session owner
    if (session.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this session`,
      });
    }

    await session.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      success: false,
      message: 'Cannot delete session',
    });
  }
};

function checkDate(date) {
  const startDate = new Date('2022-05-09T17:00:00Z'); // Adjusted for GMT+7
  const endDate = new Date('2022-05-13T16:59:59Z'); // Adjusted for GMT+7

  return date >= startDate && date <= endDate;
}

async function convertToBase64(filePath) {
  try {
    const fileData = await fs.promises.readFile(filePath);
    return fileData.toString('base64');
  } catch (error) {
    console.error(error);
    throw new Error('Error converting file to Base64');
  }
}