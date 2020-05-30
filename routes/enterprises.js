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
        if (valid) next();
        else res.json({
            data: [],
            errors: await createSchema.validate(req.body).catch(err => err.errors),
        });
    }, async (req, res) => {
        const enterprise = await create(req.body);
        if (!enterprise) {
            res.json({
                data: [],
                errors: ['Erro ao criar empresa'],
            });
        }
        res.json({
            data: [{ success: await create(req.body) }],
            errors: [],
        });
    });
};

module.exports = register;