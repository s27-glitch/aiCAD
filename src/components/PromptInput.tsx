import { useState } from 'react';
import './PromptInput.css';

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  loading: boolean;
}

export default function PromptInput({
  onGenerate,
  loading
}: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
      setPrompt('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="prompt-form">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe a mechanical part... e.g., 'A 10mm shaft, 50mm long with M8 threads on one end'"
        disabled={loading}
        className="prompt-input"
      />
      <button
        type="submit"
        disabled={loading || !prompt.trim()}
        className="generate-btn"
      >
        {loading ? '⏳ Generating...' : '✨ Generate'}
      </button>

      {/* Example prompts */}
      <div className="examples">
        <p className="examples-title">Examples:</p>
        <button
          type="button"
          className="example-btn"
          onClick={() => setPrompt('A 10mm diameter shaft, 50mm long')}
        >
          Shaft
        </button>
        <button
          type="button"
          className="example-btn"
          onClick={() => setPrompt('A 20mm x 20mm x 10mm bracket with 4 bolt holes')}
        >
          Bracket
        </button>
        <button
          type="button"
          className="example-btn"
          onClick={() => setPrompt('A cylindrical flange, 30mm diameter, 5mm thick, M8 bolt hole pattern')}
        >
          Flange
        </button>
      </div>
    </form>
  );
}