# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.5.58-0ubuntu0.14.04.1)
# Database: personalworkouts
# Generation Time: 2017-12-08 14:26:45 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table calendar
# ------------------------------------------------------------


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

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;

INSERT INTO `exercise` (`id`, `name`, `description`, `muscle_group_id`)
VALUES
	(1,'Supino reto com barra','',1),
	(2,'Crossover com cabo',NULL,1),
	(3,'Supino reto sentado no aparelho',NULL,1),
	(4,'Supino inclinado com halter',NULL,1),
	(5,'Supino inclinado com barra',NULL,1),
	(6,'Crucifixo inclinado com halter',NULL,1),
	(7,'Crucifixo inclinado com cabo',NULL,1),
	(8,'Crucifixo reto com cabo',NULL,1),
	(9,'Crucifixo reto com halter',NULL,1),
	(10,'Supino declinado com barra',NULL,1),
	(11,'Supino declinado com halter',NULL,1),
	(12,'Pullover',NULL,1),
	(13,'Supino inclinado sentado no aparelho',NULL,1),
	(14,'Supino declinado sentado no aparelho',NULL,1),
	(15,'Peck-Deck',NULL,1),
	(16,'Crucifixo declinado com halter',NULL,1),
	(17,'Barras paralelas',NULL,1),
	(18,'Flexões',NULL,1);

INSERT INTO `exercise` (`id`, `name`, `description`, `muscle_group_id`)
VALUES
	(19,'Barra fixa pegada aberta',NULL,2),
	(20,'Remada unilateral com haltere',NULL,2),
	(21,'Barra fixa pegada fechada',NULL,2),
	(22,'Remada baixa sentada pegada fechada',NULL,2),
	(23,'Remada baixa sentada pegada aberta',NULL,2),
	(24,'Remada em pé na barra T',NULL,2),
	(25,'Remada curvada',NULL,2),
	(26,'Remada curvada com pegada invertida',NULL,2),
	(27,'Remada no banco inclinado com halteres',NULL,2),
	(28,'Levantamento terra com barra',NULL,2),
	(29,'Levantamento terra com halter',NULL,2),
	(30,'Pulley com pegada aberta',NULL,2),
	(31,'Pulley com pegada fechada',NULL,2);

INSERT INTO `exercise` (`id`, `name`, `description`, `muscle_group_id`)
VALUES
	(32,'Agachamento livre',NULL,3),
	(33,'Passadas afundo',NULL,3),
	(34,'Levantamento terra',NULL,3),
	(35,'Adução de pernas',NULL,3),
	(36,'Abdução de pernas',NULL,3),
	(37,'Agachamento no smith',NULL,3),
	(38,'Agachamento na máquina',NULL,3),
	(39,'Agachamento pela frente',NULL,3),
	(40,'Extensão de joelhos',NULL,3),
	(41,'Leg press 45º',NULL,3),
	(42,'Leg Press vertical',NULL,3),
	(43,'Agachamento sumô',NULL,3),
	(44,'Stiff',NULL,3),
	(45,'Flexão de joelhos sentado',NULL,3),
	(46,'Mesa flexora',NULL,3);

INSERT INTO `exercise` (`id`, `name`, `description`, `muscle_group_id`)
VALUES
	(47,'Desenvolvimento com halteres',NULL,5),
	(48,'Desenvolvimento na frente com barra',NULL,5),
	(49,'Levantamento lateral com halteres',NULL,5),
	(50,'Levantamento lateral no cabo',NULL,5),
	(51,'Levantamento frontal com halteres',NULL,5),
	(52,'Remada alta em pé',NULL,5),
	(53,'Remada alta no cabo',NULL,5),
	(54,'Crucifixo invertido no aparelho',NULL,5),
	(55,'Crucifixo invertido no banco com halteres',NULL,5),
	(56,'Desenvolvimento Arnold',NULL,5);

