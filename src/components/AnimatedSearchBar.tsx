import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface SearchInputProps {
  onSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

export default function AnimatedSearchBar({ onSearch, placeholder = "Search..." }: SearchInputProps) {
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inputRef = useRef(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; 

    setInputValue(val)

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      onSearch(val.trim());
    }, 1000);
  };

    const handleClear = () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        onSearch('');
        setExpanded(false);
        setInputValue('');
    };


      useOnClickOutside(inputRef, () => setExpanded(false))

  return (
    <div className="relative flex items-center" ref={inputRef}>
        <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
            <motion.div
                key="input"
                initial={{ width: 40, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center border border-white rounded-full px-3 py-1 bg-black overflow-hidden absolute right-0"
            >
                <FiSearch className="mr-2 text-white" />
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="bg-black text-white outline-none w-full"
                    autoFocus
                />
                <FiX onClick={handleClear} className="ml-2 text-white cursor-pointer" />
            </motion.div>
            ) : (
            <motion.button
                key="icon"
                onClick={() => setExpanded(true)}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white cursor-pointer"
            >
                <FiSearch />
            </motion.button>
            )}
        </AnimatePresence>
    </div>

  );
}
