import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-[#1a1d1a] text-white">
            <h1 className="text-6xl font-bold">404</h1>
            <p className="mt-4 text-xl">Страница не найдена</p>
            <Link href="/" className="mt-6 text-blue-500 hover:underline">
                Вернуться на главную
            </Link>
        </div>
    );
};