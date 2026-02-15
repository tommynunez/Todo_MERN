# React + Vite Best Practices - Code Review Guide

## React Modern Patterns

### Component Design

```typescript
// ❌ Bad - Too many responsibilities
function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/user').then(/* ... */);
    fetch('/api/posts').then(/* ... */);
  }, []);
  
  return (/* complex JSX */);
}

// ✅ Good - Single Responsibility, Custom Hooks
function UserProfile() {
  const { user, isLoading: userLoading } = useUser();
  const { posts, isLoading: postsLoading } = useUserPosts(user?.id);
  
  if (userLoading || postsLoading) return <LoadingState />;
  
  return (
    <div>
      <UserHeader user={user} />
      <PostsList posts={posts} />
    </div>
  );
}
```

### Component Types

```typescript
// ✅ Functional components with proper typing
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant,
  size = 'md',
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

// ✅ Better - Use React.ComponentProps for native elements
type ButtonProps = {
  variant: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
} & React.ComponentProps<'button'>;

export const Button = ({ variant, size = 'md', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`btn btn-${variant} btn-${size} ${props.className || ''}`}
    />
  );
};
```

### Hooks Best Practices

```typescript
// ✅ Custom hooks for reusable logic
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ✅ Hook with cleanup
function useWebSocket(url: string) {
  const [data, setData] = useState<unknown>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => setIsConnected(true);
    ws.onmessage = (event) => setData(JSON.parse(event.data));
    ws.onclose = () => setIsConnected(false);

    return () => {
      ws.close();
    };
  }, [url]);

  return { data, isConnected };
}

// ✅ Async effects with abort controller
function useAsyncData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal,
        });
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, error, isLoading };
}
```

### Context API Patterns

```typescript
// ✅ Proper context setup with TypeScript
interface ThemeContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook for consuming context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Performance Optimization

```typescript
// ✅ React.memo for expensive components
interface ListItemProps {
  item: Item;
  onSelect: (id: string) => void;
}

export const ListItem = React.memo<ListItemProps>(
  ({ item, onSelect }) => {
    return (
      <div onClick={() => onSelect(item.id)}>
        {item.name}
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison
    return prevProps.item.id === nextProps.item.id;
  }
);

// ✅ Virtual scrolling for large lists
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }: { items: Item[] }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });

  return (
    <div ref={parentRef} style={{ height: '400px', overflow: 'auto' }}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            <ListItem item={items[virtualItem.index]} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Vite Configuration Best Practices

### Optimal Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
    },
  },
  
  // Build optimizations
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          // Split other large dependencies
        },
      },
    },
    // Source maps for production debugging
    sourcemap: true,
    // Modern build target
    target: 'esnext',
    // Minimize output
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  
  // Development server
  server: {
    port: 3000,
    strictPort: true,
    // CORS for API calls
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  
  // Preview server (production build testing)
  preview: {
    port: 4173,
  },
});
```

### Code Splitting Strategies

```typescript
// ✅ Route-based code splitting
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// ✅ Component-level code splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>Show Chart</button>
      {showChart && (
        <Suspense fallback={<div>Loading chart...</div>}>
          <HeavyChart />
        </Suspense>
      )}
    </div>
  );
}
```

### Environment Variables

```typescript
// ✅ Typed environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_API_KEY: string;
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Usage
const apiUrl = import.meta.env.VITE_API_URL;

// ✅ Environment validation on startup
function validateEnv() {
  const required = ['VITE_API_URL', 'VITE_API_KEY'] as const;
  
  for (const key of required) {
    if (!import.meta.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
}
```

## React Query / TanStack Query Patterns

```typescript
// ✅ Query hooks with proper typing
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface User {
  id: string;
  name: string;
  email: string;
}

// Query hook
function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user');
      return response.json() as Promise<User>;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Mutation hook
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (user: Partial<User> & { id: string }) => {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
      if (!response.ok) throw new Error('Failed to update user');
      return response.json() as Promise<User>;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user', data.id] });
    },
  });
}
```

## Review Checklist - React/Vite

- [ ] Components follow single responsibility principle
- [ ] Props are properly typed with interfaces
- [ ] Custom hooks for reusable logic
- [ ] Proper dependency arrays in useEffect/useCallback/useMemo
- [ ] No inline object/array literals in dependencies
- [ ] Cleanup functions in effects when needed
- [ ] Code splitting at route level minimum
- [ ] Lazy loading for heavy components
- [ ] Environment variables properly typed
- [ ] Build output optimized (check bundle size)
- [ ] No unnecessary re-renders (use React DevTools Profiler)
- [ ] Accessibility attributes present (ARIA labels, roles)
- [ ] Error boundaries for error handling
- [ ] Loading and error states handled
- [ ] Keys on mapped elements (stable, unique)
