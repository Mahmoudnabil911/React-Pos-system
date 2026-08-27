import { useState, useEffect } from "react";
import PageHeader from "../../../components/shared/PageHeader";
import DataTable from "../../../components/shared/DataTable";
import { MOCK_INVENTORY, statusBadgeClass } from "../../../utils/mockData";
import { useTranslation } from "react-i18next";
import { Modal } from "../../../components/ui/Modal";
import { useAppStore } from "../../../store/useAppStore";

export default function Inventory() {
  const { t } = useTranslation();
  const { addToast } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 400);
  }, []);

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    addToast("success", t("common.updatedSuccessfully"));
  };

  const columns = [
    {
      key: "product",
      label: t("inventory.product"),
      render: (row: (typeof MOCK_INVENTORY)[0]) => (
        <span style={{ fontWeight: 600 }}>{row.product}</span>
      ),
    },
    {
      key: "sku",
      label: t("inventory.sku"),
      render: (row: (typeof MOCK_INVENTORY)[0]) => (
        <span
          style={{
            fontFamily: "monospace",
            fontSize: "0.8rem",
            color: "rgb(var(--text-secondary))",
          }}
        >
          {row.sku}
        </span>
      ),
    },
    { key: "category", label: t("products.category") },
    {
      key: "currentStock",
      label: t("inventory.currentStock"),
      render: (row: (typeof MOCK_INVENTORY)[0]) => (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              fontWeight: 700,
              color:
                row.currentStock === 0
                  ? "rgb(var(--accent-danger))"
                  : row.currentStock <= row.minStock
                    ? "rgb(var(--accent-warning))"
                    : "rgb(var(--accent-success))",
            }}
          >
            {row.currentStock}
          </span>
          <div
            style={{
              flex: 1,
              maxWidth: "80px",
              height: "6px",
              background: "rgb(var(--bg-tertiary))",
              borderRadius: "9999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "9999px",
                background:
                  row.currentStock === 0
                    ? "rgb(var(--accent-danger))"
                    : row.currentStock <= row.minStock
                      ? "rgb(var(--accent-warning))"
                      : "rgb(var(--accent-success))",
                width: `${Math.min(100, (row.currentStock / row.maxStock) * 100)}%`,
              }}
            />
          </div>
        </div>
      ),
    },
    { key: "minStock", label: t("inventory.minLevel") },
    { key: "maxStock", label: t("inventory.maxLevel") },
    {
      key: "status",
      label: t("inventory.status"),
      render: (row: (typeof MOCK_INVENTORY)[0]) => {
        const key =
          row.status === "Good"
            ? "inventory.sufficient"
            : row.status === "Low"
              ? "inventory.lowStock"
              : "inventory.outOfStock";
        return <span className={statusBadgeClass(row.status)}>{t(key)}</span>;
      },
    },
    { key: "lastUpdated", label: t("inventory.lastUpdated") },
  ];

  return (
    <div>
      <PageHeader
        title={t("nav.inventoryItem")}
        subtitle={t("inventory.subtitle")}
        breadcrumbs={[
          { label: t("nav.dashboard"), route: "/dashboard" },
          { label: t("nav.inventoryGroup") },
          { label: t("nav.inventoryItem") },
        ]}
      >
        <button className="btn-primary" onClick={handleCreate}>
          <svg
            style={{ width: "16px", height: "16px" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          {t("inventory.adjust")}
        </button>
      </PageHeader>

      {/* Summary cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        {[
          {
            label: t("products.totalProducts"),
            value: MOCK_INVENTORY.length,
            color: "5 150 105",
          },
          {
            label: t("products.inStock"),
            value: MOCK_INVENTORY.filter((i) => i.status === "Good").length,
            color: "34 197 94",
          },
          {
            label: t("inventory.lowStock"),
            value: MOCK_INVENTORY.filter((i) => i.status === "Low").length,
            color: "245 158 11",
          },
          {
            label: t("inventory.outOfStock"),
            value: MOCK_INVENTORY.filter((i) => i.status === "Out").length,
            color: "239 68 68",
          },
        ].map((card) => (
          <div key={card.label} className="card" style={{ padding: "1.25rem" }}>
            <p
              style={{
                margin: "0 0 0.5rem",
                fontSize: "0.8125rem",
                color: "rgb(var(--text-secondary))",
              }}
            >
              {card.label}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "2rem",
                fontWeight: 800,
                color: `rgb(${card.color})`,
              }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>

      <DataTable
        columns={columns as never}
        data={MOCK_INVENTORY as never}
        isLoading={isLoading}
        searchPlaceholder={t("inventory.search")}
        pageSize={10}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("inventory.adjust")}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-primary bg-transparent text-secondary text-sm font-sans font-semibold transition-colors hover:bg-secondary"
            >
              {t("common.cancel")}
            </button>
            <button type="submit" form="inventoryForm" className="btn-primary">
              {t("common.save")}
            </button>
          </div>
        }
      >
        <form
          id="inventoryForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">
              {t("inventory.product")}
            </label>
            <input type="text" className="input-base w-full" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">
              {t("inventory.currentStock")}
            </label>
            <input type="number" className="input-base w-full" required />
          </div>
        </form>
      </Modal>
    </div>
  );
}
