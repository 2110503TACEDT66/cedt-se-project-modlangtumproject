const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Job = require('../../models/Job');
const Company = require('../../models/Company');
const {
  deleteJob,
  getAllJob,
  getJob,
  createJob,
} = require('../../controllers/jobController');
//const { hash } = require('bcryptjs');

describe('jobController.deleteJob', () => {
    let mongoServer;
    let connection;
  
    beforeAll(async () => {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      connection = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      // Create a mock job
      const mockJob1 = new Job({
        _id: '662fc321f9a5b7a4c09e1018',
        name: "Full Stack",
        desc: "FrontEnd BackEnd",
        hashtag: [],
        salary: "20K-40K",
        company: "65e326d0aa5866f7784fa917",
      });
      await mockJob1.save();
  
      const mockJob2 = new Job({
        _id: '662fcf0775c4e723551f6f90',
        name: "Ux",
        desc: "FrontEnd BackEnd",
        hashtag: [],
        salary: "20K-40K",
        company: "65e326c3aa5866f7784fa911",
      });
      await mockJob2.save();
  
      const mockJob3 = new Job({
        _id: '6630cc906944bf36ac24b564',
        name: "Full Stack Developer And UX/UI Designer",
        desc: "Fulltime job for Full Stack Developer And UX/UI Designer",
        hashtag: ["FrontEnd", "BackEnd", "Designer"],
        salary: "100,000",
        company: "65e326d9aa5866f7784fa91a",
      });
      await mockJob3.save();
  
      // Create a mock company
      const mockCompany1 = new Company({
        _id: "65e326d0aa5866f7784fa917",
        name: "Bright Future Technologies",
        address: "999 Oak Street",
        website: "http://www.brightfuturetech.com",
        desc: "Building a brighter future with technology",
        tel: "(555) 963-7410",
        picture: "https://drive.google.com/uc?export=view&id=https://drive.google.com/uc?export=view&id=17RdMzvGPiJ8Xmz8V8COp9cjvv0ItnsXS",
      });
      await mockCompany1.save();
      const mockCompany2 = new Company({
        _id: "65e326c3aa5866f7784fa911",
        name: "Future Enterprises",
        address: "333 Cedar Street",
        website: "http://www.futureenterprises.com",
        desc: "Building a better future with technology",
        tel: "(555) 963-7410",
        picture: "https://drive.google.com/uc?export=view&id=1cyA0mALS2YYY-cUh36cViM0Q5g82-m2M",
      });
      await mockCompany2.save();
  
      const mockCompany3 = new Company({
        _id: "65e326d9aa5866f7784fa91a",
        name: "Global Tech Solutions",
        address: "1313 Walnut Street",
        website: "http://www.globaltechsolutions.com",
        desc: "Global solutions for today's technology challenges",
        tel: "(555) 741-8520",
        picture: "https://drive.google.com/uc?export=view&id=1p-zDeNtVgyjtxjdcPUd1vAb9500fHVMV",
      });
      await mockCompany3.save();
    });
  
    afterAll(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
    });
  
    describe('when deleting a job successfully', () => {
      it('should return a 200 status code', async () => {
        const req = {
          params: {
            id: '662fc321f9a5b7a4c09e1018',
          },
          user: {
            id: '6628a7e613ac84829421a18a',
            role: 'admin',
          },
        };
        const res = {
          status: jest.fn(),
          json: jest.fn(),
        };
  
        await deleteJob(req, res);
  
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled(expect.objectContaining({
            success: true,
            data: {},
        }));
      });
    });
  
    describe('when trying to delete a job without permission', () => {
      it('should return a 401 status code', async () => {
        const req = {
          params: {
            id: '662fcf0775c4e723551f6f90',
          },
          user: {
            id: '662d0b6100ccd592b355897',
            role: 'user',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        await deleteJob(req, res, jest.fn());
  
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
          success: false,
          message: `User role ${req.user.role} is not authorized to access this route`
        }));
      });
    });
  
    describe('when trying to delete a non-existing job', () => {
      it('should return a 404 status code', async () => {
        const req = {
          params: {
            id: '67127491ede37740c5857789',
          },
          user: {
            id: '6620c987555498a0ba97bc02',
            role: 'admin',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        // Call the deleteJob function
        await deleteJob(req, res, jest.fn());
  
        // Assert the expected behavior
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
          success: false,
          message: `Job not found with id of ${req.params.id}`
        }));
      });
    });
  
    describe('when an error occurs during deletion', () => {
      it('should return a 400 status code', async () => {
        const req = {
          params: {
            id: '6630cc906944bf36ac24b564',
          },
          user: {
            id: '6620c987555498a0ba97bc02',
            role: 'admin',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
  
        const mockError = new Error('Something went wrong');
        jest.spyOn(Job, 'findById').mockRejectedValue(mockError);
  
        await deleteJob(req, res);
  
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
        });
      });
    });
  
  });