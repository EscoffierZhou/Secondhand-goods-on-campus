/**
 * 校园二手交易系统 - 预置演示数据集 (符合原项目真实业务结构)
 */

export const INITIAL_BANNERS = [
  {
    id: 1,
    title: "绿色校园 · 闲置旧书旧物循环流转",
    subtitle: "倡导低碳环保，传递知识与爱心",
    image: "./images/shouye/lunbotu7.jpg",
    link: "/books"
  },
  {
    id: 2,
    title: "考研/期末教材教辅资料大清仓",
    subtitle: "历届学长学姐高分笔记，五折起秒淘",
    image: "./images/shouye/lunbotu6.jpg",
    link: "/books"
  },
  {
    id: 3,
    title: "校园兼职与勤工助学专区上线",
    subtitle: "校内官方认证职位，诚信安全有保障",
    image: "./images/shouye/lunbotu3.png",
    link: "/jobs"
  },
  {
    id: 4,
    title: "宿舍生活好物 · 毕业季大换代",
    subtitle: "台灯、置物架、代步单车一网打尽",
    image: "./images/shouye/lunbotu2.png",
    link: "/goods"
  }
];

export const INITIAL_HEADLINES = [
  { id: 1, title: "校园头条：湖科星火支教团队再出发，23名志愿者奔赴甘肃乡村！", date: "2024-05-18" },
  { id: 2, title: "校园头条：2024年湖北省普通高校专升本查分通知及志愿填报指引", date: "2024-05-16" },
  { id: 3, title: "校园头条：我校成立首支无偿献血宣传志愿者服务队，欢迎加入！", date: "2024-05-12" },
  { id: 4, title: "绿色倡议：毕业季二手教材书籍爱心捐赠与流转交易公告", date: "2024-05-08" }
];

export const INITIAL_BOOKS = [
  {
    bookid: "b_1001",
    bname: "高等数学（第七版 上下册合订）",
    author: "同济大学数学系",
    press: "高等教育出版社",
    reference: true, // 是否资料教材
    bstatus: "少量笔记",
    college: "温泉校区",
    bprice: 15.00,
    originalPrice: 58.00,
    usersname: "李学长 (理学院)",
    studentId: "20151621029",
    phone: "13871234567",
    picture: "./images/tuijian.png",
    bnote: "大一必修高数，里面有详细老师画的期末重点以及课后习题详细推导笔记，不缺页，保存良好。",
    createdAt: "2024-05-10 14:20",
    views: 328
  },
  {
    bookid: "b_1002",
    bname: "深入理解计算机系统 (原书第3版 CSAPP)",
    author: "Randal E. Bryant / David R. O'Hallaron",
    press: "机械工业出版社",
    reference: true,
    bstatus: "全新",
    college: "咸安校区",
    bprice: 55.00,
    originalPrice: 139.00,
    usersname: "张同学 (计科系)",
    studentId: "20151621088",
    phone: "13988776655",
    picture: "./images/tuijian.png",
    bnote: "计科考研神书，买了之后基本没翻，近乎全新，附带配套习题课件光盘与脑图笔记。",
    createdAt: "2024-05-12 09:30",
    views: 512
  },
  {
    bookid: "b_1003",
    bname: "考研英语二历年真题详解（黄皮书）",
    author: "张剑考研英语团队",
    press: "世界图书出版公司",
    reference: true,
    bstatus: "较多笔记",
    college: "温泉校区",
    bprice: 18.00,
    originalPrice: 79.80,
    usersname: "王学姐 (外国语)",
    studentId: "20151621055",
    phone: "13766554433",
    picture: "./images/tuijian.png",
    bnote: "包含近十年完整真题手写逐句翻译笔记、长难句拆分和核心高频词，适合基础强化备考。",
    createdAt: "2024-05-14 16:45",
    views: 420
  },
  {
    bookid: "b_1004",
    bname: "数据结构与算法分析（Java语言描述 第3版）",
    author: "Mark Allen Weiss",
    press: "机械工业出版社",
    reference: true,
    bstatus: "几乎全新",
    college: "咸安校区",
    bprice: 28.00,
    originalPrice: 69.00,
    usersname: "朱同学",
    studentId: "20151621029",
    phone: "13888888888",
    picture: "./images/tuijian.png",
    bnote: "经典黑宝书，期末考试92分，重点知识点有荧光笔标注，无乱涂画。",
    createdAt: "2024-05-15 11:10",
    views: 290
  },
  {
    bookid: "b_1005",
    bname: "现代操作系统 (第4版)",
    author: "Andrew S. Tanenbaum",
    press: "机械工业出版社",
    reference: true,
    bstatus: "少量笔记",
    college: "咸安校区",
    bprice: 35.00,
    originalPrice: 89.00,
    usersname: "陈同学 (软件工)",
    studentId: "20151621034",
    phone: "13612349876",
    picture: "./images/tuijian.png",
    bnote: "操作系统必读教材，图文清晰，正版保证，咸安校区食堂或图书馆门口随时可面交。",
    createdAt: "2024-05-16 18:00",
    views: 188
  },
  {
    bookid: "b_1006",
    bname: "大学英语四六级核心词汇便携手册",
    author: "新东方考试研究中心",
    press: "群言出版社",
    reference: false,
    bstatus: "全新",
    college: "温泉校区",
    bprice: 8.00,
    originalPrice: 28.00,
    usersname: "赵同学 (医学院)",
    studentId: "20151621077",
    phone: "13598761234",
    picture: "./images/tuijian.png",
    bnote: "抽奖活动奖品全新未拆封，小巧便携，背单词非常方便，带乱序排版音频下载码。",
    createdAt: "2024-05-17 10:05",
    views: 310
  }
];

