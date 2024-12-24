import { useState, useMemo, useCallback } from 'react';

import { ListingFilters } from '@/components/ListingFilters';
import { ListingList } from '@/components/ListingList';
import { Separator } from '@/components/ui';
import { useFetch } from '@/hooks/useFetch';
import { DataRender } from '@/components/DataRenderer';

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

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handlerFilters} />
        <Separator className='my-4' />
      </div>
      <DataRender isLoading={isLoading} error={error}>
        <ListingList listings={listings} />
      </DataRender>
    </div>
  );
};
