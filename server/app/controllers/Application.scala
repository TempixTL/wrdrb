package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._
import scala.concurrent.{Future, ExecutionContext}
import play.api.db.slick.DatabaseConfigProvider
import play.api.db.slick.HasDatabaseConfigProvider
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import models.WrdrbDb

//            Potential Types for Bins Method
// case class User(username: String)
// case class Bin(name: String, articles: Seq[String])

@Singleton
class Application @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)
    (implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
  private val database = new WrdrbDb(db)

  def index = Action.async { implicit request =>
    Future {
      Ok(views.html.index())
    }
  }

  //            Rough Draft Method for Getting Bins
  //
  // def bins = Action { implicit request => 
  //   request.body.asJson.map { body => 
  //               Json.fromJson[User](body) match {
  //                   case JsSuccess(user, path) => {   
  //                       val bins = WRDRB.getBins(user.username)
  //                       Ok(Json.toJson(bins)
  //                   }
  //                   case e @ JsError(_) => Ok(Json.toJson(false))
  //               }
  //           }.getOrElse(Redirect(routes.Application.index()))
  // }

}
