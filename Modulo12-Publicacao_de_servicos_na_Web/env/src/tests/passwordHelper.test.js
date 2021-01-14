const { deepStrictEqual } = require('mocha');
const assert = require('assert')

const PasswordHelper = require('../helper/passworHelper');

// const SENHA = 'Fabiano@J8HLjH8';
const SENHA = 'Fabiano@J8HLjH8';
const HASH = "$2b$04$Uff5TA9DzO9eNP/S792d9uMrAMCdTrpIrqMSgkY.WpOxfgOdVdyIC"

describe('UserHelper test suite', function () {
  it('deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });
  it('deve comparar uma senha e seu hash', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  })
})