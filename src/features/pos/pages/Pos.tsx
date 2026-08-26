import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { useTranslation } from 'react-i18next';

interface POSProduct {
  id: string; name: string; nameAr: string; price: number; sku: string;
  category: string; color: string; image: string; stock: number;
}

interface CartItem {
  id: string; name: string; nameAr: string; price: number; quantity: number; color: string; image: string;
}

const CAT_TRANSLATION_KEYS: Record<string, string> = {
  Beverages: 'cat.beverages',
  Snacks: 'cat.snacks',
  Dairy: 'cat.dairy',
  Bakery: 'cat.bakery',
  Meat: 'cat.meat',
  Produce: 'cat.produce',
  Household: 'cat.household',
};

const CATEGORIES = ['All', 'Beverages', 'Snacks', 'Dairy', 'Bakery', 'Meat', 'Produce', 'Household'];

const PRODUCTS: POSProduct[] = [
  { id: '1', name: 'Espresso', nameAr: 'إسبريسو', price: 3.50, sku: 'BEV-001', category: 'Beverages', color: '#3B1F0A', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=80', stock: 45 },
  { id: '2', name: 'Cappuccino', nameAr: 'كابتشينو', price: 4.50, sku: 'BEV-002', category: 'Beverages', color: '#6366F1', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80', stock: 36 },
  { id: '3', name: 'Green Tea', nameAr: 'شاي أخضر', price: 2.99, sku: 'BEV-003', category: 'Beverages', color: '#10B981', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', stock: 60 },
  { id: '4', name: 'Orange Juice', nameAr: 'عصير برتقال', price: 3.99, sku: 'BEV-004', category: 'Beverages', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', stock: 24 },
  { id: '5', name: 'Water Bottle', nameAr: 'زجاجة مياه', price: 1.00, sku: 'BEV-005', category: 'Beverages', color: '#0EA5E9', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&q=80', stock: 120 },
  { id: '6', name: 'Cola Can', nameAr: 'علبة كولا', price: 1.50, sku: 'BEV-006', category: 'Beverages', color: '#EF4444', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', stock: 72 },
  { id: '7', name: 'Chips Bag', nameAr: 'كيس شيبس', price: 2.99, sku: 'SNK-001', category: 'Snacks', color: '#F97316', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', stock: 40 },
  { id: '8', name: 'Chocolate Bar', nameAr: 'لوح شوكولاتة', price: 1.99, sku: 'SNK-002', category: 'Snacks', color: '#92400E', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80', stock: 55 },
  { id: '9', name: 'Trail Mix', nameAr: 'مكسرات مشكلة', price: 4.50, sku: 'SNK-003', category: 'Snacks', color: '#65A30D', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', stock: 18 },
  { id: '10', name: 'Popcorn', nameAr: 'فشار', price: 3.25, sku: 'SNK-004', category: 'Snacks', color: '#EAB308', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&q=80', stock: 32 },
  { id: '11', name: 'Whole Milk', nameAr: 'حليب كامل الدسم', price: 3.49, sku: 'DAI-001', category: 'Dairy', color: '#F8FAFC', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', stock: 30 },
  { id: '12', name: 'Greek Yogurt', nameAr: 'زبادي يوناني', price: 5.99, sku: 'DAI-002', category: 'Dairy', color: '#E11D48', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', stock: 15 },
  { id: '13', name: 'Cheddar Cheese', nameAr: 'جبنة شيدر', price: 6.99, sku: 'DAI-003', category: 'Dairy', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80', stock: 20 },
  { id: '14', name: 'Sourdough Bread', nameAr: 'خبز العجين المخمر', price: 4.99, sku: 'BAK-001', category: 'Bakery', color: '#D97706', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80', stock: 12 },
  { id: '15', name: 'Croissant', nameAr: 'كرواسون', price: 3.50, sku: 'BAK-002', category: 'Bakery', color: '#B45309', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80', stock: 18 },
  { id: '16', name: 'Chicken Breast', nameAr: 'صدر دجاج', price: 8.99, sku: 'MRT-001', category: 'Meat', color: '#DC2626', image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&q=80', stock: 8 },
  { id: '17', name: 'Apple', nameAr: 'تفاح', price: 1.29, sku: 'PRD-001', category: 'Produce', color: '#EF4444', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', stock: 80 },
  { id: '18', name: 'Banana Bunch', nameAr: 'حزمة موز', price: 1.99, sku: 'PRD-002', category: 'Produce', color: '#FBBF24', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', stock: 65 },
  { id: '19', name: 'Dish Soap', nameAr: 'صابون أطباق', price: 4.99, sku: 'HH-001', category: 'Household', color: '#0EA5E9', image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=400&q=80', stock: 40 },
  { id: '20', name: 'Paper Towels', nameAr: 'مناشف ورقية', price: 6.99, sku: 'HH-002', category: 'Household', color: '#E2E8F0', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', stock: 50 },
];

export default function Pos() {
  const {  direction, addToast } = useAppStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (selectedCategory !== 'All') result = result.filter((p) => p.category === selectedCategory);
    const q = searchQuery.toLowerCase().trim();
    if (q) result = result.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    return result;
  }, [selectedCategory, searchQuery]);

  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price * i.quantity, 0), [cart]);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const addToCart = (product: POSProduct) => {
    if (product.stock === 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, quantity: 1, color: product.color, image: product.image }];
    });
  };

  const updateQty = (item: CartItem, delta: number) => {
    const newQty = item.quantity + delta;
    if (newQty <= 0) setCart((prev) => prev.filter((i) => i.id !== item.id));
    else setCart((prev) => prev.map((i) => i.id === item.id ? { ...i, quantity: newQty } : i));
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    addToast('success', t('pos.saleCompleted', { amount: total.toFixed(2) }));
    setCart([]);
  };

  return (
    <>
    {/* Mobile cart overlay */}
    {cartOpen && (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
        <div
          onClick={() => setCartOpen(false)}
          style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }}
        />
        <div style={{
          position: 'absolute', insetInlineEnd: 0, top: 0, bottom: 0,
          width: 'min(320px, 100vw)',
          background: 'rgb(var(--bg-card))',
          borderInlineStart: '1px solid rgb(var(--border-primary))',
          display: 'flex', flexDirection: 'column',
          zIndex: 1,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid rgb(var(--border-primary))' }}>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{t('pos.cart')}</h3>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              {cart.length > 0 && (
                <button onClick={() => setCart([])} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--accent-danger))', fontSize: '0.75rem', fontWeight: 600 }}>
                  {t('pos.clearAll')}
                </button>
              )}
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: 'rgb(var(--text-secondary))', cursor: 'pointer', padding: '0.25rem' }}>✕</button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 1.25rem' }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: 'rgb(var(--text-secondary))', padding: '2rem 0' }}>{t('pos.emptyCart')}</p>
            ) : cart.map((item) => (
              <div key={item.id} style={{ padding: '0.75rem 0', borderBottom: '1px solid rgb(var(--border-primary))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '0.875rem' }}>{item.name}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>{item.quantity} × ${item.price.toFixed(2)}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button disabled={item.quantity <= 1} onClick={() => updateQty(item, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgb(var(--border-primary))', background: 'rgb(var(--bg-card))', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(var(--text-secondary))', padding: 0 }}>
                    <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                  </button>
                  <span style={{ fontSize: '0.875rem', minWidth: '20px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gradient-primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', padding: 0 }}>
                    <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </button>
                  <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} style={{ width: '24px', height: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--accent-danger))', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgb(var(--border-primary))', padding: '1rem 1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}><span style={{ color: 'rgb(var(--text-secondary))' }}>{t('pos.subtotal')}</span><span style={{ fontWeight: 700 }}>${subtotal.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}><span style={{ color: 'rgb(var(--text-secondary))' }}>{t('pos.tax')}</span><span style={{ fontWeight: 700 }}>${tax.toFixed(2)}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgb(var(--border-primary))' }}><span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{t('pos.total')}</span><span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'rgb(var(--accent-primary))' }}>${total.toFixed(2)}</span></div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={cart.length === 0} onClick={handleCheckout}>{t('pos.checkout')}</button>
          </div>
        </div>
      </div>
    )}
    <div style={{ display: 'flex', height: '100vh', background: 'rgb(var(--bg-secondary))', overflow: 'hidden' }}>
      {/* Products panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* POS Header */}
        <div style={{
          background: 'rgb(var(--bg-card))',
          borderBottom: '1px solid rgb(var(--border-primary))',
          padding: '1rem 1.25rem',
          display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap'
        }}>
          <button onClick={() => navigate('/dashboard')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--text-secondary))', display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: 'var(--font-sans)', fontSize: '0.875rem' }}>
            <svg className="icon-dir" style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'rgb(var(--text-primary))' }}>{t('pos.title')}</h1>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>{t('pos.subtitle')}</p>
          </div>
          <div style={{ flex: 1 }} />
          <button
            onClick={() => setCartOpen(true)}
            className="btn-primary"
            style={{ display: cart.length > 0 ? 'flex' : 'none', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', fontSize: '0.8125rem' }}
          >
            <span className="pos-cart-badge">{cart.length}</span>
            {t('pos.cart')}
          </button>
          <div style={{ position: 'relative', flex: '1 1 200px', maxWidth: '400px' }}>
            <svg style={{ position: 'absolute', insetInlineStart: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: 'rgb(var(--text-tertiary))' }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="input-base"
              style={{ paddingInlineStart: '2.5rem' }}
              placeholder={t('pos.searchProducts')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category tabs */}
        <div style={{ background: 'rgb(var(--bg-card))', borderBottom: '1px solid rgb(var(--border-primary))', padding: '0.75rem 1.25rem', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content' }}>
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.5rem 0.875rem',
                    borderRadius: '9999px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 500,
                    fontFamily: 'var(--font-sans)',
                    background: isActive ? 'var(--gradient-primary)' : 'rgb(var(--bg-secondary))',
                    color: isActive ? 'white' : 'rgb(var(--text-secondary))',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                  }}
                >
                  {cat === 'All' ? t('pos.allCategories') : t(CAT_TRANSLATION_KEYS[cat] ?? cat)}
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 700,
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'rgb(var(--bg-tertiary))',
                    color: isActive ? 'white' : 'rgb(var(--text-tertiary))',
                    padding: '0.1rem 0.375rem',
                    borderRadius: '9999px',
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.25rem' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'rgb(var(--text-secondary))' }}>
              {t('pos.noProductsFound')}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  style={{
                    background: 'rgb(var(--bg-card))',
                    border: '1px solid rgb(var(--border-primary))',
                    borderRadius: '1rem',
                    padding: '0',
                    cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
                    opacity: product.stock === 0 ? 0.5 : 1,
                    overflow: 'hidden',
                    textAlign: 'start',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    fontFamily: 'var(--font-sans)',
                  }}
                  onMouseEnter={(e) => { if (product.stock > 0) { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'var(--shadow-md)'; } }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'none'; (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none'; }}
                >
                  <div style={{ position: 'relative', aspectRatio: '1', background: product.color + '18', overflow: 'hidden' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    {product.stock <= 5 && product.stock > 0 && (
                      <span style={{ position: 'absolute', top: '0.5rem', insetInlineEnd: '0.5rem', background: 'rgb(var(--accent-warning))', color: 'white', fontSize: '0.625rem', fontWeight: 700, padding: '0.125rem 0.375rem', borderRadius: '9999px' }}>
                        {t('pos.lowStock')}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '0.75rem' }}>
                    <p style={{ margin: '0 0 0.25rem', fontSize: '0.8125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {direction === 'rtl' ? product.nameAr : product.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.9375rem', fontWeight: 800, color: 'rgb(var(--accent-primary))' }}>${product.price.toFixed(2)}</span>
                      <span style={{ fontSize: '0.6875rem', color: 'rgb(var(--text-tertiary))' }}>{t('pos.stock')}: {product.stock}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart - hidden on mobile, shown on desktop */}
      <div style={{
        background: 'rgb(var(--bg-card))',
        borderInlineStart: '1px solid rgb(var(--border-primary))',
        display: 'flex',
        flexDirection: 'column',
      }} className="pos-cart-desktop">
        {/* Cart header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgb(var(--border-primary))', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('pos.cart')}</h2>
            {cartCount > 0 && (
              <span style={{ background: 'var(--gradient-primary)', color: 'white', fontSize: '0.6875rem', fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: '9999px' }}>
                {cartCount}
              </span>
            )}
          </div>
          {cart.length > 0 && (
            <button
              onClick={() => setCart([])}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--accent-danger))', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              {t('pos.clearAll')}
            </button>
          )}
        </div>

        {/* Cart items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgb(var(--text-secondary))' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🛒</div>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>{t('pos.emptyCart')}</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem', borderRadius: '0.75rem',
                    background: 'rgb(var(--bg-secondary))',
                    border: '1px solid rgb(var(--border-primary))',
                  }}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '0.5rem', overflow: 'hidden', flexShrink: 0, background: item.color + '22' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 0.125rem', fontSize: '0.8125rem', fontWeight: 600, color: 'rgb(var(--text-primary))', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {direction === 'rtl' ? item.nameAr : item.name}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: 'rgb(var(--accent-primary))' }}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexShrink: 0 }}>
                    <button disabled={item.quantity <= 1} onClick={() => updateQty(item, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgb(var(--border-primary))', background: 'rgb(var(--bg-card))', cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer', opacity: item.quantity <= 1 ? 0.5 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(var(--text-secondary))' }}>
                      <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    </button>
                    <span style={{ width: '20px', textAlign: 'center', fontSize: '0.8125rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--gradient-primary)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    </button>
                    <button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} style={{ width: '24px', height: '24px', background: 'none', border: 'none', cursor: 'pointer', color: 'rgb(var(--accent-danger))', marginInlineStart: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart summary */}
        <div style={{ borderTop: '1px solid rgb(var(--border-primary))', padding: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {[
              { label: t('pos.subtotal'), value: `$${subtotal.toFixed(2)}` },
              { label: `${t('pos.tax')} (10%)`, value: `$${tax.toFixed(2)}` },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'rgb(var(--text-secondary))' }}>{row.label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid rgb(var(--border-primary))' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('pos.total')}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'rgb(var(--accent-primary))' }}>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.875rem', fontSize: '1rem', fontWeight: 700 }}
          >
            <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            {t('pos.pay')} {cart.length > 0 ? `$${total.toFixed(2)}` : ''}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
