import { SiOpenai } from "react-icons/si";
import { RiGeminiLine, RiClaudeFill } from "react-icons/ri";
import { DeepSeek } from '@lobehub/icons';

const tools = [
  { name: 'ChatGPT', url: 'https://chat.openai.com', icon: <SiOpenai size={24} /> },
  { name: 'Gemini', url: 'https://gemini.google.com', icon: <RiGeminiLine size={24} /> },
  { name: 'Claude', url: 'https://claude.ai/', icon: <RiClaudeFill size={24} /> },
  { name: 'DeepSeek', url: 'https://www.deepseek.com/en', icon: <DeepSeek size={24} /> }
];

const AiTools = () => {
  return (
    <div className="ai-grid">
      {tools.map((tool) => (
        <a key={tool.name} href={tool.url} className="ai-card">
          <div style={{ marginBottom: '8px' }}>
            {tool.icon}
          </div>
          <span className="ai-label">
            {tool.name.toUpperCase()}
          </span>
        </a>
      ))}
    </div>
  );
};

export default AiTools; 