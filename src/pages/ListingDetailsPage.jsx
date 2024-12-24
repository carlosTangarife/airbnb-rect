import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import api from '@/api';
import {ListingDetailsCard} from '@/components/ListingDetailsCard';
import { Spinner } from '@/components/ui';
import { useFetch } from '@/hooks/useFetch';

export const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {data: listing, isLoading, error} = useFetch(`/api/listings/${listingId}`);

  const renderListing = () => {
    if (isLoading) {
      return (
        <div className='flex justify-center'>
          <Spinner size='sm' />
        </div>
      );
    }

    if (error) {
      return <div className='text-center'>{error}</div>;
    }

    return <ListingDetailsCard listing={listing} />;
  };

  return <div className='container py-4'>{renderListing()}</div>;
};
