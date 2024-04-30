// const mockingoose = require('mockingoose');
// const Job = require('../../models/Job');
// const {
//   deleteJob,
//   getAllJob,
//   getJob,
//   createJob,
// } = require('../../controllers/jobController');
// const { hash } = require('bcryptjs');

// // TODO : mock job data is the hardest part
// describe('Job Controller', () => {
//   beforeEach(() => {
//     mockingoose.resetAll();
//   });

//   describe('deleteJob', () => {
//     //   it('should delete a job', async () => {
//     //     const jobId = '123456789';
//     //     const mockJob = {
//     //       _id: jobId,
//     //       title: 'Test Job',
//     //     };

//     //     mockingoose(Job).toReturn(mockJob, 'findOne');

//     //     const req = {
//     //       params: {
//     //         id: jobId,
//     //       },
//     //     };
//     //     const res = {
//     //       status: jest.fn().mockReturnThis(),
//     //       json: jest.fn(),
//     //     };

//     //     await deleteJob(req, res);

//     //     expect(res.status).toHaveBeenCalledWith(200);
//     //     expect(res.json).toHaveBeenCalledWith({ success: true, data: mockJob });
//     //   });

//     it('should return 404 if job is not found', async () => {
//       const jobId = '123456789';

//       mockingoose(Job).toReturn(null, 'findOne');

//       const req = {
//         params: {
//           id: jobId,
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };

//       await deleteJob(req, res);

//       expect(res.status).toHaveBeenCalledWith(404);
//       expect(res.json).toHaveBeenCalledWith({
//         success: false,
//         msg: `Job not found with id of ${jobId}`,
//       });
//     });
//   });

//   // describe('getAllJob', () => {
//   //   it('should get all jobs', async () => {
//   //     const mockJobs = [
//   //       {
//   //         _id: '123456789',
//   //         title: 'Job 1',
//   //       },
//   //       {
//   //         _id: '987654321',
//   //         title: 'Job 2',
//   //       },
//   //     ];

//   //     mockingoose(Job).toReturn(mockJobs, 'find');
//   //     // TODO : how to pass to request
//   //     const req = {};
//   //     const res = {
//   //       status: jest.fn().mockReturnThis(),
//   //       json: jest.fn(),
//   //     };

//   //     await getAllJob(req, res);

//   //     expect(res.status).toHaveBeenCalledWith(200);
//   //     expect(res.json).toHaveBeenCalledWith({
//   //       success: true,
//   //       count: mockJobs.length,
//   //       data: mockJobs,
//   //     });
//   //   });
//   // });

//   // describe('getJob', () => {
//   //   it('should get a single job', async () => {
//   //     // TODO : mock job data is the hardest part
//   //     const jobId = '123456789';
//   //     const mockJob = {
//   //       _id: jobId,
//   //       title: 'Test Job',
//   //     };

//   //     mockingoose(Job).toReturn(mockJob, 'findOne');

//   //     const req = {
//   //       params: {
//   //         id: jobId,
//   //       },
//   //     };
//   //     const res = {
//   //       status: jest.fn().mockReturnThis(),
//   //       json: jest.fn(),
//   //     };

//   //     await getJob(req, res);

//   //     expect(res.status).toHaveBeenCalledWith(200);
//   //     expect(res.json).toHaveBeenCalledWith({ success: true, data: mockJob });
//   //   });

//   // });

//   describe('createJob', () => {
//     it('should create a new job', async () => {
//       const req = {
//         body: {
//           name: 'New Job',
//           desc: 'Develop software applications',
//           company: '65e326d0aa5866f7784fa917',
//           salary: '10000',
//         },
//       };
//       const res = {
//         status: jest.fn().mockReturnThis(),
//         json: jest.fn(),
//       };

//       await createJob(req, res);

//       expect(res.status).toHaveBeenCalledWith(201);
//       expect(res.json).toHaveBeenCalledWith(
//         expect.objectContaining({
//           success: true
//         //   TODO : don't know to write data format
//         //   data: expect.objectContaining({
//         //     _id: expect.any(String),
//         //     id: expect.any(String),
//         //     name: 'New Job',
//         //     desc: 'Develop software applications',
//         //     company: '65e326d0aa5866f7784fa917',
//         //     salary: '10000',
//         //     hashtag: expect.any(Array),
//         //   }),
//         }),
//       );
//     });
//   });
// });
