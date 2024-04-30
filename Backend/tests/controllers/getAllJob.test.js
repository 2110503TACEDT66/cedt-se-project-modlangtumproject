const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Job = require('../../models/Job');
const Company = require('../../models/Company');
const { getAllJob } = require('../../controllers/utils/getAllJob');

describe('jobController.getAllJob', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Create a mock company
    const mockCompany1 = new Company({
      _id: '65e326d0aa5866f7784fa917',
      name: 'Bright Future Technologies',
      address: '999 Oak Street',
      website: 'http://www.brightfuturetech.com',
      desc: 'Building a brighter future with technology',
      tel: '(555) 963-7410',
      picture:
        'https://drive.google.com/uc?export=view&id=https://drive.google.com/uc?export=view&id=17RdMzvGPiJ8Xmz8V8COp9cjvv0ItnsXS',
    });
    await mockCompany1.save();
    const mockCompany2 = new Company({
      _id: '65e326c3aa5866f7784fa911',
      name: 'Future Enterprises',
      address: '333 Cedar Street',
      website: 'http://www.futureenterprises.com',
      desc: 'Building a better future with technology',
      tel: '(555) 963-7410',
      picture:
        'https://drive.google.com/uc?export=view&id=1cyA0mALS2YYY-cUh36cViM0Q5g82-m2M',
    });
    await mockCompany2.save();

    const mockCompany3 = new Company({
      _id: '65e326d9aa5866f7784fa91a',
      name: 'Global Tech Solutions',
      address: '1313 Walnut Street',
      website: 'http://www.globaltechsolutions.com',
      desc: "Global solutions for today's technology challenges",
      tel: '(555) 741-8520',
      picture:
        'https://drive.google.com/uc?export=view&id=1p-zDeNtVgyjtxjdcPUd1vAb9500fHVMV',
    });
    await mockCompany3.save();

    // Create a mock job
    const mockJob1 = new Job({
      _id: '662fc321f9a5b7a4c09e1018',
      name: 'Full Stack',
      desc: 'FrontEnd BackEnd',
      hashtag: [],
      salary: '20K-40K',
      company: '65e326d0aa5866f7784fa917',
    });
    await mockJob1.save();

    const mockJob2 = new Job({
      _id: '662fcf0775c4e723551f6f90',
      name: 'Ux',
      desc: 'FrontEnd BackEnd',
      hashtag: [],
      salary: '20K-40K',
      company: '65e326c3aa5866f7784fa911',
    });
    await mockJob2.save();

    const mockJob3 = new Job({
      _id: '6630cc906944bf36ac24b564',
      name: 'Full Stack Developer And UX/UI Designer',
      desc: 'Fulltime job for Full Stack Developer And UX/UI Designer',
      hashtag: ['FrontEnd', 'BackEnd', 'Designer'],
      salary: '100,000',
      company: '65e326d9aa5866f7784fa91a',
    });
    await mockJob3.save();

    // console.log(await Job.find());
    // console.log(await Company.find());
  });

  afterAll(async () => {
    await mongoose.disconnect();

    await mongoServer.stop();
  });

  describe('when get all jobs successfully', () => {
    it('should return a 200 status code', async () => {
      const req = {
        params: {
          companyId: '65e326d9aa5866f7784fa91a',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllJob(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          count: expect.any(Number),
        }),
      );
    });
    it('invalid companyId should return a 404 status code', async () => {
      const req = {
        params: {
          companyId: '65e326d9aa5866f7784fa91b',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await getAllJob(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Company not found',
      });
    });

  });

  describe('when an error occurs', () => {
    it('should return a 400 status code', async () => {
      const req = {
        params: {
          companyId: '65e326d9aa5866f7784fa91a',
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockError = new Error('Error occurred');
      jest.spyOn(Job, 'find').mockRejectedValue(mockError);
      await getAllJob(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Error occurred',
      });
    });
  });
});
