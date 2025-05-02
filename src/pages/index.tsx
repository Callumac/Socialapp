import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setDownloadUrl('');
    setError('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (res.ok) {
        setDownloadUrl(data.url);
      } else {
        setError(data.error || 'Error occurred.');
      }
    } catch (err) {
      setError('Network error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">AI Story Video Generator</h1>

        <input
          type="text"
          placeholder="Enter a topic or story idea"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading || !topic}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {downloadUrl && (
          <div className="mt-4">
            <p className="text-green-700">Generation complete!</p>
            <a
              href={downloadUrl}
              download
              className="underline text-blue-700 mt-2 block"
            >
              Download ZIP
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
