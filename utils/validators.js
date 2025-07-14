import { check, validationResult } from 'express-validator';

const registerValidationRules = () => {
    return [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
    ];
};

const profileValidationRules = () => {
    return [
        check('firstName', 'First name is required').not().isEmpty(),
        check('lastName', 'Last name is required').not().isEmpty()
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export {
    registerValidationRules,
    profileValidationRules,
    validate
};
s