const httpStatus = require("http-status")
const ApiError = require("../utils/ApiError")
const { ApiToken } = require("../models")

const authApiKey = async (req, res, next) => { 
  let token = req.headers['x-api-key']

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({status:false,message:'Please authenticate with Api key'})
  }
  const findToken = await ApiToken.findOne({ apiToken: token })
  if (!findToken) {
    return res.status(httpStatus.UNAUTHORIZED).json({status:false,message:'Invalid API key'})
  }
  next()
}

module.exports =authApiKey