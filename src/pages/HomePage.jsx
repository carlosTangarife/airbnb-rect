import axios from 'axios';
import { useEffect, useRef,useState } from 'react';

import api from '@/api';
import { ListingFilters } from '@/components/ListingFilters';
import { ListingList } from '@/components/ListingList';
import { Spinner } from '@/components/ui';
import { Separator } from '@/components/ui/Separator';

export const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, seterror] = useState(null);
  const [filters, setFilters] = useState({
    dates: undefined,
    guests: 0,
    search: '',
  });

  console.count('HomePage', listings);

  const abortController = useRef(null);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      seterror(null);
      abortController.current = new AbortController();
      try {
        const { data } = await api.get('/api/listings', {
          params: filters,
          signal: abortController.signal,
        });
        setListings(data);
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        seterror('something went worng, plaese try again later');
      } finally {
        setIsLoading(false);
      }
    };
    fetchListings();

    return () => abortController.current?.abort();
  }, [filters]);

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
        <ListingFilters onChange={setFilters} />
        <Separator className='my-4' />
      </div>
      {renderListingList()}
    </div>
  );
};
