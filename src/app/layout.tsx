import './global.css';
export const metadata = {
    title: 'Lego Instructions'
};

export default function RootLayout({children, ...props}: {children: React.ReactNode}) {
    console.log(props);
    return (
        <html lang="en">
            <body className="p-4">
                <h1 className="text-2xl">Lego Instructions</h1>
                {children}
            </body>
        </html>
    );
}