export const INITIAL_GOODS = [
  {
    goodid: "g_2001",
    gname: "捷安特 (GIANT) 26寸铝合金山地自行车",
    gstatus: "八成新",
    gcollege: "咸安校区",
    gprice: 220.00,
    originalPrice: 899.00,
    usersname: "朱同学",
    studentId: "20151621029",
    phone: "13888888888",
    gpicture: "./images/zahuopu.png",
    gnote: "毕业带不走骨折出，刹车灵敏变速顺畅，车胎刚换新内胎，附送高强度U型锁和打气筒。",
    createdAt: "2024-05-11 15:20",
    views: 654
  },
  {
    goodid: "g_2002",
    gname: "小米护眼 LED 台灯 Pro (可连米家App)",
    gstatus: "九成新",
    gcollege: "温泉校区",
    gprice: 49.00,
    originalPrice: 179.00,
    usersname: "刘同学 (电信系)",
    studentId: "20151621066",
    phone: "13912345678",
    gpicture: "./images/zahuopu.png",
    gnote: "寝室熄灯后自习神仙好物，无级调光调色温，无频闪抗疲劳，箱说全无磕碰。",
    createdAt: "2024-05-13 14:15",
    views: 432
  },
  {
    goodid: "g_2003",
    gname: "罗技 (Logitech) MK275 无线键鼠套装",
    gstatus: "全新",
    gcollege: "咸安校区",
    gprice: 58.00,
    originalPrice: 129.00,
    usersname: "何同学 (外语系)",
    studentId: "20151621045",
    phone: "13876543210",
    gpicture: "./images/zahuopu.png",
    gnote: "多买了一套备用未拆封，静音按键设计，在宿舍夜间打字不会吵到室友休息。",
    createdAt: "2024-05-14 20:30",
    views: 380
  },
  {
    goodid: "g_2004",
    gname: "宿舍小功率多功能电煮锅 1.5L (双档控温)",
    gstatus: "八成新",
    gcollege: "温泉校区",
    gprice: 25.00,
    originalPrice: 69.00,
    usersname: "孙同学 (经管学院)",
    studentId: "20151621099",
    phone: "13698765432",
    gpicture: "./images/zahuopu.png",
    gnote: "符合寝室限电功率（400W/600W），内胆食品级不粘涂层，煮面蒸蛋煲汤都很方便。",
    createdAt: "2024-05-15 12:40",
    views: 295
  },
  {
    goodid: "g_2005",
    gname: "加厚遮光宿舍床帘带防蚊帐 (上铺适用)",
    gstatus: "全新",
    gcollege: "温泉校区",
    gprice: 20.00,
    originalPrice: 55.00,
    usersname: "林同学 (人文学院)",
    studentId: "20151621011",
    phone: "13567891234",
    gpicture: "./images/zahuopu.png",
    gnote: "纯色极简风格，遮光度超高，附带全部不锈钢支架和吊环挂钩，全新买错尺寸转让。",
    createdAt: "2024-05-16 17:15",
    views: 210
  }
];

export const INITIAL_JOBS = [
  {
    jobid: "j_3001",
    title: "学校图书馆自习室秩序维护与书籍整理员",
    workpay: "18 元 / 小时 (按月结算)",
    worktime: "周一至周五晚间 18:30 - 21:30 (可排班)",
    workplace: "温泉校区 图书馆二楼及三楼自习区",
    workrequirement: "全日制在校生，工作细致耐心，服从排班调度，勤工助学学生优先录用。",
    discription: "主要负责开馆与闭馆整理、自习室桌面清理、读者咨询指引以及图书归架上架工作，环境安静，工作轻松。",
    username: "图书馆管理科",
    studentId: "admin",
    workcontact: "13800001111 (王老师)",
    createdAt: "2024-05-10 10:00"
  },
  {
    jobid: "j_3002",
    title: "初二数学 & 英语周末一对一家教老师",
    workpay: "85 元 / 小时 (课毕现结)",
    worktime: "每周六上午 9:00 - 11:30",
    workplace: "咸安校区西大门步行5分钟 教师公寓小区",
    workrequirement: "理工科或英语专业优先，高考单科成绩优异，有耐心善于引导启发，男女不限。",
    discription: "辅导初二男生数学和英语基础，督促周作业并进行章节重难点串讲提分，家长和善好沟通，提供水果点心。",
    username: "张家长",
    studentId: "20151621029",
    workcontact: "13966668888 (张女士)",
    createdAt: "2024-05-12 11:30"
  },
  {
    jobid: "j_3003",
    title: "校园菜鸟驿站包裹出入库与扫码分拣员",
    workpay: "20 元 / 小时",
    worktime: "每日 16:30 - 19:30 (下课后高峰期)",
    workplace: "温泉校区 青年公寓一楼快递驿站",
    workrequirement: "手脚麻利，工作认真负责，能熟悉使用巴枪扫码录入系统，无经验有老同学带。",
    discription: "负责快递包裹入库上架、扫码出库核验，工作强度适中，课余时间充足的同学欢迎报名！",
    username: "驿站负责人",
    studentId: "20151621055",
    workcontact: "13711223344 (李店长)",
    createdAt: "2024-05-14 15:00"
  }
];

export const INITIAL_NOTICES = [
  { id: 1, title: "关于规范校园二手交易线下安全面交的温馨提示", time: "2024-05-15", content: "建议选择校园公共场所（如食堂、图书馆大厅、各教学楼门口）进行白天当面验货交易，谨防线下虚假转账。" },
  { id: 2, title: "系统公告：电脑端 Web 门户 1.0 正式上线测试", time: "2024-05-18", content: "欢迎同学们体验全新大屏版校园二手交易平台，支持图书、闲置和兼职的发布与预约结算！" }
];
