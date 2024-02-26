export default async function Footer() {
  return (
    <div className="w-full flex justify-center items-center bg-gradient-to-t from-[#38422C] to-transparent py-4 px-8">
      <p className="text-xs text-center text-zinc-300">
        Developed by{' '}
        <a
          className="inline-block transition-all hover:underline"
          href="https://www.linkedin.com/in/mayrarincones/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mayra Rincones
        </a>{' '}
        as part of Vidext hiring process
      </p>
    </div>
  );
}
