import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { FaFilter } from "react-icons/fa"
import { Header } from "@tanstack/react-table"
import { useOnClickOutside } from "../../../hooks/useOnClickOutside"
import CloseButton from "../buttons/CloseButton"
import { useGetGenresQuery } from "../../../store/services/genresApi"

interface SearchInputProps<T> {
  header: Header<T, unknown>
  value: string
  onChange: (filters: Record<string, string>) => void;
  filters: Record<string, string>;
}

const SearchInput = <T extends { id: string }>({
  header,
  value,
  onChange,
  filters
}: SearchInputProps<T>) => {

  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)

  const searchInputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { data: genres = [] } = useGetGenresQuery();

  useEffect(() => {
    if (isOpen) {
      setInputValue(value)
      inputRef.current?.focus()
    }
  }, [isOpen, value])

  const hasFilter = value.trim().length > 0

  useOnClickOutside(searchInputRef, () => setIsOpen(false))
  useOnClickOutside(dropdownRef, () => setDropdownOpen(false))

  const handleChange = (val: string) => {
    setInputValue(val);
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      const newFilters: Record<string, string> = {};
      const { genres, artist } = filters
      if (genres) newFilters.genres = genres;
      if (artist) newFilters.artist = artist;
      if (val.trim()) {
        newFilters[header.column.id] = val;
      }
      onChange(newFilters);
    }, 500);
  };

  const isGenresFilter = header.column.id === 'genres';

  const handleRemoveFilter = (event: React.MouseEvent) => {
    event.stopPropagation();
    setInputValue('');
   
    onChange({});

    if(isGenresFilter) {
      setDropdownOpen(true)
    } else {
       setIsOpen(false);
    }
  };

  return (
    <div className="absolute bottom-1 right-1 z-10" ref={searchInputRef}>
      <div className="relative">
        <button
          onClick={e => {
            e.stopPropagation()
            setIsOpen(prev => !prev)
          }}
          className={`p-2 transition bg-transparent cursor-pointer ${
            hasFilter ? 'text-blue-500' : 'text-gray-400'
          } hover:text-blue-600`}
        >
          <FaFilter className="w-2 h-2" />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0, x: 10 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full mt-1 right-0"
            >
              <div className="relative w-[120px]">
                {isGenresFilter ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(prev => !prev)}
                      className="w-full px-2 py-1 text-xs border rounded bg-black text-white shadow focus:outline-none focus:ring flex justify-between items-center"
                    >
                      {inputValue || 'Select genre'}
                        <>
                          {!inputValue && (
                            
                            <motion.span
                              className="ml-1 inline-block"
                              animate={{ rotate: dropdownOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              ▾
                            </motion.span>
                            
                          )}
                        </>
                     
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.ul
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 mt-1 w-full bg-black text-white border rounded shadow text-xs max-h-43 overflow-auto"
                        >
                          <li
                            onClick={() => {
                              handleChange('');
                              setDropdownOpen(false);
                            }}
                            className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                          >
                            All genres
                          </li>
                          {genres.map((g: string) => (
                            <li
                              key={g}
                              onClick={() => {
                                handleChange(g);
                                setDropdownOpen(false);
                              }}
                              className="px-2 py-1 hover:bg-gray-700 cursor-pointer"
                            >
                              {g}
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                    {hasFilter && <CloseButton onClick={ handleRemoveFilter} />}
                  </div>
                ) : (
                  <>
                    <input
                      data-testid={header.id !== 'artist' ? "search-input" : `filter-${header.id}`}
                      ref={inputRef}
                      type="text"
                      placeholder="Filter..."
                      value={inputValue}
                      onClick={e => e.stopPropagation()}
                      onChange={(e) => handleChange(e.target.value)}
                      className="w-full px-2 py-1 text-xs border rounded bg-black text-white shadow focus:outline-none focus:ring pr-6"
                    />
                    {hasFilter && <CloseButton onClick={handleRemoveFilter} />}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default SearchInput
