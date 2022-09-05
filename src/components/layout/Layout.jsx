import { useState } from 'react';
import { Sidebar, Navbar } from '../index';

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar container for large screens */}
      <div className="hidden min-w-[240px] tablet:block">
        <Sidebar />
      </div>

      {/* Sidebar container for small screens */}
      {showSidebar && (
        <div className="fixed w-full max-w-[300px] bg-white z-10 shadow-md animate-slide-in tablet:hidden">
          <Sidebar setShowSidebar={setShowSidebar} />
        </div>
      )}

      <div className="bg-gray-100 flex-1 min-h-screen flex flex-col">
        <Navbar setShowSidebar={setShowSidebar} />
        <main className="p-6 mb-6 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
