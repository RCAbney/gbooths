import { FC } from 'react';

type PublisherHeaderProps = {
  publisher: string;
  location: string;
};

const PublisherHeader: FC<PublisherHeaderProps> = ({ publisher, location }) => {
  return (
    <div className="bg-black py-2">
      <p className="text-xl text-white px-4 sm:px-6 my-0 font-bold">
        {publisher} {location && `- Booth #${location}`}
      </p>
    </div>
  );
};

export default PublisherHeader; 