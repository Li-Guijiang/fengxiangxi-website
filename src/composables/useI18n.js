import { ref } from 'vue'

const locale = ref(localStorage.getItem('fx-lang') || 'zh')

const messages = {
  zh: {
    // Nav
    'nav.home': '首页', 'nav.red': '红色文旅', 'nav.green': '绿色产业', 'nav.about': '关于本站',
    'nav.locale': '枫香溪 · 德江县 · 铜仁市',

    // Home Hero
    'home.badge': '枫香溪数智乡村官网',
    'home.heroTitle1': '枫香溪会议会址', 'home.heroTitle2': '黔东革命根据地',
    'home.heroTitle3': '红色文化·绿色产业', 'home.heroTitle4': '德江县·枫香溪镇', 'home.heroTitle5': '武陵山脉红色热土',
    'home.sub1': '全国重点文物保护单位 · 1934红三军历史转折地',
    'home.sub2': '贵州高原第一块红色革命根据地',
    'home.sub3': '传承红色基因 助力乡村振兴',
    'home.btnRed': '🏛️ 探访红色遗址', 'home.btnGreen': '🌿 了解绿色产业',
    'home.scrollHint': '向下探索', 'home.introLabel': '关于枫香溪', 'home.introTitle': '枫香溪 · 红色热土',
    'home.introContent': '枫香溪位于贵州省铜仁市德江县东南部，地处德江、沿河、印江三县交界，武陵山脉腹地。1934年6月19日，贺龙、夏曦、关向应率红三军在此召开"枫香溪会议"，创建了贵州高原第一块红色根据地——黔东特区。1980年修建枫香溪会议纪念碑，会址现为全国重点文物保护单位、国家3A级红色旅游景区、贵州省爱国主义教育基地。如今以"红色文化+绿色产业"双轮驱动，奋力书写新时代乡村振兴篇章。',
    'home.feat1': '全国重点文保', 'home.feat1d': '23处红色遗迹',
    'home.feat2': '爱国主义基地', 'home.feat2d': '省级国防教育基地',
    'home.feat3': '森林覆盖79.5%', 'home.feat3d': '天然氧吧·生态宜居',
    'home.feat4': '武陵山脉腹地', 'home.feat4d': '海拔700~800m',
    'home.portalRedTitle': '走进革命遗址', 'home.portalRedDesc': '23处红色遗迹 · 5位英雄人物 · 6首红色歌谣',
    'home.portalGreenTitle': '探索生态产业', 'home.portalGreenDesc': '天麻 · 抹茶 · 李子 · 苹果桃 · 茭白',
    'home.statsTitle': '产业发展数据',
    'home.stat1': '抹茶基地', 'home.stat2': '茶园面积', 'home.stat3': '茭白坝区',
    'home.stat4': '人均收入', 'home.stat5': '森林覆盖', 'home.stat6': '海拔高度',

    // Red Culture
    'red.badge': '红色文旅 · 枫香溪', 'red.heroTitle': '红色枫香溪', 'red.heroDesc': '1934年红三军创建黔东革命根据地',
    'red.statsSites': '核心景点', 'red.statsFigures': '英雄人物', 'red.statsSongs': '红色歌谣', 'red.statsArea': '根据地面积',
    'red.statsSitesVal': '23处', 'red.statsFiguresVal': '5位', 'red.statsSongsVal': '6首', 'red.statsAreaVal': '200+里',
    'red.historyTitle': '历史背景',
    'red.historyContent': '1934年6月19日，贺龙、夏曦、关向应率红三军在枫香溪召开具有重大历史转折意义的"枫香溪会议"。会议确立了创建黔东特区的战略方针，结束了红三军长期流动作战的被动局面，全军将士精神面貌焕然一新。黔东特区作为贵州高原第一块红色革命根据地，在中国革命史上树立了光辉里程碑。',
    'red.sitesTitle': '核心红色遗址', 'red.sitesSub': '探访历史足迹',
    'red.figuresTitle': '红色人物档案', 'red.figuresSub': '铭记英雄事迹',
    'red.songsTitle': '红色歌谣', 'red.songsSub': '传唱革命精神',
    'red.expandStory': '展开完整事迹', 'red.siteCategory': '分类', 'red.figureRole': '身份',
    'red.mapFull': '点击查看完整地图',

    // Red Sites
    'site1.title': '枫香溪会议会址', 'site1.cat': '核心遗址',
    'site1.summary': '始建于1917年，土家四合院穿斗木结构古建筑。1934年红三军军部驻地、枫香溪会议召开地。院内完整保留会议厅堂、红军办公居所，复原参会领导仿真雕塑，墙面留存红军朱砂标语。全国重点文物保护单位。',
    'site2.title': '三洞桥', 'site2.cat': '红色地标',
    'site2.summary': '枫香溪境内重要桥梁遗址，当年红三军行军经过此处。桥体保留历史风貌，是红色研学路线的重要节点，见证了红军在黔东地区的革命足迹。',
    'site3.title': '红三军七师师部旧址', 'site3.cat': '革命遗址',
    'site3.summary': '土家院落建筑，红七师驻扎营地。复原战士营房、练兵器具，展示红三军在枫香溪整训、扩充兵力的革命历史。院内陈列珍贵历史文物与图文资料。',
    'site4.title': '枫香溪会议纪念碑', 'site4.cat': '纪念设施',
    'site4.summary': '1980年修建的石质纪念丰碑，坐落于会址北侧山林。碑体镌刻枫香溪会议完整史实与红三军战斗历程，是瞻仰英烈、开展宣誓活动的核心点位。',
    'site5.title': '红军井', 'site5.cat': '红色遗迹',
    'site5.summary': '红三军驻留期间，贺龙带领红军战士为百姓开挖的水井，至今仍在使用。见证着军民鱼水深情，是当地群众口口相传的红色记忆。',
    'site6.title': '红军桥', 'site6.cat': '红色地标',
    'site6.summary': '红军行军重要通道桥梁，承载着那段烽火岁月的历史记忆。桥体保留历史风貌，是连接各红色遗址的重要纽带和研学路线必经之地。',
    'site7.title': '革命委员会旧址', 'site7.cat': '革命遗址',
    'site7.summary': '枫香溪区革命委员会所在地，当年苏维埃政权办公场所。见证了黔东特区轰轰烈烈的土地革命和政权建设，是研究早期苏维埃运动的重要实物见证。',
    'site8.title': '红三军医院旧址', 'site8.cat': '革命遗址',
    'site8.summary': '原黑神庙改造的红军战地医院，分诊疗区与伤员居住区。陈列草药器具、救护旧物，讲述红军就地取材救治伤员、本地群众自发看护伤病员的鱼水故事。',

    // Red Figures
    'figure1.name': '王时刚', 'figure1.role': '援老抗美战士 · 81820部队', 'figure1.brief': '1971年应征入伍编入解放军81820部队。奔赴老挝执行援老抗美任务，三次带队深入敌区侦察，先后获连嘉奖3次、营嘉奖2次。1976年退伍后担任枫铺村党支部书记近二十年。',
    'figure2.name': '王治春', 'figure2.role': '援老抗美战士 · 1310部队', 'figure2.brief': '自幼受党员父亲影响一心报国。1971年3月赴老挝执行援老抗美任务，湄公河阻击战中腿部中弹仍坚持作战，英勇立功。1975年退伍后全力推广杂交水稻技术惠泽乡里。',
    'figure3.name': '王安成', 'figure3.role': '对越自卫还击战士 · 特务连', 'figure3.brief': '父亲早年参加红三军游击队。1973年应征入伍编入特务连，参加对越自卫反击战，通讯保障受杨勇首长通电表彰。1980年转业任民兵连长扎根守护乡土。',
    'figure4.name': '王太明', 'figure4.role': '援老抗美战士 · 特务连侦察', 'figure4.brief': '家境极贫未曾入学。1971年入伍特务连，在老挝执行前沿侦察任务获连嘉奖5次、营嘉奖1次。战友王文权舍身相救壮烈牺牲，生死情谊终生铭刻于心。',
    'figure5.name': '冉启江', 'figure5.role': '援老抗美战士 · 工程野战五支队', 'figure5.brief': '家中七兄妹排行最小。参军编入工程野战五支队，赴老挝前线任警卫排全天候守护首长安全。服役四年三个月，1975年退伍获国防部退伍军人证明书。',

    // Red Songs
    'song1.title': '甲戌年来闹红军', 'song1.desc': '黔东革命歌谣，传唱于枫香溪一带，记录1934甲戌年红三军到来时的欢庆场景',
    'song2.title': '送郎当红军', 'song2.desc': '枫香溪妇女送别丈夫参军的感人歌谣，体现革命老区人民坚定支持',
    'song3.title': '十杯酒', 'song3.desc': '以传统民歌形式歌颂红军将士，十段歌词从贺龙唱到普通战士',
    'song4.title': '杨柳井清又清', 'song4.desc': '以当地水井为题材，歌颂红军为百姓挖井取水的鱼水深情',
    'song5.title': '真正神兵数红军', 'song5.desc': '黔东神兵运动时期流传的歌谣，表达群众对红军的认可拥护',
    'song6.title': '想红军', 'song6.desc': '红军主力撤离后群众怀念红军的歌谣，情真意切催人泪下',

    // Green Industry
    'green.badge': '绿色产业 · 枫香溪', 'green.heroTitle': '武陵山脉的生态馈赠',
    'green.heroDesc': '高山农场 · 特色种植 · 乡村振兴产业引擎',
    'green.overview': '枫香溪社区依托武陵山脉独特地理气候优势，形成以天麻、茶叶、李子、苹果桃、茭白为代表的特色种植产业。社区成立村级集体经济专业合作联社，集体经济积累达59.25万元，2020年全社区人均可支配收入12,500元。',
    'green.aiBadge': '🤖 AI数字人讲解',
    'green.photoCaption': '产业实拍',

    // Industry detail
    'ind.tianma.title': '高山天麻', 'ind.tianma.subtitle': '武陵山脉馈赠的珍贵中药材',
    'ind.tianma.content': '德江枫香溪地处武陵山脉腹地，海拔700-800米，亚热带季风湿润气候，森林覆盖率超79.5%，为天麻生长提供了得天独厚的自然环境。天麻种植以山地零散小规模为主，每年10-12月集中采收，天麻素含量高，是远近闻名的道地药材。当地正推进标准化种植基地建设，提升产业规模与品质。天麻具有息风止痉、平肝潜阳、祛风通络等功效，药食同源。',
    'ind.tea.title': '高山云雾抹茶', 'ind.tea.subtitle': '云雾缭绕中的绿色珍品',
    'ind.tea.content': '德江全县茶园面积达1.2万亩，投产茶园约6000亩，其中枫香溪已建成4000亩连片高标准抹茶示范基地。茶园分布海拔700米以上山地，常年云雾缭绕，日照充足雨量充沛，酸性沙质黄壤土富含矿物质。因昼夜温差大生长缓慢，茶叶内含物质丰富口感醇厚鲜爽。当地已有3家标准化茶叶加工厂，配备专业抹茶生产线，主产高端抹茶原料。目前正着力打造"梵净山抹茶"公共品牌。',
    'ind.lizi.title': '德江高山好李子', 'ind.lizi.subtitle': '高山阳光孕育的甜蜜果实',
    'ind.lizi.content': '枫香溪高山种植的蜂糖李、青脆李等优质品种，得益于充足日照和适宜温差，果实饱满汁多味甜。采摘期为每年6月中旬至7月底，全程约35天。目前以客商收购为主要销售渠道（约占85%），线上直销和采摘体验仅占约15%。当地正积极拓展电商直播、社区团购等新型销售渠道，打造本地李子品牌，提升产品附加值。',
    'ind.tao.title': '德江苹果桃', 'ind.tao.subtitle': '独特气候孕育的脆甜蜜果',
    'ind.tao.content': '枫香溪独特气候条件孕育品质上乘的苹果桃，果形端正、色泽艳丽、口感脆甜，融合苹果清香与桃子甘甜。主要种植于山地零散地块，亩产约一千斤，果实分级收购价在1.2至3.8元每斤之间。当前以客商地头收购为主，采摘体验和线上直销占比较低。当地正推进标准化种植和品牌化包装，拓宽线上销售渠道，帮助农户增收。',
    'ind.jiaobai.title': '德江山泉好茭白', 'ind.jiaobai.subtitle': '山泉水灌溉的绿色珍品',
    'ind.jiaobai.content': '枫香溪利用坝区优势大力发展茭白种植，以山泉水灌溉确保绿色无公害品质。茭白为双季作物，夏季6至8月及秋冬9月至次年1月两轮采收上市。茭白肉质洁白鲜嫩，是当地特色农产品名片。配套羊肚菌轮作实现"一田双收"高效农业模式，有效带动村民增收致富。当地正推进冷链仓储建设，解决保鲜运输难题。',

    // About
    'about.badge': '关于本站', 'about.heroTitle': '数字赋能 · 乡村振兴',
    'about.heroDesc': '枫香溪数智乡村官方网站开发与迭代计划',
    'about.devBadge': '网站开发者', 'about.devName': '李贵江',
    'about.devRole': '全栈开发工程师 · 本网站架构设计与开发者',
    'about.devDesc': '负责枫香溪数智乡村官网的整体架构设计、前后端开发、AI智能功能集成与持续迭代优化。致力于运用数字技术助力乡村振兴，传承红色文化基因，让枫香溪的故事被更多人看见。',
    'about.devMotto': '数字赋能乡村，科技传承红色基因',
    'about.contactTitle': '📬 开发者联系方式',
    'about.contactPhone': '电话', 'about.contactQQ': 'QQ', 'about.contactEmail': '邮箱',
    'about.teamTitle': '我们的团队', 'about.teamSubtitle': '三下乡·枫香溪实践团',
    'about.teamDesc': '由贵州开放大学（贵州职业技术学院）师生组成的"三下乡"社会实践团队，于2026年6月25日至7月1日深入贵州省铜仁市德江县枫香溪镇，开展以"红色文化+绿色产业"融合发展为主题的调研与实践活动。团队通过实地走访、农户问卷调查、产业台账查阅等调研方法，探索红色文化与山地绿色农业融合发展路径，为枫香溪乡村振兴贡献青春力量。',
    'about.instructors': '👨‍🏫 指导老师', 'about.members': '👥 团队成员',
    'about.memberCount': '共{count}人', 'about.instructor': '指导老师',
    'about.photoCaption1': '团队合影（一）', 'about.photoCaption2': '团队合影（二）',
    'about.roadmap': '功能迭代路线图', 'about.roadmapSub': '本站持续更新中 · 以下为计划升级时间线',
    'about.techTitle': '技术架构',
    'about.techFront': '🌐 前端', 'about.techBack': '⚙️ 后端（计划中）', 'about.techDeploy': '🚀 部署',
    'about.phase1': 'v1.0 · 已上线', 'about.phase1title': '前端官网',
    'about.phase2': 'v2.0 · 开发中', 'about.phase2title': 'AI智能问答',
    'about.phase3': 'v3.0 · 规划中', 'about.phase3title': '用户系统',
    'about.phase4': 'v4.0 · 规划中', 'about.phase4title': '数据平台',
    'about.phase5': 'v5.0 · 远期规划', 'about.phase5title': '3D数字孪生',

    // AI Chat
    'ai.title': '🤖 枫香溪AI助手',
    'ai.greeting': '👋 您好！我是枫香溪数智乡村智能助手。\n您可以问我关于枫香溪的红色文化、绿色产业、旅游攻略等问题。',
    'ai.placeholder': '输入您的问题...',

    // Settings
    'settings.fontSize': '🔤 字体大小', 'settings.lang': '🌐 语言 Language', 'settings.imgStyle': '🖼️ 图片风格',
    'settings.reduceMotion': '🎬 减少动画', 'settings.normal': '标准', 'settings.large': '大', 'settings.xlarge': '超大',
    'settings.default': '默认', 'settings.rounded': '圆角', 'settings.vintage': '复古', 'settings.vivid': '鲜艳',
    'settings.on': '已开启', 'settings.off': '关闭', 'settings.chinese': '中文', 'settings.english': 'English',

    // Theme
    'theme.title': '选择外观主题', 'theme.dark': '深邃暗夜', 'theme.light': '晨曦明亮',
    'theme.forest': '翠绿山林', 'theme.ocean': '蔚蓝海洋', 'theme.sunset': '金色暖阳', 'theme.lavender': '紫韵雅致',

    // Footer
    'footer.brand': '枫香溪数智乡村', 'footer.locale': '贵州省铜仁市德江县枫香溪镇',
    'footer.slogan': '传承红色基因 · 助力乡村振兴',
    'footer.dev': '网站开发：李贵江', 'footer.team': '三下乡·枫香溪实践团',
    'footer.copy': '© 2026 枫香溪数智乡村官网 · 三下乡实践项目',
    'footer.nav': '导航', 'footer.overview': '枫香溪概况',
    'footer.l1': '📍 贵州省德江县枫香溪镇枫溪社区', 'footer.l2': '🏛️ 全国重点文物保护单位',
    'footer.l3': '🎖️ 贵州省爱国主义教育基地', 'footer.l4': '🌲 森林覆盖率 79.5% | 海拔 700-800m',

    // Common
    'common.backToTop': '回到顶部', 'common.viewLarge': '点击查看大图', 'common.close': '✕',
    'common.phone': '电话', 'common.qq': 'QQ', 'common.email': '邮箱', 'common.instructor': '指导老师',
  },

  en: {
    // Nav
    'nav.home': 'Home', 'nav.red': 'Red Culture', 'nav.green': 'Green Industry', 'nav.about': 'About',
    'nav.locale': 'Fengxiangxi · Dejiang · Tongren',

    // Home Hero
    'home.badge': 'Fengxiangxi Smart Village',
    'home.heroTitle1': 'Fengxiangxi Conference Site',
    'home.heroTitle2': 'East Guizhou Revolutionary Base',
    'home.heroTitle3': 'Red Culture · Green Industry',
    'home.heroTitle4': 'Dejiang · Fengxiangxi',
    'home.heroTitle5': 'Wuling Mountains Red Land',
    'home.sub1': 'National Heritage Site · 1934 Red Army Historical Turning Point',
    'home.sub2': 'First Red Revolutionary Base on Guizhou Plateau',
    'home.sub3': 'Inherit Red Spirit · Boost Rural Revitalization',
    'home.btnRed': '🏛️ Explore Red Sites',
    'home.btnGreen': '🌿 Green Industry',
    'home.scrollHint': 'Scroll Down',
    'home.introLabel': 'About Fengxiangxi',
    'home.introTitle': 'Fengxiangxi · Land of Red',
    'home.introContent': 'Fengxiangxi is located in southeast Dejiang County, Tongren City, Guizhou Province, at the junction of Dejiang, Yanhe, and Yinjiang counties in the Wuling Mountains. On June 19, 1934, He Long, Xia Xi, and Guan Xiangying led the Red Third Army in convening the "Fengxiangxi Conference", establishing the first red base on the Guizhou Plateau — the East Guizhou Special Zone. In 1980, the conference monument was built. The site is now a National Key Cultural Relic Protection Unit, a 3A-level red tourism scenic area, and a provincial patriotism education base. Today, with "Red Culture + Green Industry" as dual drivers, it is writing a new chapter of rural revitalization.',
    'home.feat1': 'National Heritage', 'home.feat1d': '23 Red Relic Sites',
    'home.feat2': 'Patriotism Base', 'home.feat2d': 'Provincial Defense Education',
    'home.feat3': '79.5% Forest Cover', 'home.feat3d': 'Natural Oxygen Bar',
    'home.feat4': 'Wuling Mountains', 'home.feat4d': 'Altitude 700-800m',
    'home.portalRedTitle': 'Visit Revolutionary Sites',
    'home.portalRedDesc': '23 Sites · 5 Heroes · 6 Folk Songs',
    'home.portalGreenTitle': 'Explore Eco Industry',
    'home.portalGreenDesc': 'Gastrodia · Matcha · Plums · Peaches · Bamboo',
    'home.statsTitle': 'Industry Data',
    'home.stat1': 'Matcha Base', 'home.stat2': 'Tea Gardens', 'home.stat3': 'Bamboo Area',
    'home.stat4': 'Per Capita Income', 'home.stat5': 'Forest Cover', 'home.stat6': 'Altitude',

    // Red Culture
    'red.badge': 'Red Culture · Fengxiangxi',
    'red.heroTitle': 'Red Fengxiangxi',
    'red.heroDesc': 'Red Army established East Guizhou Base in 1934',
    'red.statsSites': 'Core Sites', 'red.statsFigures': 'Heroes',
    'red.statsSongs': 'Folk Songs', 'red.statsArea': 'Base Area',
    'red.statsSitesVal': '23', 'red.statsFiguresVal': '5', 'red.statsSongsVal': '6', 'red.statsAreaVal': '200+ li',
    'red.historyTitle': 'Historical Background',
    'red.historyContent': 'On June 19, 1934, He Long, Xia Xi, and Guan Xiangying led the Red Third Army in convening the historically significant "Fengxiangxi Conference". The conference established the strategic policy of creating the East Guizhou Special Zone, ending the Red Army\'s prolonged mobile warfare. The East Guizhou Special Zone, as the first red revolutionary base on the Guizhou Plateau, stands as a brilliant milestone in Chinese revolutionary history.',
    'red.sitesTitle': 'Core Red Sites', 'red.sitesSub': 'Trace the Footsteps of History',
    'red.figuresTitle': 'Revolutionary Heroes', 'red.figuresSub': 'Remember the Heroes',
    'red.songsTitle': 'Red Folk Songs', 'red.songsSub': 'Songs of Revolutionary Spirit',
    'red.expandStory': 'Read Full Story', 'red.siteCategory': 'Category', 'red.figureRole': 'Role',
    'red.mapFull': 'View Full Map',

    // Red Sites
    'site1.title': 'Fengxiangxi Conference Site', 'site1.cat': 'Core Site',
    'site1.summary': 'Built in 1917, a traditional Tujia courtyard with wooden mortise-tenon structure. In 1934, it served as the Red Third Army headquarters and the venue for the Fengxiangxi Conference. The conference hall, office quarters, and life-size sculptures of participating leaders have been restored, with original Red Army slogans preserved on the walls. National Key Cultural Relic Protection Unit.',
    'site2.title': 'Sandong Bridge', 'site2.cat': 'Red Landmark',
    'site2.summary': 'An important bridge in Fengxiangxi where the Red Third Army passed during their march. The bridge retains its historical character and is a key node on the red study tour route, witnessing the Red Army\'s revolutionary footsteps in East Guizhou.',
    'site3.title': '7th Division Headquarters', 'site3.cat': 'Revolutionary Site',
    'site3.summary': 'A Tujia courtyard that served as the camp of the Red 7th Division. The barracks and training equipment have been restored, showcasing the Red Army\'s consolidation and expansion in Fengxiangxi. The courtyard displays precious historical artifacts and documentation.',
    'site4.title': 'Conference Monument', 'site4.cat': 'Memorial',
    'site4.summary': 'A stone monument built in 1980, located on the hillside north of the conference site. The monument is engraved with the complete history of the conference and the Red Army\'s battles — a core site for commemorating heroes and conducting oath ceremonies.',
    'site5.title': 'Red Army Well', 'site5.cat': 'Red Relic',
    'site5.summary': 'During the Red Army\'s stay, He Long led soldiers to dig this well for local villagers. Still in use today, it stands as a testament to the deep bond between the army and the people, cherished in the community\'s collective memory.',
    'site6.title': 'Red Army Bridge', 'site6.cat': 'Red Landmark',
    'site6.summary': 'A key passage bridge on the Red Army\'s march route, carrying the historical memory of wartime. The bridge retains its original character, serving as a vital link between red sites and a must-pass point on study tour routes.',
    'site7.title': 'Revolutionary Committee Site', 'site7.cat': 'Revolutionary Site',
    'site7.summary': 'The seat of the Fengxiangxi District Revolutionary Committee, where the Soviet government operated. It witnessed the vigorous land revolution and government building of the East Guizhou Special Zone — a tangible reminder of the early Soviet movement.',
    'site8.title': 'Red Army Hospital Site', 'site8.cat': 'Revolutionary Site',
    'site8.summary': 'Originally a Heishen Temple converted into a Red Army field hospital, with treatment and convalescence areas. Displays herbal medicine tools and rescue artifacts, telling the story of the Red Army treating the wounded with local resources and villagers voluntarily caring for the injured.',

    // Red Figures
    'figure1.name': 'Wang Shigang', 'figure1.role': 'Veteran · Unit 81820', 'figure1.brief': 'Enlisted in 1971, deployed to Laos for anti-US support missions. Led three reconnaissance missions deep into enemy territory, receiving 3 company commendations and 2 battalion commendations. After discharge in 1976, served as Party secretary of Fengpu Village for nearly 20 years.',
    'figure2.name': 'Wang Zhichun', 'figure2.role': 'Veteran · Unit 1310', 'figure2.brief': 'Influenced by his Party member father, he enlisted in 1971. During the Mekong River battle, he was shot in the leg but continued fighting. After discharge in 1975, he dedicated himself to promoting hybrid rice technology for local farmers.',
    'figure3.name': 'Wang Ancheng', 'figure3.role': 'Veteran · Recon Company', 'figure3.brief': 'His father joined the Red Army游击队. Enlisted in 1973 in the reconnaissance company for the Vietnam self-defense counterattack. His communications unit received commendation from Commander Yang Yong. Transferred to civilian service in 1980 as militia company commander.',
    'figure4.name': 'Wang Taiming', 'figure4.role': 'Veteran · Reconnaissance', 'figure4.brief': 'Born to extreme poverty, never attended school. Enlisted in 1971 as a reconnaissance soldier in Laos, receiving 5 company and 1 battalion commendations. His comrade Wang Wenquan sacrificed himself to save Wang Taiming — a bond he cherishes for life.',
    'figure5.name': 'Ran Qijiang', 'figure5.role': 'Veteran · Engineering Unit', 'figure5.brief': 'The youngest of seven siblings, he enlisted in the engineering field unit deployed to Laos. Served as a guard protecting senior officers around the clock. Served 4 years and 3 months, receiving a veteran certificate from the Ministry of Defense in 1975.',

    // Red Songs
    'song1.title': 'Red Army Came in 1934', 'song1.desc': 'A revolutionary ballad from East Guizhou, celebrating the Red Third Army\'s arrival in Fengxiangxi in 1934.',
    'song2.title': 'Sending My Love to the Red Army', 'song2.desc': 'A touching ballad of Fengxiangxi women bidding farewell to their husbands joining the Red Army.',
    'song3.title': 'Ten Cups of Wine', 'song3.desc': 'A traditional folk song honoring Red Army soldiers, with ten verses from Commander He Long to ordinary soldiers.',
    'song4.title': 'Willow Well, Clear and Pure', 'song4.desc': 'A song praising the Red Army for digging wells for villagers, expressing the deep bond between soldiers and civilians.',
    'song5.title': 'True Warriors Are the Red Army', 'song5.desc': 'A ballad from the East Guizhou spirit soldier movement period, expressing people\'s recognition and support of the Red Army.',
    'song6.title': 'Longing for the Red Army', 'song6.desc': 'A heartfelt ballad of villagers missing the Red Army after their departure — deeply moving and sincere.',

    // Green Industry
    'green.badge': 'Green Industry · Fengxiangxi',
    'green.heroTitle': 'Gifts from Wuling Mountains',
    'green.heroDesc': 'Alpine Farms · Specialty Crops · Rural Revitalization Engine',
    'green.overview': 'Fengxiangxi leverages its unique mountain geography in the Wuling range to develop specialty agriculture including gastrodia, tea, plums, apple peaches, and bamboo shoots. With village collective cooperatives accumulating 592,500 yuan in revenue, per capita disposable income reached 12,500 yuan in 2020.',
    'green.aiBadge': '🤖 AI Digital Presenter',
    'green.photoCaption': 'Industry Photos',

    // Industry detail
    'ind.tianma.title': 'Alpine Gastrodia', 'ind.tianma.subtitle': 'Precious Herb from Wuling Mountains',
    'ind.tianma.content': 'Located in the heart of the Wuling Mountains at 700-800m altitude with a subtropical monsoon humid climate and over 79.5% forest coverage, Fengxiangxi provides ideal conditions for gastrodia cultivation. Currently small-scale scattered planting with harvest concentrated in October-December. Known for high gastrodin content, it is a renowned authentic medicinal herb. The area is now advancing standardized cultivation bases.',
    'ind.tea.title': 'High Mountain Matcha', 'ind.tea.subtitle': 'Green Treasure in the Clouds',
    'ind.tea.content': 'Dejiang County has 12,000 mu of tea gardens with 6,000 mu in production, including 4,000 mu of contiguous high-standard matcha demonstration bases in Fengxiangxi. Tea gardens above 700m are shrouded in mist year-round, with ample sunshine, abundant rainfall, and mineral-rich acidic sandy yellow soil. Three standardized tea processing factories now operate with professional matcha production lines, producing premium matcha raw materials under the "Fanjingshan Matcha" public brand.',
    'ind.lizi.title': 'Dejiang Alpine Plums', 'ind.lizi.subtitle': 'Sweet Fruit Nurtured by Mountain Sun',
    'ind.lizi.content': 'Fengxiangxi grows premium varieties including Fengtang and Qingcui plums, benefiting from abundant sunshine and temperature variation for full, juicy, sweet fruit. Harvest season runs from mid-June to late July, approximately 35 days. Currently 85% sold through wholesaler procurement, with only 15% through direct online sales and picking experiences. The area is actively expanding e-commerce livestreaming and community group buying channels.',
    'ind.tao.title': 'Dejiang Apple Peaches', 'ind.tao.subtitle': 'Crisp Sweet Fruit of Unique Climate',
    'ind.tao.content': 'Fengxiangxi\'s unique climate produces superior apple peaches with beautiful color, crisp texture, and sweet flavor — combining apple fragrance with peach sweetness. Grown on scattered mountain plots with approximately 1,000 jin per mu yield. Graded purchasing prices range from 1.2 to 3.8 yuan per jin. Currently dominated by wholesaler procurement; the area is promoting standardized cultivation, branded packaging, and expanded online sales.',
    'ind.jiaobai.title': 'Dejiang Spring Water Bamboo', 'ind.jiaobai.subtitle': 'Green Delicacy Irrigated by Spring Water',
    'ind.jiaobai.content': 'Fengxiangxi leverages its basin advantages for bamboo shoot cultivation, using spring water irrigation to ensure green, pollution-free quality. A dual-season crop with harvests in June-August and September-January. The tender white bamboo shoots are a local specialty. Morel mushroom rotation achieves "double harvest from one field". Cold chain storage construction is now underway to address preservation and transportation challenges.',

    // About
    'about.badge': 'About This Site',
    'about.heroTitle': 'Digital Empowerment · Rural Revitalization',
    'about.heroDesc': 'Fengxiangxi Smart Village Official Website Development & Roadmap',
    'about.devBadge': 'Website Developer',
    'about.devName': 'Li Guijiang',
    'about.devRole': 'Full-Stack Developer · Site Architect & Developer',
    'about.devDesc': 'Responsible for the overall architecture, front-end and back-end development, AI integration, and continuous optimization of the Fengxiangxi Smart Village website. Dedicated to leveraging digital technology for rural revitalization and preserving red cultural heritage.',
    'about.devMotto': 'Digital empowerment for villages, technology inherits red genes',
    'about.contactTitle': '📬 Developer Contact',
    'about.contactPhone': 'Phone', 'about.contactQQ': 'QQ', 'about.contactEmail': 'Email',
    'about.teamTitle': 'Our Team',
    'about.teamSubtitle': 'Rural Practice Team · Fengxiangxi',
    'about.teamDesc': 'A "Three to the Countryside" social practice team from Guizhou Open University (Guizhou Vocational and Technical College). From June 25 to July 1, 2026, the team conducted research in Fengxiangxi Town, Dejiang County, Tongren City, Guizhou Province, focusing on the integrated development of red culture and green industries. Through field visits, farmer surveys, and industry data review, the team explored pathways for integrating red culture with mountain agriculture, contributing youth power to rural revitalization.',
    'about.instructors': '👨‍🏫 Instructors',
    'about.members': '👥 Team Members',
    'about.memberCount': '{count} members',
    'about.instructor': 'Instructor',
    'about.photoCaption1': 'Team Photo 1', 'about.photoCaption2': 'Team Photo 2',
    'about.roadmap': 'Development Roadmap',
    'about.roadmapSub': 'Continuously Updated · Milestones Below',
    'about.techTitle': 'Tech Stack',
    'about.techFront': '🌐 Frontend', 'about.techBack': '⚙️ Backend (Planned)', 'about.techDeploy': '🚀 Deployment',
    'about.phase1': 'v1.0 · Launched', 'about.phase1title': 'Frontend Website',
    'about.phase2': 'v2.0 · In Development', 'about.phase2title': 'AI Q&A System',
    'about.phase3': 'v3.0 · Planned', 'about.phase3title': 'User System',
    'about.phase4': 'v4.0 · Planned', 'about.phase4title': 'Data Platform',
    'about.phase5': 'v5.0 · Long-term', 'about.phase5title': '3D Digital Twin',

    // AI Chat
    'ai.title': '🤖 Fengxiangxi AI Assistant',
    'ai.greeting': "👋 Hello! I'm the Fengxiangxi Smart Village AI Assistant.\nYou can ask me about red culture, green industries, and travel tips.",
    'ai.placeholder': 'Type your question...',

    // Settings
    'settings.fontSize': '🔤 Font Size', 'settings.lang': '🌐 Language', 'settings.imgStyle': '🖼️ Image Style',
    'settings.reduceMotion': '🎬 Reduce Motion', 'settings.normal': 'Normal', 'settings.large': 'Large', 'settings.xlarge': 'X-Large',
    'settings.default': 'Default', 'settings.rounded': 'Rounded', 'settings.vintage': 'Vintage', 'settings.vivid': 'Vivid',
    'settings.on': 'On', 'settings.off': 'Off', 'settings.chinese': '中文', 'settings.english': 'English',

    // Theme
    'theme.title': 'Theme Appearance', 'theme.dark': 'Deep Night', 'theme.light': 'Dawn Light',
    'theme.forest': 'Forest Green', 'theme.ocean': 'Ocean Blue', 'theme.sunset': 'Golden Sunset', 'theme.lavender': 'Lavender',

    // Footer
    'footer.brand': 'Fengxiangxi Smart Village', 'footer.locale': 'Dejiang · Tongren · Guizhou',
    'footer.slogan': 'Red Heritage · Rural Revitalization',
    'footer.dev': 'Developer: Li Guijiang', 'footer.team': 'Rural Practice Team · Fengxiangxi',
    'footer.copy': '© 2026 Fengxiangxi Smart Village · Rural Practice Project',
    'footer.nav': 'Navigation', 'footer.overview': 'About Fengxiangxi',
    'footer.l1': '📍 Fengxi Community, Fengxiangxi Town, Dejiang, Guizhou',
    'footer.l2': '🏛️ National Key Cultural Relic Protection Unit',
    'footer.l3': '🎖️ Guizhou Provincial Patriotism Education Base',
    'footer.l4': '🌲 Forest Cover 79.5% | Altitude 700-800m',

    // Common
    'common.backToTop': 'Back to Top', 'common.viewLarge': 'Click to View', 'common.close': '✕',
    'common.phone': 'Phone', 'common.qq': 'QQ', 'common.email': 'Email', 'common.instructor': 'Instructor',
  },
}

export function useI18n() {
  const t = (key, params = {}) => {
    const msgs = messages[locale.value]
    let text = msgs?.[key]
    if (text === undefined) {
      // Fallback to Chinese
      text = messages.zh[key]
    }
    if (text === undefined) return key
    Object.entries(params).forEach(([k, v]) => { text = text.replace(`{${k}}`, v) })
    return text
  }

  const setLocale = (lang) => {
    locale.value = lang
    localStorage.setItem('fx-lang', lang)
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-CN')
  }

  return { locale, t, setLocale }
}
