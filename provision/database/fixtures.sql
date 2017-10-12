# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.57-0ubuntu0.14.04.1)
# Database: personalworkouts
# Generation Time: 2017-09-29 17:56:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table company
# ------------------------------------------------------------

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;

INSERT INTO `company` (`id`, `name`)
VALUES
	(1,'V2RM');

/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table day
# ------------------------------------------------------------

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;

INSERT INTO `exercise` (`id`, `name`, `description`)
VALUES
	(1,'Supino reto com barra','1. Na posição deitada em um banco plano, faça uma pegada na barra com o dorso das mãos voltado para cima e o afastamento entre elas igual à distância entre os ombros.<br><br>2. Abaixe lentamente o peso até tocar a parte média do tórax.<br><br>3. Empurre a barra diretamente para cima, até que ocorra bloqueio dos cotovelos.');

/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table day_exercise
# ------------------------------------------------------------



# Dump of table difficulty
# ------------------------------------------------------------

LOCK TABLES `difficulty` WRITE;
/*!40000 ALTER TABLE `difficulty` DISABLE KEYS */;

INSERT INTO `difficulty` (`id`, `name`)
VALUES
	(1,'Iniciante'),
	(2,'Intermediário'),
	(3,'Avançado');

/*!40000 ALTER TABLE `difficulty` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table exercise
# ------------------------------------------------------------

LOCK TABLES `exercise_company` WRITE;
/*!40000 ALTER TABLE `exercise_company` DISABLE KEYS */;

INSERT INTO `exercise_company` (`id`, `company_id`, `exercise_id`)
VALUES
	(1,1,1);

/*!40000 ALTER TABLE `exercise_company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table plan
# ------------------------------------------------------------

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;

INSERT INTO `plan` (`id`, `name`, `days_per_week`, `difficulty_id`)
VALUES
	(1,'Treino de força',4,2);

/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;


LOCK TABLES `plan_company` WRITE;
/*!40000 ALTER TABLE `plan_company` DISABLE KEYS */;

INSERT INTO `plan_company` (`id`, `plan_id`, `company_id`)
VALUES
	(1,1,1);

/*!40000 ALTER TABLE `plan_company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_type
# ------------------------------------------------------------

LOCK TABLES `user_type` WRITE;
/*!40000 ALTER TABLE `user_type` DISABLE KEYS */;

INSERT INTO `user_type` (`id`, `name`)
VALUES
	(1,'master'),
	(2,'admin'),
	(3,'professor'),
	(4,'estudante');

/*!40000 ALTER TABLE `user_type` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table users
# ------------------------------------------------------------

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `name`, `email`, `password`, `company_id`, `user_type_id`)
VALUES
	(1,'Vinicius Roloff Marques','vinicius@v2rm.com.br','055b5d00885ec3f0c84957c292d2eb51c423abc9',1,1),
	(2,'Admin','admin@v2rm.com.br','055b5d00885ec3f0c84957c292d2eb51c423abc9',1,2),
	(3,'Professor','professor@v2rm.com.br','055b5d00885ec3f0c84957c292d2eb51c423abc9',1,3),
	(4,'Aluno','aluno@v2rm.com.br','055b5d00885ec3f0c84957c292d2eb51c423abc9',1,4);

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
