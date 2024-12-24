import { useParams } from 'react-router-dom';

import {ListingDetailsCard} from '@/components/ListingDetailsCard';
import { useFetch } from '@/hooks/useFetch';
import { DataRender } from '@/components/DataRenderer';

export const ListingDetailsPage = () => {
  const { listingId } = useParams();

  const {data: listing, isLoading, error} = useFetch(`/api/listings/${listingId}`);

  return <div className='container py-4'>
    <DataRender isLoading={isLoading} error={error}>
      <ListingDetailsCard listing={listing} />;
    </DataRender>
  </div>;
};
