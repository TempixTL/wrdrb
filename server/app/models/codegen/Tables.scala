package models.codegen
// AUTO-GENERATED Slick data model
/** Stand-alone Slick data model for immediate use */
object Tables extends {
  val profile = slick.jdbc.PostgresProfile
} with Tables

/** Slick data model trait for extension, choice of backend or usage in the cake pattern. (Make sure to initialize this late.) */
trait Tables {
  val profile: slick.jdbc.JdbcProfile
  import profile.api._
  import slick.model.ForeignKeyAction
  // NOTE: GetResult mappers for plain SQL are only generated for tables where Slick knows how to map the types of all columns.
  import slick.jdbc.{GetResult => GR}

  /** DDL for all tables. Call .create to execute. */
  lazy val schema: profile.SchemaDescription = Array(Articles.schema, ArticlesBins.schema, Bins.schema, ClothingTypes.schema, Colors.schema, Outfits.schema, OutfitsArticles.schema, Users.schema, WeatherConditions.schema).reduceLeft(_ ++ _)
  @deprecated("Use .schema instead of .ddl", "3.0")
  def ddl = schema

  /** Entity class storing rows of table Articles
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param userId Database column user_id SqlType(int4)
   *  @param brand Database column brand SqlType(varchar), Length(100,true)
   *  @param material Database column material SqlType(varchar), Length(200,true)
   *  @param color Database column color SqlType(int4), Default(None)
   *  @param clothingType Database column clothing_type SqlType(int4), Default(None)
   *  @param weatherCondition Database column weather_condition SqlType(int4), Default(None)
   *  @param image Database column image SqlType(bytea), Default(None) */
  case class ArticlesRow(id: Int, userId: Int, brand: String, material: String, color: Option[Int] = None, clothingType: Option[Int] = None, weatherCondition: Option[Int] = None, image: Option[Array[Byte]] = None)
  /** GetResult implicit for fetching ArticlesRow objects using plain SQL queries */
  implicit def GetResultArticlesRow(implicit e0: GR[Int], e1: GR[String], e2: GR[Option[Int]], e3: GR[Option[Array[Byte]]]): GR[ArticlesRow] = GR{
    prs => import prs._
    ArticlesRow.tupled((<<[Int], <<[Int], <<[String], <<[String], <<?[Int], <<?[Int], <<?[Int], <<?[Array[Byte]]))
  }
  /** Table description of table articles. Objects of this class serve as prototypes for rows in queries. */
  class Articles(_tableTag: Tag) extends profile.api.Table[ArticlesRow](_tableTag, "articles") {
    def * = (id, userId, brand, material, color, clothingType, weatherCondition, image) <> (ArticlesRow.tupled, ArticlesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(userId), Rep.Some(brand), Rep.Some(material), color, clothingType, weatherCondition, image)).shaped.<>({r=>import r._; _1.map(_=> ArticlesRow.tupled((_1.get, _2.get, _3.get, _4.get, _5, _6, _7, _8)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column user_id SqlType(int4) */
    val userId: Rep[Int] = column[Int]("user_id")
    /** Database column brand SqlType(varchar), Length(100,true) */
    val brand: Rep[String] = column[String]("brand", O.Length(100,varying=true))
    /** Database column material SqlType(varchar), Length(200,true) */
    val material: Rep[String] = column[String]("material", O.Length(200,varying=true))
    /** Database column color SqlType(int4), Default(None) */
    val color: Rep[Option[Int]] = column[Option[Int]]("color", O.Default(None))
    /** Database column clothing_type SqlType(int4), Default(None) */
    val clothingType: Rep[Option[Int]] = column[Option[Int]]("clothing_type", O.Default(None))
    /** Database column weather_condition SqlType(int4), Default(None) */
    val weatherCondition: Rep[Option[Int]] = column[Option[Int]]("weather_condition", O.Default(None))
    /** Database column image SqlType(bytea), Default(None) */
    val image: Rep[Option[Array[Byte]]] = column[Option[Array[Byte]]]("image", O.Default(None))

    /** Foreign key referencing ClothingTypes (database name fk_clothing_type) */
    lazy val clothingTypesFk = foreignKey("fk_clothing_type", clothingType, ClothingTypes)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Colors (database name fk_color) */
    lazy val colorsFk = foreignKey("fk_color", color, Colors)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Users (database name fk_user_id) */
    lazy val usersFk = foreignKey("fk_user_id", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing WeatherConditions (database name fk_weather_conditions) */
    lazy val weatherConditionsFk = foreignKey("fk_weather_conditions", weatherCondition, WeatherConditions)(r => Rep.Some(r.id), onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Articles */
  lazy val Articles = new TableQuery(tag => new Articles(tag))

  /** Entity class storing rows of table ArticlesBins
   *  @param binId Database column bin_id SqlType(int4)
   *  @param articleId Database column article_id SqlType(int4) */
  case class ArticlesBinsRow(binId: Int, articleId: Int)
  /** GetResult implicit for fetching ArticlesBinsRow objects using plain SQL queries */
  implicit def GetResultArticlesBinsRow(implicit e0: GR[Int]): GR[ArticlesBinsRow] = GR{
    prs => import prs._
    ArticlesBinsRow.tupled((<<[Int], <<[Int]))
  }
  /** Table description of table articles_bins. Objects of this class serve as prototypes for rows in queries. */
  class ArticlesBins(_tableTag: Tag) extends profile.api.Table[ArticlesBinsRow](_tableTag, "articles_bins") {
    def * = (binId, articleId) <> (ArticlesBinsRow.tupled, ArticlesBinsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(binId), Rep.Some(articleId))).shaped.<>({r=>import r._; _1.map(_=> ArticlesBinsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column bin_id SqlType(int4) */
    val binId: Rep[Int] = column[Int]("bin_id")
    /** Database column article_id SqlType(int4) */
    val articleId: Rep[Int] = column[Int]("article_id")

    /** Foreign key referencing Articles (database name fk_article_id) */
    lazy val articlesFk = foreignKey("fk_article_id", articleId, Articles)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Bins (database name fk_bin_id) */
    lazy val binsFk = foreignKey("fk_bin_id", binId, Bins)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table ArticlesBins */
  lazy val ArticlesBins = new TableQuery(tag => new ArticlesBins(tag))

  /** Entity class storing rows of table Bins
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param userId Database column user_id SqlType(int4)
   *  @param name Database column name SqlType(varchar), Length(100,true) */
  case class BinsRow(id: Int, userId: Int, name: String)
  /** GetResult implicit for fetching BinsRow objects using plain SQL queries */
  implicit def GetResultBinsRow(implicit e0: GR[Int], e1: GR[String]): GR[BinsRow] = GR{
    prs => import prs._
    BinsRow.tupled((<<[Int], <<[Int], <<[String]))
  }
  /** Table description of table bins. Objects of this class serve as prototypes for rows in queries. */
  class Bins(_tableTag: Tag) extends profile.api.Table[BinsRow](_tableTag, "bins") {
    def * = (id, userId, name) <> (BinsRow.tupled, BinsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(userId), Rep.Some(name))).shaped.<>({r=>import r._; _1.map(_=> BinsRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column user_id SqlType(int4) */
    val userId: Rep[Int] = column[Int]("user_id")
    /** Database column name SqlType(varchar), Length(100,true) */
    val name: Rep[String] = column[String]("name", O.Length(100,varying=true))

    /** Foreign key referencing Users (database name fk_user_id) */
    lazy val usersFk = foreignKey("fk_user_id", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Bins */
  lazy val Bins = new TableQuery(tag => new Bins(tag))

  /** Entity class storing rows of table ClothingTypes
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(20,true) */
  case class ClothingTypesRow(id: Int, name: String)
  /** GetResult implicit for fetching ClothingTypesRow objects using plain SQL queries */
  implicit def GetResultClothingTypesRow(implicit e0: GR[Int], e1: GR[String]): GR[ClothingTypesRow] = GR{
    prs => import prs._
    ClothingTypesRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table clothing_types. Objects of this class serve as prototypes for rows in queries. */
  class ClothingTypes(_tableTag: Tag) extends profile.api.Table[ClothingTypesRow](_tableTag, "clothing_types") {
    def * = (id, name) <> (ClothingTypesRow.tupled, ClothingTypesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(name))).shaped.<>({r=>import r._; _1.map(_=> ClothingTypesRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(20,true) */
    val name: Rep[String] = column[String]("name", O.Length(20,varying=true))
  }
  /** Collection-like TableQuery object for table ClothingTypes */
  lazy val ClothingTypes = new TableQuery(tag => new ClothingTypes(tag))

  /** Entity class storing rows of table Colors
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(20,true) */
  case class ColorsRow(id: Int, name: String)
  /** GetResult implicit for fetching ColorsRow objects using plain SQL queries */
  implicit def GetResultColorsRow(implicit e0: GR[Int], e1: GR[String]): GR[ColorsRow] = GR{
    prs => import prs._
    ColorsRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table colors. Objects of this class serve as prototypes for rows in queries. */
  class Colors(_tableTag: Tag) extends profile.api.Table[ColorsRow](_tableTag, "colors") {
    def * = (id, name) <> (ColorsRow.tupled, ColorsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(name))).shaped.<>({r=>import r._; _1.map(_=> ColorsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(20,true) */
    val name: Rep[String] = column[String]("name", O.Length(20,varying=true))
  }
  /** Collection-like TableQuery object for table Colors */
  lazy val Colors = new TableQuery(tag => new Colors(tag))

  /** Entity class storing rows of table Outfits
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param userId Database column user_id SqlType(int4)
   *  @param outfitDate Database column outfit_date SqlType(timestamp), Default(None)
   *  @param image Database column image SqlType(bytea), Default(None) */
  case class OutfitsRow(id: Int, userId: Int, outfitDate: Option[java.sql.Timestamp] = None, image: Option[Array[Byte]] = None)
  /** GetResult implicit for fetching OutfitsRow objects using plain SQL queries */
  implicit def GetResultOutfitsRow(implicit e0: GR[Int], e1: GR[Option[java.sql.Timestamp]], e2: GR[Option[Array[Byte]]]): GR[OutfitsRow] = GR{
    prs => import prs._
    OutfitsRow.tupled((<<[Int], <<[Int], <<?[java.sql.Timestamp], <<?[Array[Byte]]))
  }
  /** Table description of table outfits. Objects of this class serve as prototypes for rows in queries. */
  class Outfits(_tableTag: Tag) extends profile.api.Table[OutfitsRow](_tableTag, "outfits") {
    def * = (id, userId, outfitDate, image) <> (OutfitsRow.tupled, OutfitsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(userId), outfitDate, image)).shaped.<>({r=>import r._; _1.map(_=> OutfitsRow.tupled((_1.get, _2.get, _3, _4)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column user_id SqlType(int4) */
    val userId: Rep[Int] = column[Int]("user_id")
    /** Database column outfit_date SqlType(timestamp), Default(None) */
    val outfitDate: Rep[Option[java.sql.Timestamp]] = column[Option[java.sql.Timestamp]]("outfit_date", O.Default(None))
    /** Database column image SqlType(bytea), Default(None) */
    val image: Rep[Option[Array[Byte]]] = column[Option[Array[Byte]]]("image", O.Default(None))

    /** Foreign key referencing Users (database name fk_user_id) */
    lazy val usersFk = foreignKey("fk_user_id", userId, Users)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table Outfits */
  lazy val Outfits = new TableQuery(tag => new Outfits(tag))

  /** Entity class storing rows of table OutfitsArticles
   *  @param outfitId Database column outfit_id SqlType(int4)
   *  @param articleId Database column article_id SqlType(int4) */
  case class OutfitsArticlesRow(outfitId: Int, articleId: Int)
  /** GetResult implicit for fetching OutfitsArticlesRow objects using plain SQL queries */
  implicit def GetResultOutfitsArticlesRow(implicit e0: GR[Int]): GR[OutfitsArticlesRow] = GR{
    prs => import prs._
    OutfitsArticlesRow.tupled((<<[Int], <<[Int]))
  }
  /** Table description of table outfits_articles. Objects of this class serve as prototypes for rows in queries. */
  class OutfitsArticles(_tableTag: Tag) extends profile.api.Table[OutfitsArticlesRow](_tableTag, "outfits_articles") {
    def * = (outfitId, articleId) <> (OutfitsArticlesRow.tupled, OutfitsArticlesRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(outfitId), Rep.Some(articleId))).shaped.<>({r=>import r._; _1.map(_=> OutfitsArticlesRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column outfit_id SqlType(int4) */
    val outfitId: Rep[Int] = column[Int]("outfit_id")
    /** Database column article_id SqlType(int4) */
    val articleId: Rep[Int] = column[Int]("article_id")

    /** Foreign key referencing Articles (database name fk_article_id) */
    lazy val articlesFk = foreignKey("fk_article_id", articleId, Articles)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
    /** Foreign key referencing Outfits (database name fk_outfit_id) */
    lazy val outfitsFk = foreignKey("fk_outfit_id", outfitId, Outfits)(r => r.id, onUpdate=ForeignKeyAction.NoAction, onDelete=ForeignKeyAction.NoAction)
  }
  /** Collection-like TableQuery object for table OutfitsArticles */
  lazy val OutfitsArticles = new TableQuery(tag => new OutfitsArticles(tag))

  /** Entity class storing rows of table Users
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param username Database column username SqlType(varchar), Length(20,true)
   *  @param password Database column password SqlType(varchar), Length(200,true) */
  case class UsersRow(id: Int, username: String, password: String)
  /** GetResult implicit for fetching UsersRow objects using plain SQL queries */
  implicit def GetResultUsersRow(implicit e0: GR[Int], e1: GR[String]): GR[UsersRow] = GR{
    prs => import prs._
    UsersRow.tupled((<<[Int], <<[String], <<[String]))
  }
  /** Table description of table users. Objects of this class serve as prototypes for rows in queries. */
  class Users(_tableTag: Tag) extends profile.api.Table[UsersRow](_tableTag, "users") {
    def * = (id, username, password) <> (UsersRow.tupled, UsersRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(username), Rep.Some(password))).shaped.<>({r=>import r._; _1.map(_=> UsersRow.tupled((_1.get, _2.get, _3.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column username SqlType(varchar), Length(20,true) */
    val username: Rep[String] = column[String]("username", O.Length(20,varying=true))
    /** Database column password SqlType(varchar), Length(200,true) */
    val password: Rep[String] = column[String]("password", O.Length(200,varying=true))
  }
  /** Collection-like TableQuery object for table Users */
  lazy val Users = new TableQuery(tag => new Users(tag))

  /** Entity class storing rows of table WeatherConditions
   *  @param id Database column id SqlType(serial), AutoInc, PrimaryKey
   *  @param name Database column name SqlType(varchar), Length(40,true) */
  case class WeatherConditionsRow(id: Int, name: String)
  /** GetResult implicit for fetching WeatherConditionsRow objects using plain SQL queries */
  implicit def GetResultWeatherConditionsRow(implicit e0: GR[Int], e1: GR[String]): GR[WeatherConditionsRow] = GR{
    prs => import prs._
    WeatherConditionsRow.tupled((<<[Int], <<[String]))
  }
  /** Table description of table weather_conditions. Objects of this class serve as prototypes for rows in queries. */
  class WeatherConditions(_tableTag: Tag) extends profile.api.Table[WeatherConditionsRow](_tableTag, "weather_conditions") {
    def * = (id, name) <> (WeatherConditionsRow.tupled, WeatherConditionsRow.unapply)
    /** Maps whole row to an option. Useful for outer joins. */
    def ? = ((Rep.Some(id), Rep.Some(name))).shaped.<>({r=>import r._; _1.map(_=> WeatherConditionsRow.tupled((_1.get, _2.get)))}, (_:Any) =>  throw new Exception("Inserting into ? projection not supported."))

    /** Database column id SqlType(serial), AutoInc, PrimaryKey */
    val id: Rep[Int] = column[Int]("id", O.AutoInc, O.PrimaryKey)
    /** Database column name SqlType(varchar), Length(40,true) */
    val name: Rep[String] = column[String]("name", O.Length(40,varying=true))
  }
  /** Collection-like TableQuery object for table WeatherConditions */
  lazy val WeatherConditions = new TableQuery(tag => new WeatherConditions(tag))
}
