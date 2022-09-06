'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 管理端路由
  router.post('/admin/upload', controller.admin.upload.upload);
  router.resources('/admin/login', controller.admin.login);
  router.resources('/admin/department',controller.admin.department);
  router.resources('/admin/position',controller.admin.position);
  router.resources('/admin/staff',controller.admin.staff);
  router.resources('/admin/sex',controller.admin.sex);
  router.resources('/admin/political', controller.admin.political);
  router.resources('/admin/education', controller.admin.education);
  router.resources('/admin/salay', controller.admin.salay);
  router.resources('/admin/salayback', controller.admin.salayback);
  router.resources('/admin/recruit', controller.admin.recruit);
  router.resources('/admin/audition',controller.admin.audition);
 router.resources('/admin/induction', controller.admin.induction);
  // 调岗路由
  router.resources('/admin/posttransfer', controller.admin.posttransfer);
  //离职原因
  router.resources('/admin/quitreason', controller.admin.quitreason);
  //离职
  router.resources('/admin/quit', controller.admin.quit);
  //离职交接
  router.resources('/admin/handover', controller.admin.handover);
  router.resources('/admin/hwork', controller.admin.hwork);
  router.resources('/admin/hstate', controller.admin.hstate);

  router.resources('/admin/contract', controller.admin.contract);
  router.resources('/admin/type', controller.admin.type);
  router.resources('/admin/regularization', controller.admin.regularization);
  router.resources('/admin/work', controller.admin.work);
  router.resources('/admin/people', controller.admin.people);
  router.resources('/admin/strength', controller.admin.strength);
  router.resources('/admin/workload', controller.admin.workload);
  router.resources('/admin/environment', controller.admin.environment);
  router.resources('/admin/pay', controller.admin.pay);

  router.resources('/admin/leave', controller.admin.leave);
  router.resources('/admin/leaveask', controller.admin.leaveask);
  router.resources('/admin/address', controller.admin.address);
  router.resources('/admin/businesstravel', controller.admin.businesstravel);



};
