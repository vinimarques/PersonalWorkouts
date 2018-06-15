-- MySQL Script generated by MySQL Workbench
-- Thu Jun 14 21:59:56 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema personalworkouts
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema personalworkouts
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `personalworkouts` DEFAULT CHARACTER SET utf8 ;
USE `personalworkouts` ;

-- -----------------------------------------------------
-- Table `personalworkouts`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`user_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`user_type` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NULL,
  `email` VARCHAR(256) NULL,
  `password` VARCHAR(256) NULL,
  `company_id` INT NOT NULL,
  `user_type_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_users_company_idx` (`company_id` ASC),
  INDEX `fk_users_user_type1_idx` (`user_type_id` ASC),
  CONSTRAINT `fk_users_company`
    FOREIGN KEY (`company_id`)
    REFERENCES `personalworkouts`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_user_type1`
    FOREIGN KEY (`user_type_id`)
    REFERENCES `personalworkouts`.`user_type` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`muscle_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`muscle_group` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`exercise` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(256) NULL,
  `description` TEXT(256) NULL,
  `muscle_group_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_exercise_muscle_group1_idx` (`muscle_group_id` ASC),
  CONSTRAINT `fk_exercise_muscle_group1`
    FOREIGN KEY (`muscle_group_id`)
    REFERENCES `personalworkouts`.`muscle_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`day`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`day` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`day_exercise_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`day_exercise_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `day_id` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`day_exercise`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`day_exercise` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rep_1` INT NULL,
  `rep_2` INT NULL,
  `rep_3` INT NULL,
  `rep_4` INT NULL,
  `rep_5` INT NULL,
  `note` TEXT(256) NULL,
  `day_id` INT NOT NULL,
  `day_exercise_group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_day_exercise_day1_idx` (`day_id` ASC),
  INDEX `fk_day_exercise_day_exercise_group1_idx` (`day_exercise_group_id` ASC),
  CONSTRAINT `fk_day_exercise_day1`
    FOREIGN KEY (`day_id`)
    REFERENCES `personalworkouts`.`day` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_day_exercise_day_exercise_group1`
    FOREIGN KEY (`day_exercise_group_id`)
    REFERENCES `personalworkouts`.`day_exercise_group` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`token`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`token` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(250) NULL,
  `date` DATETIME NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  INDEX `fk_token_users1_idx` (`user_id` ASC),
  CONSTRAINT `fk_token_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `personalworkouts`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`exercise_company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`exercise_company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `exercise_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exercise_company_company1_idx` (`company_id` ASC),
  INDEX `fk_exercise_company_exercise1_idx` (`exercise_id` ASC),
  CONSTRAINT `fk_exercise_company_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `personalworkouts`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercise_company_exercise1`
    FOREIGN KEY (`exercise_id`)
    REFERENCES `personalworkouts`.`exercise` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`calendar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`calendar` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  `day_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_calendar_users1_idx` (`user_id` ASC),
  INDEX `fk_calendar_day1_idx` (`day_id` ASC),
  CONSTRAINT `fk_calendar_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `personalworkouts`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calendar_day1`
    FOREIGN KEY (`day_id`)
    REFERENCES `personalworkouts`.`day` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`muscle_group_company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`muscle_group_company` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `muscle_group_id` INT UNSIGNED NOT NULL,
  `company_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_muscle_group_company_muscle_group1_idx` (`muscle_group_id` ASC),
  INDEX `fk_muscle_group_company_company1_idx` (`company_id` ASC),
  CONSTRAINT `fk_muscle_group_company_muscle_group1`
    FOREIGN KEY (`muscle_group_id`)
    REFERENCES `personalworkouts`.`muscle_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_muscle_group_company_company1`
    FOREIGN KEY (`company_id`)
    REFERENCES `personalworkouts`.`company` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`weigth`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`weigth` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `value` FLOAT NULL,
  `date` VARCHAR(45) NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `date_UNIQUE` (`date` ASC),
  INDEX `fk_weigth_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_weigth_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `personalworkouts`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`tracking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`tracking` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `date` VARCHAR(45) NULL,
  `time` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tracking_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_tracking_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `personalworkouts`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `personalworkouts`.`exercise_group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `personalworkouts`.`exercise_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `exercise_id` INT NOT NULL,
  `day_exercise_group_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_exercise_group_exercise1_idx` (`exercise_id` ASC),
  INDEX `fk_exercise_group_day_exercise_group1_idx` (`day_exercise_group_id` ASC),
  CONSTRAINT `fk_exercise_group_exercise1`
    FOREIGN KEY (`exercise_id`)
    REFERENCES `personalworkouts`.`exercise` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_exercise_group_day_exercise_group1`
    FOREIGN KEY (`day_exercise_group_id`)
    REFERENCES `personalworkouts`.`day_exercise_group` (`id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `personalworkouts`;

DELIMITER $$
USE `personalworkouts`$$
CREATE DEFINER = CURRENT_USER TRIGGER `personalworkouts`.`day_BEFORE_DELETE` BEFORE DELETE ON `day` FOR EACH ROW
BEGIN
DELETE FROM calendar WHERE calendar.day_id = old.id;
END
$$

USE `personalworkouts`$$
CREATE DEFINER = CURRENT_USER TRIGGER `personalworkouts`.`day_exercise_group_BEFORE_DELETE` BEFORE DELETE ON `day_exercise_group` FOR EACH ROW
BEGIN
DELETE FROM exercise_group WHERE exercise_group.day_exercise_group_id = old.id;
END$$

USE `personalworkouts`$$
CREATE DEFINER = CURRENT_USER TRIGGER `personalworkouts`.`day_exercise_BEFORE_DELETE` BEFORE DELETE ON `day_exercise` FOR EACH ROW
BEGIN
DELETE FROM day_exercise_group WHERE day_exercise_group.id = old.day_exercise_group_id;
END$$


DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
