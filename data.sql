/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : onelife

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-08-28 15:39:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for todos
-- ----------------------------
DROP TABLE IF EXISTS `todos`;
CREATE TABLE `todos` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `context` text NOT NULL,
  `public_time` bigint(12) unsigned NOT NULL DEFAULT '0',
  `finished_time` bigint(12) unsigned NOT NULL DEFAULT '0',
  `type_id` smallint(5) unsigned NOT NULL,
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of todos
-- ----------------------------
INSERT INTO `todos` VALUES ('1', '铲土', '201708281534', '0', '1', '0');
INSERT INTO `todos` VALUES ('2', '浇花', '201708281535', '0', '2', '0');
INSERT INTO `todos` VALUES ('3', '打怪', '201708281536', '0', '3', '0');
INSERT INTO `todos` VALUES ('4', '送花', '201608281537', '201708281537', '3', '1');

-- ----------------------------
-- Table structure for todostype
-- ----------------------------
DROP TABLE IF EXISTS `todostype`;
CREATE TABLE `todostype` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of todostype
-- ----------------------------
INSERT INTO `todostype` VALUES ('1', '工作');
INSERT INTO `todostype` VALUES ('2', '生活');
INSERT INTO `todostype` VALUES ('3', '娱乐');

SET FOREIGN_KEY_CHECKS=1;
