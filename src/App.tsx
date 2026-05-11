import { useState } from 'react';
import PromptInput from './components/PromptInput';
import Viewer3D from './components/Viewer3D';
import { generateDummyGeometry } from './mockApi';
import './App.css';

interface Model {
  mesh?: {
    vertices: number[];
    indices: number[];
  };
  parameters?: Record<string, number>;
  features?: any[];
}

function App() {
  const [model, setModel] = useState<Model | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
  setLoading(true);
  setError(null);

  try {
    // Call FastAPI backend
    const response = await fetch('http://localhost:8000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    const data = await response.json();
    setModel(data);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
  } finally {
    setLoading(false);
  }
};

  const handleExport = () => {
    if (!model) {
      alert('Generate a model first!');
      return;
    }

    // Week 2: This will actually export STEP
    // For now, just show a message
    alert('Export feature coming in Week 2!');
  };

  const handleParameterChange = (key: string, value: number) => {
    if (!model) return;
    setModel({
      ...model,
      parameters: { ...model.parameters, [key]: value }
    });
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h1>aiCAD</h1>
        <p className="subtitle">AI-Powered Parametric Design</p>

        <PromptInput
          onGenerate={handleGenerate}
          loading={loading}
        />

        {error && <div className="error-message">{error}</div>}

        {model?.parameters && (
          <div className="parameters-panel">
            <h3>Parameters</h3>
            {Object.entries(model.parameters).map(([key, value]) => (
              <div key={key} className="parameter-item">
                <label>{key}</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={value}
                  onChange={(e) =>
                    handleParameterChange(key, Number(e.target.value))
                  }
                />
                <span>{value}mm</span>
              </div>
            ))}
          </div>
        )}

        {model && (
          <button className="export-btn" onClick={handleExport}>
            📥 Export as STEP
          </button>
        )}
      </div>

      <div className="viewer-container">
        {model ? (
          <Viewer3D model={model} />
        ) : (
          <div className="placeholder">
            <p>🎨 Describe a part to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;