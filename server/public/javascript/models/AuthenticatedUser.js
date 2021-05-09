/**
 * A data model which stores all the relevant data about a logged-in user.
 */
export default class AuthenticatedUser {
  /**
   * Creates an AuthenticatedUser model with a given `name` and associated
   * `username`.
   * @param {string} name The actual name of the user.
   * @param {string} username The chosen screen-name of the user.
   */
  constructor(name, username) {
    this.name = name;
    this.username = username;
  }
}