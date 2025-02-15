export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <main className="min-h-screen bg-gray-100 py-8 w-screen-xl">
            <div className="container mx-auto px-4">{children}</div>
        </main>
    );
}