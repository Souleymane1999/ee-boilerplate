// Shared UI primitives for the iFutur web app kit
const Icon = ({ name, ...p }) => <i data-lucide={name} {...p}></i>;

const Btn = ({ variant = 'primary', icon, children, ...p }) => (
  <button className={`btn btn-${variant}`} {...p}>
    {icon && <Icon name={icon} />}
    {children}
  </button>
);

const Badge = ({ tone = 'neutral', dot, children }) => (
  <span className={`badge badge-${tone}`}>
    {dot && <span className="dot" style={{ background: dot }}></span>}
    {children}
  </span>
);

// Status helper for transactions
const TxStatus = ({ status }) => {
  const map = {
    paid:      { tone: 'success', dot: '#2F8F4F', label: 'Paid' },
    pending:   { tone: 'warning', dot: '#C2841A', label: 'Pending' },
    scheduled: { tone: 'info',    dot: '#2C6DB5', label: 'Scheduled' },
    failed:    { tone: 'danger',  dot: '#C8362D', label: 'Failed' },
    draft:     { tone: 'neutral', dot: null,      label: 'Draft' },
  };
  const m = map[status] || map.draft;
  return <Badge tone={m.tone} dot={m.dot}>{m.label}</Badge>;
};

const Avatar = ({ name, tone = 'brand' }) => {
  const toneMap = {
    brand:   { bg:'#F2F6D6', fg:'#5E6A1A' },
    success: { bg:'#E6F4EA', fg:'#1F6E3A' },
    warning: { bg:'#FCF3DD', fg:'#8E5F0F' },
    danger:  { bg:'#FBE7E5', fg:'#9F271E' },
    info:    { bg:'#E5EFF9', fg:'#1E4F86' },
    neutral: { bg:'#ECECE7', fg:'#525249' },
  }[tone] || { bg:'#F2F6D6', fg:'#5E6A1A' };
  const initials = name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  return <span className="row-avatar" style={{ background: toneMap.bg, color: toneMap.fg }}>{initials}</span>;
};

const Money = ({ amount, currency = 'CFA' }) => {
  // West African CFA: "." as thousand separator, no decimals, suffixed unit
  const whole = Math.round(Math.abs(amount));
  const formatted = whole.toLocaleString('en-US').replace(/,/g, '.');
  return <span className="if-num-tabular">{amount < 0 ? '−' : ''}{formatted} {currency}</span>;
};

// Sidebar nav
const Sidebar = ({ current, onNav }) => {
  const items = [
    { key: 'dashboard', icon: 'home', label: 'Dashboard' },
    { key: 'payouts',   icon: 'arrow-up-right', label: 'Payouts', badge: '3' },
    { key: 'collections', icon: 'arrow-down-left', label: 'Collections' },
    { key: 'recipients', icon: 'users', label: 'Recipients' },
    { key: 'balances',  icon: 'wallet', label: 'Balances' },
  ];
  const settings = [
    { key: 'team',     icon: 'user-cog', label: 'Team' },
    { key: 'settings', icon: 'settings', label: 'Settings' },
    { key: 'developers', icon: 'code-2', label: 'Developers' },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="assets/logo-on-light.png" alt="iFutur" />
      </div>
      <div className="sidebar-group">Money</div>
      {items.map(it => (
        <div key={it.key} className={`nav-item ${current === it.key ? 'active' : ''}`} onClick={() => onNav(it.key)}>
          <Icon name={it.icon} />
          <span>{it.label}</span>
          {it.badge && <span className="badge-dot">{it.badge}</span>}
        </div>
      ))}
      <div className="sidebar-group">Workspace</div>
      {settings.map(it => (
        <div key={it.key} className={`nav-item ${current === it.key ? 'active' : ''}`} onClick={() => onNav(it.key)}>
          <Icon name={it.icon} />
          <span>{it.label}</span>
        </div>
      ))}
      <div style={{ marginTop: 'auto', padding: 12, borderTop: '1px solid var(--border-subtle)', display:'flex', gap:10, alignItems:'center' }}>
        <span className="avatar">JA</span>
        <div style={{ display:'flex', flexDirection:'column', fontSize: 12, lineHeight: 1.3 }}>
          <span style={{ color:'var(--fg-1)', fontWeight: 600 }}>Jordan Avery</span>
          <span style={{ color:'var(--fg-3)' }}>Northwind Trading</span>
        </div>
      </div>
    </aside>
  );
};

// Topbar
const Topbar = ({ children }) => (
  <header className="topbar">
    <div className="topbar-search">
      <Icon name="search" />
      <input placeholder="Search transactions, recipients, references…" />
    </div>
    <div className="topbar-actions">
      {children}
      <button className="icon-btn"><Icon name="bell" /></button>
      <button className="icon-btn"><Icon name="circle-help" /></button>
      <span className="avatar">JA</span>
    </div>
  </header>
);

const Kpi = ({ label, value, deltaPct, direction = 'up' }) => (
  <div className="kpi">
    <div className="kpi-label">{label}</div>
    <div className="kpi-value">{value}</div>
    <div className={`kpi-delta ${direction}`} style={{ whiteSpace:'nowrap' }}>
      <span>{deltaPct}</span>
      <span className="sub">vs. prev. 30d</span>
    </div>
  </div>
);

Object.assign(window, { Icon, Btn, Badge, TxStatus, Avatar, Money, Sidebar, Topbar, Kpi });
