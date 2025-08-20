CREATE DATABASE  IF NOT EXISTS `db_sach` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `db_sach`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_sach
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `huespedes`
--

DROP TABLE IF EXISTS `huespedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `huespedes` (
  `id_rooms` int NOT NULL,
  `monto` double NOT NULL,
  `num_personas` int NOT NULL,
  `fecha_registro` datetime(6) NOT NULL,
  `fecha_salida` datetime(6) NOT NULL,
  `telefono` varchar(8) NOT NULL,
  `apellido_huesped` varchar(255) NOT NULL,
  `id_huesped` varchar(255) NOT NULL,
  `id_users` varchar(255) NOT NULL,
  `name_huesped` varchar(255) NOT NULL,
  `status_huesped` varchar(255) NOT NULL,
  PRIMARY KEY (`id_huesped`),
  KEY `FK8ns605ptepe739gnewd1r6tu5` (`id_rooms`),
  KEY `FK2mvt2dl6xqnbeowff3hfuh3jf` (`id_users`),
  CONSTRAINT `FK2mvt2dl6xqnbeowff3hfuh3jf` FOREIGN KEY (`id_users`) REFERENCES `users` (`id_users`),
  CONSTRAINT `FK8ns605ptepe739gnewd1r6tu5` FOREIGN KEY (`id_rooms`) REFERENCES `rooms` (`id_rooms`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huespedes`
--

LOCK TABLES `huespedes` WRITE;
/*!40000 ALTER TABLE `huespedes` DISABLE KEYS */;
INSERT INTO `huespedes` VALUES (102,485,1,'2025-06-11 12:00:00.000000','2025-06-12 12:00:00.000000','55484984','Toj','FT0663','AL0076','Flavio','cancelado'),(202,897,2,'2025-06-06 12:00:00.000000','2025-06-07 12:00:00.000000','40001234','Perez','PP0169','AL0076','Pedro','cancelado'),(103,195,1,'2025-05-31 12:00:00.000000','2025-06-01 12:00:00.000000','40001234','Perez','PP0721','AL0076','Pedro ','pendiente de pago');
/*!40000 ALTER TABLE `huespedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id_rooms` int NOT NULL,
  `precio` double DEFAULT NULL,
  `estado` enum('libre','limpieza','ocupada') DEFAULT NULL,
  `habitacion` enum('doble','normal','plus') DEFAULT NULL,
  `nivel` enum('N1','N2') DEFAULT NULL,
  PRIMARY KEY (`id_rooms`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (101,195,'libre','normal','N1'),(102,195,'libre','normal','N1'),(103,195,'ocupada','normal','N1'),(104,195,'libre','normal','N1'),(105,195,'libre','normal','N1'),(106,315,'libre','doble','N1'),(107,315,'libre','doble','N1'),(108,195,'libre','normal','N1'),(109,195,'libre','normal','N1'),(110,195,'libre','normal','N1'),(111,195,'libre','normal','N1'),(112,195,'libre','normal','N1'),(201,315,'libre','plus','N2'),(202,315,'libre','normal','N2'),(203,195,'libre','normal','N2'),(204,195,'libre','normal','N2'),(205,195,'libre','normal','N2'),(206,195,'libre','normal','N2'),(207,195,'libre','normal','N2'),(208,195,'libre','normal','N2'),(209,315,'libre','doble','N2'),(210,315,'libre','doble','N2'),(211,195,'libre','normal','N2'),(212,195,'libre','normal','N2'),(213,195,'libre','normal','N2'),(214,195,'libre','normal','N2'),(215,195,'libre','normal','N2'),(216,195,'libre','normal','N2'),(217,195,'libre','normal','N2'),(218,195,'libre','normal','N2'),(219,219,'libre','normal','N2'),(220,195,'libre','normal','N2'),(301,195,'libre','normal','N2');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `fecha_ingreso` date NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `id_users` varchar(255) NOT NULL,
  `imagen_base64` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `type_user` enum('admin','user') DEFAULT NULL,
  PRIMARY KEY (`id_users`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2025-05-23','LosMolinos','AL0076','AL0076.png','Admin','Admin1234*','admin'),('2025-05-27','User1','JL0060','JL0060.png','User1','User1234*','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-01 14:14:45
