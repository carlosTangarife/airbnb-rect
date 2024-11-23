import { ListingCard } from '@/components/ListingCard';

export const ListingList = ({ listings = [] }) => {
  if (listings.length === 0) {
    return <p>No listings found.</p>;
  }

  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};
