export const validate = (schema) => (req, res, next) => {
    const validationResult = schema.validate(req.body, {
        abortEarly: false,
        allowUnknown: true,
    });
    const { error } = validationResult;
    if (error) {
        const errors = error.details.map((detail) => detail.message.replace(/["]/g, ''));
        res.status(400).json({
            error: errors.length === 1 ? errors[0] : errors,
        });
        return;
    }
    next();
};
//# sourceMappingURL=validation.middleware.js.map