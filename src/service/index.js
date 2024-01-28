import http from "../unitls/https";
// 登录
export const Logines = (data) => http.post("/api/login", data);
// 路由信息
export const getRouters = () => http.get("/api/getRouters");
// 部门管理
export const systemDeptList = () => http.get("/api/system/dept/list");
// export const systemDept = (params) =>
//   http.get("/api/system/dept/list/exclude", { params });
export const systemDeptTreeselect = () =>
  http.get("/api/system/dept/treeselect");
// 角色管理
export const systemRoleList = () => http.get("/api/system/role/list");

// 用户管理
export const systemUserList = () => http.get("/api/system/user/list");

// 订单列表
export const businessPayorder = () => http.get("/api/business/Payorder/list");
// 科室管理
export const businessDept = () => http.get("/api/business/Dept/list");
// 身体部位
export const businessBodypartsList = () =>
  http.get("/api/business/Bodyparts/list");
export const businessBodyparts = (data) =>
  http.post("/api/business/Bodyparts", data);
export const businessBodypartsIds = (params) =>
  http.get("/api/business/Bodyparts", { params });
// 就诊卡
export const businessCard = () => http.get("/api/business/Cards/list");
// 楼层
export const businessFoordataList = () =>
  http.get("/api/business/Foordata/list");
export const businessFoordata = (data) =>
  http.post("/api/business/Foordata", data);
// 症状
export const businessSymptomsList = () =>
  http.get("/api/business/Symptoms/list");
export const businessSymptoms = (data) =>
  http.post("/api/business/Symptoms", data);
// 操作日志
export const monitorOperlogList = () =>
  http.get(
    "/api/monitor/operlog/list?PageNum=1&TotalNum=100&TotalPageNum=1&PageSize=20"
  );
// 登录日志
export const monitorLogininforList = () =>
  http.get("/api/monitor/logininfor/list");
// 意见反馈列表
export const businessFeedbacksList = () =>
  http.get("/api/business/Feedback/list");

// 医院管理/用户管理
export const businessMemberList = () => http.get("/api/business/Member/list");

// 专家管理
export const businessDoctorList = () => http.get("/api/business/Doctor/list");
export const businessDoctor = (data) => http.post("/api/business/Doctor", data);
// 调查问卷表
export const businessSurveysList = () => http.get("/api/business/Surveys/list");
// 调查问卷问题列表
export const businessSurveysquestionList = () =>
  http.get("/api/business/Surveysquestion/list");

// 意见反馈
export const businessFeedbackList = () =>
  http.get("/api/business/Feedback/list");
