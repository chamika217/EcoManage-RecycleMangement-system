import './globals.css';

export const metadata = {
  title: 'EcoManage — Waste Collection & Recycling',
  description: 'Waste Collection & Recycling Management System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
