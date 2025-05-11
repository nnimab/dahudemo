"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronRight, Eye, Maximize2, Info, ChevronLeft, ChevronRightIcon } from "lucide-react"
import TopNavigation from "./top-navigation"
import MarketIndicesHeader from "./market-indices-header"
import NewsDetailPage, { NewsItem } from "./news-detail-page"

interface OverviewPageProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

// 佔位新聞資料
export const placeholderAcademyNews: NewsItem[] = [
  {
    id: "academy-1",
    newsCategory: "股市話題", // Keeping similar category as original example
    newsDate: "2025-05-09",
    title: "台股盤後｜大盤強彈371點，AI＋矽光子雙引擎點火！黃仁勳來台前奏效應啟動？0509 ｜股市話題", // Using a title similar to your example for the first news
    content: "2025年5月9日，台股加權指數收在20,915.04點，上漲371.64點，漲幅1.81%，成交金額2935.10億元，呈現量價齊揚格局。櫃買指數收223.55點，上漲0.86點，漲幅0.39%。電子、金融、傳產等主要類股同步走揚，AI、半導體、機器人等主題再度成為市場資金追逐焦點，帶動指數強勢反彈。",
    imageUrl: "https://assets.blog.engoo.com/wp-content/uploads/sites/3/2022/09/29095616/stock-crach-english-1024x597.png",
    sections: [
      {
        title: "一、三大盤勢重點",
        text: "▸台積電續強領軍電子權值股上攻:台積電持續領漲，帶動電子權值股如鴻海（2317）、聯發科（2454）、廣達（2382）同步上揚。\n▸矽光子概念股全面噴出:矽光子族群反彈明顯，華星光（4979）、聯亞（3081）、聯鈞（3450）等股表現搶眼，部分股價攻上漲停。\n▸川普關稅談判:美國與英國達成新的貿易協議，市場預期美中貿易談判即將展開，川普宣布可能調降對中國關稅，激勵美股及台股氣氛"
      },
      {
        title: "二、強勢族群分析",
        text: "▸半導體權值股：台積電（2330）今日表現亮眼，收漲31元，成交量大幅增加，帶動鴻海（2317）上漲1元至147元，聯發科（2454）漲35元至1325元，廣達（2382）漲5元至256.5元。\n▸矽光子概念股：受惠於輝達（NVIDIA）執行長黃仁勳即將於5月19日來台參加Computex，矽光子族群熱度升溫。華星光（4979）漲停至166元，光聖（6442）漲停至426.5元，聯亞（3081）漲停至282.5元，聯鈞（3450）漲停至204.5元，立碁（8111）、上詮（3363）、波若威（3163）亦有強勁表現。此族群反彈強勁，市場關注其後續AI及加速運算相關訂單的落實。\n▸機器人及自動化：佳能（2374）、穎漢（4562）、亞光（3019）等機器人概念股走高，反映市場對自動化與智慧製造需求的期待。\n▸貨櫃航運股：長榮（2603）、萬海（2615）、陽明（2609）全數收紅，\n▸蘋果供應鏈：大立光（3008）、玉晶光（3406）等蘋果概念股今日亦有不錯表現，與蘋果新產品需求相關聯。"
      },
      {
        title: "三、重要新聞事件",
        text: "▸輝達執行長黃仁勳提前抵台，COMPUTEX展前供應鏈密集會談。\n▸黃仁勳預計5月12日提前抵台，展開與台積電（2330）、鴻海（2317）等供應鏈大老的密集會談，討論美中貿易、川普關稅政策與AI產業未來布局。COMPUTEX 2025即將登場，AI、機器人、CPO等成展覽焦點。\n▸COMPUTEX 2025以「AI Next」為主題，預計帶動AI、機器人、邊緣運算等相關供應鏈熱潮。"
      },
      {
        title: "四、國際指數走勢",
        text: "亞洲股市今日普遍上漲。日經指數收漲556.87點（1.6%），報37485.50點，東證股價指數連續11個交易日上漲。香港恒生指數亦呈現上漲趨勢。美國股市因貿易利多消息推升，帶動亞股氣氛。"
      },
      {
        title: "五、市場討論焦點",
        text: "▸黃仁勳與Computex 2025：輝達執行長黃仁勳將來台發表主題演講，聚焦AI與加速運算技術，帶動矽光子及AI供應鏈股價活絡。市場關注其是否能敲定新一代AI伺服器訂單。\n▸川普貿易政策：川普宣布美英達成貿易協議，並暗示將調降對中國關稅，激勵市場樂觀情緒，推升美股及台股。\n▸比特幣與加密貨幣：比特幣突破104,000美元，相關加密貨幣ETF全線高開，反映投資人對數位資產需求回溫。\n▸美中貿易談判：市場期待即將展開的美中正式談判，對全球貿易局勢的影響成為關注焦點。\n▸川普喊話「現在該買美國股票」：公開鼓吹投資人進場，加上美英簽署新貿易協議、釋出關稅政策鬆動訊號，激勵市場風險偏好情緒，美股與亞股同步走揚。\n不過，投資人仍保持謹慎，關注半導體關稅議題及全球經濟基本面變化，短期多空格局仍呈現膠著狀態。"
      }
    ]
  },
  {
    id: "academy-2",
    newsCategory: "法人籌碼", // Derived from content
    newsDate: "2025-05-09", // From "0509" in title
    title: "三大法人買賣超 – 外資買超(2330)台積電、(3450)聯鈞，投信買超(2383)台光電、(6669)緯穎，法人合計買超234.83億元 (0509)",
    content: "05/09集中市場三大法人合計買超234.83億元，其中，外資買超227.32億元，投信買超11.52億元，自營賣超4.01億元。\n櫃買市場方面，三大法人合計賣超20.98億元，其中，外資賣超18.5億元，投信賣超7.09億元，自營買超4.61億元。",
    imageUrl: "https://richclub.blob.core.windows.net/article/681dbaf31e7d01132a053b4a/content/1746779136069-%E5%9C%96%E7%89%873.png",
    sections: [
      {
        title: "三大法人買賣超詳情",
        text: "投信受限於基金規模，對於中小型股票有更大的影響力。光看三大法人買賣超數據無法滿足你？我們透過獨特篩選手法，找出投信積極布局的中小型標的，歡迎前往【法人籌碼跟著走】訂閱觀看！標的看哪些？每日幫你整理📝潛力動能股盡在法人籌碼跟著走📊標的看哪些？每日幫你整理📝潛力動能股盡在法人籌碼跟著走📊05/09外資買超金額最大的依序為2330台積電、3450聯鈞、2884玉山金、2603長榮、2609陽明。而外資賣超金額最大的依序為3661世芯-KY、2881富邦金、8069元太、3706神達、富世達。投信買超金額最大的依序為2383台光電、6669緯穎、2330台積電、2345智邦、2368金像電。而投信賣超金額最大的依序為8069元太、3533嘉澤、2882國泰金、2891中信金、2881富邦金。"
      }
    ]
  },
  {
    id: "academy-3",
    newsCategory: "股市熱話", // From source
    newsDate: "2025-05-09", // From "2025.05.09" in source
    title: "【美股盤前】關稅風向球：英美協議釋利多，歐盟反制埋隱憂",
    content: "英美達成貿易協議，激勵美股上漲。然而，歐盟不滿美國關稅，準備對美國商品祭出反制措施。市場樂觀情緒回升，避險資產如黃金和美債殖利率承壓下跌。",
    imageUrl: "https://richclub.blob.core.windows.net/article/681dac0d523540134edfc3d6/content/1746775684448-%E6%8A%95%E5%BD%B1%E7%89%874.jpg",
    sections: [
      {
        title: "一、美股/全球市場動態",
        text: "1. 聯準會五月利率決議：維持不變，鮑爾點出關稅與通膨風險\n英美達成貿易協議：美國保留對英國 10% 的基本關稅、取消對英國鋼鋁關稅、對英國汽車進口採取階梯式關稅；英國則對美國農產品實施零關稅。川普表示，對英協議並非範本，10% 可能是最低稅率，對其他國家的關稅可能更高。\n歐盟將針對美國關稅向世界貿易組織 (WTO) 提起訴訟，並準備對價值 950 億歐元的美國進口產品採取反制措施，目標鎖定汽車、飛機及威士忌等商品。\n受惠於貿易協議突破及川普於 Truth Social 發文喊「買股票」，美股連兩日上漲，美國鋁業 (Alcoa) 因英美取消對英國鋼鋁關稅而大漲超過 5%。\n投資者風險偏好情緒改善，避險資產普遍下跌，10 年期美債殖利率上升約 10 個基點，報 4.379%；黃金期貨一度下跌逾 2%，終場收跌 1.86%。"
      },
      {
        title: "2. 美國總經/美股焦點：",
        text: "英國央行宣布降息 25 個基點至 4.25%，多數支持降息的委員認為全球貿易情勢變化是降息的理由。\n美國宣布與英國達成貿易協議後，美國商務部長盧特尼克表示：「我關注的是下一個貿易協議的大國，我們希望與一個來自亞洲的大國達成貿易協議。」\n印巴衝突：巴基斯坦軍方聲稱已擊落 25 架印度無人機，巴方人員出現傷亡；印度則指控印控克什米爾遭巴方襲擊，但巴基斯坦否認此事；美國國務卿已分別與印巴外長通話，表達支持雙方直接對話。"
      },
      {
        title: "3. 美股四大指數昨收：",
        text: "標普500綜合指數上漲32.66點(0.58%)至5663.94\n那斯達克綜合指數上漲189.98點(1.07%)至17928.14\n道瓊工業指數上漲254.48點(0.62%)至41368.45\n費城半導體指數上漲44.08點(1.00%)至4430.44"
      }
    ]
  },
  {
    id: "academy-4",
    newsCategory: "股市熱話", // From source
    newsDate: "2025-05-09", // From "2025.05.09" in source
    title: "【本週必讀精選】台美利差縮小，套利交易還有價值嗎？台幣破30元對投資人有何警訊與機會？｜豐學PRIME",
    content: "當兩國間存在明顯利率差距時，將催生所謂的「套利交易」(carry trade)。投資者通常會借入低利率國家的貨幣，投資於高利率國家的資產，從中賺取利差收益。在過去幾年，由於美國利率明顯高於台灣，許多投資者採取從台灣借款投資美國資產的策略，享受利差帶來的收益。",
    imageUrl: "https://doqvf81n9htmm.cloudfront.net/data/changchi_177/7-16/45654654654654/shutterstock_1575415720.jpg",
    sections: [
      {
        title: "🅿 【關鍵時事】台美利差縮小，套利交易還有價值嗎？台幣破30元對投資人有何警訊與機會？｜股市話題",
        text: "1. 近期新台幣兌美元匯率顯著升值，一度突破30元關卡至29.7元，創下兩年新高，這對台灣股市各產業帶來巨大衝擊。\n2. 台美利差在2022年因應通膨而擴大（美國積極升息，台灣相對謹慎），但截至2025年5月，隨著美國開始降息而台灣利率相對穩定，利差正在縮小，此趨勢成為支撐新台幣升值的重要因素。\n3. 當兩國存在明顯利差時會產生「套利交易」，通常是借入低利率貨幣投資高利率資產以賺取利差，過去幾年有許多投資者利用台灣低利率借款投資美國資產。"
      },
      {
        title: "🅿 【關鍵時事】川普傳鬆綁AI晶片禁令，對NVIDIA管制放寬？從歷史看技術封鎖如何催生對手崛起｜股市話題",
        text: "1. 技術封鎖歷史與有效性：回顧古今中外技術封鎖，顯示長期而言，此類限制因市場機制與創新韌性而難以完全有效。\n2. 被封鎖國應對：面對技術封鎖，被封鎖國常透過被動創新突圍，如美國逆向工程、中國舉國體制。\n3. AI伺服器需求動能：儘管面臨技術封鎖，AI伺服器的強勁需求仍是部分科技產業的重要成長動力。"
      },
      {
        title: "🅿 【個股追蹤】6505 台塑化 油價下跌與台幣升值，台灣煉油廠商將受惠",
        text: "1. 油價疲軟對台塑化是正面影響：由於OPEC+決定增產，國際油價走勢偏弱。永豐投顧評估，原油價格下跌對需要採購原油的台塑化是正面效益 。\n2. 煉油利差已擴大至雙位數：受惠原油價格下跌與官方銷售價(OSP)降低 ，加上預期歐美部分煉廠將於2025年第二季關閉 ，有利於提振煉油利差 。目前煉油利差已達雙位數水準 。\n3. 烯烴產品營運改善：國際油價回落帶動輕油原料成本下跌 ，烯烴產品成本壓力減輕 。特別是乙烯利差已接近損益兩平，對本業有正向激勵 。"
      },
      {
        title: "🅿 【個股追蹤】AMD營收展望優於市場預期，市占率持續提升",
        text: "1. 1Q25財報表現優於市場預期：AMD於1Q25營收74.4億美元 (+36% YoY)，稅後EPS 0.96美元，略高於預期。Data Center營收年增57%，受AI GPU MI300及CPU市佔增加帶動。Client營收年增68%。\n2. 2Q25展望受中國禁令影響，營收預期季減：公司預期2Q25營收約74億美元，季減1%。Data Center GPU營收將因美國禁止銷往中國而季減，預計減少7億美元，全年減少15億美元。一次性認列8億美元成本影響毛利率。\n3. 留意下半年Client業務季節性波動：公司提及1H25 Client表現特別優於預期，因此2H25的表現可能略低於過往的季節性水準。"
      },
      {
        title: "🅿 【個股追蹤】2015 豐興 2Q25價差可望提升、中長期穩健獲利及配息",
        text: "1. 1Q25財報表現： 1Q25營收74.6億元 (-12%YoY)，稅後獲利4.7億元 (-21%YoY)，EPS 0.81元，低於預期。\n2. 鋼品銷售展望： 原物料跌致鋼筋降價但詢單積極。預期2Q25出貨回去年同期，受惠廠辦建設熱絡。\n3. 未來擴建計畫： 5/2標得彰濱土地32.6億元、7.38萬坪。計畫建軋鋼廠緩解壓力，資金一半來自新竹土地。"
      }
    ]
  }
];

