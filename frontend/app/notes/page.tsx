"use client"

import { useState, useEffect, Suspense } from "react"
import { ArrowLeft, Plus, Trash2, Edit, Save, X, Search, Calendar } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import TopNavigation from "../../components/top-navigation"
import MarketIndicesHeader from "../../components/market-indices-header"
import { generateUUID } from "@/lib/utils"

interface Note {
  id: string;
  title: string;
  content: string;
  source?: string;
  date: string;
  tags?: string[];
}

function NotesPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [notes, setNotes] = useState<Note[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // 獲取從新聞詳情頁傳來的信息
  useEffect(() => {
    const newsId = searchParams.get('newsId')
    const noteMode = searchParams.get('mode')
    
    // 從 localStorage 加載已有的筆記
    const savedNotes = localStorage.getItem('investmentNotes')
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : []
    setNotes(parsedNotes)
    
    // 如果是從新聞詳情頁來，並且帶有新聞ID
    if (newsId && noteMode === 'add') {
      // 這裡需要從某處獲取新聞的詳細信息
      import('../../components/overview-page').then((module) => {
        // 合併兩個新聞數組
        const allNews = [
          ...(module.placeholderAcademyNews || []),
          ...(module.placeholderNews7x24 || [])
        ];
        const newsItem = allNews.find((news: any) => news.id === newsId);
        
        if (newsItem) {
          // 創建一個新筆記
          const newNote: Note = {
            id: generateUUID(),
            title: newsItem.title,
            content: newsItem.content,
            source: `來源：${newsItem.newsCategory}`,
            date: new Date().toISOString().split('T')[0],
            tags: ['新聞筆記']
          };
          
          // 設置為編輯模式
          setEditingNote(newNote);
          setIsEditing(true);
        }
      }).catch(error => {
        console.error("獲取新聞數據時出錯:", error);
      });
    }
  }, [searchParams]);

  // 保存筆記到 localStorage
  const saveNotes = (updatedNotes: Note[]) => {
    localStorage.setItem('investmentNotes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  // 添加新筆記
  const addNote = () => {
    const newNote: Note = {
      id: generateUUID(),
      title: "",
      content: "",
      date: new Date().toISOString().split('T')[0]
    };
    setEditingNote(newNote);
    setIsEditing(true);
  };

  // 編輯筆記
  const editNote = (note: Note) => {
    setEditingNote({ ...note });
    setIsEditing(true);
  };

  // 刪除筆記
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  // 保存編輯的筆記
  const saveEditingNote = () => {
    if (!editingNote) return;
    
    // 檢查是否已存在該筆記
    const existingIndex = notes.findIndex(note => note.id === editingNote.id);
    let updatedNotes;
    
    if (existingIndex >= 0) {
      // 更新現有筆記
      updatedNotes = [...notes];
      updatedNotes[existingIndex] = editingNote;
    } else {
      // 添加新筆記
      updatedNotes = [...notes, editingNote];
    }
    
    saveNotes(updatedNotes);
    setIsEditing(false);
    setEditingNote(null);
  };

  // 取消編輯
  const cancelEditing = () => {
    setIsEditing(false);
    setEditingNote(null);
  };

  // 過濾筆記
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="flex flex-col h-screen bg-[rgb(17,20,27)]">
      {/* 固定頭部 */}
      <div className="sticky top-0 z-10">
        <TopNavigation activeTab="" setActiveTab={() => {}} />
        <MarketIndicesHeader />
      </div>

      {/* 頁面標題 */}
      <div className="flex items-center justify-between px-4 py-3 bg-[rgb(26,29,36)]">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="text-gray-400 mr-4">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-white text-xl font-semibold">投資筆記</h1>
        </div>
        <div className="flex items-center">
          <button 
            onClick={addNote}
            className="bg-[#daa160] text-white p-2 rounded-full"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* 搜索欄 */}
      <div className="px-4 py-3 border-b border-gray-800">
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="搜索筆記..."
            className="bg-transparent text-white w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 編輯模式 */}
      {isEditing && editingNote && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="bg-[rgb(26,29,36)] rounded-lg p-4 mb-4">
            <input
              type="text"
              placeholder="筆記標題"
              className="w-full bg-[rgb(17,20,27)] text-white px-3 py-2 rounded-lg mb-3 outline-none"
              value={editingNote.title}
              onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
            />
            
            <textarea
              placeholder="筆記內容..."
              className="w-full bg-[rgb(17,20,27)] text-white px-3 py-2 rounded-lg mb-3 outline-none min-h-[200px]"
              value={editingNote.content}
              onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
            />

            {editingNote.source && (
              <div className="mb-3 text-gray-400 text-sm">
                {editingNote.source}
              </div>
            )}

            <div className="flex items-center mb-3">
              <Calendar size={16} className="text-gray-400 mr-2" />
              <span className="text-gray-400 text-sm">{editingNote.date}</span>
            </div>

            <div className="flex items-center flex-wrap gap-2 mb-4">
              {editingNote.tags && editingNote.tags.map((tag, index) => (
                <div key={index} className="bg-[rgb(17,20,27)] text-[#daa160] px-3 py-1 rounded-lg text-sm flex items-center">
                  {tag}
                  <button 
                    className="ml-1 text-gray-400 hover:text-gray-300"
                    onClick={() => {
                      const updatedTags = [...(editingNote.tags || [])].filter((_, i) => i !== index);
                      setEditingNote({...editingNote, tags: updatedTags});
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="添加標籤..."
                className="bg-[rgb(17,20,27)] text-white px-3 py-1 rounded-lg text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    const newTag = e.currentTarget.value.trim();
                    const updatedTags = [...(editingNote.tags || []), newTag];
                    setEditingNote({...editingNote, tags: updatedTags});
                    e.currentTarget.value = '';
                  }
                }}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelEditing}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center"
              >
                <X size={16} className="mr-1" /> 取消
              </button>
              <button 
                onClick={saveEditingNote}
                className="px-4 py-2 bg-[#daa160] text-white rounded-lg flex items-center"
              >
                <Save size={16} className="mr-1" /> 保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 筆記列表 */}
      {!isEditing && (
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <div className="bg-gray-800 rounded-full p-6 mb-4">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 17H12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-gray-300 text-xl mb-2">尚無筆記</h2>
              <p className="text-gray-500 max-w-xs">
                點擊右上角的"+"按鈕開始創建您的第一個投資筆記
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {filteredNotes.map(note => (
                <div key={note.id} className="bg-[rgb(26,29,36)] rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-white text-lg font-medium">{note.title}</h2>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => editNote(note)}
                        className="text-gray-400 hover:text-white"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3 line-clamp-3">{note.content}</p>
                  
                  {note.source && (
                    <div className="mb-2 text-gray-400 text-xs">
                      {note.source}
                    </div>
                  )}

                  <div className="flex items-center mb-3">
                    <Calendar size={14} className="text-gray-400 mr-1" />
                    <span className="text-gray-400 text-xs">{note.date}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {note.tags && note.tags.map((tag, index) => (
                      <span key={index} className="bg-[rgb(17,20,27)] text-[#daa160] px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function NotesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotesPageContent />
    </Suspense>
  )
} 