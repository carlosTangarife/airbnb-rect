import { listings } from '@/api/data/listings';
import { ListingList } from '@/components/ListingList';

export const HomePage = () => {
  return (
    <div>
      <ListingList listings={listings} />
    </div>
  );
};
