// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportAdminAddress = require('../../../app/controller/admin/address');
import ExportAdminAudition = require('../../../app/controller/admin/audition');
import ExportAdminBusinesstravel = require('../../../app/controller/admin/businesstravel');
import ExportAdminContract = require('../../../app/controller/admin/contract');
import ExportAdminDepartment = require('../../../app/controller/admin/department');
import ExportAdminEducation = require('../../../app/controller/admin/education');
import ExportAdminEnvironment = require('../../../app/controller/admin/environment');
import ExportAdminHandover = require('../../../app/controller/admin/handover');
import ExportAdminHstate = require('../../../app/controller/admin/hstate');
import ExportAdminHwork = require('../../../app/controller/admin/hwork');
import ExportAdminInduction = require('../../../app/controller/admin/induction');
import ExportAdminLeave = require('../../../app/controller/admin/leave');
import ExportAdminLeaveask = require('../../../app/controller/admin/leaveask');
import ExportAdminLogin = require('../../../app/controller/admin/login');
import ExportAdminPay = require('../../../app/controller/admin/pay');
import ExportAdminPeople = require('../../../app/controller/admin/people');
import ExportAdminPolitical = require('../../../app/controller/admin/political');
import ExportAdminPosition = require('../../../app/controller/admin/position');
import ExportAdminPosttransfer = require('../../../app/controller/admin/posttransfer');
import ExportAdminQuit = require('../../../app/controller/admin/quit');
import ExportAdminQuitreason = require('../../../app/controller/admin/quitreason');
import ExportAdminRecruit = require('../../../app/controller/admin/recruit');
import ExportAdminRegularization = require('../../../app/controller/admin/regularization');
import ExportAdminSalay = require('../../../app/controller/admin/salay');
import ExportAdminSalayback = require('../../../app/controller/admin/salayback');
import ExportAdminSex = require('../../../app/controller/admin/sex');
import ExportAdminStaff = require('../../../app/controller/admin/staff');
import ExportAdminStafflist = require('../../../app/controller/admin/stafflist');
import ExportAdminStrength = require('../../../app/controller/admin/strength');
import ExportAdminType = require('../../../app/controller/admin/type');
import ExportAdminUpload = require('../../../app/controller/admin/upload');
import ExportAdminWork = require('../../../app/controller/admin/work');
import ExportAdminWorkload = require('../../../app/controller/admin/workload');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      address: ExportAdminAddress;
      audition: ExportAdminAudition;
      businesstravel: ExportAdminBusinesstravel;
      contract: ExportAdminContract;
      department: ExportAdminDepartment;
      education: ExportAdminEducation;
      environment: ExportAdminEnvironment;
      handover: ExportAdminHandover;
      hstate: ExportAdminHstate;
      hwork: ExportAdminHwork;
      induction: ExportAdminInduction;
      leave: ExportAdminLeave;
      leaveask: ExportAdminLeaveask;
      login: ExportAdminLogin;
      pay: ExportAdminPay;
      people: ExportAdminPeople;
      political: ExportAdminPolitical;
      position: ExportAdminPosition;
      posttransfer: ExportAdminPosttransfer;
      quit: ExportAdminQuit;
      quitreason: ExportAdminQuitreason;
      recruit: ExportAdminRecruit;
      regularization: ExportAdminRegularization;
      salay: ExportAdminSalay;
      salayback: ExportAdminSalayback;
      sex: ExportAdminSex;
      staff: ExportAdminStaff;
      stafflist: ExportAdminStafflist;
      strength: ExportAdminStrength;
      type: ExportAdminType;
      upload: ExportAdminUpload;
      work: ExportAdminWork;
      workload: ExportAdminWorkload;
    }
  }
}
