import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import RoleBasedHeader from '../../components/ui/RoleBasedHeader';
import SearchBar from '../../components/ui/SearchBar';
import SearchFilters from './components/SearchFilters';
import ProductResultCard from './components/ProductResultCard';
import NoResultsState from './components/NoResultsState';
import RecentSearches from './components/RecentSearches';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const [filters, setFilters] = useState({
    category: searchParams?.get('category') || 'all',
    status: 'all',
    sortBy: 'relevance',
    minVotes: 0
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (e) => {
      setLanguage(e?.detail?.language);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  useEffect(() => {
    const query = searchParams?.get('q');
    const category = searchParams?.get('category');

    if (query) {
      setSearchQuery(query);
    }

    if (category) {
      setFilters((prev) => ({ ...prev, category }));
    }

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  }, [searchParams]);

  const translations = {
    en: {
      searchResults: 'Search Results',
      resultsFor: 'Results for',
      showing: 'Showing',
      of: 'of',
      results: 'results',
      loadMore: 'Load More',
      loading: 'Loading...',
      noResults: 'No results found',
      backToHome: 'Back to Home'
    },
    ru: {
      searchResults: 'Результаты поиска',
      resultsFor: 'Результаты для',
      showing: 'Показано',
      of: 'из',
      results: 'результатов',
      loadMore: 'Загрузить еще',
      loading: 'Загрузка...',
      noResults: 'Ничего не найдено',
      backToHome: 'На главную'
    }
  };

  const t = translations?.[language];

  const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
    category: 'Electronics',
    status: 'planned',
    votes: 156,
    hasVoted: false,
    isSubscribed: false,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1119295e3-1765076790006.png",
    imageAlt: 'Modern black wireless headphones with cushioned ear cups on white background'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking. Water-resistant design for all activities.',
    category: 'Electronics',
    status: 'in-transit',
    votes: 243,
    hasVoted: true,
    isSubscribed: true,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1dd51548c-1764641911784.png",
    imageAlt: 'Silver smartwatch with black band displaying fitness metrics on screen'
  },
  {
    id: 3,
    name: 'Ergonomic Laptop Stand',
    description: 'Adjustable aluminum laptop stand for better posture and cooling. Compatible with all laptop sizes from 10 to 17 inches.',
    category: 'Accessories',
    status: 'available',
    votes: 89,
    hasVoted: false,
    isSubscribed: false,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9ea2001-1764658995251.png",
    imageAlt: 'Sleek aluminum laptop stand holding MacBook at ergonomic angle on wooden desk'
  },
  {
    id: 4,
    name: 'USB-C Fast Charging Cable',
    description: 'Durable braided USB-C cable with 100W fast charging support. 2-meter length with reinforced connectors.',
    category: 'Accessories',
    status: 'available',
    votes: 67,
    hasVoted: false,
    isSubscribed: false,
    image: "https://images.unsplash.com/photo-1708922692309-50a25e76ee99",
    imageAlt: 'Black braided USB-C charging cable coiled on white surface showing connector detail'
  },
  {
    id: 5,
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches. Programmable keys and anti-ghosting technology for gaming.',
    category: 'Electronics',
    status: 'planned',
    votes: 198,
    hasVoted: true,
    isSubscribed: false,
    image: "https://images.unsplash.com/photo-1636059151106-5471f93f1dc9",
    imageAlt: 'RGB illuminated mechanical gaming keyboard with colorful backlight on dark desk'
  },
  {
    id: 6,
    name: 'Portable Power Bank 20000mAh',
    description: 'High-capacity power bank with dual USB ports and USB-C input/output. LED display shows remaining battery percentage.',
    category: 'Electronics',
    status: 'in-transit',
    votes: 134,
    hasVoted: false,
    isSubscribed: true,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17cbd54e3-1764777436983.png",
    imageAlt: 'Compact black power bank with LED display showing battery level on white background'
  },
  {
    id: 7,
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI settings. Silent clicking and long battery life up to 18 months.',
    category: 'Accessories',
    status: 'available',
    votes: 76,
    hasVoted: false,
    isSubscribed: false,
    image: "https://images.unsplash.com/photo-1572779818089-c9697cd25f52",
    imageAlt: 'Sleek gray wireless mouse with ergonomic design on minimalist desk setup'
  },
  {
    id: 8,
    name: 'Webcam 1080p HD',
    description: 'Full HD webcam with auto-focus and built-in microphone. Perfect for video calls and streaming with wide-angle lens.',
    category: 'Electronics',
    status: 'sold-out',
    votes: 112,
    hasVoted: true,
    isSubscribed: true,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_14094b40a-1764673878586.png",
    imageAlt: 'Modern HD webcam with clip mount and adjustable lens on laptop screen'
  }];


  const filterProducts = () => {
    let filtered = [...mockProducts];

    if (searchQuery) {
      filtered = filtered?.filter((product) =>
      product?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      product?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filters?.category !== 'all') {
      filtered = filtered?.filter((product) =>
      product?.category?.toLowerCase() === filters?.category?.toLowerCase()
      );
    }

    if (filters?.status !== 'all') {
      filtered = filtered?.filter((product) => product?.status === filters?.status);
    }

    if (filters?.minVotes > 0) {
      filtered = filtered?.filter((product) => product?.votes >= filters?.minVotes);
    }

    switch (filters?.sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => b?.votes - a?.votes);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.id - a?.id);
        break;
      case 'oldest':
        filtered?.sort((a, b) => a?.id - b?.id);
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = filterProducts();
  const totalResults = filteredProducts?.length;
  const displayedProducts = filteredProducts?.slice(0, currentPage * itemsPerPage);
  const hasMore = displayedProducts?.length < totalResults;

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleRecentSearchClick = (query) => {
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <RoleBasedHeader userRole="consumer" isAuthenticated={true} />
      <main className="main-content">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <button
                onClick={() => navigate('/consumer-dashboard')}
                className="hover:text-foreground transition-colors duration-150">

                <Icon name="Home" size={16} />
              </button>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground font-medium">{t?.searchResults}</span>
            </div>

            {searchQuery &&
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {t?.resultsFor} "{searchQuery}"
                </h1>
                <p className="text-muted-foreground">
                  {t?.showing} {displayedProducts?.length} {t?.of} {totalResults} {t?.results}
                </p>
              </div>
            }

            <div className="max-w-2xl">
              <SearchBar placeholder={language === 'en' ? 'Search products...' : 'Поиск товаров...'} />
            </div>
          </div>

          {!searchQuery && <RecentSearches onSearchClick={handleRecentSearchClick} />}

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside className="lg:col-span-1">
              <SearchFilters
                onFilterChange={handleFilterChange}
                activeFilters={filters}
                resultCount={totalResults} />

            </aside>

            <div className="lg:col-span-3">
              {isLoading ?
              <div className="flex items-center justify-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-muted-foreground">{t?.loading}</p>
                  </div>
                </div> :
              filteredProducts?.length === 0 ?
              <NoResultsState searchQuery={searchQuery} /> :

              <>
                  <div className="space-y-4 mb-8">
                    {displayedProducts?.map((product) =>
                  <ProductResultCard
                    key={product?.id}
                    product={product}
                    searchQuery={searchQuery} />

                  )}
                  </div>

                  {hasMore &&
                <div className="flex justify-center">
                      <Button
                    variant="outline"
                    size="lg"
                    iconName="ChevronDown"
                    iconPosition="right"
                    onClick={handleLoadMore}>

                        {t?.loadMore}
                      </Button>
                    </div>
                }
                </>
              }
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default SearchResults;