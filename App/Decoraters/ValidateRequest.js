const validateRequest = (validator) => {
  return (target, key, descriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req, res, next) {
      const { error } = validator(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
      return originalMethod.apply(this, [req, res, next]);
    };

    return descriptor;
  };
};

module.exports = validateRequest;
