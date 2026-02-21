import NavLink from '@/components/ui/NavLink';

// Define the type for a single navigation item from the API
interface NavItem {
  _id: string;
  label: string;
  href: string;
}

/**
 * Fetches navigation items from the backend API.
 * This is a Server Component, so its fetch requests run on the server.
 */
async function getNavItems(): Promise<NavItem[]> {
  // Server-side fetch needs an absolute URL. 
  // It runs in a Node.js environment and doesn't know about the browser's host or the Next.js proxy.
  // We must use the full URL to the backend service.
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/layout/navigation`;

  try {
    const res = await fetch(apiUrl, {
      // Revalidate the data every hour
      next: { revalidate: 3600 }, 
      // Using cache: 'no-store' during development can also help diagnose caching issues
      // cache: 'no-store', 
    });

    if (!res.ok) {
      console.error(`Failed to fetch navigation items. Status: ${res.status}, URL: ${apiUrl}`);
      return [];
    }

    // Check if the response is actually JSON before parsing
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      return res.json();
    } else {
      console.error('Received non-JSON response from navigation API');
      return [];
    }

  } catch (error) {
    console.error('An error occurred while fetching navigation items:', error);
    return [];
  }
}

/**
 * Navigation is a Server Component that fetches its own data
 * and renders the main site navigation links.
 */
const Navigation = async () => {
  const navItems = await getNavItems();

  return (
    <nav className="hidden md:flex items-center space-x-8 4xl:space-x-12">
      {navItems.map((item) => (
        <NavLink key={item._id} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
