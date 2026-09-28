/**
 * 山东财经大学 (SDUFE) 校园二手互助系统 - 预置真实演示数据集
 * 校区覆盖：圣井校区、燕山校区、舜耕校区
 */

export const INITIAL_BANNERS = [
  {
    id: 1,
    title: "绿色山财 · 闲置课本与好物循环流转",
    subtitle: "倡导低碳环保，传递知识笔记与校友温情",
    image: "./images/shouye/lunbotu7.jpg",
    link: "/books"
  },
  {
    id: 2,
    title: "经管考研/期末专业课教材教辅大清仓",
    subtitle: "历届山财学长学姐高分笔记，五折起秒淘",
    image: "./images/shouye/lunbotu6.jpg",
    link: "/books"
  },
  {
    id: 3,
    title: "三校区勤工助学与校园兼职速递",
    subtitle: "图书馆助管、家教助学真实岗位，诚信安全有保障",
    image: "./images/shouye/lunbotu3.png",
    link: "/jobs"
  },
  {
    id: 4,
    title: "宿舍生活好物 · 圣井/燕山/舜耕一网打尽",
    subtitle: "护眼台灯、收纳架、校区代步单车零风险当面验货",
    image: "./images/shouye/lunbotu2.png",
    link: "/goods"
  }
];

export const INITIAL_HEADLINES = [
  { id: 1, title: "校园倡议：山东财经大学毕业季二手教材爱心捐赠与流转公告", date: "2024-05-18" },
  { id: 2, title: "教务通告：圣井校区与燕山校区期末公共自习室延时开放通知", date: "2024-05-16" },
  { id: 3, title: "喜报：我校学子在全国高校数字媒体与双创大赛中斩获佳绩！", date: "2024-05-12" },
  { id: 4, title: "绿色行动：三校区累计流转教材超3800册，减少工业碳排近5吨", date: "2024-05-08" }
];

export const INITIAL_BOOKS = [
  {
    bookid: "b_1001",
    bname: "计量经济学（第五版·配网课真题解析）",
    author: "李子奈 / 潘文卿",
    press: "高等教育出版社",
    reference: true, // 是否资料教材
    bstatus: "少量笔记",
    college: "圣井校区",
    bprice: 18.00,
    originalPrice: 58.00,
    usersname: "李学长",
    studentId: "20151621029",
    phone: "13871234567",
    picture: "./images/tuijian.png",
    bnote: "金融与经管必修神书，书内有详细画的期末高频推导和课后习题详细计算笔记，圣井图书馆一楼随时面交。",
    createdAt: "2024-05-10 14:20",
    views: 456
  },
  {
    bookid: "b_1002",
    bname: "西方经济学（第八版·微观部分）",
    author: "高鸿业 主编",
    press: "中国人民大学出版社",
    reference: true,
    bstatus: "九成新",
    college: "燕山校区",
    bprice: 22.00,
    originalPrice: 59.00,
    usersname: "张同学 (经济学院)",
    studentId: "20151621088",
    phone: "13988776655",
    picture: "./images/tuijian.png",
    bnote: "考研专业课经典红宝书，几乎无破损，重点章节有荧光笔划线和思维导图便签纸，送配套课后习题答案PDF。",
    createdAt: "2024-05-12 09:30",
    views: 612
  },
  {
    bookid: "b_1003",
    bname: "西方经济学（第八版·宏观部分）",
    author: "高鸿业 主编",
    press: "中国人民大学出版社",
    reference: true,
    bstatus: "少量笔记",
    college: "舜耕校区",
    bprice: 22.00,
    originalPrice: 59.00,
    usersname: "王学姐 (财政税务学院)",
    studentId: "20151621055",
    phone: "13766554433",
    picture: "./images/tuijian.png",
    bnote: "宏观IS-LM模型和AS-AD模型章节笔记非常完整，适合大二期末冲优或跨考经管研友，舜耕校区食堂面交。",
    createdAt: "2024-05-14 16:45",
    views: 520
  },
  {
    bookid: "b_1004",
    bname: "初级会计实务与经济法基础（双册合订）",
    author: "财政部会计资格评价中心",
    press: "中国财政经济出版社",
    reference: true,
    bstatus: "全新",
    college: "圣井校区",
    bprice: 25.00,
    originalPrice: 78.00,
    usersname: "刘同学 (会计学院)",
    studentId: "20151621066",
    phone: "13511223344",
    picture: "./images/tuijian.png",
    bnote: "今年刚考过初会，多买了一套备用教材全新未拆封，正版带题库防伪刮涂层，圣井博敏楼或一食堂碰头。",
    createdAt: "2024-05-15 11:10",
    views: 388
  },
  {
    bookid: "b_1005",
    bname: "数据结构与算法分析（Java语言描述 第3版）",
    author: "Mark Allen Weiss",
    press: "机械工业出版社",
    reference: true,
    bstatus: "几乎全新",
    college: "圣井校区",
    bprice: 28.00,
    originalPrice: 69.00,
    usersname: "朱同学 (计算机与数媒)",
    studentId: "20151621029",
    phone: "13888888888",
    picture: "./images/tuijian.png",
    bnote: "计算机与数媒专业核心必修黑宝书，期末考点荧光笔清晰，圣井图书馆前坪随时可自提。",
    createdAt: "2024-05-16 18:00",
    views: 298
  },
  {
    bookid: "b_1006",
    bname: "考研数学三历年真题全精解析（数学三 经管类）",
    author: "李永乐 / 王式安 / 武忠祥",
    press: "国家行政学院出版社",
    reference: true,
    bstatus: "八成新",
    college: "燕山校区",
    bprice: 26.00,
    originalPrice: 85.00,
    usersname: "陈同学 (统计与数学学院)",
    studentId: "20151621034",
    phone: "13612349876",
    picture: "./images/tuijian.png",
    bnote: "考研数三高分上岸学长转让，包含近十五年完整真题分类详解，高数、线代、概率论题型串讲重点突出。",
    createdAt: "2024-05-17 10:05",
    views: 410
  }
];

