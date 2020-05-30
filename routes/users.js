const Yup = require('yup');
// const UserController = require('../app/Controllers/UserController');
const { create, alter, get, index } = require('../app/Controllers/UserController');

const createSchema = Yup.object().shape({
    username: Yup.string().required(),
    email: Yup.string().required().email(),//"teste2@gmail.com",
    password: Yup.string().required().min(8), //"12345678",
    razao_social: Yup.string().required()// "empresa2"
});

const prefix = '/api/v1';

const register = (app) => {
    app.post(`${prefix}/users`, async (req, res, next) => {
        const valid = await createSchema.isValid(req.body);
        if (valid) next();
        else res.json({
            data: [],
            errors: await createSchema.validate(req.body).catch(err => err.errors),
        });
    }, async (req, res) => {
        res.json(await create(req.body));
    });

    app.patch(`${prefix}/users/:id`, async (req, res) => {
        const updatedRows = await alter(req.body, req.params);
        if (updatedRows[0] <= 0) {
            res.json({
                data: [],
                errors: ['Nenhum usuário encontrado com esse id']
            });
        } else res.json({ data: ['sucesso'], errors: [] });
    });

    app.get(`${prefix}/users/:id`, async (req, res) => res.json(await get(req.params)));
    app.get(`${prefix}/users`, async (req, res) => res.json(await index()));
};

module.exports = register;