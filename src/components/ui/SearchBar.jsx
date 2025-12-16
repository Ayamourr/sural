import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const SearchBar = ({ placeholder = 'Search products...', className = '' }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  const mockSuggestions = [
    { id: 1, title: 'Wireless Headphones', category: 'Electronics' },
    { id: 2, title: 'Smart Watch', category: 'Electronics' },
    { id: 3, title: 'Laptop Stand', category: 'Accessories' },
    { id: 4, title: 'USB-C Cable', category: 'Accessories' },
    { id: 5, title: 'Mechanical Keyboard', category: 'Electronics' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery?.trim()?.length > 0) {
      const filtered = mockSuggestions?.filter(item =>
        item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
      setSuggestions(filtered);
      setIsOpen(filtered?.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
    setSelectedIndex(-1);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.title);
    navigate(`/search-results?q=${encodeURIComponent(suggestion?.title)}`);
    setIsOpen(false);
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e?.key) {
      case 'ArrowDown':
        e?.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions?.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e?.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e?.preventDefault();
        if (selectedIndex >= 0 && suggestions?.[selectedIndex]) {
          handleSuggestionClick(suggestions?.[selectedIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={searchRef} className={`search-bar-container ${className}`}>
      <form onSubmit={handleSearch}>
        <Icon name="Search" size={16} className="search-bar-icon" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchQuery?.trim() && setSuggestions(mockSuggestions?.filter(item =>
            item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase())
          ))}
          className="search-bar-input"
          aria-label="Search"
          aria-autoComplete="list"
          aria-controls="search-suggestions"
          aria-expanded={isOpen}
        />
      </form>
      {isOpen && suggestions?.length > 0 && (
        <div
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-[200] overflow-hidden"
          role="listbox"
        >
          {suggestions?.map((suggestion, index) => (
            <button
              key={suggestion?.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-150 flex items-center justify-between ${
                index === selectedIndex ? 'bg-muted' : ''
              }`}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <div className="flex items-center gap-3">
                <Icon name="Search" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{suggestion?.title}</p>
                  <p className="text-xs text-muted-foreground">{suggestion?.category}</p>
                </div>
              </div>
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;