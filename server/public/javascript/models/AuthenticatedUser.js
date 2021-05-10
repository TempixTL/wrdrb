/**
 * A data model which stores all the relevant data about a logged-in user.
 */
export default class AuthenticatedUser {
  /**
   * Creates an AuthenticatedUser model with a given `id` and associated
   * `username`.
   * @param {string} id The ID of the user in the database.
   * @param {string} username The chosen screen-name of the user.
   */
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
}