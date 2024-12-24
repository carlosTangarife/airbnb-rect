import { useState, useMemo } from 'react';

import { ListingFilters } from '@/components/ListingFilters';
import { ListingList } from '@/components/ListingList';
import { Spinner, Separator } from '@/components/ui';
import { useFetch } from '@/hooks/useFetch';
import { useCallback } from 'react';

export const HomePage = () => {
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  const fetchOptions = useMemo(() => ({params: filters}), [filters]);

  const {data: listings, isLoading, error} = useFetch('/api/listings', fetchOptions);

  console.count('HomePage', listings);

  const handlerFilters =  useCallback((newFilters) => {
    setFilters(newFilters);
  }, [])

  const renderListingList = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center text-red-500'>{error}</div>;
    }

    return <ListingList listings={listings} />;
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handlerFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};
