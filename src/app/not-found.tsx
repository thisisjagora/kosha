import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="fixed top-0 left-0 bg-[#fff] w-full h-screen flex flex-col gap-4 items-center justify-center z-50">
      <h2 className="text-7xl opacity-95 text-center">404</h2>
      <p className="mb-3 w-96 text-center opacity-75">
        Oops! The page you&apos;re looking for seems to have taken a detour.
        Let&apos;s get you back on track!
      </p>
      <div className="w-full flex justify-center items-center">
        <Link
          href="/"
          className="w-auto bg-[#26446E] py-3 px-[24px] box-border rounded-sm relative z-20 text-[#fff] flex gap-3 items-center"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
