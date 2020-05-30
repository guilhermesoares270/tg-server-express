'use strict'

// const User = use("App/Models/User");
// const Enterprise = use("App/Models/Enterprise");
const { users, enterprises } = require('../models');
const connection = require('../connection');

// const Database = use('Database')

// const HashHelper = use('App/Support/HashHelper');
// const FileHelper = use('App/Support/FileHelper');
// const Helpers = use('Helpers');

class UserController {

  // async delete({ params }) {
  //   const user = await User.findBy(
  //     "id", params.id
  //   );
  //   if (!user) return {};
  //   await Database.table('tokens').select('*').where('user_id', user.id).delete();

  //   return user.delete();
  // }

  // async hashFile({ request, response }) {

  //   try {
  //     const file = request.file('File', {});

  //     const res = await FileHelper.moveToTemp(file);

  //     if (!res) {
  //       throw 'Couldn\' move the file to a temp location';
  //     }

  //     const filePath = `${Helpers.tmpPath('uploads')}/deu-certo.${file.extname}`;
  //     return await HashHelper.hash(filePath, 'sha256');

  //   } catch (error) {
  //     return response.send({ 'error': error });
  //   }
  // }

  // async generateKeys({ request, response }) {

  //   try {
  //     return HashHelper.generateKeyPairs();
  //   } catch (error) {
  //     return response.send({ 'error': error });
  //   }
  // }

  // async createSignedJWT({ request, response }) {
  //   return HashHelper.hteste(
  //     '173013304aeec4e49cc6718cb4caeccb',
  //     'my.vuw.ac.nz/sda-file-association',
  //     '2016-01'
  //   );
  // }
}

const create = async (userData) => {
  try {
    const enterprise = await enterprises.findOne({
      where: {
        razao_social: userData.razao_social,
      },
    });
    if (enterprise == null) throw Error('Enterprise not found');

    const newData = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      enterprise_id: enterprise ? enterprise.id : null,
      enterprise_cnpj: enterprise ? enterprise.cnpj : null,
    }

    const newUser = await users.create(newData);

    return {
      data: Object.assign(newUser, { enterprise_razao_social: enterprise ? enterprise.razao_social : null }),
      errors: []
    };
  } catch (error) {
    return {
      data: null,
      errors: [error.message],
    };
  }
}

const alter = async (userData, { id }) => {
  try {
    console.log(`userData: ${JSON.stringify(userData)} - id: ${JSON.stringify(id)}`);
    const user = await users.update({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    }, {
      where: {
        id: id
      }
    });
    return user;
  } catch (error) {
    return {
      data: null,
      errors: [error.message],
    };
  }
};

const get = async ({ id }) => {
  try {
    console.log(`id: ${id}`);
    return users.findOne({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {};
  }
}

const index = async () => await users.findAll();

const del = async ({ id }) => {

};

module.exports = {
  create,
  alter,
  get,
  index,
};