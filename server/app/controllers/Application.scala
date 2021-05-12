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
    withJsonBody[AuthenticatingUser] {
      case AuthenticatingUser(username, password) =>
        database.validateLogin(username, password).map {
          case Some(user) => Ok(Json.toJson(user)).withSession("username" -> username)
          case None       => Unauthorized("Authentication Failed")
        }
    }
  }

  def registerUser = Action.async { implicit request =>
    withJsonBody[AuthenticatingUser] { 
      case AuthenticatingUser(username, password) =>
        database.validateRegister(username, password).map {
          case Some(user) => Ok(Json.toJson(user)).withSession("username" -> username)
          case None       => Conflict("Username already taken")
        }
    }
  }

  def getUser(userId: String) = Action.async { implicit request =>
    database.getUser(userId).map {
      case Some(user) => Ok(Json.toJson(user))
      case None       => NotFound("User not found.")
    }
  }

 def getAllBins = Action.async {implicit request => 
    withSessionUsername { username =>
      val bins = database.getAllBins(username)
      bins.map(bins => Ok(Json.toJson(bins)))
    }
  }

  def getBin(binId: Int) = Action.async {implicit request =>
    database.getBin(binId).map(bin => Ok(Json.toJson(bin)))
  }

  def addBin = Action.async {implicit request =>
    withJsonBody[NewBin] {
      case NewBin(name) =>
        withSessionUsername { username => 
          val res = database.addBin(username, name)
          res.map(result => Ok(Json.toJson(result)))
        }
      case _ => Ok(Json.toJson(false))
    }
  }

  def deleteBin(binId: Int) = Action.async {implicit request =>
    database.deleteBin(binId).map(res => Ok(Json.toJson(res)))
  }

  def addArticleToBin(binId: Int, articleId: Int) = Action.async {implicit request => 
    database.addArticleToBin(binId, articleId).map(res => Ok(Json.toJson(res)))
  }

  def removeArticleFromBin(binId: Int, articleId: Int) = Action.async {implicit request => 
    database.removeArticleFromBin(binId, articleId).map(res => Ok(Json.toJson(res)))
  }

  private def withJsonBody[A](onSuccess: A => Future[Result])(implicit request: Request[AnyContent], reads: Reads[A]): Future[Result] = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(aData, _) => onSuccess(aData)
        case e @ JsError(_) => Future(BadRequest("Missing required information."))
      }
    }.getOrElse(Future(BadRequest("Unable to parse body as JSON.")))
  }

  def withSessionUsername(f: String => Result)(implicit request: Request[AnyContent]) = {
    request.session.get("username").map(f).getOrElse(Ok(Json.toJson(Seq.empty[String])))
  }

}
