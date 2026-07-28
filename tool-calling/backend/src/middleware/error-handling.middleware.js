const ErrorHandler = (error, req, res, next) => {
  console.log(error);

  let code = error.code || 500
  let detail = error.detail || error.details || {}
  let message = error.message || "Server Error....."
  let status = error.status || "APP ERROR"
  
  if(error.name === "MongoServerError") {
    code = 422
    if(+error.code === 11000) {
      code = 400
      message = "Validation failed"
      let field = Object.keys(error.keyPattern).pop()
      detail[field] = `${field} should be unique.`
    }
  }

  res.status(code).json({
    error: detail,
    message: message,
    status: status,
  });
}

export default ErrorHandler
