const sendResponse = (statusCode, data, resp, status) => {
  resp.status(statusCode).json({
    status: "successful" || status,
    data: [data],
  });
};

module.exports = sendResponse;
