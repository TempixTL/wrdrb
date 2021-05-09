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

  //                  ------ Bin Methods ------
  //
  /**
    * Asynchronously returns all the user's bins.
    *
    * @param username The username of the requesting user.
    * @return `Seq[Bin]` on success, `Nil` on failure.
    */
  def getAllBins(username: String): Future[Seq[Bin]] = {
    db.run(
      (for {
        user <- Users if user.username === username
        bin <- Bins if bin.user_id === user.id
      } yield {
        bin
      }).result
    ).map(bins => bins.map(bin => Bin(bin.id, bin.user_id, bin.name)))
  }

  /**
    * Asynchronously returns the articles for a bin.
    *
    * @param binId The id of the bin.
    * @return `Seq[Article]` on success, `Nil` on failure.
    */
  def getBin(binId: Int): Future[Seq[Article]] = {
    db.run(
      (for {
        articleBin <- ArticleBins if row.bin_id === binId
      } yield {
        articleBin.article_id
      }).result
    ).map(articleBinIds => articleBinsIds.map(id => db.run(Articles.filter(row => row.id === id).result)))
  }

  /**
    * Asynchronously add a bin.
    *
    * @param userId The id of the requesting user.
    * @param name The name of the new bin.
    * @return `Some(Bin)` on success, `None` on already exists.
    */
  def addBin(username: String, name: String): Future[Option[Bin]] = {
    val user = db.run(Users.filter(row => row.username === username).result)
    val userId = user.id
    val matches = db.run(Bins.filter(row => row.user_id === userId && row.name === name).result)
    matches.flatMap(_ match {
      case Nil =>
        val insertQuery = Bins returning Bins.map(_.id)
        db.run(insertQuery += BinsRow(-1, userId, name))
          .map(binId => Some(Bin(binId, userId, name)))
      case _ => Future(None)
    })
  }

  /**
    * Asynchronously delete a bin.
    *
    * @param binId The id of the bin to delete.
    * @return `true` on success, `false` on failure.
    */
  def deleteBin(binId: Int): Future[Boolean] = {
    db.run(Bins.filter(_.id === binId).delete).map(count => count > 0)
  }

  /**
    * Asynchronously add an existing article to an existing bin.
    *
    * @param binId The id of the bin.
    * @param articleId The id of the article to add.
    * @return `true` on success, `false` on failure.
    */
  def addArticleToBin(binId: Int, articleId: Int): Future[Boolean] = {
    val matches = db.run(ArticlesBins.filter(row => row.id === binId && row.article_id === articleId).result)
    matches.flatMap(_ match {
      case Nil => 
        val insertQuery = ArticlesBins returning ArticlesBins.map(_.id)
        db.run(insertQuery += ArticlesBinsRow(-1, binId, articleId))
        true
      case _ => false
    })
  }

  /**
    * Asynchronously remove an existing article from an existing bin.
    *
    * @param binId The id of the bin.
    * @param articleId The id of the article to remove.
    * @return `true` on success, `false` on failure.
    */
  def removeArticleFromBin(binId: Int, articleId: Int): Future[Boolean] = {
    db.run(ArticleBins.filter(row => row.id === binId && row.articleId === articleId).delete).map(count => count > 0)
  }

}

