import './global.css';
export const metadata = {
    title: 'Lego Instructions'
};

export default function RootLayout({children, ...props}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <body className="p-4">{children}</body>
        </html>
    );
}
