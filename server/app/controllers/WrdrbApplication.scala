package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._

import javax.inject._
import play.api.data._
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.mvc._
import play.api.libs.json._
import models._

@Singleton
class WrdrbApplication @Inject()(cc: ControllerComponents) extends AbstractController(cc) {
  implicit val outfitWrite = Json.writes[Outfit]
  implicit val ec: scala.concurrent.ExecutionContext = scala.concurrent.ExecutionContext.global   
  def withJsonBody[A](f: A => Result)(implicit request: Request[AnyContent], reads: Reads[A]) = {
    request.body.asJson.map { body =>
      Json.fromJson[A](body) match {
        case JsSuccess(a, path) => f(a)
        case e @ JsError(_) => 
          println(e)
          Redirect(routes.WrdrbApplication.index())
      }
    }.getOrElse { println("bad Json");Redirect(routes.WrdrbApplication.index()) }
  }

  def index = Action { implicit request =>
    Ok(views.html.index())
  }

  def outfitLog = Action.async {implicit request => 
    val username = "Lizzie" //TODO: replace with call from session
    val data = OutfitModel.getOutfits(username)
    data.map(outfits=> Ok(Json.toJson(outfits)))
  }
}
