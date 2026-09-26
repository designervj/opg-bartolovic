'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: any | null;
  pageData: any | null;
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextType>({ theme: null, pageData: null, loading: true });

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<any | null>(null);
  const [pageData, setPageData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [themeRes, pageRes] = await Promise.all([
          fetch('/api/theme'),
          fetch('/api/page?slug=home')
        ]);
        
        if (themeRes.ok) {
          const themeData = await themeRes.json();
          setTheme(themeData);
          
          // Apply CSS Variables
          if (themeData.public_theme && themeData.public_theme.colors) {
            const colors = themeData.public_theme.colors;
            const root = document.documentElement;
            
            if (colors.primary) root.style.setProperty('--primary', colors.primary);
            if (colors.primaryForeground) root.style.setProperty('--primary-foreground', colors.primaryForeground);
            if (colors.secondary) root.style.setProperty('--secondary', colors.secondary);
            if (colors.secondaryForeground) root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
            if (colors.accent) root.style.setProperty('--accent', colors.accent);
            if (colors.accentForeground) root.style.setProperty('--accent-foreground', colors.accentForeground);
            if (colors.background) root.style.setProperty('--background', colors.background);
            if (colors.foreground) root.style.setProperty('--foreground', colors.foreground);
            if (colors.surface) root.style.setProperty('--surface', colors.surface);
            if (colors.muted) root.style.setProperty('--muted', colors.muted);
            if (colors.border) root.style.setProperty('--border', colors.border);
            if (colors.ring) root.style.setProperty('--ring', colors.ring);
            if (colors.destructive) root.style.setProperty('--destructive', colors.destructive);
          }
        }
        
        if (pageRes.ok) {
          const pageJson = await pageRes.json();
          setPageData(pageJson);
        }
      } catch (error) {
        console.error('Failed to fetch theme/page data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, pageData, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}
