'use client';
import { Box, Rating } from '@mui/material';
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import React from 'react';

export default function Card({
  companyName,
  imgSrc,
}: {
  companyName: string;
  imgSrc: string;
}) {
  // const [value, setValue] = React.useState<number | null>(5);

  return (
    <InteractiveCard contentName={companyName}>
      <div className="relative h-[70%] w-full rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Company Picture"
          fill={true}
          className="rounded-t-lg object-cover"
        />
      </div>
      <div className="h-[15%] w-full p-[10px]">{companyName}</div>
    </InteractiveCard>
  );
}
