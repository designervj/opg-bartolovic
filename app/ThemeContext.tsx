'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  theme: any | null;
  pageData: any | null;
  logoUrl: string;
  loading: boolean;
};

const ThemeContext = createContext<ThemeContextType>({ theme: null, pageData: null, logoUrl: '', loading: true });

export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<any | null>(null);
  const [pageData, setPageData] = useState<any | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [themeRes, pageRes] = await Promise.all([
          fetch('/api/theme', { cache: 'no-store' }),
          fetch('/api/page?slug=home', { cache: 'no-store' })
        ]);
        
        if (themeRes.ok) {
          const themeData = await themeRes.json();
          setTheme(themeData);
          
          // Apply dynamic logo url
          if (themeData.logoUrl) {
            setLogoUrl(themeData.logoUrl);
          }

          // Apply CSS Variables to :root
          const publicTheme = themeData.public_theme || themeData;
          if (publicTheme && publicTheme.colors) {
            const colors = publicTheme.colors;
            const root = document.documentElement;

            if (colors.primary) root.style.setProperty('--primary', colors.primary);
            if (colors.primaryLight) root.style.setProperty('--primary-light', colors.primaryLight);
            if (colors.primaryDark) root.style.setProperty('--primary-dark', colors.primaryDark);
            if (colors.primaryHover) root.style.setProperty('--primary-hover', colors.primaryHover);
            if (colors.primarySoft) root.style.setProperty('--primary-soft', colors.primarySoft);

            if (colors.primaryForeground) root.style.setProperty('--primary-foreground', colors.primaryForeground);
            if (colors.secondary) root.style.setProperty('--secondary', colors.secondary);
            if (colors.secondaryForeground) root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
            if (colors.accent) root.style.setProperty('--accent', colors.accent);
            if (colors.accentForeground) root.style.setProperty('--accent-foreground', colors.accentForeground);
            if (colors.background) root.style.setProperty('--background', colors.background);
            if (colors.foreground || colors.text) root.style.setProperty('--foreground', colors.foreground || colors.text);
            if (colors.surface) root.style.setProperty('--surface', colors.surface);
            if (colors.card) root.style.setProperty('--card', colors.card);
            if (colors.muted) root.style.setProperty('--muted', colors.muted);
            if (colors.border) root.style.setProperty('--border', colors.border);
            if (colors.ring) root.style.setProperty('--ring', colors.ring || colors.primary);
            if (colors.destructive || colors.danger) root.style.setProperty('--destructive', colors.destructive || colors.danger);

            // Also expose footer/dark surface via CSS var so components can reference
            const footerBg = colors.footerBackground || colors.darkSurface || colors.inverseSurface;
            if (footerBg) root.style.setProperty('--footer-bg', footerBg);
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
    <ThemeContext.Provider value={{ theme, pageData, logoUrl, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}
