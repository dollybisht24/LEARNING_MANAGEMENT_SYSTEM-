import { HTTP_STATUS } from '../config/constants.js';

export const sendSuccess = (res, data, message, statusCode = HTTP_STATUS.OK) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res, message, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const sendPaginatedResponse = (res, data, pagination, message) => {
  return res.status(HTTP_STATUS.OK).json({
    success: true,
    message,
    data,
    pagination,
  });
};