export const INITIAL_GOODS = [
  {
    goodid: "g_2001",
    gname: "捷安特 (GIANT) 26寸铝合金山地自行车 (圣井代步神车)",
    gstatus: "八成新",
    gcollege: "圣井校区",
    gprice: 230.00,
    originalPrice: 899.00,
    usersname: "朱同学",
    studentId: "20151621029",
    phone: "13888888888",
    gpicture: "./images/zahuopu.png",
    gnote: "圣井校区面积大，宿舍到教学楼和食堂通勤利器！刹车灵敏变速顺畅，刚换新内外胎，附送高强度U型锁和打气筒。",
    createdAt: "2024-05-11 15:20",
    views: 780
  },
  {
    goodid: "g_2002",
    gname: "小米护眼 LED 台灯 Pro (可连米家App / 国AA级护眼)",
    gstatus: "九成新",
    gcollege: "燕山校区",
    gprice: 52.00,
    originalPrice: 179.00,
    usersname: "赵同学 (金融学院)",
    studentId: "20151621066",
    phone: "13912345678",
    gpicture: "./images/zahuopu.png",
    gnote: "宿舍自习必备，多档色温亮度无极调节，无蓝光无频闪，配原装充电器和包装盒，燕山图书馆门口面交。",
    createdAt: "2024-05-13 18:30",
    views: 490
  },
  {
    goodid: "g_2003",
    gname: "宿舍桌面实木三层置物架与收纳免打孔洞洞板",
    gstatus: "九成新",
    gcollege: "舜耕校区",
    gprice: 24.00,
    originalPrice: 68.00,
    usersname: "孙同学 (工商管理学院)",
    studentId: "20151621011",
    phone: "13655554444",
    gpicture: "./images/zahuopu.png",
    gnote: "毕业带不走，承重强无异味，尺寸75cm宽，附送6个挂钩与两个收纳置物盒，宿舍桌面瞬间整洁通透！",
    createdAt: "2024-05-14 12:15",
    views: 340
  },
  {
    goodid: "g_2004",
    gname: "罗技 (Logitech) 静音双模无线鼠标 (蓝牙/2.4G 双模)",
    gstatus: "几乎全新",
    gcollege: "圣井校区",
    gprice: 38.00,
    originalPrice: 99.00,
    usersname: "吴同学 (信息管理)",
    studentId: "20151621077",
    phone: "13788990011",
    gpicture: "./images/zahuopu.png",
    gnote: "按键超轻超静音，在图书馆自习室刷题完全不影响邻桌同学，功能完好电池耐用，圣井一教随时面交。",
    createdAt: "2024-05-15 17:00",
    views: 512
  }
];

