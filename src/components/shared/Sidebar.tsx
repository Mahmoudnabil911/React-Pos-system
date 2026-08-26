import { NavLink } from "react-router-dom";
import { useAppStore } from "../../store/useAppStore";
import { useTranslation } from "react-i18next";

interface NavItem {
  labelKey: string;
  label: string;
  route: string;
  icon: string;
}

interface NavGroup {
  titleKey: string;
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    titleKey: "nav.main",
    title: "Main",
    items: [
      {
        label: "Dashboard",
        labelKey: "nav.dashboard",
        route: "/dashboard",
        icon: "dashboard",
      },
      { label: "POS", labelKey: "nav.pos", route: "/pos", icon: "pos" },
    ],
  },
  {
    titleKey: "nav.commerce",
    title: "Commerce",
    items: [
      { label: "Sales", labelKey: "nav.sales", route: "/sales", icon: "sales" },
      {
        label: "Purchases",
        labelKey: "nav.purchases",
        route: "/purchases",
        icon: "purchases",
      },
      {
        label: "Invoices",
        labelKey: "nav.invoices",
        route: "/invoices",
        icon: "invoices",
      },
    ],
  },
  {
    titleKey: "nav.inventoryGroup",
    title: "Inventory",
    items: [
      {
        label: "Products",
        labelKey: "nav.products",
        route: "/products",
        icon: "products",
      },
      {
        label: "Categories",
        labelKey: "nav.categories",
        route: "/categories",
        icon: "categories",
      },
      {
        label: "Inventory",
        labelKey: "nav.inventoryItem",
        route: "/inventory",
        icon: "inventory",
      },
    ],
  },
  {
    titleKey: "nav.people",
    title: "People",
    items: [
      {
        label: "Customers",
        labelKey: "nav.customers",
        route: "/customers",
        icon: "customers",
      },
      {
        label: "Suppliers",
        labelKey: "nav.suppliers",
        route: "/suppliers",
        icon: "suppliers",
      },
      {
        label: "Employees",
        labelKey: "nav.employees",
        route: "/employees",
        icon: "employees",
      },
    ],
  },
  {
    titleKey: "nav.finance",
    title: "Finance",
    items: [
      {
        label: "Expenses",
        labelKey: "nav.expenses",
        route: "/expenses",
        icon: "expenses",
      },
      {
        label: "Reports",
        labelKey: "nav.reports",
        route: "/reports",
        icon: "reports",
      },
    ],
  },
  {
    titleKey: "nav.system",
    title: "System",
    items: [
      {
        label: "Notifications",
        labelKey: "nav.notifications",
        route: "/notifications",
        icon: "notifications",
      },
      {
        label: "Settings",
        labelKey: "nav.settings",
        route: "/settings",
        icon: "settings",
      },
    ],
  },
];

const icons: Record<string, string> = {
  dashboard:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
  pos: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
  sales:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
  purchases:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>',
  invoices:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/></svg>',
  products:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  categories:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>',
  inventory:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"/></svg>',
  customers:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  suppliers:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
  employees:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  expenses:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
  reports:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  notifications:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
  settings:
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
};

