import { Spinner } from '@/components/ui';

export const DataRender = ({ children, error, isLoading }) => {
  if (isLoading) {
    return (
      <div className='flex justify-center'>
        <Spinner size='sm' />
      </div>
    );
  }

  if(error){
    return (
      <div className='text-center'>
        {error}
      </div>
    )
  }

  return children;
};
