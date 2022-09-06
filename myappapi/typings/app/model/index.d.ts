// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdmin = require('../../../app/model/admin');
import ExportAudition = require('../../../app/model/audition');
import ExportBusinesstravel = require('../../../app/model/businesstravel');
import ExportContract = require('../../../app/model/contract');
import ExportDepartment = require('../../../app/model/department');
import ExportHandover = require('../../../app/model/handover');
import ExportInduction = require('../../../app/model/induction');
import ExportLeaveask = require('../../../app/model/leaveask');
import ExportPosition = require('../../../app/model/position');
import ExportPosttransfer = require('../../../app/model/posttransfer');
import ExportQuit = require('../../../app/model/quit');
import ExportRecruit = require('../../../app/model/recruit');
import ExportRegularization = require('../../../app/model/regularization');
import ExportSalay = require('../../../app/model/salay');
import ExportSalayback = require('../../../app/model/salayback');
import ExportStaff = require('../../../app/model/staff');

declare module 'egg' {
  interface IModel {
    Admin: ReturnType<typeof ExportAdmin>;
    Audition: ReturnType<typeof ExportAudition>;
    Businesstravel: ReturnType<typeof ExportBusinesstravel>;
    Contract: ReturnType<typeof ExportContract>;
    Department: ReturnType<typeof ExportDepartment>;
    Handover: ReturnType<typeof ExportHandover>;
    Induction: ReturnType<typeof ExportInduction>;
    Leaveask: ReturnType<typeof ExportLeaveask>;
    Position: ReturnType<typeof ExportPosition>;
    Posttransfer: ReturnType<typeof ExportPosttransfer>;
    Quit: ReturnType<typeof ExportQuit>;
    Recruit: ReturnType<typeof ExportRecruit>;
    Regularization: ReturnType<typeof ExportRegularization>;
    Salay: ReturnType<typeof ExportSalay>;
    Salayback: ReturnType<typeof ExportSalayback>;
    Staff: ReturnType<typeof ExportStaff>;
  }
}