function NavIcon({ iconKey }: { iconKey: string }) {
  return (
    <span
      style={{
        width: "18px",
        height: "18px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      dangerouslySetInnerHTML={{ __html: icons[iconKey] ?? "" }}
    />
  );
}

export default function Sidebar() {
  const {
    sidebarCollapsed,
    toggleSidebar,
    sidebarMobileOpen,
    closeMobileSidebar,
    direction,
  } = useAppStore();
  const { t } = useTranslation();

  const width = sidebarCollapsed
    ? "var(--sidebar-collapsed-width)"
    : "var(--sidebar-width)";

  return (
    <aside
      className={sidebarMobileOpen ? "" : "desktop-only"}
      style={{
        width,
        minWidth: width,
        height: "100vh",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "column",
        background: "rgb(var(--bg-card))",
        borderInlineEnd: "1px solid rgb(var(--border-primary))",
        transition: "width 0.3s ease, min-width 0.3s ease",
        overflowX: "hidden",
        overflowY: "auto",
        zIndex: 30,
        // Mobile
        ...(sidebarMobileOpen
          ? {
              position: "fixed" as const,
              insetInlineStart: 0,
              top: 0,
              height: "100vh",
              zIndex: 50,
              boxShadow: "var(--shadow-2xl)",
              width: "var(--sidebar-width)",
              minWidth: "var(--sidebar-width)",
            }
          : {}),
      }}
    >
      {/* Brand */}
      <div
        style={{
          height: "var(--header-height)",
          display: "flex",
          alignItems: "center",
          padding: sidebarCollapsed ? "0 0.875rem" : "0 1.25rem",
          gap: "0.75rem",
          borderBottom: "1px solid rgb(var(--border-primary))",
          flexShrink: 0,
          justifyContent: sidebarCollapsed ? "center" : "flex-start",
        }}
      >
        {/* Logo icon */}
        <div
          style={{
            width: "36px",
            height: "36px",
            minWidth: "36px",
            background: "var(--gradient-primary)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgb(99 102 241 / 0.35)",
          }}
        >
          <svg
            style={{ width: "20px", height: "20px", color: "white" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        {!sidebarCollapsed && (
          <div style={{ overflow: "hidden", flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: "0.9375rem",
                fontWeight: 800,
                color: "rgb(var(--text-primary))",
                whiteSpace: "nowrap",
              }}
            >
              {t("sidebar.brand")}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.6875rem",
                color: "rgb(var(--text-tertiary))",
                whiteSpace: "nowrap",
              }}
            >
              {t("sidebar.subtitle")}
            </p>
          </div>
        )}
        {sidebarMobileOpen && (
          <button
            onClick={closeMobileSidebar}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "rgb(var(--text-secondary))",
              padding: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{ width: "20px", height: "20px" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Nav groups */}
      <nav
        style={{
          flex: 1,
          padding: "0.75rem 0.75rem",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {navGroups.map((group) => (
          <div key={group.titleKey} style={{ marginBottom: "0.25rem" }}>
            {!sidebarCollapsed && (
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "rgb(var(--text-tertiary))",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0.625rem 0.5rem 0.375rem",
                  margin: 0,
                }}
              >
                {t(group.titleKey)}
              </p>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.125rem",
              }}
            >
              {group.items.map((item) => (
                <NavLink
                  key={item.route}
                  to={item.route}
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}${sidebarCollapsed ? " collapsed" : ""}`
                  }
                  title={sidebarCollapsed ? t(item.labelKey) : undefined}
                  onClick={() => {
                    if (sidebarMobileOpen) closeMobileSidebar();
                  }}
                >
                  <NavIcon iconKey={item.icon} />
                  {!sidebarCollapsed && (
                    <span
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {t(item.labelKey)}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse button */}
      <div
        className="hide-on-mobile"
        style={{
          padding: "0.75rem",
          borderTop: "1px solid rgb(var(--border-primary))",
          flexShrink: 0,
        }}
      >
        <button
          onClick={toggleSidebar}
          className="nav-item"
          style={{
            width: "100%",
            justifyContent: sidebarCollapsed ? "center" : "flex-start",
          }}
          title={t("sidebar.collapse")}
        >
          <svg
            style={{
              width: "18px",
              height: "18px",
              flexShrink: 0,
              transition: "transform 0.3s",
              transform: sidebarCollapsed
                ? direction === "rtl"
                  ? "none"
                  : "rotate(180deg)"
                : direction === "rtl"
                ? "rotate(180deg)"
                : "none",
            }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          {/* {!sidebarCollapsed && <span style={{ whiteSpace: 'nowrap' }}>{t('sidebar.collapse')}</span>} */}
        </button>
      </div>
    </aside>
  );
}
