import { create } from 'zustand';
import i18n from '../i18n';

export type Theme = 'light' | 'dark';
export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  createdAt: string;
}

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface AppState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // i18n
  locale: Locale;
  direction: Direction;
  setLocale: (locale: Locale) => void;

  // Auth
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  authReady: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadAuthFromStorage: () => void;

  // Sidebar
  sidebarCollapsed: boolean;
  sidebarMobileOpen: boolean;
  toggleSidebar: () => void;
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;

  // Toast
  toasts: Toast[];
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
}

const MOCK_USER: User = {
  id: 'usr_001',
  name: 'Admin User',
  email: 'admin@pos.com',
  role: 'admin',
  createdAt: '2024-01-01T00:00:00Z',
};

const MOCK_TOKEN = 'mock_jwt_token_eyJhbGciOiJIUzI1NiJ9';

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

function applyDirection(direction: Direction) {
  document.documentElement.setAttribute('dir', direction);
  document.documentElement.setAttribute('lang', direction === 'rtl' ? 'ar' : 'en');
}

const initialTheme = (localStorage.getItem('theme') as Theme) || 'light';
const initialLocale = (localStorage.getItem('locale') as Locale) || 'en';
const initialDirection: Direction = initialLocale === 'ar' ? 'rtl' : 'ltr';

// Apply initial styling to DOM immediately to prevent flash
if (typeof window !== 'undefined') {
  applyTheme(initialTheme);
  applyDirection(initialDirection);
}

export const useAppStore = create<AppState>((set, get) => ({
  // ─── Theme ───────────────────────────────────────────────
  theme: initialTheme,
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: next });
    localStorage.setItem('theme', next);
    applyTheme(next);
  },
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  },

  // ─── i18n ─────────────────────────────────────────────────
  locale: initialLocale,
  direction: initialDirection,
  setLocale: (locale) => {
    const direction: Direction = locale === 'ar' ? 'rtl' : 'ltr';
    set({ locale, direction });
    localStorage.setItem('locale', locale);
    applyDirection(direction);
    i18n.changeLanguage(locale);
  },

  // ─── Auth ─────────────────────────────────────────────────
  currentUser: null,
  token: null,
  isAuthenticated: false,
  authReady: false,
  login: async (_email, _password, rememberMe = false) => {
    await new Promise((r) => setTimeout(r, 600));
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('auth_token', MOCK_TOKEN);
    storage.setItem('auth_user', JSON.stringify(MOCK_USER));
    set({ currentUser: MOCK_USER, token: MOCK_TOKEN, isAuthenticated: true });
  },
  register: async (name, email, _password) => {
    await new Promise((r) => setTimeout(r, 800));
    const newUser: User = { id: 'usr_' + Date.now(), name, email, role: 'admin', createdAt: new Date().toISOString() };
    sessionStorage.setItem('auth_token', MOCK_TOKEN);
    sessionStorage.setItem('auth_user', JSON.stringify(newUser));
    set({ currentUser: newUser, token: MOCK_TOKEN, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_user');
    set({ currentUser: null, token: null, isAuthenticated: false });
  },
  loadAuthFromStorage: () => {
    const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user') || sessionStorage.getItem('auth_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr) as User;
        set({ currentUser: user, token, isAuthenticated: true, authReady: true });
      } catch {
        set({ authReady: true });
      }
    } else {
      set({ authReady: true });
    }
  },

  // ─── Sidebar ──────────────────────────────────────────────
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  openMobileSidebar: () => set({ sidebarMobileOpen: true }),
  closeMobileSidebar: () => set({ sidebarMobileOpen: false }),

  // ─── Toast ────────────────────────────────────────────────
  toasts: [],
  addToast: (type, message) => {
    const id = Date.now().toString();
    set((s) => ({ toasts: [...s.toasts, { id, type, message }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 4000);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
