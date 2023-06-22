const sendError = (err, res) => {
  if (err.message === 'NotFound') {
    res.status(404).send({
      message: 'По запросу ничего не найдено',
    });
  } else if (err.message.toLowerCase().includes('validation')) {
    res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } else {
    res.status(500).send({
      message: 'Произошла ошибка',
      errorName: err.name,
      errorMessage: err.message,
    });
  }
};

module.exports = {
  sendError,
};
