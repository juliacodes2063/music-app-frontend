import { useState } from 'react';
import { InputModel } from '../../../types/track';

interface Props {
  input: InputModel<string[]>;
  update: (input: InputModel<string[]>, value: string[]) => void;
}

const TagInput: React.FC<Props> = ({ input, update }) => {
  const value = input.value || [];
  const [inputValue, setInputValue] = useState('');
  const options = input.values || [];

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      update(input, [...value, trimmed]);
      setInputValue('');
    }
  };

  const handleRemove = (tag: string) => {
    update(input, value.filter(t => t !== tag));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2 max-w-[300px]">
        {value.map(tag => (
          <span key={tag} className="bg-gray-900 px-2 py-1 rounded-full flex items-center gap-1">
            {tag}
            <button onClick={() => handleRemove(tag)} className="button text-red-500 font-bold px-1">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
          list="tag-options"
          className="border p-2 rounded flex-1"
          data-testid={input.testId}
        />
        <button 
            onClick={handleAdd} 
            type="button" 
            className="primary px-4 py-2 text-white rounded">
                +
        </button>
        <datalist id="tag-options">
          {options.filter(opt => !value.includes(opt)).map(opt => (
            <option key={opt} value={opt} />
          ))}
        </datalist>
        {input.error && (
        <div 
            className="text-red-500 text-xs mt-1"
            data-testid={input.testIdError} 
        >
          {input.error}
        </div>
      )}
      </div>
    </div>
  );
};

export default TagInput;
