import { useState } from 'react'
import axios from 'axios'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRemix = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    try {
      const response = await axios.post('/api/remix', { text: inputText })
      setOutputText(response.data.remixedText)
    } catch (error) {
      console.error('Error remixing text:', error)
      setOutputText('Error occurred while remixing text. Please try again.')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Text Remixer</h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700">
              Input Text
            </label>
            <textarea
              id="input"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to remix..."
            />
          </div>

          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText.trim()}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Remixing...' : 'Remix Text'}
          </button>

          {outputText && (
            <div>
              <label htmlFor="output" className="block text-sm font-medium text-gray-700">
                Remixed Text
              </label>
              <textarea
                id="output"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-white"
                value={outputText}
                readOnly
              />
            </div>
          )}
        </div>
      </div>
      <h1 className="text-3xl font-bold text-blue-500 bg-gray-100 p-4 rounded-lg">
        Hello Tailwind!
      </h1>
    </div>
  )
}

export default App 