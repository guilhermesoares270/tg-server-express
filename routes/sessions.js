const Yup = require('yup');
const { create } = require('../app/Controllers/SessionController');

const createSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
});

const prefix = '/api/v1';

const register = (app) => {
    app.post(`${prefix}/sessions`, async (req, res, next) => {
        const valid = await createSchema.isValid(req.body);
        console.log(`valid: ${valid}`);
        if (valid) next();
        else res.json({
            data: [],
            errors: await createSchema.validate(req.body).catch(err => err.errors),
        });
    }, async (req, res) => {
        try {
            const response = await create(req);
            res.json({
                data: [response],
                errors: [],
            });
        } catch (error) {
            res.json({
                data: [],
                errors: [error.message],
            });
        }
    });
};

module.exports = register;