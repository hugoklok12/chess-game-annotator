import Link from "next/link";

interface Props {
  children: JSX.Element;
}

const Page = ({ children }: Props) => {
  return (
    <>
      <div className="my-20 mx-auto h-4/6 max-w-7xl rounded bg-black">
        <header className="border-b border-b-gray-400 p-5">
          <nav className="flex w-full flex-row justify-between gap-4">
            <Link className="text-white" href={"/"}>
              Chess Game Annotator
            </Link>
            <button className="text-white">Refresh games</button>
          </nav>
        </header>
        <main className="p-5">{children}</main>
      </div>
    </>
  );
};

export default Page;
