import { useState, useRef, useEffect, useContext } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import api from '../utils/api';

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi! I am your SmartFinance AI assistant. Ask me anything about navigating the app or getting financial tips!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!user) return null; // Only show to authenticated users

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const res = await api.post('/chat', { message: userMessage });
      const botReply = res.data.data.reply;
      
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: botReply }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: 'Sorry, I am having trouble connecting to my service right now.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="relative mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col h-[500px] max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-2">
               <Bot size={22} className="text-primary-100" />
               <h3 className="font-bold tracking-wide">Smart Assistant</h3>
            </div>
            <button onClick={toggleOpen} className="text-primary-100 hover:text-white transition-colors focus:outline-none">
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex text-sm ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                   
                   <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-primary-100 text-primary-600'}`}>
                      {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                   </div>

                   <div className={`px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 shadow-sm text-gray-800 rounded-bl-sm'} leading-relaxed`}>
                     {msg.text}
                   </div>

                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[85%] flex-row items-end gap-2">
                   <div className="w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center bg-primary-100 text-primary-600">
                      <Bot size={16} />
                   </div>
                   <div className="px-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm rounded-bl-sm flex items-center gap-1.5">
                     <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                     <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                   </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me a question..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-primary-500 rounded-xl outline-none transition-colors shadow-sm"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isTyping}
                className="absolute right-2 p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Send size={18} className="translate-x-px" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleOpen}
          className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:scale-110 transition-all duration-300 focus:outline-none"
        >
          <MessageSquare size={26} className="group-hover:-rotate-6 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
