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
import play.api.libs.json._
import models._

//            Potential Types for Bins Method
// case class User(username: String)
// case class Bin(name: String, articles: Seq[String])

@Singleton
class Application @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)
    (implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
  private val database = new WrdrbDb(db)

  // Implicit Reads and Writes
  import models.User.Implicits._
  import models.AuthenticatingUser.Implicits._
  implicit val articleWriter = Json.writes[Article]
  implicit val outfitWriter = Json.writes[Outfit]

  def index = Action.async { implicit request =>
    Future {
      Ok(views.html.index())
    }
  }
  def outfitLog = Action.async {implicit request => 
    println("hi!")
    val username = "lizzie" //TODO: replace with call from session
    val outfitData = database.getOutfits(username)
    println("got outfits")
    outfitData.map(outfits=> Ok(Json.toJson(outfits)))

  }

  def validateUser = Action.async { implicit request =>
    withJsonBody[AuthenticatingUser] { authUser =>
      val AuthenticatingUser(username, password) = authUser
      database.validateLogin(username, password).map(_ match {
        case Some(user) => Ok(Json.toJson(user))
        case None       => Unauthorized("Authentication Failed")
      })
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

  private def withJsonBody[A](onSuccess: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(aData, _) => onSuccess(aData)
        case e @ JsError(_) => Future { internalErrorResponse }
      }
    }.getOrElse(Future { internalErrorResponse })
  }

  private def internalErrorResponse = {
    InternalServerError("An internal error occurred.")
  }
}