INSERT INTO `exercise` (`id`, `name`, `description`, `muscle_group_id`)
VALUES
	(57,'Tríceps testa',NULL,4),
	(58,'Rosca no puxador',NULL,4),
	(59,'Rosca com barra reta',NULL,4),
	(60,'Rosca com barra W',NULL,4),
	(61,'Tríceps no banco',NULL,4),
	(62,'Extensão de tríceps com pegada neutra',NULL,4),
	(63,'Bíceps com barra no banco Scott',NULL,4),
	(64,'Bíceps na máquina Scott',NULL,4),
	(65,'Rosca simultânea',NULL,4),
	(66,'Rosca simultânea com parada em cima',NULL,4),
	(67,'Tríceps supinado',NULL,4),
	(68,'Tríceps puxador reto',NULL,4),
	(69,'Tríceps puxador W',NULL,4),
	(70,'Tríceps puxador corda',NULL,4),
	(71,'Tríceps francês',NULL,4),
	(72,'Tríceps coice',NULL,4);

INSERT INTO `exercise` (`id`, `name`, `description`, `muscle_group_id`)
VALUES
	(73,'Prancha',NULL,6),
	(74,'Abdominal supra com anilha',NULL,6),
	(75,'Abdominal rolinho',NULL,6),
	(76,'Abdominal no puxador',NULL,6);

/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table exercise_company
# ------------------------------------------------------------

LOCK TABLES `exercise_company` WRITE;
/*!40000 ALTER TABLE `exercise_company` DISABLE KEYS */;

INSERT INTO `exercise_company` (`id`, `company_id`, `exercise_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,1,3),
	(4,1,4),
	(5,1,5),
	(6,1,6),
	(7,1,7),
	(8,1,8),
	(9,1,9),
	(10,1,10),
	(11,1,11),
	(12,1,12),
	(13,1,13),
	(14,1,14),
	(15,1,15),
	(16,1,16),
	(17,1,17),
	(18,1,18),
	(19,1,19),
	(20,1,20),
	(21,1,21),
	(22,1,22),
	(23,1,23),
	(24,1,24),
	(25,1,25),
	(26,1,26),
	(27,1,27),
	(28,1,28),
	(29,1,29),
	(30,1,30),
	(31,1,31),
	(32,1,32),
	(33,1,33),
	(34,1,34),
	(35,1,35),
	(36,1,36),
	(37,1,37),
	(38,1,38),
	(39,1,39),
	(40,1,40),
	(41,1,41),
	(42,1,42),
	(43,1,43),
	(44,1,44),
	(45,1,45),
	(46,1,46),
	(47,1,47),
	(48,1,48),
	(49,1,49),
	(50,1,50),
	(51,1,51),
	(52,1,52),
	(53,1,53),
	(54,1,54),
	(55,1,55),
	(56,1,56),
	(57,1,57),
	(58,1,58),
	(59,1,59),
	(60,1,60),
	(61,1,61),
	(62,1,62),
	(63,1,63),
	(64,1,64),
	(65,1,65),
	(66,1,66),
	(67,1,67),
	(68,1,68),
	(69,1,69),
	(70,1,70),
	(71,1,71),
	(72,1,72),
	(73,1,73),
	(74,1,74),
	(75,1,75),
	(76,1,76);

/*!40000 ALTER TABLE `exercise_company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table muscle_group
# ------------------------------------------------------------

LOCK TABLES `muscle_group` WRITE;
/*!40000 ALTER TABLE `muscle_group` DISABLE KEYS */;

INSERT INTO `muscle_group` (`id`, `name`)
VALUES
	(1,'Peito'),
	(2,'Costas'),
	(3,'Pernas'),
	(4,'Braços'),
	(5,'Ombros'),
	(6,'Abdominais');

/*!40000 ALTER TABLE `muscle_group` ENABLE KEYS */;
UNLOCK TABLES;


INSERT INTO `muscle_group_company` (`id`, `company_id`, `muscle_group_id`)
VALUES
	(1,1,1),
	(2,1,2),
	(3,1,3),
	(4,1,4),
	(5,1,5),
	(6,1,6);


# Dump of table plan
# ------------------------------------------------------------

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;

INSERT INTO `plan` (`id`, `name`, `days_per_week`, `difficulty_id`)
VALUES
	(1,'Treino de força',4,2);

/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table plan_company
# ------------------------------------------------------------

LOCK TABLES `plan_company` WRITE;
/*!40000 ALTER TABLE `plan_company` DISABLE KEYS */;

INSERT INTO `plan_company` (`id`, `plan_id`, `company_id`)
VALUES
	(1,1,1);

/*!40000 ALTER TABLE `plan_company` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table token
# ------------------------------------------------------------


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
