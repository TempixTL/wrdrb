package models

import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{Future, ExecutionContext}
import models.codegen.Tables

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
  //def addOutfits:Future = TODO
  //sort by date
}

