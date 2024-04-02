import Link from 'next/link';

const TopMenuItem = ({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) => {
  return (
    <Link
      href={pageRef}
      className="mb-auto mt-auto w-[120px] text-center text-sm"
    >
      {title}
    </Link>
  );
};

export default TopMenuItem;
