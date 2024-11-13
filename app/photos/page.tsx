import { Photo } from '../../types/images';
import Image from 'next/image';

const Photos = async () => {
  const getPhotos = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/photos?_limit=10'
      );
      const photos = await response.json();
      return photos;
    } catch (error) {
      console.error(error);
    }
  };

  const photos: Photo[] = await getPhotos();

  return (
    <div className='font-[family-name:var(--font-geist-sans)] mx-auto my-0 w-full max-w-7xl p-9'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {photos.map((photo) => {
          return (
            <div
              className='card bg-base-100 shadow-xl overflow-hidden'
              key={photo.id}
            >
              <figure className='relative w-full'>
                <img
                  src='https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg'
                  alt='Shoes'
                  className='object-cover w-full h-full'
                />
              </figure>
              <div className='"card-body p-3 sm:p-4"'>
                <h2 className='"card-title text-sm sm:text-base mb-1 line-clamp-1"'>
                  Shoes!
                  <div className='badge badge-secondary text-xs'>NEW</div>
                </h2>
                <p className='text-xs sm:text-sm mb-2 line-clamp-2'>
                  If a dog chews shoes whose shoes does he choose?
                </p>
                <div className='card-actions justify-end'>
                  <div className='badge badge-outline text-xs'>Fashion</div>
                  <div className='badge badge-outline text-xs'>Products</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Photos;