export const placeholderNews7x24: NewsItem[] = [
  {
    id: "news7x24-1",
    newsCategory: "新聞7x24",
    newsDate: "09:00", // Assuming a morning time for the 7x24 feed
    title: "台股盤後｜大盤強彈371點，AI＋矽光子雙引擎點火！黃仁勳來台前奏效應啟動？0509 ｜股市話題", // From academy-1
    content: "2025年5月9日，台股加權指數收在20,915.04點，上漲371.64點，漲幅1.81%，成交金額2935.10億元，呈現量價齊揚格局。櫃買指數收223.55點，上漲0.86點，漲幅0.39%。電子、金融、傳產等主要類股同步走揚，AI、半導體、機器人等主題再度成為市場資金追逐焦點，帶動指數強勢反彈。", // From academy-1
    imageUrl: "https://assets.blog.engoo.com/wp-content/uploads/sites/3/2022/09/29095616/stock-crach-english-1024x597.png", // From academy-1
    sections: [ // From academy-1
      {
        title: "一、三大盤勢重點",
        text: "▸台積電續強領軍電子權值股上攻:台積電持續領漲，帶動電子權值股如鴻海（2317）、聯發科（2454）、廣達（2382）同步上揚。\n▸矽光子概念股全面噴出:矽光子族群反彈明顯，華星光（4979）、聯亞（3081）、聯鈞（3450）等股表現搶眼，部分股價攻上漲停。\n▸川普關稅談判:美國與英國達成新的貿易協議，市場預期美中貿易談判即將展開，川普宣布可能調降對中國關稅，激勵美股及台股氣氛"
      },
      {
        title: "二、強勢族群分析",
        text: "▸半導體權值股：台積電（2330）今日表現亮眼，收漲31元，成交量大幅增加，帶動鴻海（2317）上漲1元至147元，聯發科（2454）漲35元至1325元，廣達（2382）漲5元至256.5元。\n▸矽光子概念股：受惠於輝達（NVIDIA）執行長黃仁勳即將於5月19日來台參加Computex，矽光子族群熱度升溫。華星光（4979）漲停至166元，光聖（6442）漲停至426.5元，聯亞（3081）漲停至282.5元，聯鈞（3450）漲停至204.5元，立碁（8111）、上詮（3363）、波若威（3163）亦有強勁表現。此族群反彈強勁，市場關注其後續AI及加速運算相關訂單的落實。\n▸機器人及自動化：佳能（2374）、穎漢（4562）、亞光（3019）等機器人概念股走高，反映市場對自動化與智慧製造需求的期待。\n▸貨櫃航運股：長榮（2603）、萬海（2615）、陽明（2609）全數收紅，\n▸蘋果供應鏈：大立光（3008）、玉晶光（3406）等蘋果概念股今日亦有不錯表現，與蘋果新產品需求相關聯。"
      },
      {
        title: "三、重要新聞事件",
        text: "▸輝達執行長黃仁勳提前抵台，COMPUTEX展前供應鏈密集會談。\n▸黃仁勳預計5月12日提前抵台，展開與台積電（2330）、鴻海（2317）等供應鏈大老的密集會談，討論美中貿易、川普關稅政策與AI產業未來布局。COMPUTEX 2025即將登場，AI、機器人、CPO等成展覽焦點。\n▸COMPUTEX 2025以「AI Next」為主題，預計帶動AI、機器人、邊緣運算等相關供應鏈熱潮。"
      },
      {
        title: "四、國際指數走勢",
        text: "亞洲股市今日普遍上漲。日經指數收漲556.87點（1.6%），報37485.50點，東證股價指數連續11個交易日上漲。香港恒生指數亦呈現上漲趨勢。美國股市因貿易利多消息推升，帶動亞股氣氛。"
      },
      {
        title: "五、市場討論焦點",
        text: "▸黃仁勳與Computex 2025：輝達執行長黃仁勳將來台發表主題演講，聚焦AI與加速運算技術，帶動矽光子及AI供應鏈股價活絡。市場關注其是否能敲定新一代AI伺服器訂單。\n▸川普貿易政策：川普宣布美英達成貿易協議，並暗示將調降對中國關稅，激勵市場樂觀情緒，推升美股及台股。\n▸比特幣與加密貨幣：比特幣突破104,000美元，相關加密貨幣ETF全線高開，反映投資人對數位資產需求回溫。\n▸美中貿易談判：市場期待即將展開的美中正式談判，對全球貿易局勢的影響成為關注焦點。\n▸川普喊話「現在該買美國股票」：公開鼓吹投資人進場，加上美英簽署新貿易協議、釋出關稅政策鬆動訊號，激勵市場風險偏好情緒，美股與亞股同步走揚。\n不過，投資人仍保持謹慎，關注半導體關稅議題及全球經濟基本面變化，短期多空格局仍呈現膠著狀態。"
      }
    ]
  },
  {
    id: "news7x24-2",
    newsCategory: "新聞7x24",
    newsDate: "09:10", // Sequential time
    title: "三大法人買賣超 – 外資買超(2330)台積電、(3450)聯鈞，投信買超(2383)台光電、(6669)緯穎，法人合計買超234.83億元 (0509)", // From academy-2
    content: "05/09集中市場三大法人合計買超234.83億元，其中，外資買超227.32億元，投信買超11.52億元，自營賣超4.01億元。\n櫃買市場方面，三大法人合計賣超20.98億元，其中，外資賣超18.5億元，投信賣超7.09億元，自營買超4.61億元。", // From academy-2
    imageUrl: "https://richclub.blob.core.windows.net/article/681dbaf31e7d01132a053b4a/content/1746779136069-%E5%9C%96%E7%89%873.png", // From academy-2
    sections: [ // From academy-2
      {
        title: "三大法人買賣超詳情",
        text: "投信受限於基金規模，對於中小型股票有更大的影響力。光看三大法人買賣超數據無法滿足你？我們透過獨特篩選手法，找出投信積極布局的中小型標的，歡迎前往【法人籌碼跟著走】訂閱觀看！標的看哪些？每日幫你整理📝潛力動能股盡在法人籌碼跟著走📊標的看哪些？每日幫你整理📝潛力動能股盡在法人籌碼跟著走📊05/09外資買超金額最大的依序為2330台積電、3450聯鈞、2884玉山金、2603長榮、2609陽明。而外資賣超金額最大的依序為3661世芯-KY、2881富邦金、8069元太、3706神達、富世達。投信買超金額最大的依序為2383台光電、6669緯穎、2330台積電、2345智邦、2368金像電。而投信賣超金額最大的依序為8069元太、3533嘉澤、2882國泰金、2891中信金、2881富邦金。"
      }
    ]
  },
  {
    id: "news7x24-3",
    newsCategory: "新聞7x24",
    newsDate: "09:20", // Sequential time
    title: "【美股盤前】關稅風向球：英美協議釋利多，歐盟反制埋隱憂", // From academy-3
    content: "英美達成貿易協議，激勵美股上漲。然而，歐盟不滿美國關稅，準備對美國商品祭出反制措施。市場樂觀情緒回升，避險資產如黃金和美債殖利率承壓下跌。", // From academy-3
    imageUrl: "https://richclub.blob.core.windows.net/article/681dac0d523540134edfc3d6/content/1746775684448-%E6%8A%95%E5%BD%B1%E7%89%874.jpg", // From academy-3
    sections: [ // From academy-3
      {
        title: "一、美股/全球市場動態",
        text: "1. 聯準會五月利率決議：維持不變，鮑爾點出關稅與通膨風險\n英美達成貿易協議：美國保留對英國 10% 的基本關稅、取消對英國鋼鋁關稅、對英國汽車進口採取階梯式關稅；英國則對美國農產品實施零關稅。川普表示，對英協議並非範本，10% 可能是最低稅率，對其他國家的關稅可能更高。\n歐盟將針對美國關稅向世界貿易組織 (WTO) 提起訴訟，並準備對價值 950 億歐元的美國進口產品採取反制措施，目標鎖定汽車、飛機及威士忌等商品。\n受惠於貿易協議突破及川普於 Truth Social 發文喊「買股票」，美股連兩日上漲，美國鋁業 (Alcoa) 因英美取消對英國鋼鋁關稅而大漲超過 5%。\n投資者風險偏好情緒改善，避險資產普遍下跌，10 年期美債殖利率上升約 10 個基點，報 4.379%；黃金期貨一度下跌逾 2%，終場收跌 1.86%。"
      },
      {
        title: "2. 美國總經/美股焦點：",
        text: "英國央行宣布降息 25 個基點至 4.25%，多數支持降息的委員認為全球貿易情勢變化是降息的理由。\n美國宣布與英國達成貿易協議後，美國商務部長盧特尼克表示：「我關注的是下一個貿易協議的大國，我們希望與一個來自亞洲的大國達成貿易協議。」\n印巴衝突：巴基斯坦軍方聲稱已擊落 25 架印度無人機，巴方人員出現傷亡；印度則指控印控克什米爾遭巴方襲擊，但巴基斯坦否認此事；美國國務卿已分別與印巴外長通話，表達支持雙方直接對話。"
      },
      {
        title: "3. 美股四大指數昨收：",
        text: "標普500綜合指數上漲32.66點(0.58%)至5663.94\n那斯達克綜合指數上漲189.98點(1.07%)至17928.14\n道瓊工業指數上漲254.48點(0.62%)至41368.45\n費城半導體指數上漲44.08點(1.00%)至4430.44"
      }
    ]
  },
  {
    id: "news7x24-4",
    newsCategory: "新聞7x24",
    newsDate: "09:30", // Sequential time
    title: "【本週必讀精選】台美利差縮小，套利交易還有價值嗎？台幣破30元對投資人有何警訊與機會？｜豐學PRIME", // From academy-4
    content: "當兩國間存在明顯利率差距時，將催生所謂的「套利交易」(carry trade)。投資者通常會借入低利率國家的貨幣，投資於高利率國家的資產，從中賺取利差收益。在過去幾年，由於美國利率明顯高於台灣，許多投資者採取從台灣借款投資美國資產的策略，享受利差帶來的收益。", // From academy-4
    imageUrl: "https://doqvf81n9htmm.cloudfront.net/data/changchi_177/7-16/45654654654654/shutterstock_1575415720.jpg", // From academy-4
    sections: [ // From academy-4
      {
        title: "🅿 【關鍵時事】台美利差縮小，套利交易還有價值嗎？台幣破30元對投資人有何警訊與機會？｜股市話題",
        text: "1. 近期新台幣兌美元匯率顯著升值，一度突破30元關卡至29.7元，創下兩年新高，這對台灣股市各產業帶來巨大衝擊。\n2. 台美利差在2022年因應通膨而擴大（美國積極升息，台灣相對謹慎），但截至2025年5月，隨著美國開始降息而台灣利率相對穩定，利差正在縮小，此趨勢成為支撐新台幣升值的重要因素。\n3. 當兩國存在明顯利差時會產生「套利交易」，通常是借入低利率貨幣投資高利率資產以賺取利差，過去幾年有許多投資者利用台灣低利率借款投資美國資產。"
      },
      {
        title: "🅿 【關鍵時事】川普傳鬆綁AI晶片禁令，對NVIDIA管制放寬？從歷史看技術封鎖如何催生對手崛起｜股市話題",
        text: "1. 技術封鎖歷史與有效性：回顧古今中外技術封鎖，顯示長期而言，此類限制因市場機制與創新韌性而難以完全有效。\n2. 被封鎖國應對：面對技術封鎖，被封鎖國常透過被動創新突圍，如美國逆向工程、中國舉國體制。\n3. AI伺服器需求動能：儘管面臨技術封鎖，AI伺服器的強勁需求仍是部分科技產業的重要成長動力。"
      },
      {
        title: "🅿 【個股追蹤】6505 台塑化 油價下跌與台幣升值，台灣煉油廠商將受惠",
        text: "1. 油價疲軟對台塑化是正面影響：由於OPEC+決定增產，國際油價走勢偏弱。永豐投顧評估，原油價格下跌對需要採購原油的台塑化是正面效益 。\n2. 煉油利差已擴大至雙位數：受惠原油價格下跌與官方銷售價(OSP)降低 ，加上預期歐美部分煉廠將於2025年第二季關閉 ，有利於提振煉油利差 。目前煉油利差已達雙位數水準 。\n3. 烯烴產品營運改善：國際油價回落帶動輕油原料成本下跌 ，烯烴產品成本壓力減輕 。特別是乙烯利差已接近損益兩平，對本業有正向激勵 。"
      },
      {
        title: "🅿 【個股追蹤】AMD營收展望優於市場預期，市占率持續提升",
        text: "1. 1Q25財報表現優於市場預期：AMD於1Q25營收74.4億美元 (+36% YoY)，稅後EPS 0.96美元，略高於預期。Data Center營收年增57%，受AI GPU MI300及CPU市佔增加帶動。Client營收年增68%。\n2. 2Q25展望受中國禁令影響，營收預期季減：公司預期2Q25營收約74億美元，季減1%。Data Center GPU營收將因美國禁止銷往中國而季減，預計減少7億美元，全年減少15億美元。一次性認列8億美元成本影響毛利率。\n3. 留意下半年Client業務季節性波動：公司提及1H25 Client表現特別優於預期，因此2H25的表現可能略低於過往的季節性水準。"
      },
      {
        title: "🅿 【個股追蹤】2015 豐興 2Q25價差可望提升、中長期穩健獲利及配息",
        text: "1. 1Q25財報表現： 1Q25營收74.6億元 (-12%YoY)，稅後獲利4.7億元 (-21%YoY)，EPS 0.81元，低於預期。\n2. 鋼品銷售展望： 原物料跌致鋼筋降價但詢單積極。預期2Q25出貨回去年同期，受惠廠辦建設熱絡。\n3. 未來擴建計畫： 5/2標得彰濱土地32.6億元、7.38萬坪。計畫建軋鋼廠緩解壓力，資金一半來自新竹土地。"
      }
    ]
  }
];

