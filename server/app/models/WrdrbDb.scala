package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{Future, ExecutionContext}
import models.codegen.Tables

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

  def getOutfits(username:String):Future[Seq[Outfit]] = {
    val dbData = db.run(
      (for {
        outfit <- Tables.Outfits
        user <- Tables.Users
        if outfit.userId === user.id && user.username === username
        outfitArticle <- Tables.OutfitsArticles
        if outfitArticle.articleId === outfit.id
        article <- Tables.Articles
        if article.id === outfitArticle.articleId
      } yield {
        (outfit, article)
      }).result
    )
    dbData.map(_.groupBy(_._1).map{ case (outfit, tuples) =>
      Outfit(outfit.outfitDate.toString(), tuples.map(ar => Article(ar._2.brand, ar._2.material, ar._2.clothingType, ar._2.color, ar._2.weatherCondition)))
    }.toSeq)
  }

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

  /**
    * Asynchronously gets a `User` with a given `userId`.
    *
    * @param userId The ID of the `User` to retrieve.
    * @return `Some(User)` if the `User` with ID `userId` exists, otherwise
    * `None`.
    */
  def getUser(userId: String): Future[Option[User]] = {
    val matches = db.run(Users.filter(_.id.asColumnOf[String] === userId).result)
    matches.map {
      case Seq(UsersRow(id, username, _)) => Some(User(id, username))
      case _ => None
    }
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
        bin <- Bins if bin.userId === user.id
      } yield {
        bin
      }).result
    ).map(bins => bins.map(bin => Bin(bin.id, bin.userId, bin.name)))
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
        articleBin <- ArticlesBins if articleBin.binId === binId
        article <- Articles if article.id === articleBin.articleId
      } yield {
        article
      }).result
    ).map(articles => articles.map(ar => Article(ar.brand, ar.material, ar.clothingType, ar.color, ar.weatherCondition)))
  }

  /**
    * Asynchronously add a bin.
    *
    * @param username The username of the requesting user.
    * @param name The name of the new bin.
    * @return `true` on success, `false` on already exists.
    */
  def addBin(username: String, name: String): Future[Boolean] = {
    db.run(
      (for {
        user <- Users if user.username === username
      } yield {
        user.id
      }).result
    ).map(ids => ids.map(id => {
      val matches = db.run(Bins.filter(row => row.name === name).result)
      matches.flatMap(_ match {
        case Nil => 
          db.run(Bins += BinsRow(-1, id, name))
          Future.successful(true)
        case _ => Future.successful(false)
        })
    }))
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
    val matches = db.run(ArticlesBins.filter(row => row.binId === binId && row.articleId=== articleId).result)
    matches.flatMap(_ match {
      case Nil => 
        db.run(ArticlesBins += ArticlesBinsRow(binId, articleId))
        Future.successful(true)
      case _ => Future.successful(false)
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
    db.run(ArticlesBins.filter(row => row.binId === binId && row.articleId === articleId).delete).map(count => count > 0)
  }

}

