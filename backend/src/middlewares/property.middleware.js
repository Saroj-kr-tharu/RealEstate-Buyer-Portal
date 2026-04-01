const { ZodError } = require('zod');
const { AddPropertySchema, UpdatePropertySchema, PropertyIdSchema } = require('../schemas/property.schema');
const { ClientErrorsCodes } = require('../utlis/https.codes');
const { responseHandler } = require('../utlis/index');

class PropertyMiddleware {

  
  #validate(schema, req, res, next) {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      this.#handleZodError(err, res, next);
    }
  }

  //  (the ID in the URL)
  #validateParams(schema, req, res, next) {
    try {
      req.params = schema.parse(req.params);
      next();
    } catch (err) {
      this.#handleZodError(err, res, next);
    }
  }

  // Error handling 
  #handleZodError(err, res, next) {
    if (err instanceof ZodError || err?.name === 'ZodError') {
      const issues = err.issues ?? err.errors ?? [];
      const messages = issues
        .map((e) => `${e.path.join('.') || 'field'}: ${e.message}`)
        .join(', ');
      return responseHandler.error(res, messages, ClientErrorsCodes.BAD_REQUEST);
    }
    next(err);
  }

  // CREATE
  validateAdd = (req, res, next) => {
    this.#validate(AddPropertySchema, req, res, next);
  };

  // UPDATE 
  validateUpdate = (req, res, next) => {
    try {
      PropertyIdSchema.parse(req.params);
      this.#validate(UpdatePropertySchema, req, res, next);
    } catch (err) {
      this.#handleZodError(err, res, next);
    }
  };

  // DELETE 
  validateDelete = (req, res, next) => {
    const id = req?.params.id; 
   if(!id) return  responseHandler.error(res, "Id is missing ", ClientErrorsCodes.BAD_REQUEST)
    next()
  };
}

const propertyMiddleware = new PropertyMiddleware();
module.exports = propertyMiddleware;