export default function OverviewPage({ activeTab, setActiveTab }: OverviewPageProps) {
  const [activeContentTab, setActiveContentTab] = useState("fresh")
  const [activePage, setActivePage] = useState(0)
  const gridRef = useRef<HTMLDivElement>(null)
  const [showNewsDetail, setShowNewsDetail] = useState(false)
  const [selectedNewsItem, setSelectedNewsItem] = useState<NewsItem | null>(null);

  // Carousel state and data
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesData = [
    { type: 'content', title: '加值內容', line1: '\\台幣大升值專家觀點/', line2: '【豐學PRIME (一個...', participants: '已有 140 人參加' },
    { type: 'image', title: '精彩節目', imgSrc: '/精彩節目.png', alt: '精彩節目' },
    { type: 'image', title: '知識講堂', imgSrc: '/知識講堂.jpg', alt: '知識講堂講堂' }
  ];

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
    if (carouselRef.current) {
      const targetSlideElement = carouselRef.current.children[slideIndex] as HTMLElement;
      if (targetSlideElement) {
          const scrollLeft = targetSlideElement.offsetLeft;
          carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (slidesData.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => {
        const nextSlide = (prev + 1) % slidesData.length;
        if (carouselRef.current) {
          const targetSlideElement = carouselRef.current.children[nextSlide] as HTMLElement;
          if (targetSlideElement) {
              const scrollLeft = targetSlideElement.offsetLeft;
              carouselRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
          }
        }
        return nextSlide;
      });
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [slidesData.length]);

  // Function to handle page navigation
  const handlePageChange = (pageIndex: number) => {
    setActivePage(pageIndex)
    if (gridRef.current) {
      gridRef.current.scrollTo({
        left: pageIndex * gridRef.current.offsetWidth,
        behavior: "smooth",
      })
    }
  }

  // Handle scroll events to update active page
  const handleScroll = () => {
    if (gridRef.current) {
      const scrollPosition = gridRef.current.scrollLeft
      const pageWidth = gridRef.current.offsetWidth
      const newActivePage = Math.round(scrollPosition / pageWidth)
      if (newActivePage !== activePage) {
        setActivePage(newActivePage)
      }
    }
  }

  // Add scroll event listener
  useEffect(() => {
    const currentGridRef = gridRef.current
    if (currentGridRef) {
      currentGridRef.addEventListener("scroll", handleScroll)
      return () => {
        currentGridRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [activePage])

  const handleNewsClick = (newsItem: NewsItem) => {
    setSelectedNewsItem(newsItem);
    setShowNewsDetail(true);
  };

  // 如果 showNewsDetail 為 true 且有選中的新聞，則顯示新聞詳情頁面
  if (showNewsDetail && selectedNewsItem) {
    return <NewsDetailPage onBack={() => setShowNewsDetail(false)} newsItem={selectedNewsItem} />;
  }

  return (
    <div className="flex flex-col text-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10">
        <TopNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <MarketIndicesHeader />
      </div>

      {/* Stock Info */}
      <div className="flex items-center justify-between bg-[rgb(17,20,27)] px-4 py-2  border-b-8 border-black">
        <span className="text-gray-300">午安，9A89-23881956 派大興</span>
        <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">更新</button>
      </div>

      {/* Market Value */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <span className="text-white">台股庫存總市值(NTD)</span>
          <Eye className="ml-2 text-gray-400" />
          <div className="bg-[rgb(14,31,49)] px-1 rounded-sm border border-blue-500 ml-2">
            <span className="text-[#4a8ede] text-xs">ⓘ 含息、含稅</span>
          </div>
        </div>
        <Maximize2 className="text-gray-400 w-5 h-5" />
      </div>

      {/* Market Value Display */}
      <div className="px-4 pb-3">
        <div className="flex items-center">
          <span className="text-white text-3xl font-medium">*****<span className="text-xl">(***)</span></span>
        </div>
      </div>

      {/* Trading Info Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-2 border-b-8 border-black">
        {/* 左上 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex flex-row justify-between w-full">
            {/* 今日委託 Group */}
            <div className="flex flex-row items-baseline">
              <div className="flex flex-col mr-2 ">
                <span className="text-gray-400 text-xs">今日</span>
                <span className="text-gray-400 text-xs">委託</span>
              </div>
              <span className="text-[#daa360] text-xs font-bold mr-1 ">10</span>
              <span className="text-gray-400 text-xs">筆</span>
            </div>
            {/* 今日成交 Group */}
            <div className="flex flex-row items-baseline">
              <div className="flex flex-col mr-2">
                <span className="text-gray-400 text-xs">今日</span>
                <span className="text-gray-400 text-xs">成交</span>
              </div>
              <span className="text-[#daa360] text-xs font-bold mr-1">9</span>
              <span className="text-gray-400 text-xs">筆</span>
            </div>
          </div>
        </div>
        {/* 右上 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex items-baseline justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">今日</span>
              <span className="text-gray-400 text-xs">已實</span>
            </div>
            <span className="text-white text-xs font-bold">***</span>
          </div>
        </div>
        {/* 左下 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex items-baseline justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">近日</span>
              <span className="text-gray-400 text-xs">交割</span>
            </div>
            <span className="text-white text-xs font-bold">***</span>
          </div>
        </div>
        {/* 右下 */}
        <div className="bg-[rgb(20,27,35)] p-2 rounded-lg border border-gray-800">
          <div className="flex items-baseline justify-between w-full">
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs">今當沖</span>
              <span className="text-gray-400 text-xs">已實現</span>
            </div>
            <span className="text-white text-xs font-bold">***</span>
          </div>
        </div>
      </div>

      {/* Feature Icons Grid with Pagination */}
      <div className="relative border-b-8 border-black">
        {/* Navigation buttons */}
        {activePage > 0 && (
          <button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-1"
            onClick={() => handlePageChange(activePage - 1)}
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
        )}

        {activePage < 1 && (
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-1"
            onClick={() => handlePageChange(activePage + 1)}
          >
            <ChevronRightIcon size={20} className="text-white" />
          </button>
        )}

        {/* Scrollable grid container */}
        <div
          ref={gridRef}
          className="overflow-x-hidden snap-x snap-mandatory hide-scrollbar"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex w-[200%]">
            {/* First Page */}
            <div className="w-1/2 snap-start">
              <div className="grid grid-cols-4 gap-4 px-4 pt-3">
                {/* 智慧小豐 */}
                <div className="flex flex-col items-center">
                  <div
                    className="bg-[#daa160] p-3 rounded-full mb-2 cursor-pointer"
                    onClick={() => (window.location.href = "/smart-feng")}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="11" width="18" height="10" rx="2" stroke="white" strokeWidth="2" />
                      <rect x="7" y="15" width="2" height="2" rx="0.5" fill="white" />
                      <rect x="15" y="15" width="2" height="2" rx="0.5" fill="white" />
                      <path d="M12 8V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 6L8 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M16 6V9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">智慧小豐</span>
                </div>

                {/* 豐社群 (replacing 國際指數) */}
                <div className="flex flex-col items-center">
                  <div
                    className="bg-[rgb(196,57,38)] p-3 rounded-full mb-2 cursor-pointer"
                    onClick={() => (window.location.href = "/feng-community")}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="9"
                        cy="7"
                        r="4"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M23 21v-2a4 4 0 0 0-3-3.87"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16 3.13a4 4 0 0 1 0 7.75"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">豐社群</span>
                </div>

                {/* 投資筆記 (replacing 股票抽籤) */}
                <div className="flex flex-col items-center">
                  <div 
                    className="bg-[#daa160] p-3 rounded-full mb-2 cursor-pointer"
                    onClick={() => (window.location.href = "/notes")}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 9H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 17H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">投資筆記</span>
                </div>

                {/* 智慧下單 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M19 6.5C19 7.88071 17.8807 9 16.5 9C15.1193 9 14 7.88071 14 6.5C14 5.11929 15.1193 4 16.5 4C17.8807 4 19 5.11929 19 6.5Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M19 16.5C19 17.8807 17.8807 19 16.5 19C15.1193 19 14 17.8807 14 16.5C14 15.1193 15.1193 14 16.5 14C17.8807 14 19 15.1193 19 16.5Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path d="M9 6.5H14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M9 16.5H14" stroke="white" strokeLinecap="round" />
                      <path d="M8 9L15 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 14L15 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">智慧下單</span>
                </div>

                {/* 投資早報 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 14V18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 6V3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M15 17H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">投資早報</span>
                </div>

                {/* 借券專區 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6H16M16 6H9C7.89543 6 7 6.89543 7 8V13M16 6V4M4 18H8M8 18H15C16.1046 18 17 17.1046 17 16V13M8 18V20"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M12 10L17 13H7L12 10Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">借券專區</span>
                </div>

                {/* 借貸專區 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path d="M19 5V12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M19 5L12 5" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">借貸專區</span>
                </div>

                {/* 資產總覽 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
                      <path
                        d="M12 7V12L15 15"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">資產總覽</span>
                </div>
              </div>
            </div>

            {/* Second Page */}
            <div className="w-1/2 snap-start">
              <div className="grid grid-cols-4 gap-4 p-4">
                {/* 我的理專 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">我的理專</span>
                </div>

                {/* 掛經清單 */}
                <div className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4" y="4" width="16" height="16" rx="2" stroke="white" strokeWidth="2" />
                      <path d="M8 10H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 14H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="16" cy="7" r="3" fill="#daa160" />
                      <path d="M16 5.5V8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M14.5 7H17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-white text-xs text-center">掛經清單</span>
                </div>

                {/* Empty slots with plus icons */}
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="border border-dashed border-gray-600 rounded-full p-3 mb-2 w-12 h-12 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V18" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                        <path d="M6 12H18" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-gray-500 text-xs text-center">新增功能</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center space-x-2 pb-2">
          <div
            className={`h-1 rounded-full transition-all duration-300 ${activePage === 0 ? "w-6 bg-white" : "w-1 bg-gray-500"}`}
            onClick={() => handlePageChange(0)}
          ></div>
          <div
            className={`h-1 rounded-full transition-all duration-300 ${activePage === 1 ? "w-6 bg-white" : "w-1 bg-gray-500"}`}
            onClick={() => handlePageChange(1)}
          ></div>
        </div>
      </div>

      {/* === Replaced Featured Content Section === */}
      <div className="px-2 pb-2 bg-black">
        <div className="grid grid-cols-2 gap-2 items-stretch"> {/* Use items-stretch for equal height columns */}
          {/* Left Column: Carousel */}
          <div className="col-span-1 border border-gray-700 flex flex-col h-full bg-[rgb(20,27,35)]">
            <div ref={carouselRef} className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-lg" style={{ minHeight: '150px' }}> {/* Added minHeight */}
              {slidesData.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0 snap-start p-0.5" style={{ minWidth: '100%' }}>
                  {slide.type === 'content' && (
                    <div className="bg-[rgb(20,27,35)] p-3 rounded-lg h-full flex flex-col text-white">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-base">{slide.title}</span>
                        <ChevronRight className="w-5 h-5 text-white" />
                      </div>
                      <div className="my-2 flex-grow">
                        <p className="text-sm leading-tight">{slide.line1}</p>
                        <p className="text-sm leading-tight">{slide.line2}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">{slide.participants}</span>
                      </div>
                    </div>
                  )}
                  {slide.type === 'image' && (
                    <div className="bg-[rgb(20,27,35)] py-2 px-1 rounded-lg h-full flex flex-col text-white">
                      <span className="font-semibold mb-2 text-base">{slide.title}</span>
                      <img src={slide.imgSrc} alt={slide.alt} className="w-full h-auto object-cover rounded-md flex-grow" style={{maxHeight: '100px'}}/> {/* Added maxHeight for image slides */}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Pagination dots */}
            <div className="flex justify-center space-x-2 my-1 bg-[rgb(20,27,35)]">
              {slidesData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-4" : "bg-gray-500 w-1.5"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Static Image */}
          <div className="col-span-1 flex items-center justify-center">
            <div className="bg-[rgb(20,27,35)] rounded-lg h-full flex flex-col justify-center border border-gray-700">
              <img src="/投資腦筋亮金金.png" alt="投資腦筋亮金金" className="w-full h-auto object-contain rounded-lg" style={{ minHeight: '150px' }} />
            </div>
          </div>
        </div>
      </div>
      {/* === End of Replaced Featured Content Section === */}

      {/* Bottom Tabs */}
      <div className="flex border-b border-gray-800 mt-2 mb-1 px-4 ">
        <div
          className={`flex-1 pb-1 text-center ${activeContentTab === "fresh" ? "text-[#daa360] border-b-4 border-[#daa360] font-bold" : "text-gray-400"}`}
          onClick={() => setActiveContentTab("fresh")}
        >
          <span>新鮮直送</span>
        </div>
        <div
          className={`flex-1 pb-1 text-center ${activeContentTab === "academy" ? "text-[#daa360] border-b-4 border-[#daa360] font-bold" : "text-gray-400"}`}
          onClick={() => setActiveContentTab("academy")}
        >
          <span>豐雲學堂</span>
        </div>
        <div
          className={`flex-1 pb-1 text-center ${activeContentTab === "news" ? "text-[#daa360] border-b-4 border-[#daa360] font-bold" : "text-gray-400"}`}
          onClick={() => setActiveContentTab("news")}
        >
          <span>新聞7×24</span>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeContentTab === "fresh" && (
        <>
          {/* Investment Report */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="text-xl font-medium">投資早報 2025/05/08 刊</div>
            <ChevronRight className="text-gray-400" />
          </div>

          {/* Stock Groups */}
          <div className="grid grid-cols-2 gap-3 p-4 border-b border-gray-800">
            {/* Strong Groups */}
            <div className="bg-[#111419] p-3 rounded-lg">
              <div className="text-red-500 text-lg mb-3">永選強勢族群</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">成衣概念</span>
                  </div>
                  <span className="text-red-500">+1.0%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">被動元件概念</span>
                  </div>
                  <span className="text-red-500">+3.0%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">軟性銅箔基板</span>
                  </div>
                  <span className="text-red-500">+0.9%</span>
                </div>
              </div>
            </div>

            {/* Weak Groups */}
            <div className="bg-[#111419] p-3 rounded-lg">
              <div className="text-red-500 text-lg mb-3">永選弱勢族群</div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">旅行社概念</span>
                  </div>
                  <span className="text-red-500">+8.4%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">櫃紐概念</span>
                  </div>
                  <span className="text-red-500">+1.4%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-500 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5L19 12L12 19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        transform="rotate(90 12 12)"
                      />
                    </svg>
                    <span className="text-white">設計服務矽智財</span>
                  </div>
                  <span className="text-red-500">+2.4%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="p-4 border-b border-gray-800">
            <div className="relative rounded-lg overflow-hidden">
              <img src="/stock-lottery-banner.png" alt="股票抽籤秒解任務" className="w-full h-auto" />
            </div>
          </div>

          {/* Watchlist Monitoring */}
          <div className="border-b border-gray-800">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center">
                <span className="text-xl font-medium">自選監控：庫存</span>
                <Info className="ml-2 text-gray-400 w-5 h-5" />
              </div>
              <ChevronRight className="text-gray-400" />
            </div>

            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="bg-gray-800 p-6 rounded-lg opacity-50 mb-4">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-xl text-center text-gray-400 mb-2">尚無特別警示資訊</div>
              <div className="text-sm text-center text-gray-500 max-w-xs">
                您選擇的清單未觀測到特殊警示，建議您可以調整監控雷達！
              </div>
            </div>
          </div>
        </>
      )}

      {activeContentTab === "academy" && (
        <div className="flex flex-col">
          <div className="relative">
            {/* News items */}
            {placeholderAcademyNews.map((news, index) => (
              <div 
                key={news.id}
                className="relative py-3 cursor-pointer hover:bg-[rgb(30,37,45)]" 
                onClick={() => handleNewsClick(news)}
              >
                <div className="flex items-start px-4 mb-1">
                  <span className="text-gray-400">{news.newsDate}</span>
                </div>
                <div className="pl-4 pr-4">
                  <div className="text-white text-lg">
                    {news.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeContentTab === "news" && (
        <div className="flex flex-col">
          <div className="relative">
            {/* Timeline dotted line */}
            <div className="absolute left-5 top-0 bottom-0 border-l border-dashed border-gray-700 z-0"></div>

            {/* News items */}
            {placeholderNews7x24.map((news, index) => (
              <div 
                key={news.id}
                className="relative z-10 py-3 cursor-pointer hover:bg-[rgb(30,37,45)]" 
                onClick={() => handleNewsClick(news)}
              >
                <div className="flex items-start px-4 mb-1">
                  <div className="w-2 h-2 bg-[rgb(157,172,195)] rounded-full mr-2 mt-2 z-10"></div>
                  <span className="text-gray-400">{news.newsDate}</span>
                </div>
                <div className="pl-8 pr-4 mb-4">
                  <div className="text-[#daa360] text-lg">
                    {news.title}
                  </div>
                  <div className="text-gray-300 mt-2 text-sm">
                    {/* 這裡可以放新聞的簡短描述，如果 NewsItem 有此欄位的話 */}
                    {news.content.substring(0, 100)}...
                  </div>
                  {/* 這裡可以根據 news.sections 動態生成標籤，如果需要的話 */}
                  {news.id === "news7x24-1" && ( // 僅為範例，您可以根據實際需求調整
                     <div className="flex mt-3 space-x-4">
                       <div className="bg-gray-900 px-3 py-1 rounded-lg">
                         <div className="flex items-center">
                           <span className="text-white">元大台灣50</span>
                           <span className="text-red-500 ml-2">1.08%</span>
                         </div>
                       </div>
                       <div className="bg-gray-900 px-3 py-1 rounded-lg">
                         <div className="flex items-center">
                           <span className="text-white">台積電</span>
                           <span className="text-red-500 ml-2">0.43%</span>
                         </div>
                       </div>
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
