import { useState } from 'react'
import './App.css'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
}

const tools = ['Web Search', 'Images', 'Documents', 'Code']

function App() {
  const [selectedTool, setSelectedTool] = useState(tools[0])
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [isToolMenuOpen, setIsToolMenuOpen] = useState(false)

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool)
    setIsToolMenuOpen(false)
  }

  const handleSendMessage = async (event?: React.FormEvent) => {
    event?.preventDefault()

    const trimmedInput = input.trim()
    if (!trimmedInput) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmedInput,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setInput('')
    setIsToolMenuOpen(false)

    try {
      const response = await fetch('http://localhost:7000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: trimmedInput }),
      })

      const data = await response.json()

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: data.message || 'No response received.',
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      const assistantMessage: Message = {
        id: Date.now() + 2,
        role: 'assistant',
        content: 'Sorry, something went wrong while connecting to the server.',
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-2 py-2 sm:px-4 sm:py-4 lg:px-6 lg:py-6">
        <main className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-[#0f172a]">
          <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-5 sm:py-5 lg:px-8 lg:py-6">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`w-fit max-w-[88%] rounded-2xl px-3 py-2 text-sm leading-6 sm:max-w-[82%] sm:px-4 sm:py-3 sm:text-[15px] sm:leading-7 ${
                      message.role === 'user'
                        ? 'bg-slate-100 text-slate-900'
                        : 'bg-transparent text-slate-200'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-800/80 bg-[#0f172a] px-2 pb-2 pt-3 sm:px-4 sm:pb-4 lg:px-6">
            <form
              onSubmit={handleSendMessage}
              className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-700/70 bg-[#111827] p-2 shadow-sm shadow-black/20"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsToolMenuOpen((open) => !open)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 text-xl text-slate-200 transition hover:bg-slate-700 cursor-pointer"
                    aria-label="Open tools"
                  >
                    +
                  </button>

                  {isToolMenuOpen && (
                    <div className="absolute bottom-12 left-0 z-10 min-w-42.5 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl shadow-black/20">
                      {tools.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          onClick={() => handleToolSelect(tool)}
                          className={`flex w-full items-center rounded-lg px-3 py-2 text-left cursor-pointer text-sm transition ${
                            selectedTool === tool ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/70'
                          }`}
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex-1 rounded-xl bg-slate-900/80 px-3 py-2">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        handleSendMessage(event)
                      }
                    }}
                    placeholder="Ask anything..."
                    className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="h-10 rounded-xl bg-slate-100 px-4 text-sm font-medium text-slate-900 transition hover:bg-white sm:w-auto cursor-pointer"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
