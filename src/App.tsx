
import React, { useState } from 'react'
import { X } from 'lucide-react'

type CustomPrompt = { id: string, text: string }

export default function App() {
  const [customPrompts, setCustomPrompts] = useState<CustomPrompt[]>([])
  const [input, setInput] = useState("")

  const addPrompt = () => {
    if (!input.trim()) return
    setCustomPrompts([...customPrompts, { id: Date.now().toString(), text: input }])
    setInput("")
  }

  const removePrompt = (id: string) => {
    setCustomPrompts(customPrompts.filter(p => p.id !== id))
  }

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Prompt kopieret!")
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Mine Prompts</h2>
      <div className="flex gap-2 mb-4">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Skriv din egen prompt..."
          className="flex-1 border rounded px-2 py-1"
        />
        <button onClick={addPrompt} className="bg-blue-500 text-white px-3 py-1 rounded">
          Tilføj
        </button>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {customPrompts.map(p => (
          <div key={p.id} className="relative border rounded-lg p-4 bg-slate-100 dark:bg-slate-800 cursor-pointer"
            onClick={() => copyPrompt(p.text)}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={(e) => { e.stopPropagation(); removePrompt(p.id) }}
            >
              <X size={16} />
            </button>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
