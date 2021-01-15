/**
 * serverError.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.serverError();
 *     // -or-
 *     return res.serverError(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'serverError'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function serverError(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  // Define the status code to send in the response.
  var statusCodeToSet = 400;

  // If no data was provided, use res.sendStatus().
  if (optionalData === undefined) {
    return res.status(statusCodeToSet).send({
      message: 'Server error',
      status: false
    });
  }

  else if (_.isError(optionalData)) {
    sails.log.error('Custom response `res.serverError()` called with an Error:', optionalData);

    if (!_.isFunction(optionalData.toJSON)) {
      if (process.env.NODE_ENV === 'production') {
        return res.sendStatus(statusCodeToSet);
      }
      else {
        return res.status(statusCodeToSet).send(optionalData.stack);
      }
    }
  }
  // Set status code and send response data.
  else {
    return res.status(statusCodeToSet).send({
      message: optionalData,
      status: false
    });
  }

};
