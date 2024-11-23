import { useState } from 'react';

import {
  isListingAvailable,
  listings as staticsListings,
} from '@/api/data/listings';
import { ListingFilters } from '@/components/ListingFilters';
import { ListingList } from '@/components/ListingList';
import { Separator } from '@/components/ui/Separator';

export const HomePage = () => {
  console.count('HomePage');
  const [listings, setListings] = useState(staticsListings);

  const handleFilters = (filters) => {
    const { dates, guests, search } = filters;

    let filteredListings = staticsListings;

    if (dates) {
      filteredListings = filteredListings.filter((listing) =>
        isListingAvailable(listing, dates),
      );
    }

    if (guests) {
      filteredListings = filteredListings.filter(
        (listing) => guests <= listing.maxGuests,
      );
    }

    if (search) {
      filteredListings = filteredListings.filter((listing) =>
        listing.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setListings(filteredListings);
  };

  return (
    <div className='container py-4'>
      <div className='mb-4'>
        <ListingFilters onChange={handleFilters} />
        <Separator className='my-4' />
      </div>
      <ListingList listings={listings} />
    </div>
  );
};
