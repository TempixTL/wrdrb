package models
import scala.concurrent.Future
import models.codegen.Tables

case class Article (brand: String, material: String, clothing_type: Option[Int], color: Option[Int], weather_condition: Option[Int])
case class Outfit (date: String, articles: Seq[Article])
