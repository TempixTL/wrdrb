package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{Future, ExecutionContext}

import codegen.Tables._

/**
  * The main class used by the Wrdrb app to talk to the backend database.
  * 
  * This class handles database queries and translation of database values
  * into models used in this application.
  *
  * @param db The database which stores persistent data for the app.
  * @param ec The execution context with which to run asynchronous code.
  */
class WrdrbDb(db: Database)(implicit ec: ExecutionContext) {

  /**
    * Asynchronously validates that the given login credentials are correct.
    *
    * @param username The username of the authenticating user.
    * @param password The password of the authenticating user in plaintext.
    * @return `Some(User)` of the validated user on success, `None` for invalid
    * credentials or other errors.
    */
  def validateLogin(username: String, password: String): Future[Option[User]] = {
    val matches = db.run(Users.filter(row => row.username === username && row.password === password).result)
    matches.map(_ match {
      case Seq(user) => Some(User(user.id, user.username))
      case _ => None
    })
  }

  /**
    * Asynchronously validates that the given registration credentials are
    * valid, and if so, adds that user to the database.
    *
    * @param username The username of the registering user.
    * @param password The password of the registering user in plaintext.
    * @return `Some(User)` of the newly registered user on success, `None` for
    * invalid credentials or other errors.
    */
  def validateRegister(username: String, password: String): Future[Option[User]] = {
    val matches = db.run(Users.filter(row => row.username === username).result)
    matches.flatMap(_ match {
      case Nil =>
        val insertQuery = Users returning Users.map(_.id)
        db.run(insertQuery += UsersRow(-1, username, password))
          .map(userId => Some(User(userId, username)))
      case _ => Future(None)
    })
  }

  // et ceterea
}

