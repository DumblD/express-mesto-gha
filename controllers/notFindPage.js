const notFindPage = async (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
};

module.exports = { notFindPage };