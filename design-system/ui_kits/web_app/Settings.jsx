// Settings — workspace, business info, notifications, security
const Section = ({ title, sub, children, action }) => (
  <div className="card-surf" style={{ marginBottom: 20 }}>
    <div style={{ display:'flex', alignItems:'center', padding:'18px 24px', borderBottom:'1px solid var(--border-subtle)' }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 600, color:'var(--fg-1)' }}>{title}</div>
        {sub && <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 2 }}>{sub}</div>}
      </div>
      {action && <div style={{ marginLeft:'auto' }}>{action}</div>}
    </div>
    <div style={{ padding: 24 }}>{children}</div>
  </div>
);

const SettingRow = ({ label, hint, control, divider = true }) => (
  <div style={{ display:'grid', gridTemplateColumns:'260px 1fr', gap: 32, padding:'16px 0', borderBottom: divider ? '1px dashed var(--border-subtle)' : 'none', alignItems:'flex-start' }}>
    <div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color:'var(--fg-1)' }}>{label}</div>
      {hint && <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 4, lineHeight: 1.5 }}>{hint}</div>}
    </div>
    <div>{control}</div>
  </div>
);

const Field = ({ value, prefix, suffix, type = 'text' }) => (
  prefix ? (
    <div className="input-prefix" style={{ maxWidth: 360 }}>
      <span>{prefix}</span><input defaultValue={value} type={type} />
    </div>
  ) : (
    <input className="input" defaultValue={value} type={type} style={{ width: '100%', maxWidth: 360 }} />
  )
);

const Toggle = ({ on }) => (
  <button style={{
    width: 38, height: 22, borderRadius: 999, padding: 2, border: '1px solid ' + (on ? 'var(--brand-lime-600)' : 'var(--border-default)'),
    background: on ? 'var(--brand-lime)' : 'var(--neutral-100)',
    display:'flex', alignItems:'center', cursor:'pointer', transition:'all 160ms', justifyContent: on ? 'flex-end' : 'flex-start'
  }}>
    <span style={{ width: 16, height: 16, borderRadius:'50%', background:'#fff', boxShadow:'0 1px 2px rgba(0,0,0,0.15)' }}></span>
  </button>
);

