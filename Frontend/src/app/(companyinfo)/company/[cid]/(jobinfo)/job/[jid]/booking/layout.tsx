export default function BookingLayout({
  children,
  // dashboard,
  // manage,
}: {
  children: React.ReactNode;
  // dashboard:React.ReactNode,
  // manage:React.ReactNode
}) {
  return (
    <div className="flex w-full flex-col">
      {children}
      {/* {dashboard} */}
      {/* {manage} */}
      {/* <BookingMenu/> */}
    </div>
  );
}
