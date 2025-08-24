import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


export const metadata = {
  title: "Music Streaming Platform",
  description: "Stream and enjoy your favorite music",
};

export default function RootLayout({ children }) {
  // Example currentSong, replace with actual state or context later
  const currentSong = {
    title: "Song Title",
    url: "/songs/example.mp3",
  };

  return (
    <html lang="en">
      <body className="min-h-screen flex bg-gray-900 text-white m-0 p-0">
        {/* Sidebar stays on left */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col relative">
          <Navbar />

          {/* Content with subtle card styling */}
          <main className="p-4 flex-1">
            <div className="bg-white rounded-lg shadow-xl border border-gray-200 h-full p-6">
              {children}
            </div>
          </main>

         
        </div>
      </body>
    </html>
  );
}