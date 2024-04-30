// const mockingoose = require('mockingoose');
// const User = require('../../models/User');
// const { update, deleteUser } = require('../../controllers/userController');

// require('dotenv').config({ path: 'tests/config/config.env' });

// // jest.mock('../../models/User');
// mockingoose(User);

// describe('updateUserDetails', () => {
//   const mockUser = {
//     name: 'John Doe',
//     email: 'test123@gmail.com',
//     password: '123456',
//     tel: '9999123499',
//     role: 'user',
//   };
//   let user;
//   let token;

//   beforeAll(async () => {
//     user = await User.create(mockUser);
//     token = await user.getSignedJwtToken();
//   });
//   afterAll(async () => {
//     // console.log(user);
//     // console.log(token);
//     await User.deleteOne({ _id: user._id });
//   });
//   it('test', () => {
//     expect(1).toBe(1);
//   });

//   it('should update user details', async () => {
//     const req = {
//       user: user,
//       body: {
//         name: 'Jane Doe2',
//         password: '1234567',
//       },
//     };
//     const res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     };
//     await update(req, res);

//     const updatedUserDetails = await User.findById(user._id);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(
//       expect.objectContaining({
//         success: true
//       })
//     );
//   });
// });
