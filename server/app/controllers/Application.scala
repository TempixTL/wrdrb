package controllers

import javax.inject._

import shared.SharedMessages
import play.api.mvc._

//            Potential Types for Bins Method
// case class User(username: String)
// case class Bin(name: String, articles: Seq[String])

@Singleton
class Application @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  def index = Action { implicit request =>
    Ok(views.html.index())
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
