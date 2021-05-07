package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{Future, ExecutionContext}

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
  def validateLogin(username: String, password: String) = ???
  def validateRegister(username: String, password: String) = ???
  // et ceterea
}

