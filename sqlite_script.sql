-- import to SQLite by running: sqlite3.exe db.sqlite3 -init sqlite.sql
CREATE TABLE IF NOT EXISTS `banner` (
`banner_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`image` TEXT NOT NULL,
`description` TEXT NOT NULL,
`created_at` timestamp NOT NULL,
`updated_at` timestamp NOT NULL
);

CREATE TABLE IF NOT EXISTS `cart` (
`cart_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`customer_id` int NOT NULL,
`product_id` int NOT NULL,
`quantity` int NOT NULL,
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);


CREATE TABLE IF NOT EXISTS `category` (
`category_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`name` TEXT NOT NULL,
`description` text,
`parent_id` int DEFAULT '0',
`status` tinyint DEFAULT '1',
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS `communes` (
`id` INTEGER PRIMARY KEY AUTOINCREMENT,
`ref_id` mediumint DEFAULT NULL,
`label` int NOT NULL,
`prefix` tinyint NOT NULL ,
`name_en` TEXT   NOT NULL,
`name_kh` TEXT   NOT NULL,
`district_id` int NOT NULL,
`start_date` date NOT NULL ,
`end_date` date DEFAULT NULL ,
`status` tinyint NOT NULL ,
`created_at` timestamp NOT NULL,
`created_by` int NOT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`updated_by` int DEFAULT NULL);

CREATE TABLE IF NOT EXISTS `customer` (
`customer_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`firstname` TEXT NOT NULL,
`lastname` TEXT NOT NULL,
`gender` tinyINTEGER NOT NULL DEFAULT '1',
`username` TEXT NOT NULL,
`password` TEXT NOT NULL,
`is_active` tinyINTEGER NOT NULL DEFAULT '1',
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
DROP TABLE IF EXISTS `customer_address`;

CREATE TABLE IF NOT EXISTS `customer_address` (
`customer_address_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`customer_id` int NOT NULL,
`province_id` int NOT NULL,
`firstname` TEXT NOT NULL,
`lastname` TEXT NOT NULL,
`tel` TEXT NOT NULL,
`address_des` text NOT NULL,
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);
DROP TABLE IF EXISTS `districts`;

CREATE TABLE IF NOT EXISTS `districts` (
`id` INTEGER PRIMARY KEY AUTOINCREMENT,
`ref_id` int DEFAULT NULL ,
`label` int NOT NULL,
`prefix` tinyint NOT NULL ,
`name_en` TEXT   NOT NULL,
`name_kh` TEXT   NOT NULL,
`province_id` tinyint  NOT NULL,
`status` tinyINTEGER NOT NULL ,
`start_date` date NOT NULL ,
`end_date` date DEFAULT NULL ,
`created_at` timestamp NOT NULL,
`created_by` int  NOT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`updated_by` int DEFAULT NULL);

CREATE TABLE IF NOT EXISTS `employee` (
`employee_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`firstname` TEXT NOT NULL,
`lastname` TEXT NOT NULL,
`tel` TEXT NOT NULL,
`email` TEXT DEFAULT NULL,
`base_salary` decimal(6,0) DEFAULT NULL,
`address` text,
`province` TEXT DEFAULT NULL,
`country` TEXT DEFAULT NULL,
`create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP);
DROP TABLE IF EXISTS `order`;

CREATE TABLE IF NOT EXISTS `order` (
`order_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`customer_id` int NOT NULL,
`order_status_id` int NOT NULL,
`payement_methode_id` int NOT NULL,
`invvoice_no` TEXT NOT NULL,
`order_total` decimal(6,0) NOT NULL,
`comment` text,
`firstname` TEXT NOT NULL,
`lastname` TEXT NOT NULL,
`telelphone` TEXT NOT NULL,
`address_des` text NOT NULL,
`status` tinyINTEGER DEFAULT '1',
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS `order_detail` (
`order_detail_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`order_id` int NOT NULL,
`product_id` int NOT NULL,
`quantity` int NOT NULL,
`price` decimal(6,0) NOT NULL);

CREATE TABLE IF NOT EXISTS `order_status` (
`order_status_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`name` TEXT NOT NULL,
`message` text NOT NULL,
`sort_order` int DEFAULT '0');
DROP TABLE IF EXISTS `payement_methode`;

CREATE TABLE IF NOT EXISTS `payement_methode` (
`payement_methode_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`name` int NOT NULL,
`code` int NOT NULL
);
DROP TABLE IF EXISTS `product`;

CREATE TABLE IF NOT EXISTS `product` (
`product_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`category_id` int NOT NULL,
`barcode` TEXT NOT NULL,
`name` TEXT NOT NULL,
`star_rating` int NOT NULL,
`quantity` int NOT NULL,
`price` decimal(6,0) NOT NULL,
`image` TEXT DEFAULT NULL,
`description` text,
`is_active` tinyINTEGER NOT NULL DEFAULT '1',
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`create_by` int DEFAULT NULL,
`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE IF NOT EXISTS `product_image` (
`product_image_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`product_id` int NOT NULL,
`image` TEXT NOT NULL,
`is_active` tinyINTEGER NOT NULL DEFAULT '1'
);

CREATE TABLE IF NOT EXISTS `provinces` (
`id` INTEGER  PRIMARY KEY AUTOINCREMENT,
`ref_id` tinyint  DEFAULT NULL ,
`label` int NOT NULL,
`prefix` tinyint NOT NULL ,
`name_en` TEXT   NOT NULL,
`name_kh` TEXT   NOT NULL,
`status` tinyint NOT NULL ,
`start_date` date NOT NULL ,
`end_date` date DEFAULT NULL ,
`created_at` timestamp NOT NULL,
`created_by` int NOT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`updated_by` int DEFAULT NULL
);
DROP TABLE IF EXISTS `villages`;

CREATE TABLE IF NOT EXISTS `villages` (
`id` INTEGER  PRIMARY KEY AUTOINCREMENT,
`ref_id` mediumint  DEFAULT NULL ,
`label` int NOT NULL,
`name_en` TEXT   NOT NULL,
`name_kh` TEXT   NOT NULL,
`commune_id` int  NOT NULL,
`hc_code` int  DEFAULT NULL ,
`status` smallint  NOT NULL DEFAULT '1' ,
`start_date` date NOT NULL ,
`end_date` date DEFAULT NULL ,
`household` mediumint  NOT NULL DEFAULT '0' ,
`population` mediumint  NOT NULL DEFAULT '0' ,
`created_at` timestamp NOT NULL,
`created_by` int NOT NULL,
`updated_at` timestamp NULL DEFAULT NULL,
`updated_by` int  DEFAULT NULL
);
DROP TABLE IF EXISTS `wishlist`;

CREATE TABLE IF NOT EXISTS `wishlist` (
`wishlist_id` INTEGER PRIMARY KEY AUTOINCREMENT,
`product_id` int NOT NULL,
`customer_id` int NOT NULL,
`create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);
COMMIT;



CREATE INDEX `communes_start_date` ON `communes` (`start_date`);
CREATE INDEX `communes_end_date` ON `communes` (`end_date`);
CREATE INDEX `communes_status` ON `communes` (`status`);
CREATE INDEX `communes_district_code` ON `communes` (`district_id`);
CREATE INDEX `communes_ref_code` ON `communes` (`ref_id`);
CREATE INDEX `communes_label` ON `communes` (`label`);
CREATE INDEX `districts_status` ON `districts` (`status`);
CREATE INDEX `districts_ref_code` ON `districts` (`ref_id`);
CREATE INDEX `districts_label` ON `districts` (`label`);
CREATE INDEX `districts_province_code` ON `districts` (`province_id`);
CREATE INDEX `districts_start_date` ON `districts` (`start_date`);
CREATE INDEX `districts_end_date` ON `districts` (`end_date`);
CREATE INDEX `provinces_status` ON `provinces` (`status`);
CREATE INDEX `provinces_start_date` ON `provinces` (`start_date`);
CREATE INDEX `provinces_end_date` ON `provinces` (`end_date`);
CREATE INDEX `provinces_ref_code` ON `provinces` (`ref_id`);
CREATE INDEX `provinces_label` ON `provinces` (`label`);
CREATE INDEX `villages_HFCode` ON `villages` (`hc_code`);
CREATE INDEX `villages_CCode` ON `villages` (`commune_id`);
CREATE INDEX `villages_ref_code` ON `villages` (`ref_id`);
CREATE INDEX `villages_label` ON `villages` (`label`);
CREATE INDEX `villages_status` ON `villages` (`status`);
CREATE INDEX `villages_start_date` ON `villages` (`start_date`);
CREATE INDEX `villages_end_date` ON `villages` (`end_date`);

