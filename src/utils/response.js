const response = ({isSuccess, code, message}, result) => {
  return {
    isSuccess,
    code,
    message,
    result
  };
};

const errResponse = ({isSuccess, code, message}) => {
  return {
    isSuccess,
    code,
    message
  };
};

export {
  response,
  errResponse
};