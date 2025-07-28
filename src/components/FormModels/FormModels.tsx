import React, { ReactNode } from 'react';
import TextInput from './inputs/TextInput';
import TagInput from './inputs/TagInput';
import { InputModel } from '../../types/track';


interface FormModelProps {
  inputModels: InputModel[];
  setInputModels: (models: InputModel[]) => void;
}

const FormModel: React.FC<FormModelProps> = ({ inputModels, setInputModels }) => {

  function update<T extends string | string[]>(input: InputModel<T>, value: T) {
    const newModels = inputModels.map(el =>
      el.key === input.key ? { ...el, value } : el
    );
    setInputModels(newModels as InputModel[]);
  }

  const onFocus = (focusedInput: InputModel) => {
    const updated = inputModels.map(el =>
      el.key === focusedInput.key && el.error
        ? { ...el, error: undefined }
        : el
    );
    setInputModels(updated);
  };  

  const getForm = (item: InputModel): ReactNode => {
    switch (item.type) {
      case 'header':
        return <p className="text-lg font-semibold mb-2">{item.title}</p>;

      case 'string':
        return (
          <TextInput
            input={item as InputModel<string>}
            update={update}
            onFocus={onFocus}
          />
        );

      case 'tagInput':
        return (
          <TagInput
            input={item as InputModel<string[]>}
            update={update}
          />
        );

      default:
        return <div>{item.title}</div>;
    }
  };



  return (
    <form 
      className="formModel" 
      data-testid="track-form"
    >
      {inputModels.map((el) => (
        <div key={el.key} className="mb-4">
          {getForm(el)}
        </div>
      ))}
    </form>
  );
};

export default FormModel;
