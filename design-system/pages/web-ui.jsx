// Design System · Web UI Kit page — renders the full web app shell inline.
// Pulls Sidebar / Topbar / page components from the web_app kit JSX files.

const WebUI = () => {
  const [page, setPage] = React.useState('dashboard');
  const [tx, setTx] = React.useState(null);

  React.useEffect(() => {
    requestAnimationFrame(() => { if (window.lucide) window.lucide.createIcons(); });
  }, [page]);

  const selectTx = (t) => { setTx(t); setPage('detail'); };

  return (
    <div className="webui-shell">
      <div className="app" data-screen-label={page}>
        <Sidebar current={page === 'detail' ? 'payouts' : page} onNav={(k) => { setPage(k); setTx(null); }} />
        <div className="main">
          <Topbar />
          {page === 'dashboard'   && <Dashboard onSelectTx={selectTx} onGoToPayouts={() => setPage('payouts')} />}
          {page === 'payouts'     && <Payouts onSelectTx={selectTx} />}
          {page === 'detail'      && <PayoutDetail tx={tx} onBack={() => setPage('payouts')} />}
          {page === 'collections' && <Collections onSelectTx={selectTx} />}
          {page === 'recipients'  && <Recipients />}
          {page === 'team'        && <Team />}
          {page === 'settings'    && <Settings />}
          {page === 'balances'    && (
            <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div style={{ textAlign: 'center', color: 'var(--fg-3)' }}>
                <i data-lucide="wallet" style={{ width: 32, height: 32, color: 'var(--fg-4)' }}></i>
                <div style={{ marginTop: 12, fontSize: 14 }}>Balances page — to be built.</div>
              </div>
            </div>
          )}
          {page === 'developers' && (
            <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}>
              <div style={{ textAlign: 'center', color: 'var(--fg-3)' }}>
                <i data-lucide="code-2" style={{ width: 32, height: 32, color: 'var(--fg-4)' }}></i>
                <div style={{ marginTop: 12, fontSize: 14 }}>Developers / API keys page — to be built.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

window.WebUI = WebUI;
