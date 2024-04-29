const User = require('../../models/User');
const { update, deleteUser } = require('../../controllers/userController');
const connectDB = require('../config/db');
const { head } = require('../../server');

const req = {
  headers: {},
  body: {},
  user: {},
};

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('updateUserDetails', () => {
  let user;
  let token;

  beforeAll(async () => {
    await connectDB();
    user = await User.create({
      name: 'John Doe',
      email: 'test123@gmail.com',
      password: '123456',
      tel: '9999123499',
      role: 'user',
    });
    token = user.getSignedJwtToken();
  });
  afterAll(async () => {
    console.log(user);
    jest.clearAllMocks();
  });

  //   it('should update user details', async () => {
  //     const req = {
  //       user: {
  //         id: user.id,
  //       },
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //       body: {
  //         name: 'Jane Doe2',
  //         password: '1234567',
  //       },
  //     };

  //     await update(req, res);
  //     expect(res.status).toHaveBeenCalledWith(200);
  //     expect(res.json).toHaveBeenCalledWith({
  //       success: true,
  //       data: expect.any(Object),
  //     });
  //   });
  it('should update user details successfully', async () => {
    const userId = new mongoose.Types.ObjectId();
    req.body = { username: 'newusername', password: 'newpassword' };
    req.user = { id: userId };

    const updatedUser = {
      _id: userId,
      username: 'newusername',
      password: 'newpassword',
    };
    jest.spyOn(User, 'findOne').mockResolvedValueOnce(null);
    jest.spyOn(User, 'findByIdAndUpdate').mockResolvedValueOnce(updatedUser);

    await updateUserDetails(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: 'User details updated successfully',
    });
  });
});
