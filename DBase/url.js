const { MONGO_NAME, MONGO_PASS } = process.env;
module.exports = {
  url: `mongodb://${MONGO_NAME}:${MONGO_PASS}@ds343985.mlab.com:43985/blogapp`,
  secret: `${MONGO_PASS}`
};
