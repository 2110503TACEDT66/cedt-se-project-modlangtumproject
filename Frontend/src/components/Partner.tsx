import React from 'react';
import Image from 'next/image';

const Partner = ({ logoUrl, name }: { logoUrl: string; name: string }) => {
  return (
    <div className="flex">
      <Image src={logoUrl} alt={`${name} Logo`} width={100} height={50} />
    </div>
  );
};

export default Partner;
