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
import play.filters.csrf.CSRF

@Singleton
class Application @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, cc: ControllerComponents)
    (implicit ec: ExecutionContext) extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
  private val database = new WrdrbDb(db)

  // Implicit Reads and Writes
  import models.User.Implicits._
  import models.AuthenticatingUser.Implicits._
  import models.NewBin.Implicits._
  implicit val articleWriter = Json.writes[Article]
  implicit val outfitWriter = Json.writes[Outfit]
  implicit val binWriter = Json.writes[Bin]

  def index = Action.async { implicit request =>
    Future {
      Ok(views.html.index()).withSession("username"-> "wrdrb")
    }
  }
  def outfitLog = Action.async {implicit request => 
    request.session.get("username") match {
      case Some(username) => {
        val outfits = database.getOutfits(username)
        outfits.map{outfits => 
          Ok(Json.toJson(outfits))}
      }
      case None => 
        println("no session in outfit log")
        Future(BadRequest(""))
    }
  }
    
    //stub controller methods and use dummy data


  def validateUser = Action.async { implicit request =>
    withJsonBody[AuthenticatingUser] {
      case AuthenticatingUser(username, password) =>
        database.validateLogin(username, password).map {
          case Some(user) => Ok(Json.toJson(user)).withSession(
            "username" -> username,
            "csrfToken" -> CSRF.getToken.get.value)
          case None       => Unauthorized("Authentication Failed")
        }
    }
  }

  def registerUser = Action.async { implicit request =>
    withJsonBody[AuthenticatingUser] { 
      case AuthenticatingUser(username, password) =>
        database.validateRegister(username, password).map {
          case Some(user) => Ok(Json.toJson(user)).withSession(
            "username" -> username,
            "csrfToken" -> CSRF.getToken.get.value)
          case None       => Conflict("Username already taken")
        }
    }
  }

  def logout = Action { implicit request =>
    Ok("").withSession(request.session - "username")
  }

  def getUser(userId: String) = Action.async { implicit request =>
    database.getUser(userId).map {
      case Some(user) => Ok(Json.toJson(user))
      case None       => NotFound("User not found.")
    }
  }

 def getAllBins = Action.async {implicit request => 
    request.session.get("username") match {
      case Some(username) => {
        val bins = database.getAllBins(username)
        bins.map(bins => Ok(Json.toJson(bins)))
      }
      case None => Future(BadRequest(""))
    }
  }

  def getBin(binId: String) = Action.async {implicit request =>
    database.getBin(binId.toInt).map(bins => Ok(Json.toJson(bins)))
  }

  def addBin = Action.async {implicit request =>
    withJsonBody[NewBin] {
      case NewBin(name) =>
        request.session.get("username") match {
          case Some(username) => {
            val res = database.addBin(username, name)
            res.map(result => Ok(Json.toJson(result)))
          }
          case None => Future(BadRequest(""))
        }
      case _ => Future.successful(Ok(Json.toJson(false)))
    }
  }

  def deleteBin(binId: String) = Action.async {implicit request =>
    database.deleteBin(binId.toInt).map(res => Ok(Json.toJson(res)))
  }

  def addArticleToBin(binId: String, articleId: String) = Action.async {implicit request => 
    database.addArticleToBin(binId.toInt, articleId.toInt).map(res => Ok(Json.toJson(res)))
  }

  def removeArticleFromBin(binId: String, articleId: String) = Action.async {implicit request => 
    database.removeArticleFromBin(binId.toInt, articleId.toInt).map(res => Ok(Json.toJson(res)))
  }

  private def withJsonBody[A](onSuccess: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(aData, _) => onSuccess(aData)
        case e @ JsError(_) => Future(BadRequest("Missing required information."))
      }
    }.getOrElse(Future(BadRequest("Unable to parse body as JSON.")))
  }

}
