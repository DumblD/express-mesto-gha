const getErrorMessage = (err) => {
  let newError = {};
  if (err.name.toLowerCase().includes('casterror')) {
    newError = new Error('Not Found');
  } else if (err.name.toLowerCase().includes('validationerror') || err.message.toLowerCase().includes('validationerror')) {
    newError = new Error('Validation Error');
  }
  return newError.message;
};

const getInternalErrorMessage = (err, res) => {
  res.status(500).send({
    message: 'Произошла ошибка',
    errorName: err.name,
    errorMessage: err.message,
  });
};

const sendError = (err, res) => {
  if (getErrorMessage(err) === 'Not Found') {
    res.status(404).send({
      message: 'По запросу ничего не найдено',
    });
  } else if (getErrorMessage(err) === 'Validation Error') {
    res.status(400).send({
      message: 'Переданы некорректные данные',
    });
  } else {
    getInternalErrorMessage(err, res);
  }
};

module.exports = {
  getErrorMessage,
  getInternalErrorMessage,
  sendError,
};