export const INITIAL_JOBS = [
  {
    jobid: "j_3001",
    title: "燕山校区图书馆自习区书籍整理与读者指引助理",
    workpay: "20 元 / 小时 (按月结算)",
    worktime: "周一至周五晚间 18:30 - 21:30 (可轮班)",
    workplace: "燕山校区 图书馆二楼及三楼自习区",
    workrequirement: "山东财经大学全日制在校生，工作细致耐心，服从排班调度，勤工助学学生优先录用。",
    discription: "主要负责开馆与闭馆整理、自习室桌面清理、读者咨询指引以及图书归架上架工作，环境安静，工作轻松。",
    username: "山财大图书馆服务部",
    studentId: "admin",
    workcontact: "13800001111 (王老师)",
    createdAt: "2024-05-10 10:00"
  },
  {
    jobid: "j_3002",
    title: "济南历下区初三中考数学 & 英语周末一对一家教",
    workpay: "90 元 / 小时 (课毕现结)",
    worktime: "每周六上午 9:00 - 11:30",
    workplace: "燕山校区西门附近 教师住宅小区",
    workrequirement: "经管或数学院研究生/本科生优先，高考单科成绩优异，有耐心善于引导启发，男女不限。",
    discription: "辅导初三男生中考冲刺数学和英语基础，督促作业并进行章节重难点串讲提分，家长和善好沟通，提供水果点心。",
    username: "张家长",
    studentId: "20151621029",
    workcontact: "13966668888 (张女士)",
    createdAt: "2024-05-12 11:30"
  },
  {
    jobid: "j_3003",
    title: "圣井校区菜鸟驿站下课高峰期包裹分拣员",
    workpay: "22 元 / 小时",
    worktime: "每日 16:30 - 19:30 (下课后高峰期)",
    workplace: "圣井校区 学生公寓一楼快递中心",
    workrequirement: "手脚麻利，工作认真负责，能熟悉使用巴枪扫码录入系统，无经验有老同学带。",
    discription: "负责快递包裹入库上架、扫码出库核验，工作强度适中，课余时间充足的同学欢迎报名！",
    username: "圣井驿站服务部",
    studentId: "20151621055",
    workcontact: "13711223344 (李店长)",
    createdAt: "2024-05-14 15:00"
  }
];

export const INITIAL_NOTICES = [
  { id: 1, title: "关于规范三校区二手交易线下安全面交的温馨提示", time: "2024-05-15", content: "建议选择校园公共场所（如各校区食堂大厅、图书馆前坪、教学楼中庭）进行白天当面验货交易，谨防线上虚假转账。" },
  { id: 2, title: "系统公告：山东财经大学校园二手互助平台正式上线运行", time: "2024-05-18", content: "欢迎圣井、燕山、舜耕三校区同学们体验全新绿色流转平台，支持图书、闲置和求购的发布与线下预约核验！" }
];

export const INITIAL_WANTS = [
  {
    wantId: "w_101",
    title: "急求圣井校区大二《计量经济学》高教社第五版教材",
    category: "专业教材",
    budget: 20,
    campus: "圣井校区",
    urgency: "高",
    userName: "张同学",
    college: "金融学院",
    detail: "下周就要开课了，求经管学长学姐二手转让，最好有期末划线重点或者随堂笔记，圣井校区博敏楼随时面交！",
    createdAt: "2024-05-18 09:30",
    status: "求购中",
    responses: 3
  },
  {
    wantId: "w_102",
    title: "求购一辆圣井校区代步山地车或折叠自行车",
    category: "运动出行",
    budget: 160,
    campus: "圣井校区",
    urgency: "中",
    userName: "郭同学",
    college: "管理科学与工程",
    detail: "圣井宿舍到实验楼路程较远，求一辆刹车和车胎完好、成色7成新以上的二手自行车，带锁更佳，价格可商量。",
    createdAt: "2024-05-17 16:45",
    status: "求购中",
    responses: 5
  },
  {
    wantId: "w_103",
    title: "求收考研数学三历年真题解析黄皮书（近10年）",
    category: "考研专区",
    budget: 35,
    campus: "燕山校区",
    urgency: "高",
    userName: "林同学",
    college: "经济学院",
    detail: "备战经管考研中，求一套尽量无大面积涂抹答案的数三真题解析，字迹工整的笔记不介意，附送错题便签加分！",
    createdAt: "2024-05-16 14:10",
    status: "求购中",
    responses: 2
  },
  {
    wantId: "w_104",
    title: "求舜耕校区宿舍多层实木置物架或桌上收纳洞洞板",
    category: "宿舍好物",
    budget: 25,
    campus: "舜耕校区",
    urgency: "低",
    userName: "宋同学",
    college: "工商管理学院",
    detail: "桌面考研复习资料太多放不下了，求学长毕业转让的桌上置物架或免打孔洞洞板，尺寸约60-80cm均可。",
    createdAt: "2024-05-15 11:20",
    status: "已收到",
    responses: 4
  },
  {
    wantId: "w_105",
    title: "求收二手罗技静音无线鼠标或便携蓝牙小键盘",
    category: "数码配件",
    budget: 40,
    campus: "圣井校区",
    urgency: "中",
    userName: "何同学",
    college: "会计学院",
    detail: "圣井图书馆自习室使用需要静音按键，功能正常成色好即可，接收器或蓝牙连接稳定即可。",
    createdAt: "2024-05-14 20:00",
    status: "求购中",
    responses: 1
  }
];
