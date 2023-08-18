-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: cake_house
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_customuser'),(22,'Can change user',6,'change_customuser'),(23,'Can delete user',6,'delete_customuser'),(24,'Can view user',6,'view_customuser'),(25,'Can add inventory',7,'add_inventory'),(26,'Can change inventory',7,'change_inventory'),(27,'Can delete inventory',7,'delete_inventory'),(28,'Can view inventory',7,'view_inventory'),(29,'Can add product',8,'add_product'),(30,'Can change product',8,'change_product'),(31,'Can delete product',8,'delete_product'),(32,'Can view product',8,'view_product'),(33,'Can add customer',9,'add_customer'),(34,'Can change customer',9,'change_customer'),(35,'Can delete customer',9,'delete_customer'),(36,'Can view customer',9,'view_customer'),(37,'Can add sales',10,'add_sales'),(38,'Can change sales',10,'change_sales'),(39,'Can delete sales',10,'delete_sales'),(40,'Can view sales',10,'view_sales'),(41,'Can add franchise',11,'add_franchise'),(42,'Can change franchise',11,'change_franchise'),(43,'Can delete franchise',11,'delete_franchise'),(44,'Can view franchise',11,'view_franchise');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_customer`
--

DROP TABLE IF EXISTS `customer_customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_customer` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `pin` varchar(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `points` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `customer_customer_chk_1` CHECK ((`points` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_customer`
--

LOCK TABLES `customer_customer` WRITE;
/*!40000 ALTER TABLE `customer_customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer_customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_user_customuser_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_user_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `user_customuser` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(9,'customer','customer'),(11,'franchise','franchise'),(7,'inventory','inventory'),(8,'product','product'),(10,'sales','sales'),(5,'sessions','session'),(6,'user','customuser');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2023-08-16 17:54:53.624058'),(2,'contenttypes','0002_remove_content_type_name','2023-08-16 17:54:53.689539'),(3,'auth','0001_initial','2023-08-16 17:54:53.916591'),(4,'auth','0002_alter_permission_name_max_length','2023-08-16 17:54:53.963521'),(5,'auth','0003_alter_user_email_max_length','2023-08-16 17:54:53.975572'),(6,'auth','0004_alter_user_username_opts','2023-08-16 17:54:53.984522'),(7,'auth','0005_alter_user_last_login_null','2023-08-16 17:54:53.993571'),(8,'auth','0006_require_contenttypes_0002','2023-08-16 17:54:53.999519'),(9,'auth','0007_alter_validators_add_error_messages','2023-08-16 17:54:54.012523'),(10,'auth','0008_alter_user_username_max_length','2023-08-16 17:54:54.024519'),(11,'auth','0009_alter_user_last_name_max_length','2023-08-16 17:54:54.035964'),(12,'auth','0010_alter_group_name_max_length','2023-08-16 17:54:54.063425'),(13,'auth','0011_update_proxy_permissions','2023-08-16 17:54:54.076466'),(14,'auth','0012_alter_user_first_name_max_length','2023-08-16 17:54:54.089426'),(15,'user','0001_initial','2023-08-16 17:54:54.547075'),(16,'admin','0001_initial','2023-08-16 17:54:54.680111'),(17,'admin','0002_logentry_remove_auto_add','2023-08-16 17:54:54.692125'),(18,'admin','0003_logentry_add_action_flag_choices','2023-08-16 17:54:54.709071'),(19,'customer','0001_initial','2023-08-16 17:54:54.735117'),(20,'customer','0002_customer_points','2023-08-16 17:54:54.792800'),(21,'franchise','0001_initial','2023-08-16 17:54:54.821801'),(22,'franchise','0002_alter_franchise_pin','2023-08-16 17:54:54.870839'),(23,'product','0001_initial','2023-08-16 17:54:54.902093'),(24,'inventory','0001_initial','2023-08-16 17:54:55.069680'),(25,'product','0002_product_product_image_alter_product_quantity','2023-08-16 17:54:55.117635'),(26,'product','0003_alter_product_product_image','2023-08-16 17:54:55.127704'),(27,'sales','0001_initial','2023-08-16 17:54:55.259639'),(28,'sales','0002_sales_franchise','2023-08-16 17:54:55.343892'),(29,'sessions','0001_initial','2023-08-16 17:54:55.387885'),(30,'user','0002_customuser_created_at_customuser_updated_at','2023-08-16 17:54:55.552239'),(31,'user','0003_alter_customuser_created_at','2023-08-16 17:54:55.565193'),(32,'user','0004_customuser_franchise','2023-08-16 17:54:55.647194'),(33,'user','0005_customuser_user_type','2023-08-16 17:54:55.726784');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `franchise_franchise`
--

DROP TABLE IF EXISTS `franchise_franchise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `franchise_franchise` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `password` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `username` varchar(254) NOT NULL,
  `contact_email` varchar(254) NOT NULL,
  `pin` varchar(6) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `date_established` date NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `franchise_franchise`
--

LOCK TABLES `franchise_franchise` WRITE;
/*!40000 ALTER TABLE `franchise_franchise` DISABLE KEYS */;
INSERT INTO `franchise_franchise` VALUES (1,'xsvcf','xsacvsd','bcrypt_sha256$$2b$12$vSVom01ReZz37BVucfzDFe5sfRTDeAfk55.pb6AD2kOS/8I4.nl8G','cdsdv','sandhya.6255@gmail.com','sandhya.6255@gmail.com','346758','+917012966566','2023-06-18',1,'2023-08-17 14:28:52.711908','2023-08-17 14:28:52.711908'),(2,'SANDHYA SURESH','abc','bcrypt_sha256$$2b$12$q.qCY3F8Uxan5sNyC6rNH.GbNCZ1.lsMrDt6sW0AcEGc9uUNCvRU2','csdfa','vkkv10@gmail.com','vkkv10@gmail.com','436587','8089656862','2023-08-13',1,'2023-08-17 18:07:52.881849','2023-08-17 18:07:52.881849'),(3,'sandhya','abc','bcrypt_sha256$$2b$12$Yi9wlixIlmwHs8I/XNL75.EJEwafmK4/w2pQqHtUAJdfUR5OjsKrC','asfdsfgdg','sandyash2252@gmail.com','sandyash2252@gmail.com','346758','+917012966566','2023-06-05',1,'2023-08-17 18:14:24.089100','2023-08-17 18:14:24.089100'),(4,'SANDHYA SURESH','abc','bcrypt_sha256$$2b$12$0pj1aYTC.H0fG8f4C4ppDuQCoTDdH0Y6liy0mfAVtWPzFkhwUsKtK','\"RAM NIVAS\" (PO) AROLI, PAPPINISSERRI, KANNUR','sandhya.6255@gmail.com','vkkv10@gmail.com','234567','8089656862','2023-05-17',1,'2023-08-17 18:24:39.935690','2023-08-17 18:24:39.935690'),(5,'SANDHYA SURESH','abc','bcrypt_sha256$$2b$12$wc3RdeX52TUFz8j6Uf1MROtjsQ7LdUdao7WNpSMPKZMrljG4xytqu','\"RAM NIVAS\" (PO) AROLI, PAPPINISSERRI, KANNUR','sandyash2252@gmail.com','sandyash2252@gmail.com','234567','8089656862','2023-05-17',1,'2023-08-17 18:25:11.130372','2023-08-17 18:25:11.130372'),(6,'SANDHYA SURESH','abc','bcrypt_sha256$$2b$12$fcv/W8Coah9JTG5aBAvH0eb/JCpkOKtVS4V6MPnRWbdgGp.9IqCEu','\"RAM NIVAS\" (PO) AROLI, PAPPINISSERRI, KANNUR','vkkv10@gmail.com','vkkv10@gmail.com','234567','8089656862','2023-05-17',1,'2023-08-17 18:26:08.343649','2023-08-17 18:26:08.343649'),(7,'SANDHYA SURESH','abc','bcrypt_sha256$$2b$12$CseSrPftWOEoQRZ9WDzb5ek92bOWEbag0/RUulKl50nvwafxtxn.S','\"RAM NIVAS\" (PO) AROLI, PAPPINISSERRI, KANNUR','abc@gmail.com','abc@gmail.com','234567','8089656862','2023-05-17',1,'2023-08-17 18:26:22.596000','2023-08-17 18:26:22.596000'),(8,'ABC','dewfre','bcrypt_sha256$$2b$12$tdN4CW19knFGIrY4lXkAF.cwSZ8lk3KWUdHjouM/CDq8Mg3NO0ITe','dsafdsf','asdfg@gmail.com','asdfg@gmail.com','346758','8089656862','2023-02-13',1,'2023-08-17 18:35:35.984065','2023-08-17 18:35:35.984065');
/*!40000 ALTER TABLE `franchise_franchise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_inventory`
--

DROP TABLE IF EXISTS `inventory_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_inventory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `available_quantity` int unsigned NOT NULL,
  `total_sold` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `franchise_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `inventory_inventory_franchise_id_083b8279_fk_franchise` (`franchise_id`),
  KEY `inventory_inventory_product_id_5b835926_fk_product_product_id` (`product_id`),
  CONSTRAINT `inventory_inventory_franchise_id_083b8279_fk_franchise` FOREIGN KEY (`franchise_id`) REFERENCES `franchise_franchise` (`id`),
  CONSTRAINT `inventory_inventory_product_id_5b835926_fk_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product_product` (`id`),
  CONSTRAINT `inventory_inventory_chk_1` CHECK ((`available_quantity` >= 0)),
  CONSTRAINT `inventory_inventory_chk_2` CHECK ((`total_sold` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_inventory`
--

LOCK TABLES `inventory_inventory` WRITE;
/*!40000 ALTER TABLE `inventory_inventory` DISABLE KEYS */;
INSERT INTO `inventory_inventory` VALUES (1,100,0,'2023-08-17 14:56:27.556400','2023-08-17 14:56:27.556400',1,1),(2,100,0,'2023-08-17 15:01:07.809725','2023-08-17 15:01:07.809725',1,1),(3,200,0,'2023-08-17 18:28:32.082865','2023-08-17 18:28:32.082865',3,1),(4,200,0,'2023-08-17 18:29:32.400952','2023-08-17 18:29:32.400952',3,1),(5,200,0,'2023-08-17 18:30:15.074226','2023-08-17 18:30:15.074226',3,1);
/*!40000 ALTER TABLE `inventory_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_product`
--

DROP TABLE IF EXISTS `product_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `product_image` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `product_product_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_product`
--

LOCK TABLES `product_product` WRITE;
/*!40000 ALTER TABLE `product_product` DISABLE KEYS */;
INSERT INTO `product_product` VALUES (1,'cupcake','xsacvsd',600.00,0,'2023-08-17 14:51:03.183420','2023-08-17 14:51:03.183420',''),(2,'cupcake','sweet',100.00,0,'2023-08-17 17:57:05.578220','2023-08-17 17:57:05.578220',''),(3,'plumcake','safdfs',234.00,0,'2023-08-17 18:46:34.397902','2023-08-17 18:46:34.399341','product_images/Screenshot_43.png'),(4,'abc','dsafdsfa',300.00,0,'2023-08-17 18:51:14.801170','2023-08-17 18:51:14.801170','');
/*!40000 ALTER TABLE `product_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_sales`
--

DROP TABLE IF EXISTS `sales_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_sales` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity_sold` int unsigned NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `sale_date` datetime(6) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `product_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `franchise_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sales_sales_product_id_cd9ab4bc_fk_product_product_id` (`product_id`),
  KEY `sales_sales_user_id_4542c1a1_fk_user_customuser_id` (`user_id`),
  KEY `sales_sales_franchise_id_d4a281e3_fk_franchise_franchise_id` (`franchise_id`),
  CONSTRAINT `sales_sales_franchise_id_d4a281e3_fk_franchise_franchise_id` FOREIGN KEY (`franchise_id`) REFERENCES `franchise_franchise` (`id`),
  CONSTRAINT `sales_sales_product_id_cd9ab4bc_fk_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `product_product` (`id`),
  CONSTRAINT `sales_sales_user_id_4542c1a1_fk_user_customuser_id` FOREIGN KEY (`user_id`) REFERENCES `user_customuser` (`id`),
  CONSTRAINT `sales_sales_chk_1` CHECK ((`quantity_sold` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_sales`
--

LOCK TABLES `sales_sales` WRITE;
/*!40000 ALTER TABLE `sales_sales` DISABLE KEYS */;
/*!40000 ALTER TABLE `sales_sales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_customuser`
--

DROP TABLE IF EXISTS `user_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `franchise_id` bigint DEFAULT NULL,
  `user_type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `user_customuser_franchise_id_6c446366_fk_franchise_franchise_id` (`franchise_id`),
  CONSTRAINT `user_customuser_franchise_id_6c446366_fk_franchise_franchise_id` FOREIGN KEY (`franchise_id`) REFERENCES `franchise_franchise` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_customuser`
--

LOCK TABLES `user_customuser` WRITE;
/*!40000 ALTER TABLE `user_customuser` DISABLE KEYS */;
INSERT INTO `user_customuser` VALUES (1,'bcrypt_sha256$$2b$12$ULWJw5zYPEP25rU95MglYe.e3kSheGVb8.Nk7oPzY59u9VLdiNeei','2023-08-17 17:54:59.498761',1,'admin@example.com','Admin','1','admin@example.com',0,1,'2023-08-16 23:36:47.000000','1234567890','2023-08-16 23:36:47.000000','2023-08-16 23:36:47.000000',NULL,'admin'),(2,'bcrypt_sha256$$2b$12$vSVom01ReZz37BVucfzDFe5sfRTDeAfk55.pb6AD2kOS/8I4.nl8G',NULL,0,'sandhya.6255@gmail.com','','','sandhya.6255@gmail.com',0,1,'2023-08-17 14:28:52.728191','+917012966566','2023-08-17 14:28:52.728191','2023-08-17 14:28:52.737178',1,'franchise'),(3,'bcrypt_sha256$$2b$12$q.qCY3F8Uxan5sNyC6rNH.GbNCZ1.lsMrDt6sW0AcEGc9uUNCvRU2',NULL,0,'vkkv10@gmail.com','','','vkkv10@gmail.com',0,1,'2023-08-17 18:07:52.886630','8089656862','2023-08-17 18:07:52.887639','2023-08-17 18:07:52.892625',2,'franchise'),(4,'bcrypt_sha256$$2b$12$Yi9wlixIlmwHs8I/XNL75.EJEwafmK4/w2pQqHtUAJdfUR5OjsKrC',NULL,0,'sandyash2252@gmail.com','','','sandyash2252@gmail.com',0,1,'2023-08-17 18:14:24.095557','+917012966566','2023-08-17 18:14:24.096556','2023-08-17 18:14:24.102459',3,'franchise'),(8,'bcrypt_sha256$$2b$12$CseSrPftWOEoQRZ9WDzb5ek92bOWEbag0/RUulKl50nvwafxtxn.S',NULL,0,'abc@gmail.com','','','abc@gmail.com',0,1,'2023-08-17 18:26:22.605994','8089656862','2023-08-17 18:26:22.606987','2023-08-17 18:26:22.611978',7,'franchise'),(9,'bcrypt_sha256$$2b$12$tdN4CW19knFGIrY4lXkAF.cwSZ8lk3KWUdHjouM/CDq8Mg3NO0ITe',NULL,0,'asdfg@gmail.com','','','asdfg@gmail.com',0,1,'2023-08-17 18:35:35.990405','8089656862','2023-08-17 18:35:35.991402','2023-08-17 18:35:35.995380',8,'franchise');
/*!40000 ALTER TABLE `user_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_customuser_groups`
--

DROP TABLE IF EXISTS `user_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_customuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_customuser_groups_customuser_id_group_id_e0a2f621_uniq` (`customuser_id`,`group_id`),
  KEY `user_customuser_groups_group_id_bcbc9e48_fk_auth_group_id` (`group_id`),
  CONSTRAINT `user_customuser_grou_customuser_id_192632a7_fk_user_cust` FOREIGN KEY (`customuser_id`) REFERENCES `user_customuser` (`id`),
  CONSTRAINT `user_customuser_groups_group_id_bcbc9e48_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_customuser_groups`
--

LOCK TABLES `user_customuser_groups` WRITE;
/*!40000 ALTER TABLE `user_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_customuser_user_permissions`
--

DROP TABLE IF EXISTS `user_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_customuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_customuser_user_per_customuser_id_permission_a5da865d_uniq` (`customuser_id`,`permission_id`),
  KEY `user_customuser_user_permission_id_e57e8b9a_fk_auth_perm` (`permission_id`),
  CONSTRAINT `user_customuser_user_customuser_id_4552d9cc_fk_user_cust` FOREIGN KEY (`customuser_id`) REFERENCES `user_customuser` (`id`),
  CONSTRAINT `user_customuser_user_permission_id_e57e8b9a_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_customuser_user_permissions`
--

LOCK TABLES `user_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `user_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  0:28:13
