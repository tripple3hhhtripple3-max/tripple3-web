// apps/website-renderer/src/components/ThemeInjector.tsx
import React from 'react';
import { ThemeTokens } from '@gusaindeekshu/multiverse';

interface ThemeInjectorProps {
  theme: ThemeTokens;
  darkMode?: boolean;
}

export const ThemeInjector: React.FunctionComponent<ThemeInjectorProps> = ({ theme, darkMode = false }) => {
  const cssVariables = `
    :root {
      --color-primary: ${theme.colors.primary};
      --color-secondary: ${theme.colors.secondary};
      --color-background: ${theme.colors.background};
      --color-text: ${theme.colors.text};
      --color-accent: ${theme.colors.accent};
      
      --font-sans: ${theme.typography.fontSans};
      --font-heading: ${theme.typography.fontHeading};
      --base-font-size: ${theme.typography.baseSize};
      
      --radius-card: ${theme.borderRadius.card};
      --radius-button: ${theme.borderRadius.button};
    }
    ${darkMode ? `
      @media (prefers-color-scheme: dark) {
        :root {
          --color-background: #090d16;
          --color-text: #f8fafc;
        }
      }
    ` : ''}
  `;
  // Use React.createElement to avoid JSX in a .ts file
  return React.createElement('style', { dangerouslySetInnerHTML: { __html: cssVariables } });
};