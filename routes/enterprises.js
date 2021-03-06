const Yup = require('yup');
const { create } = require('../app/Controllers/EnterpriseController');

const createSchema = Yup.object().shape({
    razao_social: Yup.string().required(),
    cnpj: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8),
    cep: Yup.string().required(),
});

const prefix = '/api/v1';

const register = (app) => {
    app.post(`${prefix}/enterprises`, async (req, res, next) => {
        const valid = await createSchema.isValid(req.body);
        console.log(`valid: ${valid}`);
        if (valid) next();
        else res.json({
            data: [],
            errors: await createSchema.validate(req.body).catch(err => err.errors),
        });
    }, async (req, res) => {
        try {
            const enterprise = await create(req.body);
            if (!enterprise) throw Error('Erro ao criar empresa');
            res.json({
                data: [enterprise],
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