const Settings = () => {
  const [tab, setTab] = React.useState('workspace');
  React.useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

  const tabs = [
    { key:'workspace', label:'Workspace', icon:'building-2' },
    { key:'business',  label:'Business',  icon:'briefcase' },
    { key:'notify',    label:'Notifications', icon:'bell' },
    { key:'security',  label:'Security',  icon:'shield' },
    { key:'billing',   label:'Billing',   icon:'credit-card' },
  ];

  return (
    <div className="page">
      <div className="page-header" style={{ marginBottom: 8 }}>
        <div>
          <h1 className="page-title">Settings</h1>
          <div className="page-sub">Workspace preferences, business profile, security and billing.</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, borderBottom:'1px solid var(--border-subtle)', marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            display:'inline-flex', alignItems:'center', gap:8, background:'transparent', border:0, cursor:'pointer',
            padding:'12px 14px', fontFamily:'inherit', fontSize: 13.5, fontWeight: 600,
            color: tab === t.key ? 'var(--fg-1)' : 'var(--fg-3)',
            borderBottom: tab === t.key ? '2px solid var(--brand-lime)' : '2px solid transparent',
            marginBottom: -1
          }}>
            <i data-lucide={t.icon} style={{ width: 15, height: 15 }}></i>{t.label}
          </button>
        ))}
      </div>

      {tab === 'workspace' && (
        <>
          <Section title="Workspace" sub="How your workspace appears across iFutur." action={<Btn variant="primary"><span style={{ whiteSpace:'nowrap' }}>Save changes</span></Btn>}>
            <SettingRow
              label="Workspace name"
              hint="Shown in the sidebar and on receipts."
              control={<Field value="Northwind Trading" />}
            />
            <SettingRow
              label="Workspace logo"
              hint="PNG or SVG, max 2MB. Displayed on customer invoices."
              control={
                <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 10, background:'var(--brand-ink)', display:'flex', alignItems:'center', justifyContent:'center', color: 'var(--brand-lime)', fontWeight: 800, fontSize: 22 }}>N</div>
                  <Btn variant="secondary" icon="upload"><span style={{ whiteSpace:'nowrap' }}>Upload</span></Btn>
                  <Btn variant="ghost"><span style={{ whiteSpace:'nowrap', color:'#9F271E' }}>Remove</span></Btn>
                </div>
              }
            />
            <SettingRow
              label="Default currency"
              hint="New payouts and invoices default to this currency."
              control={
                <select className="input" defaultValue="XOF" style={{ maxWidth: 240 }}>
                  <option value="XOF">XOF — Franc CFA (BCEAO)</option><option value="XAF">XAF — Franc CFA (BEAC)</option><option value="EUR">EUR — Euro</option><option value="USD">USD — US Dollar</option>
                </select>
              }
            />
            <SettingRow
              label="Timezone"
              hint="Used for activity timestamps and scheduled transfers."
              divider={false}
              control={
                <select className="input" defaultValue="ET" style={{ maxWidth: 280 }}>
                  <option>(GMT−05:00) Eastern Time — New York</option><option>(GMT−08:00) Pacific Time — Los Angeles</option><option>(GMT+00:00) UTC</option>
                </select>
              }
            />
          </Section>

          <Section title="Danger zone" sub="Irreversible actions.">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '14px 0' }}>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color:'var(--fg-1)' }}>Close workspace</div>
                <div style={{ fontSize: 12, color:'var(--fg-3)', marginTop: 4 }}>Permanently close Northwind Trading. Balances must be 0 CFA and all payouts settled.</div>
              </div>
              <Btn variant="secondary" style={{ color:'#9F271E', borderColor:'#EFBEB9' }}><span style={{ whiteSpace:'nowrap' }}>Close workspace</span></Btn>
            </div>
          </Section>
        </>
      )}

      {tab === 'business' && (
        <Section title="Business profile" sub="Used for KYB, compliance, and invoices.">
          <SettingRow label="Legal entity" hint="As registered with your local authority." control={<Field value="Northwind Trading Co., LLC" />} />
          <SettingRow label="Tax ID (EIN)" control={<Field value="83-2810490" />} />
          <SettingRow label="Industry" control={<select className="input" defaultValue="Retail" style={{ maxWidth: 280 }}><option>Retail</option><option>Software / SaaS</option><option>Logistics</option><option>Professional services</option></select>} />
          <SettingRow label="Registered address" hint="Must match what's on your bank statements." divider={false} control={
            <div style={{ display:'flex', flexDirection:'column', gap:10, maxWidth: 360 }}>
              <input className="input" defaultValue="1224 Linden Ave, Suite 400" />
              <div style={{ display:'flex', gap:10 }}>
                <input className="input" defaultValue="Brooklyn" style={{ flex: 2 }} />
                <input className="input" defaultValue="NY 11215" style={{ flex: 1 }} />
              </div>
            </div>
          } />
        </Section>
      )}

      {tab === 'notify' && (
        <Section title="Notifications" sub="Choose what reaches your inbox.">
          <SettingRow label="Payout sent" hint="When a payout is initiated from your workspace." control={<Toggle on />} />
          <SettingRow label="Payout settled" hint="When funds land in the recipient's account." control={<Toggle on />} />
          <SettingRow label="Payout failed" hint="When a transfer can't be completed and requires action." control={<Toggle on />} />
          <SettingRow label="Invoice paid" hint="When a customer pays an invoice." control={<Toggle on />} />
          <SettingRow label="Low balance" hint="When your available balance drops below 25.000 CFA." divider={false} control={<Toggle />} />
        </Section>
      )}

      {tab === 'security' && (
        <>
          <Section title="Authentication" sub="Protect your iFutur account.">
            <SettingRow label="Two-factor authentication" hint="Required for all owners and admins." control={<span className="badge badge-success"><span className="dot" style={{ background:'#2F8F4F' }}></span>Enabled · Authenticator app</span>} />
            <SettingRow label="Passkeys" hint="Sign in with Face ID, Touch ID, or a security key." control={<Btn variant="secondary"><span style={{ whiteSpace:'nowrap' }}>Add passkey</span></Btn>} />
            <SettingRow label="Session timeout" hint="Automatically sign out after inactivity." divider={false} control={<select className="input" defaultValue="30 min" style={{ maxWidth: 200 }}><option>15 min</option><option>30 min</option><option>1 hour</option><option>4 hours</option></select>} />
          </Section>
          <Section title="Active sessions" sub="Devices currently signed in.">
            {[
              { device:'MacBook Pro · Chrome', loc:'Brooklyn, NY · Current', current:true },
              { device:'iPhone 15 · iFutur app', loc:'Brooklyn, NY · 2h ago' },
              { device:'Windows · Edge', loc:'Newark, NJ · 3 days ago' },
            ].map((s, i, arr) => (
              <div key={i} style={{ display:'flex', alignItems:'center', padding:'12px 0', borderBottom: i === arr.length - 1 ? 'none' : '1px dashed var(--border-subtle)' }}>
                <i data-lucide={s.device.includes('iPhone') ? 'smartphone' : 'monitor'} style={{ width:18, height:18, color:'var(--fg-3)', marginRight: 14 }}></i>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize: 13.5, color:'var(--fg-1)', fontWeight: 600 }}>{s.device}</div>
                  <div style={{ fontSize: 12, color:'var(--fg-3)' }}>{s.loc}</div>
                </div>
                {s.current ? <span className="badge badge-brand">This device</span> : <Btn variant="ghost"><span style={{ whiteSpace:'nowrap', color:'#9F271E' }}>Revoke</span></Btn>}
              </div>
            ))}
          </Section>
        </>
      )}

      {tab === 'billing' && (
        <Section title="Plan & billing" sub="Manage your iFutur subscription.">
          <div style={{ padding: 20, background: 'var(--brand-ink)', color:'#F4F4F1', borderRadius: 12, marginBottom: 20 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--brand-lime)', textTransform:'uppercase', letterSpacing:'0.12em', fontWeight: 600 }}>Current plan</div>
                <div style={{ fontSize: 24, fontWeight: 700, marginTop: 6 }}>Business</div>
                <div style={{ fontSize: 13, color:'#C5C5BC', marginTop: 4 }}>89.400 CFA / month · renews Jan 12, 2027</div>
              </div>
              <Btn variant="secondary" style={{ background:'transparent', color:'var(--brand-lime)', borderColor:'rgba(187,203,68,0.4)' }}><span style={{ whiteSpace:'nowrap' }}>Upgrade plan</span></Btn>
            </div>
          </div>
          <SettingRow label="Payment method" hint="Used for subscription and fee invoices." control={<div style={{ display:'flex', alignItems:'center', gap:12 }}><div style={{ width: 36, height: 24, borderRadius: 4, background:'linear-gradient(135deg,#1A1F71,#2C6DB5)' }}></div><span style={{ fontFamily:'var(--font-mono)', fontSize:13 }}>VISA •••• 4421</span><Btn variant="ghost"><span style={{ whiteSpace:'nowrap' }}>Update</span></Btn></div>} />
          <SettingRow label="Billing email" control={<Field value="finance@northwind.co" />} />
          <SettingRow label="Tax / VAT ID" hint="Added to invoices for jurisdictions that require it." divider={false} control={<Field value="—" />} />
        </Section>
      )}
    </div>
  );
};

window.Settings = Settings;
