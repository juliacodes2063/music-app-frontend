import { InputModel } from '../../../types/track';

interface Props {
  input: InputModel;
  update: (input: InputModel, value: string) => void;
  onFocus: (input: InputModel) => void;
}

const TextInput: React.FC<Props> = ({ input, update, onFocus }) => {

  return (
    <div className="relative">
      <input
        value={input.value || ''}
        onChange={e => update(input, e.target.value)}
        onFocus={() => onFocus(input)}
        placeholder={input.placeholder}
        className={`border p-2 rounded w-full ${input.error ? 'border-red-500' : 'border-gray-300'}`}
        data-testid={`input-${input.key}`}
      />
      {input.validate && (
        <span className={`absolute top-1 left-1 text-xs ${input.error ? 'text-red-500' : 'text-gray-400'}`}>
          *
        </span>
      )}
      {input.error && (
        <div 
            className="text-red-500 text-xs mt-1"
            data-testid={`error-${input.key}`} 
        >
          {input.error}
        </div>
      )}
    </div>
  );
};

export default TextInput;
