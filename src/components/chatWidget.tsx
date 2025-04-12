import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ sender: string; text: string }>
  >([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [fullResponse, setFullResponse] = useState("");
  const [historyFetched, setHistoryFetched] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom whenever messages change or chat opens
  useEffect(() => {
    if (open) {
      scrollToBottom();
    }
  }, [messages, typingText, open]);

  // Fetch chat history only once when component mounts
  useEffect(() => {
    const fetchHistory = async () => {
      if (historyFetched) return; // Skip if we've already fetched

      try {
        console.log("Fetching chat history...");
        const response = await fetch(
          `${import.meta.env.VITE_BACKENDURL}/api/geminiChatBot/getChat`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("Fetched chat history:", data);

        if (response.ok) {
          if (data.length > 0) {
            // Properly transform the data from API to match our message format
            const formattedMessages = data.map(
              (chat: { role: string; message: string }) => ({
                sender: chat.role,
                text: chat.message,
              })
            );

            setMessages(formattedMessages);
          } else {
            setMessages([
              { sender: "bot", text: "Hi! How can I help you today?" },
            ]);
          }
          // Mark as fetched so we don't do it again
          setHistoryFetched(true);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setMessages([{ sender: "bot", text: "Hi! How can I help you today?" }]);
        // Even on error, mark as fetched to prevent constant retries
        setHistoryFetched(true);
      }
    };

    // If the widget is first opened and we haven't fetched history yet
    if (open && !historyFetched) {
      fetchHistory();
    }
  }, [open, historyFetched]);

  // Handle typing effect
  useEffect(() => {
    if (fullResponse && isTyping) {
      if (typingText.length < fullResponse.length) {
        const timeout = setTimeout(() => {
          setTypingText(fullResponse.substring(0, typingText.length + 1));
        }, 15); // Adjust speed here (lower = faster)
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        setMessages((prev) => [...prev, { sender: "bot", text: fullResponse }]);
        setFullResponse("");
        setTypingText("");
      }
    }
  }, [fullResponse, typingText, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Make API request to backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/geminiChatBot/createChat`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userInput }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      console.log("Received response from backend:", data);

      // Set the response for typing effect
      if (typeof data.message.response === "string") {
        setFullResponse(data.message.response);
      } else {
        console.error("Unexpected response format:", data);
        setFullResponse("Sorry, I received an unexpected response format.");
      }

      // Note: The message will be added to the messages state after the typing effect
      // is complete in the useEffect hook that monitors fullResponse and isTyping
    } catch (error) {
      console.error("Error fetching response:", error);
      setFullResponse(
        "Sorry, there was an error processing your request. Please try again."
      );
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // Function to refresh chat history manually if needed
  const refreshHistory = async () => {
    setHistoryFetched(false); // Reset the flag to allow fetching again
  };

  return (
    <div>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        {open ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageCircle className="w-5 h-5" />
        )}
      </button>

      {/* Chat Interface */}
      {open && (
        <div className="fixed bottom-16 right-4 w-2/4 h-4/6 bg-white border rounded-2xl shadow-xl z-50 flex flex-col overflow-hidden">
          <div className="bg-blue-600 text-white px-4 py-3 font-semibold flex justify-between items-center">
            <span>Gemini Assistant</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-sm space-y-2">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${
                    msg.sender === "user"
                      ? "text-right text-blue-600"
                      : "text-left text-gray-700"
                  }`}
                >
                  <div className="inline-block bg-gray-100 rounded-lg px-3 py-1 max-w-xs">
                    {msg.text}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic">Loading messages...</div>
            )}

            {/* Typing indicator */}
            {isTyping && (
              <div className="text-left text-gray-700">
                <div className="inline-block bg-gray-100 rounded-lg px-3 py-1 max-w-xs">
                  {typingText}
                  <span className="animate-pulse">▋</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Send */}
          <div className="border-t p-2 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring"
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              className={`p-2 ${
                isTyping
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-blue-600 hover:text-blue-800 cursor-pointer"
              }`}
              disabled={isTyping}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
