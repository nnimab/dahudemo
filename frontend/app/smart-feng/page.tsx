"use client"

import { useState, useRef, useEffect, useCallback, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Send, X, ChevronLeft, ChevronRight, History, Clock, FileText } from "lucide-react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import BackButton from "../../components/back-button"

// Define flashcard data structure
interface Flashcard {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  items: string[]
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  timestamp: Date;
  messages: Message[];
}

// 新增豐雲學堂分類介面
interface SchoolCategory {
  id: string;
  title: string;
  items: string[];
}

// 新聞內容接口
interface NewsContent {
  title: string;
  category: string;
  date: string;
  content: string;
  sections?: string;
}

function SmartFengPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "您好！我是智慧小豐，您的智能投資助手。我可以幫您分析市場趨勢、解答投資問題，或提供個股資訊。請問有什麼可以協助您的嗎？",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showFlashcards, setShowFlashcards] = useState(false)
  const flashcardsRef = useRef<HTMLDivElement>(null)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [userId, setUserId] = useState<string | null>(null)
  
  // 歷史記錄狀態
  const [showHistory, setShowHistory] = useState(false)
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([])
  const [currentChatId, setCurrentChatId] = useState<string | null>(null)
  const [isNewChat, setIsNewChat] = useState(true)
  
  // 新增豐雲學堂相關狀態
  const [showSchool, setShowSchool] = useState(false)
  const schoolRef = useRef<HTMLDivElement>(null)
  const [activeSchoolIndex, setActiveSchoolIndex] = useState(0)

  // 新聞內容狀態
  const [newsContent, setNewsContent] = useState<NewsContent | null>(null)
  const [showNewsAttachment, setShowNewsAttachment] = useState(false)

  // 新增筆記選擇相關狀態
  const [showNoteSelector, setShowNoteSelector] = useState(false)
  const [notes, setNotes] = useState<any[]>([])

  // Flashcard data
  const flashcards: Flashcard[] = [
    {
      id: "news",
      title: "好康訊息",
      subtitle: "最新訊息",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-uz5FYuo0iXeIoyfJQF00ls7eZJW2fr.png",
      items: [
        "最新訊息",
        "行銷活動與公告",
        "永豐金證券最新活動",
        "客服專線換號公告",
        "股務代理_豐股務",
        "豐存股常見問題",
      ],
    },
    {
      id: "qa",
      title: "熱門問答",
      subtitle: "大家都在問什麼",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9oR1SDa2IiEtX777UrgjU2IBkGSEAv.png",
      items: [
        "熱門問答",
        "大家都在問什麼",
        "變更證券基本資料",
        "增加單日買賣額度",
        "零股交易規定",
        "如何刪除變更豐存股約定",
      ],
    },
    {
      id: "beginner",
      title: "新手上路",
      subtitle: "新手投資請上車",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-LUG2U7FSm2he0jeNyZgcSb4ESrb0Ff.png",
      items: ["新手上路", "新手投資請上車", "線上開戶完成設定密碼", "豐存股新手上路", "下單系統說明", "豐存股說明"],
    },
    {
      id: "password",
      title: "密碼問題",
      subtitle: "密碼鎖住不擔心",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Ti6BGooOkqrOkIuAJ7J8sHTjsAggtZ.png",
      items: ["密碼問題", "密碼鎖住不擔心", "證券密碼說明", "密碼線上解鎖", "密碼補發", "如何修改密碼"],
    },
    {
      id: "giftcard",
      title: "股票禮品卡",
      subtitle: "會增值的心意",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MMLsE4L9P3eoIE2FBi66G6yNeeP91j.png",
      items: [
        "股票禮物卡",
        "會增值的心意",
        "什麼是股票禮品卡？",
        "股票禮物卡購買相關問題",
        "股票禮物卡贈送相關問題",
        "股票禮物卡兌換相關問題",
      ],
    },
  ]
  
  // 豐雲學堂分類資料
  const schoolCategories: SchoolCategory[] = [
    {
      id: "market",
      title: "市場話題",
      items: [
        "名家觀點",
        "股市熱話",
        "存股熱話",
        "本週爆報"
      ],
    },
    {
      id: "beginner",
      title: "新手知識",
      items: [
        "台股咩角",
        "美股咩角",
        "理財咩角",
        "金融服務報你知"
      ],
    },
    {
      id: "strategy",
      title: "選股策略",
      items: [
        "法人籌碼跟著走",
        "存股怎麼買",
        "台股怎麼挑",
        "期貨怎麼做",
        "3分鐘產業百科"
      ],
    },
    {
      id: "platform",
      title: "平台活動",
      items: [
        "豐存股",
        "大戶投APP",
        "選股挑戰周報",
        "優惠別錯過"
      ],
    },
    {
      id: "quant",
      title: "量化殿堂",
      items: [
        "量化殿堂金卡",
        "量化殿堂鑽卡",
        "量化交易PRO簡單"
      ],
    }
  ]

  // 解析從 URL 傳來的新聞內容
  useEffect(() => {
    // 檢查是否有新聞ID參數
    const newsId = searchParams.get('newsId')
    if (newsId) {
      try {
        // 從預定義的新聞數據中獲取對應ID的新聞
        // 這裡需要導入預定義的新聞數據
        import('../../components/overview-page').then((module) => {
          // 合併兩個新聞數組
          const allNews = [
            ...(module.placeholderAcademyNews || []), 
            ...(module.placeholderNews7x24 || [])
          ];
          const foundNews = allNews.find((news: any) => news.id === newsId);
          
          if (foundNews) {
            // 將找到的新聞轉換為NewsContent格式
            const newsContent: NewsContent = {
              title: foundNews.title,
              category: foundNews.newsCategory,
              date: foundNews.newsDate,
              content: foundNews.content,
              sections: foundNews.sections 
                ? foundNews.sections.map((s: any) => `${s.title}: ${s.text || "無內容"}`).join("\n\n") 
                : ""
            };
            
            setNewsContent(newsContent);
            setShowNewsAttachment(true);
            
            // 預填充輸入框，將新聞內容作為問題的上下文
            setInput(`請幫我總結這則新聞：${newsContent.title}`);
          } else {
            console.error('找不到ID為', newsId, '的新聞');
          }
        }).catch(error => {
          console.error('導入新聞數據時出錯:', error);
        });
      } catch (error) {
        console.error('獲取新聞內容時出錯:', error);
      }
    }
    
    // 保留原來的code，兼容舊的URL參數形式
    const newsParam = searchParams.get('news')
    if (newsParam && !newsId) { // 只有在沒有newsId參數時才處理news參數
      try {
        // 增加安全處理，先檢查參數是否為有效的編碼字符串
        let decodedString;
        try {
          decodedString = decodeURIComponent(newsParam);
        } catch (decodeError) {
          console.error('URL參數解碼失敗:', decodeError);
          return; // 提前退出，避免進一步處理
        }
        
        // 嘗試解析JSON
        try {
          const decodedNews = JSON.parse(decodedString) as NewsContent;
          
          // 基本驗證，確保解析的對象包含必要字段
          if (!decodedNews.title || !decodedNews.content) {
            console.error('解析的新聞內容缺少必要字段');
            return;
          }
          
          setNewsContent(decodedNews);
          setShowNewsAttachment(true);
          
          // 預填充輸入框，將新聞內容作為問題的上下文
          setInput(`請幫我總結這則新聞：${decodedNews.title}`);
        } catch (jsonError) {
          console.error('JSON解析失敗:', jsonError);
        }
      } catch (error) {
        console.error('解析新聞內容時出錯:', error);
      }
    }
  }, [searchParams]);

  // 加載筆記數據
  useEffect(() => {
    // 從localStorage獲取保存的筆記
    const savedNotes = localStorage.getItem('investmentNotes');
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
      } catch (error) {
        console.error('解析筆記數據出錯:', error);
      }
    }
  }, [showNoteSelector]); // 每次打開選擇器時重新加載筆記

  // 引用筆記內容到對話框
  const citeNote = (note: any) => {
    // 構建引用文本
    const citationText = `
我想分析這則筆記:
標題: ${note.title}
內容摘要: ${note.content.length > 100 ? note.content.substring(0, 100) + '...' : note.content}
${note.tags && note.tags.length > 0 ? `標籤: ${note.tags.join(', ')}` : ''}
${note.source ? `來源: ${note.source}` : ''}
`;

    // 在現有輸入的基礎上添加引用
    setInput(prev => {
      if (prev.trim()) {
        return `${prev}\n\n${citationText}`;
      }
      return citationText;
    });

    // 關閉筆記選擇器
    setShowNoteSelector(false);
  };

  // 刪除新聞附件
  const removeNewsAttachment = () => {
    setShowNewsAttachment(false)
    setNewsContent(null)
  }

  // 加載歷史記錄
  const loadChatHistories = () => {
    const histories = localStorage.getItem("smartFengChatHistories");
    if (histories) {
      try {
        // 從本地存儲中恢復日期對象
        const parsedHistories: ChatHistory[] = JSON.parse(histories, (key, value) => {
          if (key === "timestamp" || key === "messages") {
            // 如果是 timestamp 字段或整個 messages 數組
            if (Array.isArray(value)) {
              // 處理 messages 數組
              return value.map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
              }));
            } else {
              // 處理單個 timestamp
              return new Date(value);
            }
          }
          return value;
        });
        
        // 按時間排序，最新的在前
        parsedHistories.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        setChatHistories(parsedHistories);
      } catch (e) {
        console.error("Error parsing chat histories:", e);
      }
    }
  };

  // 使用 ref 來避免循環依賴
  const messagesRef = useRef(messages);
  const chatHistoriesRef = useRef(chatHistories);
  const isNewChatRef = useRef(isNewChat);
  const currentChatIdRef = useRef(currentChatId);
  
  // 更新 refs 的值以反映最新狀態
  useEffect(() => {
    messagesRef.current = messages;
    chatHistoriesRef.current = chatHistories;
    isNewChatRef.current = isNewChat;
    currentChatIdRef.current = currentChatId;
  });
  
  // 當currentChatId變更時，從歷史加載對話（避免循環依賴）
  useEffect(() => {
    if (currentChatId && !isNewChat) {
      const selectedChat = chatHistories.find(h => h.id === currentChatId);
      if (selectedChat && JSON.stringify(selectedChat.messages) !== JSON.stringify(messages)) {
        setMessages(selectedChat.messages);
      }
    }
  }, [currentChatId, isNewChat]);
  
  // 使用防抖來限制保存對話的頻率，避免無限循環
  useEffect(() => {
    const saveChat = () => {
      if (!isNewChatRef.current && messagesRef.current.length > 1) {
        // 創建一個不會觸發額外渲染的保存函數
        const saveCurrentChat = () => {
          if (!userId) return;
          
          // 只有當有用戶消息時才保存
          const hasUserMessages = messagesRef.current.some(msg => msg.role === "user");
          if (!hasUserMessages) return;
          
          const existingHistories = [...chatHistoriesRef.current];
          const chatId = currentChatIdRef.current || crypto.randomUUID();
          
          // 為對話生成標題 (使用第一條用戶消息)
          const firstUserMsg = messagesRef.current.find(msg => msg.role === "user");
          const title = firstUserMsg 
            ? firstUserMsg.content.substring(0, 30) + (firstUserMsg.content.length > 30 ? "..." : "") 
            : "新對話";
          
          // 為對話生成預覽 (使用最後一條消息)
          const lastMsg = messagesRef.current[messagesRef.current.length - 1];
          const preview = lastMsg.content.substring(0, 50) + (lastMsg.content.length > 50 ? "..." : "");
          
          const currentHistory: ChatHistory = {
            id: chatId,
            title,
            preview,
            timestamp: new Date(),
            messages: [...messagesRef.current]
          };
          
          // 檢查是否更新現有歷史或添加新歷史
          const existingIndex = existingHistories.findIndex(h => h.id === chatId);
          
          // 創建更新後的歷史數組
          let updatedHistories: ChatHistory[];
          
          if (existingIndex >= 0) {
            // 複製數組並更新特定項
            updatedHistories = [...existingHistories];
            updatedHistories[existingIndex] = currentHistory;
          } else {
            // 在開頭添加新歷史
            updatedHistories = [currentHistory, ...existingHistories];
          }
          
          // 限制歷史記錄數量，保留最新的30個對話
          const limitedHistories = updatedHistories.slice(0, 30);
          
          // 保存到localStorage
          localStorage.setItem("smartFengChatHistories", JSON.stringify(limitedHistories));
          localStorage.setItem("smartFengCurrentChatId", chatId);
          
          // 最後一步才更新狀態，減少渲染
          if (JSON.stringify(limitedHistories) !== JSON.stringify(chatHistoriesRef.current)) {
            setChatHistories(limitedHistories);
          }
          
          if (currentChatIdRef.current !== chatId) {
            setCurrentChatId(chatId);
          }
          
          if (isNewChatRef.current) {
            setIsNewChat(false);
          }
        };
        
        saveCurrentChat();
      }
    };
    
    // 使用防抖來減少保存頻率
    const timeoutId = setTimeout(saveChat, 1000);
    return () => clearTimeout(timeoutId);
  }, [messages, userId]);
  
  // 獨立的保存對話方法，用於強制保存
  const saveChatToHistory = (forceSave = false) => {
    if (!userId || messages.length <= 1) return;
    
    // 只有當有用戶消息時才保存
    const hasUserMessages = messages.some(msg => msg.role === "user");
    if (!hasUserMessages && !forceSave) return;
    
    const existingHistories = [...chatHistories];
    const chatId = currentChatId || crypto.randomUUID();
    
    // 為對話生成標題 (使用第一條用戶消息)
    const firstUserMsg = messages.find(msg => msg.role === "user");
    const title = firstUserMsg 
      ? firstUserMsg.content.substring(0, 30) + (firstUserMsg.content.length > 30 ? "..." : "") 
      : "新對話";
    
    // 為對話生成預覽 (使用最後一條消息)
    const lastMsg = messages[messages.length - 1];
    const preview = lastMsg.content.substring(0, 50) + (lastMsg.content.length > 50 ? "..." : "");
    
    const currentHistory: ChatHistory = {
      id: chatId,
      title,
      preview,
      timestamp: new Date(),
      messages: [...messages]
    };
    
    // 檢查是否更新現有歷史或添加新歷史
    const existingIndex = existingHistories.findIndex(h => h.id === chatId);
    if (existingIndex >= 0) {
      existingHistories[existingIndex] = currentHistory;
    } else {
      existingHistories.unshift(currentHistory);
    }
    
    // 限制歷史記錄數量，保留最新的30個對話
    const limitedHistories = existingHistories.slice(0, 30);
    
    // 更新狀態並保存到localStorage
    setChatHistories(limitedHistories);
    
    if (currentChatId !== chatId) {
      setCurrentChatId(chatId);
    }
    
    if (isNewChat) {
      setIsNewChat(false);
    }
    
    localStorage.setItem("smartFengChatHistories", JSON.stringify(limitedHistories));
    localStorage.setItem("smartFengCurrentChatId", chatId);
  };

  // 從歷史記錄中加載對話
  const loadChatFromHistory = (chatId: string) => {
    const selectedChat = chatHistories.find(h => h.id === chatId);
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
      setIsNewChat(false);
      localStorage.setItem("smartFengCurrentChatId", chatId);
    }
    setShowHistory(false);
  };

  // 開始新對話 (修改為同時重置後端對話歷史)
  const startNewChat = async () => {
    if (!userId) return;
    
    // 先保存當前對話
    saveChatToHistory(true);
    
    try {
      // 先調用後端重置API，告知後端清除對話歷史
      const response = await fetch("/api/assistant/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: "重置對話", user_id: userId }),
      });
      
      if (!response.ok) {
        console.warn("重置對話歷史失敗，狀態碼:", response.status);
      } else {
        const data = await response.json();
        console.log("後端對話歷史已重置:", data.answer);
      }
    } catch (error) {
      console.error("重置對話歷史時發生錯誤:", error);
    }
    
    // 重置為初始狀態
    setMessages([
      {
        role: "assistant",
        content:
          "您好！我是智慧小豐，您的智能投資助手。我可以幫您分析市場趨勢、解答投資問題，或提供個股資訊。請問有什麼可以協助您的嗎？",
        timestamp: new Date(),
      },
    ]);
    
    // 生成新的對話ID
    const newChatId = crypto.randomUUID();
    setCurrentChatId(newChatId);
    setIsNewChat(true);
    localStorage.setItem("smartFengCurrentChatId", newChatId);
    setShowHistory(false);
  };

  // 刪除歷史對話
  const deleteChatHistory = (chatId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // 阻止點擊事件傳播
    
    const updatedHistories = chatHistories.filter(h => h.id !== chatId);
    setChatHistories(updatedHistories);
    localStorage.setItem("smartFengChatHistories", JSON.stringify(updatedHistories));
    
    // 如果刪除的是當前對話，則開始新對話
    if (chatId === currentChatId) {
      startNewChat();
    }
  };

  // useEffect to manage userId and load chat histories
  useEffect(() => {
    let storedUserId = localStorage.getItem("smartFengUserId")
    if (!storedUserId) {
      storedUserId = crypto.randomUUID()
      localStorage.setItem("smartFengUserId", storedUserId)
    }
    setUserId(storedUserId)
    
    // 加載歷史記錄
    loadChatHistories();
    
    // 檢查是否有上次的對話
    const lastChatId = localStorage.getItem("smartFengCurrentChatId");
    if (lastChatId) {
      setCurrentChatId(lastChatId);
      setIsNewChat(false);
    }
  }, [])
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (input.trim() === "" || !userId) return

    // 構建用戶消息內容，如果有新聞附件則加上新聞內容
    let userMessageContent = input
    if (showNewsAttachment && newsContent) {
      userMessageContent = `${input}\n\n參考新聞:\n標題: ${newsContent.title}\n分類: ${newsContent.category}\n日期: ${newsContent.date}\n內容: ${newsContent.content}`
      if (newsContent.sections) {
        userMessageContent += `\n\n${newsContent.sections}`
      }
      
      // 發送完訊息後清除附件
      setShowNewsAttachment(false)
    }

    // Add user message
    const userMessage = {
      role: "user" as const,
      content: userMessageContent,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    const currentInput = userMessageContent
    setInput("")

    // 如果是新對話，保存第一條消息作為對話標題
    if (isNewChat && messages.length === 1) {
      setIsNewChat(false);
      const chatId = crypto.randomUUID();
      setCurrentChatId(chatId);
      localStorage.setItem("smartFengCurrentChatId", chatId);
    }

    // Add a temporary "typing" message for assistant (optional)
    const typingMessage = {
      role: "assistant" as const,
      content: "智慧小豐思考中...",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // 在發送到後端的問題前添加"詢問:"前綴
      const questionWithPrefix = `詢問: ${currentInput}`;
      
      const response = await fetch("/api/assistant/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: questionWithPrefix, 
          user_id: userId
        }),
      });

      // 移除 "typing" message
      setMessages((prev) => prev.filter(msg => !(msg as any).isTyping));

      if (!response.ok) {
        let errorDetail = `請求失敗，狀態碼：${response.status}`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) {
            // 無法解析 JSON，保持通用錯誤
        }
        throw new Error(errorDetail);
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant" as const,
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessageContent = error instanceof Error ? error.message : "與伺服器連線時發生錯誤，請稍後再試。";
      // 如果錯誤訊息是 "[object Object]"，提供一個更友好的提示
      const displayError = errorMessageContent === "[object Object]" ? "處理您的請求時發生未預期的錯誤。" : errorMessageContent;

      const errorMessage = {
        role: "assistant" as const,
        content: displayError,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev.filter(msg => !(msg as any).isTyping), errorMessage]);
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" })
  }
  
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // 檢查是否為今天
    if (date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()) {
      return `今天 ${formatTime(date)}`;
    }
    
    // 檢查是否為昨天
    if (date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()) {
      return `昨天 ${formatTime(date)}`;
    }
    
    // 其他日期顯示完整日期
    return date.toLocaleDateString("zh-TW") + " " + formatTime(date);
  };

  const scrollFlashcards = (direction: "left" | "right") => {
    if (flashcardsRef.current) {
      const scrollAmount = 300
      const currentScroll = flashcardsRef.current.scrollLeft

      if (direction === "left") {
        flashcardsRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        })
        if (activeCardIndex > 0) setActiveCardIndex(activeCardIndex - 1)
      } else {
        flashcardsRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        })
        if (activeCardIndex < flashcards.length - 1) setActiveCardIndex(activeCardIndex + 1)
      }
    }
  }

  const handleFlashcardClick = async (item: string) => {
    if (!userId) return

    // 添加前綴到顯示的用戶消息中
    const userMessage = {
      role: "user" as const,
      content: item,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Hide flashcards after selection
    setShowFlashcards(false)

    // Add a temporary "typing" message for assistant (optional)
    const typingMessage = {
      role: "assistant" as const,
      content: "智慧小豐思考中...",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // 在發送到後端的問題前添加"詢問:"前綴
      const questionWithPrefix = `詢問: ${item}`;
      
      const response = await fetch("/api/assistant/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: questionWithPrefix, 
          user_id: userId
        }),
      });

      // 移除 "typing" message
      setMessages((prev) => prev.filter(msg => !(msg as any).isTyping));

      if (!response.ok) {
        let errorDetail = `請求失敗，狀態碼：${response.status}`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) {
            // 無法解析 JSON，保持通用錯誤
        }
        throw new Error(errorDetail);
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant" as const,
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessageContent = error instanceof Error ? error.message : "與伺服器連線時發生錯誤，請稍後再試。";
      const displayError = errorMessageContent === "[object Object]" ? "處理您的請求時發生未預期的錯誤。" : errorMessageContent;

      const errorMessage = {
        role: "assistant" as const,
        content: displayError,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev.filter(msg => !(msg as any).isTyping), errorMessage]);
    }
  }

  // 處理豐雲學堂分類點擊
  const handleSchoolItemClick = async (item: string) => {
    if (!userId) return

    // 添加用戶消息
    const userMessage = {
      role: "user" as const,
      content: `豐雲學堂最新消息: ${item}`,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // 隱藏豐雲學堂分類
    setShowSchool(false)

    // 顯示思考中消息
    const typingMessage = {
      role: "assistant" as const,
      content: "智慧小豐思考中...",
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      // 在發送到後端的問題前添加前綴
      const questionWithPrefix = `詢問: 豐雲學堂的${item}內容`;
      
      const response = await fetch("/api/assistant/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          question: questionWithPrefix, 
          user_id: userId
        }),
      });

      // 移除 "typing" message
      setMessages((prev) => prev.filter(msg => !(msg as any).isTyping));

      if (!response.ok) {
        let errorDetail = `請求失敗，狀態碼：${response.status}`;
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || errorDetail;
        } catch (e) {
            // 無法解析 JSON，保持通用錯誤
        }
        throw new Error(errorDetail);
      }

      const data = await response.json();
      const aiMessage = {
        role: "assistant" as const,
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessageContent = error instanceof Error ? error.message : "與伺服器連線時發生錯誤，請稍後再試。";
      const displayError = errorMessageContent === "[object Object]" ? "處理您的請求時發生未預期的錯誤。" : errorMessageContent;

      const errorMessage = {
        role: "assistant" as const,
        content: displayError,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev.filter(msg => !(msg as any).isTyping), errorMessage]);
    }
  }

  // 豐雲學堂滾動控制
  const scrollSchool = (direction: "left" | "right") => {
    if (schoolRef.current) {
      const scrollAmount = 300
      const currentScroll = schoolRef.current.scrollLeft

      if (direction === "left") {
        schoolRef.current.scrollTo({
          left: currentScroll - scrollAmount,
          behavior: "smooth",
        })
        if (activeSchoolIndex > 0) setActiveSchoolIndex(activeSchoolIndex - 1)
      } else {
        schoolRef.current.scrollTo({
          left: currentScroll + scrollAmount,
          behavior: "smooth",
        })
        if (activeSchoolIndex < schoolCategories.length - 1) setActiveSchoolIndex(activeSchoolIndex + 1)
      }
    }
  }

  // 在前端添加重置對話功能
  const resetConversation = async () => {
    if (!userId) return;
    
    // 先保存當前對話到歷史
    saveChatToHistory(true);
    
    try {
      // 調用後端的重置API
      const response = await fetch("/api/assistant/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: "重置對話", user_id: userId }),
      });
      
      if (!response.ok) {
        throw new Error(`請求失敗，狀態碼：${response.status}`);
      }
      
      const data = await response.json();
      
      // 重置前端狀態
      setMessages([
        {
          role: "assistant",
          content: data.answer,
          timestamp: new Date(),
        },
      ]);
      
      // 建立新對話ID
      const newChatId = crypto.randomUUID();
      setCurrentChatId(newChatId);
      localStorage.setItem("smartFengCurrentChatId", newChatId);
      
      // 關閉歷史側邊欄
      setShowHistory(false);
      
    } catch (error) {
      console.error("重置對話時發生錯誤:", error);
      const errorMessage = {
        role: "assistant" as const,
        content: "重置對話時發生錯誤，請稍後再試。",
        timestamp: new Date(),
      };
      setMessages([errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[rgb(17,20,27)]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[rgb(26,29,36)]">
        <div className="flex items-center">
          <div className="mr-4">
            <BackButton />
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-[#daa160] rounded-full flex items-center justify-center mr-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="11" width="18" height="10" rx="2" stroke="white" strokeWidth="2" />
                <rect x="7" y="15" width="2" height="2" rx="0.5" fill="white" />
                <rect x="15" y="15" width="2" height="2" rx="0.5" fill="white" />
                <path d="M12 8V11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 6L8 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 6V9" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium">智慧小豐</div>
              <div className="flex items-center flex-wrap gap-2">
                <span className="text-gray-400 text-xs">您的智能投資助手</span>
                <button
                  className="px-2 py-0.5 bg-[#daa160] rounded-full text-xs text-white"
                  onClick={() => {
                    setShowFlashcards(!showFlashcards);
                    setShowSchool(false);
                  }}
                >
                  常用字卡
                </button>
                <button
                  className="px-2 py-0.5 bg-[#c4382c] rounded-full text-xs text-white"
                  onClick={() => {
                    setShowSchool(!showSchool);
                    setShowFlashcards(false);
                  }}
                >
                  豐雲學堂
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右側歷史記錄按鈕 */}
        <div className="flex items-center">
          <button
            className="p-2 text-gray-400 hover:text-white"
            onClick={() => setShowHistory(true)}
            title="查看歷史對話"
          >
            <History size={22} />
          </button>
        </div>
      </div>

      {/* 歷史記錄側邊面板 */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex">
          {/* 暗色背景蓋板 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50" 
            onClick={() => setShowHistory(false)}
          ></div>
          
          {/* 側邊面板 */}
          <div className="w-80 h-full bg-[rgb(26,29,36)] z-10 ml-auto overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-[rgb(26,29,36)] border-b border-gray-800 p-4 flex justify-between items-center">
              <h2 className="text-white font-medium">對話歷史</h2>
              <button onClick={() => setShowHistory(false)} className="text-gray-400">
                <X size={20} />
              </button>
            </div>
            
            {/* 功能按鈕區塊 */}
            <div className="p-4 grid grid-cols-2 gap-2">
              <button 
                className="py-2 bg-[#daa160] text-white rounded-lg flex items-center justify-center"
                onClick={startNewChat}
              >
                <span className="mr-2">+</span> 新對話
              </button>
              <button 
                className="py-2 bg-gray-700 text-white rounded-lg flex items-center justify-center"
                onClick={resetConversation}
              >
                <span className="mr-2">↺</span> 重置對話
              </button>
            </div>
            
            {/* 歷史對話列表 */}
            <div className="px-2">
              {chatHistories.length === 0 ? (
                <div className="text-gray-400 text-center py-6">
                  <Clock size={32} className="mx-auto mb-2 opacity-50" />
                  <p>暫無歷史對話</p>
                </div>
              ) : (
                chatHistories.map((chat) => (
                  <div 
                    key={chat.id} 
                    className={`p-3 mb-2 rounded-lg cursor-pointer hover:bg-gray-800 ${
                      chat.id === currentChatId ? 'bg-gray-800 border-l-4 border-[#daa160]' : ''
                    }`}
                    onClick={() => loadChatFromHistory(chat.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="text-white font-medium text-sm truncate max-w-[180px]">{chat.title}</h3>
                      <div className="flex items-center">
                        <span className="text-gray-400 text-xs">{formatDate(chat.timestamp)}</span>
                        <button 
                          className="ml-2 text-gray-500 hover:text-red-500 p-1"
                          onClick={(e) => deleteChatHistory(chat.id, e)}
                          title="刪除對話"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1 truncate">{chat.preview}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Flashcards Section - 更大的卡片與更大的文字 */}
      {showFlashcards && (
        <div className="relative bg-[rgb(26,29,36)] border-b border-gray-800 py-4">
          <button onClick={() => setShowFlashcards(false)} className="absolute top-2 right-2 text-gray-400 z-10">
            <X size={20} />
          </button>

          <h3 className="text-white font-medium text-lg px-4 mb-3">常用字卡</h3>

          <div className="relative">
            {/* Navigation buttons */}
            <button
              className={`absolute left-1 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-2 ${activeCardIndex === 0 ? "opacity-50" : "opacity-100"}`}
              onClick={() => scrollFlashcards("left")}
              disabled={activeCardIndex === 0}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              className={`absolute right-1 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-2 ${activeCardIndex === flashcards.length - 1 ? "opacity-50" : "opacity-100"}`}
              onClick={() => scrollFlashcards("right")}
              disabled={activeCardIndex === flashcards.length - 1}
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* Flashcards container - 增加卡片尺寸 */}
            <div
              ref={flashcardsRef}
              className="flex overflow-x-auto hide-scrollbar px-4 pb-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {flashcards.map((card, index) => (
                <div
                  key={card.id}
                  className="min-w-[320px] mr-4 flex-shrink-0 bg-gray-900 rounded-lg overflow-hidden snap-center shadow-lg"
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src={card.imageUrl || "/placeholder.svg"}
                      alt={card.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-[#daa160] font-medium text-xl">{card.subtitle}</h4>
                    <div className="mt-3 space-y-3">
                      {card.items.slice(2).map((item, i) => (
                        <div
                          key={i}
                          className="py-2.5 border-b border-gray-800 text-white text-base cursor-pointer hover:text-[#daa160]"
                          onClick={() => handleFlashcardClick(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-4 space-x-1.5">
            {flashcards.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === activeCardIndex ? "bg-[#daa160]" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* 豐雲學堂分類區塊 */}
      {showSchool && (
        <div className="relative bg-[rgb(26,29,36)] border-b border-gray-800 py-5">
          <button onClick={() => setShowSchool(false)} className="absolute top-3 right-3 text-gray-400 z-10 hover:text-white">
            <X size={22} />
          </button>

          <h3 className="text-white font-medium text-xl px-5 mb-6">豐雲學堂最新資訊</h3>

          <div className="relative">
            {/* 導航按鈕 */}
            <button
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-700 ${activeSchoolIndex === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
              onClick={() => scrollSchool("left")}
              disabled={activeSchoolIndex === 0}
            >
              <ChevronLeft size={24} className="text-white" />
            </button>

            <button
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-700 ${activeSchoolIndex === schoolCategories.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
              onClick={() => scrollSchool("right")}
              disabled={activeSchoolIndex === schoolCategories.length - 1}
            >
              <ChevronRight size={24} className="text-white" />
            </button>

            {/* 分類容器 - 保持卡片式佈局，卡片背景已是 bg-gray-900 */}
            <div
              ref={schoolRef}
              className="flex overflow-x-auto hide-scrollbar px-5 pb-3 snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {schoolCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="min-w-[320px] mr-5 flex-shrink-0 bg-[rgb(244,232,218)] rounded-xl overflow-hidden snap-center shadow-lg"
                >
                  {/* 卡片標題區 */}
                  <div className="p-4 border-b border-gray-300">
                    <h4 className="text-[#c4382c] font-bold text-xl text-left">
                      {category.title}
                    </h4>
                  </div>
                  {/* 卡片內容區 */}
                  <div className="p-4">
                    <div className="space-y-3">
                      {category.items.map((item, i) => (
                        <div
                          key={i}
                          className="py-2.5 border-b border-gray-300 text-neutral-700 text-base cursor-pointer hover:text-[#c4382c] px-2 rounded-md transition-colors duration-150"
                          onClick={() => handleSchoolItemClick(item)}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 分頁點 */}
          <div className="flex justify-center mt-5 space-x-2">
            {schoolCategories.map((_, index) => (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full ${index === activeSchoolIndex ? "bg-[#c4382c]" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] ${message.role === "user" ? "bg-[#daa160] text-white" : "bg-gray-800 text-white"} rounded-2xl px-4 py-3`}
            >
              {message.role === "assistant" && !message.isTyping ? (
                <div className="text-sm markdown-content">
                  <Markdown remarkPlugins={[remarkGfm]}
                    components={{
                      // 自定義渲染強調文字 (** **)
                      strong: ({node, ...props}) => <span className="font-bold text-[#daa160]" {...props} />,
                      // 自定義渲染清單項目
                      li: ({node, ...props}) => <li className="ml-5 list-disc" {...props} />,
                      // 自定義渲染標題
                      h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2 text-[#daa160]" {...props} />,
                      h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2 text-[#daa160]" {...props} />,
                      h3: ({node, ...props}) => <h3 className="text-base font-bold my-2 text-[#daa160]" {...props} />,
                      // 自定義渲染連結
                      a: ({node, ...props}) => <a className="text-blue-400 underline" {...props} />,
                      // 自定義渲染段落
                      p: ({node, ...props}) => <p className="my-2" {...props} />,
                    }}
                  >
                    {message.content}
                  </Markdown>
                </div>
              ) : (
                <div className="text-sm">{message.content}</div>
              )}
              <div className="text-xs text-gray-300 mt-1 text-right">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-800 bg-[rgb(26,29,36)]">
        {/* 新聞附件顯示區 */}
        {showNewsAttachment && newsContent && (
          <div className="mb-3 bg-gray-800 rounded-lg p-3 relative">
            <div className="flex items-start">
              <FileText size={18} className="text-[#daa160] mr-2 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-white text-sm font-medium">{newsContent.title}</div>
                <div className="text-gray-400 text-xs mt-1">{newsContent.category} | {newsContent.date}</div>
                <div className="text-gray-300 text-xs mt-1 line-clamp-2">
                  {newsContent.content.substring(0, 120)}...
                </div>
              </div>
              <button 
                onClick={removeNewsAttachment} 
                className="text-gray-400 hover:text-white ml-2"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 筆記選擇器 - 當showNoteSelector為true時顯示 */}
        {showNoteSelector && (
          <div className="mb-3 bg-gray-800 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between bg-gray-900 px-3 py-2">
              <h3 className="text-white font-medium">選擇筆記</h3>
              <button 
                onClick={() => setShowNoteSelector(false)} 
                className="text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="max-h-60 overflow-y-auto p-2">
              {notes.length === 0 ? (
                <div className="text-center text-gray-400 py-4">
                  <p>尚無保存的筆記</p>
                  <button 
                    onClick={() => {
                      setShowNoteSelector(false);
                      router.push('/notes');
                    }}
                    className="text-[#daa160] mt-2 text-sm underline"
                  >
                    創建新筆記
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {notes.map((note) => (
                    <div 
                      key={note.id} 
                      className="bg-gray-900 p-3 rounded-lg cursor-pointer hover:bg-gray-700"
                      onClick={() => citeNote(note)}
                    >
                      <h4 className="text-white font-medium mb-1">{note.title}</h4>
                      <p className="text-gray-400 text-sm line-clamp-2">{note.content}</p>
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tag: string, idx: number) => (
                            <span 
                              key={idx} 
                              className="bg-[rgb(17,20,27)] text-[#daa160] px-2 py-0.5 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center">
          <button 
            className="text-gray-400 p-2 hover:text-[#daa160]"
            onClick={() => setShowNoteSelector(!showNoteSelector)}
            title="引用筆記"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div className="flex-1 bg-gray-800 rounded-full mx-2 px-4 py-2">
            <input
              type="text"
              placeholder="輸入訊息..."
              className="w-full bg-transparent text-white outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <button
            className={`p-2 rounded-full ${input.trim() ? "bg-[#daa160] text-white" : "bg-gray-700 text-gray-400"}`}
            onClick={handleSend}
            disabled={!input.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SmartFengPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SmartFengPageContent />
    </Suspense>
  )
}
