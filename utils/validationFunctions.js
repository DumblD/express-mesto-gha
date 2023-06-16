const isEmptyValues = (values) => {
  let result = true;
  Object.keys(values).forEach((key) => {
    if (values[key]) {
      result = false;
    }
  });
  return result;
};

module.exports = {
  isEmptyValues,
};
