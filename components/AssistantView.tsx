import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Mail, Loader2, Upload, FileSpreadsheet, Trash2 } from 'lucide-react';
import { ChatMessage, Participant, ProjectPhase } from '../types';
import { generateProjectResponse } from '../services/geminiService';
import { generateProjectContext } from '../constants';

interface AssistantViewProps {
  phases: ProjectPhase[];
}

const AssistantView: React.FC<AssistantViewProps> = ({ phases }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hello! I'm your Enablement Assistant. I can help you draft communications, clarify the project schedule, or explain governance details. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const newUserMsg: ChatMessage = { role: 'user', text: text, timestamp: new Date() };
    setMessages(prev => [...prev, newUserMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Generate context from current live state
      const projectContext = generateProjectContext(phases);

      // Convert participants to a context string if available
      let participantContext = "";
      if (participants.length > 0) {
        participantContext = "\nScheduled Participants:\n" + participants.map(p => 
            `- ${p.name} (${p.department}): ${p.sessionDate} at ${p.time} (Email: ${p.email})`
        ).join('\n');
      }

      const fullContext = projectContext + participantContext;

      const responseText = await generateProjectResponse(text, messages, fullContext);
      const newModelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, newModelMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = { role: 'model', text: "I encountered an error. Please check your API key.", timestamp: new Date(), isError: true };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const generatePhase3Email = () => {
    handleSend("Create the Email Invitation Template for 'Phase 3: Pilot Program' participants. Frame the pilot as an exclusive opportunity to shape the bank's AI strategy. Include subject and body placeholders.");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      try {
        // Simple CSV parser (assumes header row: Name,Email,Department,Session Date,Time)
        const lines = text.split('\n');
        const parsedParticipants: Participant[] = [];
        
        // Start from index 1 to skip header
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;
            
            // Handle basic comma splitting (doesn't handle quotes CSV complexity for simplicity)
            const columns = line.split(',');
            if (columns.length >= 5) {
                parsedParticipants.push({
                    name: columns[0].trim(),
                    email: columns[1].trim(),
                    department: columns[2].trim(),
                    sessionDate: columns[3].trim(),
                    time: columns[4].trim()
                });
            }
        }

        setParticipants(parsedParticipants);
        const successMsg: ChatMessage = { 
            role: 'model', 
            text: `Successfully imported ${parsedParticipants.length} participants. I can now answer questions about their schedules.`, 
            timestamp: new Date() 
        };
        setMessages(prev => [...prev, successMsg]);
        
      } catch (err) {
        const errorMsg: ChatMessage = { role: 'model', text: "Failed to parse CSV. Please ensure format is: Name,Email,Department,Session Date,Time", timestamp: new Date(), isError: true };
        setMessages(prev => [...prev, errorMsg]);
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const clearParticipants = () => {
    setParticipants([]);
    const msg: ChatMessage = { role: 'model', text: "Participant data cleared.", timestamp: new Date() };
    setMessages(prev => [...prev, msg]);
  };

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Project Assistant</h2>
            <p className="text-xs text-slate-500">Powered by Gemini 2.5</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 w-full sm:w-auto">
             {/* Hidden File Input */}
             <input 
                type="file" 
                accept=".csv" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
            />
            
            {participants.length === 0 ? (
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 sm:flex-none flex items-center justify-center text-xs bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-md transition-colors"
                    title="Import CSV: Name, Email, Department, Session Date, Time"
                >
                    <Upload className="w-3 h-3 mr-2" />
                    Import Schedule (CSV)
                </button>
            ) : (
                <div className="flex items-center space-x-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-md">
                    <FileSpreadsheet className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-700">{participants.length} Loaded</span>
                    <button onClick={clearParticipants} className="text-slate-400 hover:text-red-500 ml-1">
                        <Trash2 className="w-3 h-3" />
                    </button>
                </div>
            )}

            <button 
                onClick={generatePhase3Email}
                disabled={isLoading}
                className="flex-1 sm:flex-none flex items-center justify-center text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-2 rounded-md transition-colors"
            >
                <Mail className="w-3 h-3 mr-2" />
                Draft Invite
            </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
            }`}>
               {msg.isError && <div className="text-red-500 font-bold mb-1">Error</div>}
               <div className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</div>
               <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                 {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-4 shadow-sm flex items-center space-x-2">
              <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
              <span className="text-xs text-slate-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                }
            }}
            placeholder="Ask about the project, check participant schedules..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none text-sm"
            rows={2}
          />
          <button 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="absolute right-3 bottom-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-2 text-center">
           <p className="text-[10px] text-slate-400">AI can make mistakes. Check generated content against the Project Plan.</p>
        </div>
      </div>
    </div>
  );
};

export default AssistantView;