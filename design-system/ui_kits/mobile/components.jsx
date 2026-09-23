// Mobile UI kit — shared mini-components
const M_Icon = ({ name, ...p }) => <i data-lucide={name} {...p}></i>;

const StatusBar = ({ onDark }) => (
  <div className={`status-bar ${onDark ? 'on-dark' : ''}`}>
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>9:41</span>
    <div className="notch"></div>
    <div className="icons">
      <M_Icon name="signal" /><M_Icon name="wifi" /><M_Icon name="battery" />
    </div>
  </div>
);

// CFA currency formatting — "." thousands separator, no decimals, suffix
const fmtCFA = (n) => {
  const whole = Math.round(Math.abs(n));
  return whole.toLocaleString('en-US').replace(/,/g, '.');
};
const Money = ({ amount, suffix = 'CFA', signed = false, className = '' }) => {
  const sign = amount < 0 ? '−' : (signed && amount > 0 ? '+' : '');
  return <span className={`if-num-tabular ${className}`}>{sign}{fmtCFA(amount)} {suffix}</span>;
};

// Reusable page nav header for sub-screens
const MNav = ({ title, onBack, right }) => (
  <div className="m-nav">
    <button className="btn" onClick={onBack}><M_Icon name="chevron-left" /></button>
    <div className="title">{title}</div>
    {right || <div style={{ width: 38 }}></div>}
  </div>
);

// Bottom tab bar — French labels, 4 tabs (Accueil / Historique / Envoyer / Plus)
const TabBar = ({ current, onNav }) => (
  <div className="tabbar">
    <div className={`tab ${current === 'home' ? 'active' : ''}`} onClick={() => onNav('home')}>
      <M_Icon name="home" /><span>Accueil</span>
    </div>
    <div className={`tab ${current === 'activity' ? 'active' : ''}`} onClick={() => onNav('activity')}>
      <M_Icon name="list" /><span>Historique</span>
    </div>
    <div className="tab send" onClick={() => onNav('send')}>
      <M_Icon name="arrow-up-right" /><span>Envoyer</span>
    </div>
    <div className={`tab ${current === 'cards' ? 'active' : ''}`} onClick={() => onNav('cards')}>
      <M_Icon name="credit-card" /><span>Carte</span>
    </div>
    <div className={`tab ${current === 'more' ? 'active' : ''}`} onClick={() => onNav('more')}>
      <M_Icon name="circle-user" /><span>Plus</span>
    </div>
  </div>
);

const M_TxRow = ({ tx, onClick }) => {
  const toneMap = {
    brand:   { bg:'#F2F6D6', fg:'#5E6A1A' },
    success: { bg:'#E6F4EA', fg:'#1F6E3A' },
    warning: { bg:'#FCF3DD', fg:'#8E5F0F' },
    info:    { bg:'#E5EFF9', fg:'#1E4F86' },
    danger:  { bg:'#FBE7E5', fg:'#9F271E' },
  }[tx.tone] || { bg:'#ECECE7', fg:'#525249' };
  const initials = tx.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase();
  return (
    <div className="tx-row" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="tx-avatar" style={{ background: toneMap.bg, color: toneMap.fg }}>{initials}</div>
      <div>
        <div className="tx-name">{tx.name}</div>
        <div className="tx-meta">{tx.subtitle || tx.when}</div>
      </div>
      <div>
        <div className={`tx-amount ${tx.amount > 0 ? 'pos' : ''}`}>
          {tx.amount > 0 ? '+' : '−'}{fmtCFA(tx.amount)} CFA
        </div>
        <div className="tx-status">{tx.statusLabel || tx.method || ''}</div>
      </div>
    </div>
  );
};

Object.assign(window, { M_Icon, StatusBar, TabBar, M_TxRow, MNav, Money, fmtCFA });
