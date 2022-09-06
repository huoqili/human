// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAudition = require('../../../app/service/audition');
import ExportBusinesstravel = require('../../../app/service/businesstravel');
import ExportContract = require('../../../app/service/contract');
import ExportDepartment = require('../../../app/service/department');
import ExportHandover = require('../../../app/service/handover');
import ExportInduction = require('../../../app/service/induction');
import ExportLeaveask = require('../../../app/service/leaveask');
import ExportLogin = require('../../../app/service/login');
import ExportPosition = require('../../../app/service/position');
import ExportPosttransfer = require('../../../app/service/posttransfer');
import ExportQuit = require('../../../app/service/quit');
import ExportRecruit = require('../../../app/service/recruit');
import ExportRegularization = require('../../../app/service/regularization');
import ExportSalay = require('../../../app/service/salay');
import ExportSalayback = require('../../../app/service/salayback');
import ExportStaff = require('../../../app/service/staff');

declare module 'egg' {
  interface IService {
    audition: AutoInstanceType<typeof ExportAudition>;
    businesstravel: AutoInstanceType<typeof ExportBusinesstravel>;
    contract: AutoInstanceType<typeof ExportContract>;
    department: AutoInstanceType<typeof ExportDepartment>;
    handover: AutoInstanceType<typeof ExportHandover>;
    induction: AutoInstanceType<typeof ExportInduction>;
    leaveask: AutoInstanceType<typeof ExportLeaveask>;
    login: AutoInstanceType<typeof ExportLogin>;
    position: AutoInstanceType<typeof ExportPosition>;
    posttransfer: AutoInstanceType<typeof ExportPosttransfer>;
    quit: AutoInstanceType<typeof ExportQuit>;
    recruit: AutoInstanceType<typeof ExportRecruit>;
    regularization: AutoInstanceType<typeof ExportRegularization>;
    salay: AutoInstanceType<typeof ExportSalay>;
    salayback: AutoInstanceType<typeof ExportSalayback>;
    staff: AutoInstanceType<typeof ExportStaff>;
  }
}
