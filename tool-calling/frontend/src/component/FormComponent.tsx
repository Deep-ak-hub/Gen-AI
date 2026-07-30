'use client';

import { useState, useRef } from 'react';
import { Plus, Send, Search, Image, Code } from 'lucide-react';

interface FormComponentProps {
  className?: string;
  name?: string;
  onSubmit?: (input: string) => void;
}

const OPTIONS = [
  { id: 'websearch', label: 'Web Search', icon: Search },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'code', label: 'Code', icon: Code },
];

export default function FormComponent({ className = '', name = 'form', onSubmit }: FormComponentProps) {
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit?.(input);
      setInput('');
    }
  };

  const handleOptionClick = (optionId: string) => {
    setInput(prev => prev + `[${optionId}] `);
    setIsOpen(false);
  };

  return (
    <div
      ref={formRef}
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 py-4 sm:px-6 md:px-8 z-50 ${className}`}
    >
      <form
        name={name}
        onSubmit={handleSubmit}
        className="flex items-end gap-2 sm:gap-3 md:gap-4 bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800 shadow-lg dark:shadow-2xl p-2 sm:p-3 md:p-4"
      >
        {/* Plus Icon / Options Menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Add options"
          >
            <Plus size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg w-40 sm:w-48 overflow-hidden z-10">
              {OPTIONS.map(option => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleOptionClick(option.id)}
                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left text-sm sm:text-base"
                  >
                    <IconComponent size={16} className="sm:w-5 sm:h-5 shrink-0" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Input Component */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          rows={1}
          className="flex-1 bg-transparent outline-none text-sm sm:text-base md:text-lg dark:text-white placeholder-gray-400 dark:placeholder-gray-500 resize-none px-2 sm:px-3 py-2 sm:py-2.5 min-h-10"
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim()}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white transition-colors shrink-0"
          aria-label="Send message"
        >
          <Send size={18} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </form>
    </div>
  );
}