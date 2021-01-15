module.exports = {

  inputs: {

    emailAddress: {
      description: 'The email to try in this attempt, e.g. "irl@example.com".',
      type: 'string',
      required: true
    },

    password: {
      description: 'The unencrypted password to try in this attempt, e.g. "passwordlol".',
      type: 'string',
      required: true
    }

  },

  exits: {

    serverError: {
      responseType: 'serverError'
    },

    badRequest: {
      responseType: 'badRequest'
    },
    
    success: {
      responseType: 'success'
    }

  },


  fn: async function ({emailAddress, password, rememberMe}) {

    let userRecord = await User.findOne({
      emailAddress: emailAddress.toLowerCase(),
    });

    // If there was no matching user, respond thru the "serverError" exit.
    if(!userRecord) {
      throw 'serverError';
    }

    // Check password
    try {
      await sails.helpers.passwords.checkPassword(password, userRecord.password);
    } catch (error) {
      console.log(error);
      throw { 'badRequest': 'Login faild' };
    }

    return this.res.success({
      token: AuthService.generateToken({ user: userRecord }),
      userRecord: userRecord
    });
    
  }

};
