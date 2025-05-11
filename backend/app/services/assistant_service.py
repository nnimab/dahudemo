# This file contains the core logic for the assistant service.
from .llm_interface import ask_llm

async def get_assistant_response(user_query: str, conversation_history: list[dict] | None = None) -> str:
    """
    Processes the user query, potentially using conversation history,
    and returns a response from the LLM.

    Args:
        user_query: The user's latest query.
        conversation_history: A list of previous turns in the conversation.
                              Each turn could be a dict like: {"role": "user"/"model", "parts": [{"text": "..."}]}
                              This argument is optional and can be expanded for more complex chat logic.

    Returns:
        The LLM's response as a string.
    """
    
    # 簡單的實作：目前僅將使用者查詢直接傳給 LLM。
    # 未來可以擴展這裡的邏輯，例如：
    # 1. 根據 conversation_history 建構更豐富的 prompt。
    # 2. 加入特定的指令或角色扮演的提示。
    # 3. 根據 user_query 的意圖，執行不同的處理流程。

    prompt = user_query # 目前直接使用 user_query 作為 prompt

    # 如果有對話歷史，可以考慮將其加入到 prompt 中，
    # Gemini API 通常期望的格式是 alternating user/model messages.
    # 例如:
    # formatted_history = []
    # if conversation_history:
    #     for turn in conversation_history:
    #         formatted_history.append(f"{turn['role']}: {turn['parts'][0]['text']}")
    # prompt = "\n".join(formatted_history) + f"\nuser: {user_query}"
    
    llm_answer = await ask_llm(prompt)
    return llm_answer 