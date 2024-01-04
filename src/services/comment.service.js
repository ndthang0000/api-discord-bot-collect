const httpStatus = require('http-status');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { Comment } = require('../models');

const createNewComment = async (body) => {
  return new Comment(body).save();
};

const queryComments = async (filter, options) => {
  const users = await Comment.paginate(filter, options);
  return users;
};

const changeStatusComment = async (id, status) => {
  const findComment = await Comment.findById(id);
  if (!findComment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  if (findComment.status == status) {
    return {
      status: false,
      message: 'This comment has same with new status',
      data: null,
    };
  }
  findComment.status = status;
  findComment.timeUpdateStatus = new Date();
  await findComment.save();
  return {
    status: true,
    message: 'Change status comment successfully',
    data: findComment,
  };
};

const genAPIKey = () => {
  //create a base-36 string that contains 30 chars in a-z,0-9
  return [...Array(30)].map((e) => ((Math.random() * 36) | 0).toString(36)).join('');
};

module.exports = {
  createNewComment,
  queryComments,
  changeStatusComment,
  genAPIKey,
};
