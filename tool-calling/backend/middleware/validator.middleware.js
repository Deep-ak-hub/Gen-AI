const validateBodyData = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
    // console.log(req.body);
      
      if (!data) {
        next({
          code: 422,
          message: "Empty Payload",
          status: "PAYLOAD_EMPTY_ERR",
        });
      }

      await schema.validateAsync(data, { abortEarly: false });
      next()
    } catch (exception) {
        let errorBag = {}
        console.log(exception);
        
        if(exception.details && exception.details.length) {
            exception.details.map((error) => {
                let field = error.path.pop()
                errorBag[field] = error.message
            })
        }
        next({
            details: errorBag,
            message: "validation failed",
            status: "VALIDATION_FAILED_ERR",
            code: 400
        })
    }
  };
};

export default validateBodyData
