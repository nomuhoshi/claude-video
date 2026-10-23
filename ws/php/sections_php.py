# -*- coding: utf-8 -*-
SRC = [
 ('漏洞细节、受影响与修复版本、9.2 分', 'rapid7.com · 2026-10-22', 'https://www.rapid7.com/blog/post/etr-cve-2026-109618-and-cve-2026-109619-critical-unauthenticated-remote-code-execution-in-php/'),
 ('PHP 预告与发布紧急补丁', 'bleepingcomputer.com', 'https://www.bleepingcomputer.com/news/security/php-warns-admins-of-two-critical-flaws-emergency-patches-coming-tomorrow/'),
 ('Wiz：AI 参与发现、时间线', 'wiz.io', 'https://www.wiz.io/blog/php2shell-php-rce'),
 ('OpenAI 牵头协调、日本政府无损害报告', 'AP 通讯社 · 2026-10-21', 'https://www.ksat.com/business/2026/10/21/some-websites-go-dark-as-operators-address-an-ai-detected-flaw-in-a-web-programming-language/'),
 ('Amazon 蜜罐：公开前 4 天的试探', 'thehackernews.com', 'https://thehackernews.com/2026/10/someone-tried-to-exploit-php2shell-4.html'),
 ('高市首相呼吁、IPA 与内阁网络安全部门', 'BigGo Finance（转述日本媒体）', 'https://finance.biggo.com/news/ecd6fc47-2403-4e2c-90d1-bc2b32b48fad'),
 ('银行、证券、交通停服；银行协会确认', 'BigGo Finance（转述日本媒体）', 'https://finance.biggo.com/news/845e9932-a9f8-4863-b6d5-8e290a62bd42'),
 ('すき家、はま寿司 App 停止', '共同通信 · 2026-10-22', 'https://topics.smt.docomo.ne.jp/amp/article/kyodo_nor/business/kyodo_nor-2026102201000512'),
 ('10/23 仍在停：すき家、モス；JR 东日本恢复', 'ANN · 2026-10-23', 'https://news.ksb.co.jp/ann/article/16989136'),
 ('PHP 占网站后端语言 69.3%', 'w3techs.com · 2026-10-23', 'https://w3techs.com/technologies/details/pl-php'),
]
CHECK = [
 ('すき家、はま寿司 App 停止（ゼンショー）', '已核实', '共同通信 10/22；ANN 10/23 仍未恢复'),
 ('高市首相 10/21 晚在 X 上发文“大至急のお願い”，呼吁尽快打补丁，可暂停网站', '已核实', 'ANN 标题；BigGo 转述'),
 ('静冈银行网银、瑞穗分行预约、大和证券开户、京阪官网、JAL 部分功能', '转述', 'BigGo 转述日本媒体 10/21'),
 ('モスバーガー部分服务停止；JR 东日本陆续恢复、列车不受影响', '已核实', 'ANN 10/23'),
 ('两个漏洞 CVSS v4 9.2；未登录远程执行代码', '已核实', 'Rapid7、BleepingComputer'),
 ('近十年的每个版本至少受一个影响；藏了十多年', '已核实', 'Wiz'),
 ('Wiz 用 Wiz Atlas、Gemini、GPT 等 AI 工具；8/19 发现、8/21 打通 WordPress、8/24 报告、10/21 公开', '已核实', 'Wiz 时间线'),
 ('OpenAI 称牵头联盟两个月修补，AI 似乎比攻击者先找到', '已核实', 'AP'),
 ('Amazon 蜜罐 10/17 公开前试探；10/21 多起攻击尝试；AI 让公开后数小时内动手', '已核实', 'The Hacker News 转述 Amazon CISO'),
 ('官房长官：未收到网络攻击损害报告；银行协会：银行间结算无影响', '已核实', 'AP；BigGo'),
 ('约七成网站用 PHP（69.3%，按已知后端语言统计）', '已核实', 'W3Techs 10/23'),
 ('“后厨”比喻', '简化', '服务器端脚本语言的通俗说法'),
]
