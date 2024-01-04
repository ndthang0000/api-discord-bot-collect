const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const { ApiToken } = require('../models');
var randomsString = require("randomstring");

const getListComment = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['status', 'discordUserId','discordUsername','discordChanelId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await commentService.queryComments(filter, options);
  res.send(result);
});

const createNewComment = catchAsync(async (req, res) => {
  const newComment = await commentService.createNewComment(req.body)
  res.status(httpStatus.CREATED).json({status:true,data:newComment});
});

const changeStatusComment = catchAsync(async (req, res) => {
  const newComment = await commentService.changeStatusComment(req.params.commentId,req.body.status)
  res.status(httpStatus.OK).json(newComment);
});

const generateTApiToken = catchAsync(async (req, res) => {
  const newKey = randomsString.generate()

  const keyDB = await new ApiToken({
    name: req.body.name,
    apiToken:newKey
  }).save()
  
  res.status(httpStatus.OK).json({status:true,data:keyDB.apiToken});
});

module.exports = {
  getListComment,
  createNewComment,
  changeStatusComment,
  generateTApiToken
}