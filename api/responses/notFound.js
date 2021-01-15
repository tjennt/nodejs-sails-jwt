/**
 * notFound.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.notFound();
 *     // -or-
 *     return res.notFound(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'notFound'
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

module.exports = function notFound(optionalData = {
  'code': 404,
  'message': 'Not Found'
}) {

  sails.log.debug('optionalData', optionalData);
  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  res.status(404).json(optionalData);

};
