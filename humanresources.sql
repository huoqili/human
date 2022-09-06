/*
 Navicat Premium Data Transfer

 Source Server         : admin
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : humanresources

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 02/12/2021 09:31:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, 'admin', 'b10927e78b36091531c60a9c2442895e93dc0dcd');

-- ----------------------------
-- Table structure for audition
-- ----------------------------
DROP TABLE IF EXISTS `audition`;
CREATE TABLE `audition`  (
  `aid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `times` date NOT NULL,
  `aname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rid` int(11) NOT NULL,
  `aphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `resume` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rqualified` int(1) NULL DEFAULT NULL,
  `rfeedback` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `atimes` date NULL DEFAULT NULL,
  `aresult` int(1) NULL DEFAULT NULL,
  `emresult` int(1) NULL DEFAULT NULL,
  `cevaluate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `emfeedback` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`aid`) USING BTREE,
  UNIQUE INDEX `aphone`(`aphone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of audition
-- ----------------------------
INSERT INTO `audition` VALUES (1, '2021-11-29', '胡汉三', 2, '15233333333', '/public/upload/img/20211026/1637941949316917.docx', 0, '33', '2021-11-15', 1, 1, '11', '22');
INSERT INTO `audition` VALUES (3, '2021-11-29', '胡汉一', 2, '15233333331', '/public/upload/img/20211026/1637941949316917.docx', 0, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `audition` VALUES (4, '2021-11-29', '胡汉二', 2, '1523333332', '/public/upload/img/20211026/1637941949316917.docx', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `audition` VALUES (5, '2021-11-29', '胡汉四', 2, '1523333311', '/public/upload/img/20211026/1637941949316917.docx', 0, NULL, NULL, 1, NULL, NULL, NULL);
INSERT INTO `audition` VALUES (6, '2021-11-29', '胡汉无', 2, '1523333321', '/public/upload/img/20211026/1637941949316917.docx', NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `audition` VALUES (7, '2021-11-29', '胡汉五', 2, '1523333331', '/public/upload/img/20211026/1637941949316917.docx', NULL, NULL, NULL, 1, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for businesstravel
-- ----------------------------
DROP TABLE IF EXISTS `businesstravel`;
CREATE TABLE `businesstravel`  (
  `btid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `did` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `btdata` date NOT NULL,
  `btstart` date NOT NULL,
  `btend` date NOT NULL,
  `btdays` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `btreason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `btaddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `btremarks` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `btcheck` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`btid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of businesstravel
-- ----------------------------
INSERT INTO `businesstravel` VALUES (1, 1, 3, 4, '2021-12-02', '2021-12-01', '2021-12-03', '2', '事由测试', '山西省长治市长治县', '测试备注', 1);
INSERT INTO `businesstravel` VALUES (2, 1, 3, 6, '2021-12-09', '2021-12-16', '2021-12-17', '1', '测试2', '北京', '无', 2);
INSERT INTO `businesstravel` VALUES (3, 1, 3, 1, '2021-12-16', '2021-12-17', '2021-12-24', '7', '测试3', '天津', '无', 2);
INSERT INTO `businesstravel` VALUES (4, 1, 3, 6, '2021-12-09', '2021-12-16', '2021-12-17', '1', '测试3', '山东省', '无', 1);
INSERT INTO `businesstravel` VALUES (5, 1, 3, 6, '2021-12-09', '2021-12-16', '2021-12-17', '1', '测试5', '山东省', '无', 0);
INSERT INTO `businesstravel` VALUES (6, 1, 3, 6, '2021-12-09', '2021-12-16', '2021-12-17', '1', '测试6', '山东省', '无', 2);
INSERT INTO `businesstravel` VALUES (7, 1, 3, 6, '2021-12-09', '2021-12-16', '2021-12-17', '1', '测试7', '山西省太原市', '无', 0);

-- ----------------------------
-- Table structure for contract
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract`  (
  `cid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '合同编号',
  `ctype` tinyint(1) NOT NULL COMMENT '合同类型',
  `cname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '合同名称',
  `start` date NOT NULL COMMENT '起始日期',
  `end` date NOT NULL COMMENT '终止日期',
  `try` int(11) NOT NULL COMMENT '试用期',
  `Aparty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '签订甲方',
  `sid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '员工的id',
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of contract
-- ----------------------------
INSERT INTO `contract` VALUES (2, 1, '王静和温兆龙的合同', '2016-02-17', '2116-02-17', 0, '王静', '8');
INSERT INTO `contract` VALUES (3, 2, '温兆龙工作的合同', '2019-11-03', '2028-11-17', 20, '王静', '6');
INSERT INTO `contract` VALUES (5, 1, '2', '2021-11-04', '2021-11-05', 222, '讲课费', '8');
INSERT INTO `contract` VALUES (6, 1, '胡汉三的合同', '2021-12-05', '2021-12-21', 30, 'a', '4');

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `did` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dnum` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `dname` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`did`) USING BTREE,
  UNIQUE INDEX `dnum`(`dnum`) USING BTREE,
  UNIQUE INDEX `dname`(`dname`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, 'uekyf', '研发部');
INSERT INTO `department` VALUES (3, 'uekys', '职能部');

-- ----------------------------
-- Table structure for handover
-- ----------------------------
DROP TABLE IF EXISTS `handover`;
CREATE TABLE `handover`  (
  `hid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '交接id',
  `sname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '离职申请人姓名',
  `snumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '离职申请人工号',
  `pid` int(11) NOT NULL COMMENT '离职人工位',
  `sinduction` date NOT NULL COMMENT '离职人入职时间',
  `qapplication` date NOT NULL COMMENT '离职申请时间',
  `hactual` date NOT NULL COMMENT '实际离职时间',
  `hwork` tinyint(1) NOT NULL COMMENT '交接工作事项',
  `hstate` tinyint(1) NOT NULL COMMENT '交接状态：已交接/未交接',
  `hperson` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '工作交接人',
  `htime` date NOT NULL COMMENT '交接时间',
  `did` int(11) NOT NULL COMMENT '员工部门',
  PRIMARY KEY (`hid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of handover
-- ----------------------------
INSERT INTO `handover` VALUES (5, '胡汉三1a', 'uek001', 1, '2021-11-24', '2021-11-24', '2021-11-17', 1, 1, '张武', '2021-11-21', 1);
INSERT INTO `handover` VALUES (6, '胡汉三1a', 'uek001', 1, '2021-11-28', '2021-11-28', '2021-11-28', 1, 1, '老三', '2021-11-28', 1);
INSERT INTO `handover` VALUES (7, '胡汉三1a', 'uek006', 1, '2021-11-28', '2021-11-22', '2021-11-21', 1, 1, '哈', '2021-11-20', 3);

-- ----------------------------
-- Table structure for induction
-- ----------------------------
DROP TABLE IF EXISTS `induction`;
CREATE TABLE `induction`  (
  `inid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `did` int(10) NOT NULL,
  `pid` int(10) NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `snumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sinduction` date NOT NULL COMMENT '入职时间',
  `snation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '民族',
  `documenttype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '证件类型',
  `documentphone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '证件号码',
  `ssex` tinyint(1) NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '现居住地址',
  `smarriage` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '婚姻状况',
  `socialsecurity` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '社保',
  `saccumulationfund` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '公积金',
  `spolitical` tinyint(1) NOT NULL COMMENT '政治面貌',
  `seducation` tinyint(1) NOT NULL COMMENT '学历',
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `smajor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '专业',
  `sgraduation` date NOT NULL COMMENT '毕业时间',
  `backcardnum` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '银行卡号',
  `back` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '开户银行',
  `linkman` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系人姓名',
  `relation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '关系',
  `linkmanphone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系人联系电话',
  `instate` int(1) NOT NULL DEFAULT 0 COMMENT '入职状态0未入职1入职',
  PRIMARY KEY (`inid`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  UNIQUE INDEX `snumber`(`snumber`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of induction
-- ----------------------------
INSERT INTO `induction` VALUES (1, '胡三', 1, 1, '18765453212', '1765323456@qq.com', 'kj2021', '2021-02-10', '汉族', '身份证', '134987199860987176', 1, '北京市,北京市,西城区区111', '未婚', '134987199860987176', '134987199860987176', 1, 1, '华中科技大学', '计算机科学', '2021-07-28', '63498719986098716', '招行银行', '中青', '父子', '19087675432', 0);
INSERT INTO `induction` VALUES (9, '张三', 1, 1, '1656565987', '17653234@qq.com', 'kj2021001', '2021-02-10', '汉族', '身份证', '134987199860987176', 1, '北京市,北京市,西城区二单元303', '未婚', '134987199860987176', '134987199860987176', 1, 1, '华中科技大学', '计算机科学', '2021-07-28', '63498719986098716', '招行银行', '中青', '父子', '1876848348', 0);
INSERT INTO `induction` VALUES (11, '张三', 1, 1, '187654532127', '176532345@qq.com', 'kj2021002', '2021-02-10', '汉族', '身份证', '134987199860987176', 1, '北京市,北京市,西城区564', '未婚', '134987199860987176', '134987199860987176', 1, 1, '华中科技大学', '计算机科学', '2021-07-28', '63498719986098716', '招行银行', '中青', '父子', '19087675432', 1);
INSERT INTO `induction` VALUES (14, '张三', 1, 4, '18765403212', '1765323056@qq.com', 'kj2021004', '2021-02-10', '汉族', '身份证', '1349871998699987176', 2, 'undefined', '未婚', '134987199860987176', '134987199860987176', 2, 3, '华中科技大学', '计算机科学', '2020-05-31', '63498719986098716', '招行银行', '中青', '父子', '1908765432', 1);

-- ----------------------------
-- Table structure for leaveask
-- ----------------------------
DROP TABLE IF EXISTS `leaveask`;
CREATE TABLE `leaveask`  (
  `alid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `did` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `aldata` date NOT NULL,
  `altype` tinyint(1) NOT NULL,
  `alreason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alstart` date NOT NULL,
  `alend` date NOT NULL,
  `aldays` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `alcheck` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`alid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of leaveask
-- ----------------------------
INSERT INTO `leaveask` VALUES (1, 1, 3, 4, '2021-11-14', 1, '没原因', '2021-11-24', '2021-11-29', '5', 0);
INSERT INTO `leaveask` VALUES (2, 1, 3, 1, '2021-11-22', 2, '事假', '2021-11-24', '2021-11-25', '1', 0);
INSERT INTO `leaveask` VALUES (3, 1, 3, 4, '2021-11-09', 1, 'no', '2021-11-10', '2021-11-18', '8', 0);
INSERT INTO `leaveask` VALUES (4, 1, 3, 5, '2021-11-27', 5, '时间测试', '2021-11-28', '2021-11-29', '1', 0);
INSERT INTO `leaveask` VALUES (5, 1, 3, 5, '2021-11-27', 3, '时间测试新', '2021-11-28', '2021-11-29', '1', 0);
INSERT INTO `leaveask` VALUES (6, 1, 3, 5, '2021-11-17', 3, '测试', '2021-11-24', '2021-11-25', '1', 0);
INSERT INTO `leaveask` VALUES (7, 1, 3, 6, '2021-11-10', 3, '测试', '2021-11-25', '2021-11-26', '1', 0);

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position`  (
  `pid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `did` int(11) NOT NULL,
  PRIMARY KEY (`pid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of position
-- ----------------------------
INSERT INTO `position` VALUES (1, 'WEB前端工程师', 1);
INSERT INTO `position` VALUES (2, 'HTML5', 1);
INSERT INTO `position` VALUES (3, 'WEB全栈开发工程师', 1);
INSERT INTO `position` VALUES (4, '小程序开发工程师', 1);
INSERT INTO `position` VALUES (5, '界面设计', 2);
INSERT INTO `position` VALUES (6, 'App设计', 2);
INSERT INTO `position` VALUES (7, '人事专员', 3);
INSERT INTO `position` VALUES (8, '前台', 3);

-- ----------------------------
-- Table structure for posttransfer
-- ----------------------------
DROP TABLE IF EXISTS `posttransfer`;
CREATE TABLE `posttransfer`  (
  `ptid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '调岗记录id',
  `filingdate` date NOT NULL COMMENT '申请时间',
  `snumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '申请人工号',
  `sname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '申请人',
  `sinduction` date NOT NULL COMMENT '入职时间',
  `did` int(11) NOT NULL COMMENT '原部门',
  `pid` int(11) NOT NULL COMMENT '原职位',
  `newdid` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '转入部门',
  `newpid` int(11) NOT NULL DEFAULT 0 COMMENT '转入岗位',
  `ptreason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '转岗原因',
  `ptstate` int(11) UNSIGNED NOT NULL DEFAULT 0 COMMENT '调岗状态0调岗失败1调岗成功',
  PRIMARY KEY (`ptid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posttransfer
-- ----------------------------
INSERT INTO `posttransfer` VALUES (5, '2021-11-01', 'uek003', '胡汉2', '2021-11-21', 1, 1, 1, 3, '个人申请', 0);

-- ----------------------------
-- Table structure for quit
-- ----------------------------
DROP TABLE IF EXISTS `quit`;
CREATE TABLE `quit`  (
  `qid` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `qname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '离职人名称',
  `qapplication` date NOT NULL COMMENT '离职申请时间',
  `qnumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '员工工号',
  `did` int(11) NOT NULL COMMENT '员工所在部门',
  `qinduction` date NOT NULL COMMENT '员工入职时间',
  `qlasttime` date NOT NULL COMMENT '员工最后工作日',
  `qreason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '离职原因',
  `qnote` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '离职原因备注',
  PRIMARY KEY (`qid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of quit
-- ----------------------------
INSERT INTO `quit` VALUES (3, '关云长', '2021-12-02', '005', 3, '2021-10-31', '2021-11-25', '1', '转型发展');
INSERT INTO `quit` VALUES (4, '刘备', '2021-12-10', '006', 1, '2021-10-31', '2021-11-25', '1', '转型发展');
INSERT INTO `quit` VALUES (6, '胡三', '2021-11-09', 'uek0002', 1, '2021-11-14', '2021-11-28', '1', '哈哈');

-- ----------------------------
-- Table structure for recruit
-- ----------------------------
DROP TABLE IF EXISTS `recruit`;
CREATE TABLE `recruit`  (
  `rid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `did` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `rname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rnum` int(11) NOT NULL,
  `rsalayarea` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rreason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rduty` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rcondition` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `urgent` int(1) NOT NULL,
  `rtimes` date NOT NULL,
  `arrive` date NOT NULL,
  PRIMARY KEY (`rid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recruit
-- ----------------------------
INSERT INTO `recruit` VALUES (2, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (3, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (4, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (5, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (6, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (7, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (8, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (9, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (10, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (11, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (12, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (13, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (14, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (15, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (16, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (17, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (18, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (19, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (20, 1, 3, '胡', 5, '8000-12000', '缺人', '负责页面还原和逻辑实现', '1-3年工作经验', 0, '2021-11-08', '2021-11-29');
INSERT INTO `recruit` VALUES (21, 3, 7, '汉', 5, '5000', '缺人', '服从安排', '无', 0, '2021-11-27', '2021-11-29');

-- ----------------------------
-- Table structure for regularization
-- ----------------------------
DROP TABLE IF EXISTS `regularization`;
CREATE TABLE `regularization`  (
  `rid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '转正id',
  `sid` int(11) NOT NULL COMMENT '员工id',
  `did` int(11) NOT NULL COMMENT '部门id',
  `applydate` date NOT NULL COMMENT '申请日期',
  `result` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '试用期工作成功描述',
  `appraise` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '自我综合评价',
  `plan` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '未来工作计划和目标',
  `forwork` tinyint(1) NOT NULL COMMENT '对试用期间对工作感到',
  `forpeople` tinyint(1) NOT NULL COMMENT '对公司人际关系感到',
  `forstrength` tinyint(1) NOT NULL COMMENT '对目前的工作强度感到',
  `forworkload` tinyint(1) NOT NULL COMMENT '对目前的工作量感到',
  `forenvironment` tinyint(1) NOT NULL COMMENT '对目前的工作环境感到',
  `forpay` tinyint(1) NOT NULL COMMENT '对目前的工作待遇感到',
  `pid` int(11) NOT NULL COMMENT '职位id',
  PRIMARY KEY (`rid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of regularization
-- ----------------------------
INSERT INTO `regularization` VALUES (9, 9, 3, '2021-11-05', '啊啊', '啊啊啊', '啊啊啊啊啊啊啊啊', 4, 4, 4, 4, 4, 4, 8);
INSERT INTO `regularization` VALUES (10, 10, 1, '2021-11-02', '000000', '000000000', '0000000000', 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `regularization` VALUES (11, 7, 1, '2021-12-07', '1', '2', '3', 1, 1, 1, 1, 1, 1, 3);

-- ----------------------------
-- Table structure for salay
-- ----------------------------
DROP TABLE IF EXISTS `salay`;
CREATE TABLE `salay`  (
  `sid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `pid` int(11) NOT NULL,
  `sphone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sbasicsalay` int(10) NOT NULL,
  `sovertimesalay` int(10) NOT NULL,
  `sprizesalay` int(10) NOT NULL,
  `ssubsidysalay` int(10) NOT NULL,
  `attendancesalay` int(10) NOT NULL,
  `fivesalay` int(10) NOT NULL,
  `taxsalay` int(10) NOT NULL,
  `factsalay` int(10) NOT NULL,
  `ssure` int(1) NULL DEFAULT 0,
  `stime` date NOT NULL,
  PRIMARY KEY (`sid`) USING BTREE,
  UNIQUE INDEX `sphone`(`sphone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salay
-- ----------------------------
INSERT INTO `salay` VALUES (1, '胡汉三1a', 3, '15233333333', 1000, 1, 1, 1, 1000, 1, 10, -8, 0, '2021-11-16');
INSERT INTO `salay` VALUES (2, '胡汉1', 3, '15233333336', 12000, 1000, 5000, 2000, 10000, 20, 2000, 7980, 0, '2021-11-02');
INSERT INTO `salay` VALUES (3, '胡汉2', 3, '15233333337', 8000, 3000, 2000, 1000, 500, 1000, 1000, 10000, 1, '2021-11-22');
INSERT INTO `salay` VALUES (4, '胡汉3', 3, '15233233337', 8000, 3000, 2000, 1000, 500, 1000, 1000, 10000, 0, '2021-11-22');
INSERT INTO `salay` VALUES (5, '胡汉4', 3, '15233233335', 8000, 3000, 2000, 1000, 500, 1000, 1000, 10000, 0, '2021-11-22');

-- ----------------------------
-- Table structure for salayback
-- ----------------------------
DROP TABLE IF EXISTS `salayback`;
CREATE TABLE `salayback`  (
  `fid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `snumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `freason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ftimes` date NOT NULL,
  `fstate` int(1) NULL DEFAULT 0,
  PRIMARY KEY (`fid`) USING BTREE,
  UNIQUE INDEX `snumber`(`snumber`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of salayback
-- ----------------------------
INSERT INTO `salayback` VALUES (1, '胡汉三1a', 'uek001', '考勤扣太多了', '2021-11-09', 2);
INSERT INTO `salayback` VALUES (4, '胡汉1', 'uek002', '考勤扣太多了', '2021-11-09', 2);
INSERT INTO `salayback` VALUES (5, '胡汉2', 'uek003', '考勤扣太多了', '2021-11-09', 1);

-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `sid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `did` int(11) NOT NULL,
  `pid` int(11) NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `snumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `sinduction` date NOT NULL,
  `ssex` tinyint(1) NOT NULL,
  `spolitical` tinyint(1) NOT NULL,
  `seducation` tinyint(1) NOT NULL,
  `school` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `smajor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `sgraduation` date NOT NULL,
  PRIMARY KEY (`sid`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE,
  UNIQUE INDEX `email`(`email`) USING BTREE,
  UNIQUE INDEX `snumber`(`snumber`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES (1, '胡汉三1a', 1, 3, '15233333333', '15233333333@qq.com', 'uek001', '2021-11-12', 1, 1, 1, '吕梁学院', '软件工程', '2022-06-30');
INSERT INTO `staff` VALUES (4, '胡汉1', 1, 3, '15233333336', '15233333323@qq.com', 'uek002', '2021-11-12', 1, 1, 1, '吕梁学院', '软件工程', '2022-06-30');
INSERT INTO `staff` VALUES (5, '胡汉2', 1, 3, '15233333337', '1523333323@qq.com', 'uek003', '2021-11-12', 1, 1, 1, '吕梁学院', '软件工程', '2022-06-30');
INSERT INTO `staff` VALUES (6, '胡汉3', 1, 3, '15233233337', '152333323@qq.com', 'uek005', '2021-11-12', 1, 1, 1, '吕梁学院', '软件工程', '2022-06-30');
INSERT INTO `staff` VALUES (7, '胡汉4', 1, 3, '15233233335', '1523333203@qq.com', 'uek006', '2021-11-15', 1, 1, 1, '吕梁学院', '软件工程', '2022-07-31');
INSERT INTO `staff` VALUES (8, '张三', 1, 1, '187654532127', '176532345@qq.com', 'kj2021002', '2021-02-10', 1, 1, 1, '华中科技大学', '计算机科学', '2021-07-28');

SET FOREIGN_KEY_CHECKS = 1;
