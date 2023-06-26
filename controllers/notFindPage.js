const notFindPage = async (req, res, next) => {
  next(new Error('NotFound'));
};

module.exports = { notFindPage };
