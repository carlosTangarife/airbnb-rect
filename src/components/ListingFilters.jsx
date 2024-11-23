import { Search } from 'lucide-react';
import { useState } from 'react';

import { Button, DateRangePicker, Input, Stepper } from '@/components/ui';

export const ListingFilters = () => {
  const [dates, setDates] = useState();
  const [guests, setGuests] = useState(0);
  const [search, setSearch] = useState('');

  return (
    <div className='flex flex-row items-center justify-center gap-2'>
      <Input
        value={search}
        className='w-[400px]'
        placeholder='Search destinations'
        onChange={(e) => setSearch(e.target.value)}
      />
      <DateRangePicker
        value={dates}
        onChange={setDates}
        minDate={new Date()}
        placeholder='Add dates'
      />
      <Stepper label='Guests' value={guests} onChange={setGuests} />
      <Button>
        <Search className='h-4 w-4' />
      </Button>
    </div>
  );
};
