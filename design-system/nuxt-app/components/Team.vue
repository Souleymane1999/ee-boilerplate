<script setup>
// Ported from web_app/Team.jsx `Team`.
const MEMBERS = [
  { id: 'm1', name: 'Jordan Avery',  email: 'jordan@northwind.co',  role: 'Owner',       tone: 'brand',   added: 'Jan 12, 2025', lastSeen: 'Just now',   you: true },
  { id: 'm2', name: 'Priya Shah',     email: 'priya@northwind.co',   role: 'Admin',       tone: 'info',    added: 'Feb 03, 2025', lastSeen: '12 min ago' },
  { id: 'm3', name: 'Marco Lopes',    email: 'marco@northwind.co',   role: 'Finance',     tone: 'success', added: 'Mar 28, 2025', lastSeen: '2 hr ago' },
  { id: 'm4', name: 'Aiko Tanaka',    email: 'aiko@northwind.co',    role: 'Finance',     tone: 'warning', added: 'May 02, 2025', lastSeen: 'Yesterday' },
  { id: 'm5', name: 'Devon Kennard',  email: 'devon@northwind.co',   role: 'Approver',    tone: 'danger',  added: 'Aug 14, 2025', lastSeen: '3 days ago' },
  { id: 'm6', name: 'Sara Klein',     email: 'sara@northwind.co',    role: 'Viewer',      tone: 'neutral', added: 'Oct 02, 2025', lastSeen: 'Last week' },
]

const PENDING = [
  { email: 'lin@northwind.co',    role: 'Finance', sent: 'Nov 10' },
  { email: 'kareem@northwind.co', role: 'Viewer',  sent: 'Nov 09' },
]

const roleMap = {
  Owner:    { bg: '#F2F6D6', fg: '#5E6A1A', bd: '#E4ECAA' },
  Admin:    { bg: '#E5EFF9', fg: '#1E4F86', bd: '#BCD3EC' },
  Finance:  { bg: '#E6F4EA', fg: '#1F6E3A', bd: '#BFE0CB' },
  Approver: { bg: '#FCF3DD', fg: '#8E5F0F', bd: '#ECD7A0' },
  Viewer:   { bg: '#ECECE7', fg: '#525249', bd: '#DDDDD6' },
}
</script>

<template>
  <div class="page">
    <div class="page-header">
      <div>
        <h1 class="page-title">Team</h1>
        <div class="page-sub">Manage who can see and move money at Northwind Trading.</div>
      </div>
      <div :style="{ display: 'flex', gap: '8px', flexShrink: 0 }">
        <Btn variant="secondary" icon="shield"><span :style="{ whiteSpace: 'nowrap' }">Role permissions</span></Btn>
        <Btn variant="primary" icon="user-plus"><span :style="{ whiteSpace: 'nowrap' }">Invite people</span></Btn>
      </div>
    </div>

    <div :style="{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '14px', marginBottom: '20px' }">
      <div class="kpi">
        <div class="kpi-label">Members</div>
        <div class="kpi-value">6</div>
        <div class="kpi-delta up" :style="{ whiteSpace: 'nowrap' }">5 active <span class="sub">in last 7d</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Pending invites</div>
        <div class="kpi-value">2</div>
        <div class="kpi-delta up" :style="{ whiteSpace: 'nowrap' }">Oldest <span class="sub">2 days ago</span></div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Seats remaining</div>
        <div class="kpi-value">14<span :style="{ fontSize: '16px', color: 'var(--fg-4)', fontWeight: 500 }"> / 20</span></div>
        <div class="kpi-delta up" :style="{ whiteSpace: 'nowrap' }">Business plan <span class="sub">renews Jan 12</span></div>
      </div>
    </div>

    <!-- Members -->
    <div class="card-surf" :style="{ marginBottom: '20px' }">
      <div :style="{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }">
        <div>
          <div :style="{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-1)' }">Members</div>
          <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '2px' }">6 active members</div>
        </div>
        <div :style="{ marginLeft: 'auto' }">
          <div class="topbar-search" :style="{ maxWidth: '240px' }">
            <Icon name="search" /><input placeholder="Search members…" />
          </div>
        </div>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>Name</th><th>Role</th><th>Added</th><th>Last seen</th><th :style="{ width: '60px' }"></th>
        </tr></thead>
        <tbody>
          <tr v-for="m in MEMBERS" :key="m.id">
            <td>
              <div class="row-name">
                <Avatar :name="m.name" :tone="m.tone" />
                <div :style="{ display: 'flex', flexDirection: 'column' }">
                  <span :style="{ display: 'flex', alignItems: 'center', gap: '8px' }">{{ m.name }}<span v-if="m.you" class="badge badge-neutral" :style="{ fontSize: '10px', padding: '1px 7px' }">You</span></span>
                  <span :style="{ fontSize: '11px', color: 'var(--fg-3)' }">{{ m.email }}</span>
                </div>
              </div>
            </td>
            <td><span class="badge" :style="{ background: roleMap[m.role].bg, color: roleMap[m.role].fg, borderColor: roleMap[m.role].bd }">{{ m.role }}</span></td>
            <td :style="{ color: 'var(--fg-3)', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }">{{ m.added }}</td>
            <td :style="{ color: 'var(--fg-3)', fontSize: '13px' }">{{ m.lastSeen }}</td>
            <td :style="{ textAlign: 'right' }"><button class="icon-btn" :style="{ width: '28px', height: '28px' }"><Icon name="more-horizontal" /></button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pending invites -->
    <div class="card-surf">
      <div :style="{ display: 'flex', alignItems: 'center', padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)' }">
        <div>
          <div :style="{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-1)' }">Pending invites</div>
          <div :style="{ fontSize: '12px', color: 'var(--fg-3)', marginTop: '2px' }">2 invitations awaiting acceptance</div>
        </div>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>Email</th><th>Role</th><th>Sent</th><th :style="{ width: '200px', textAlign: 'right' }">Actions</th>
        </tr></thead>
        <tbody>
          <tr v-for="(p, i) in PENDING" :key="i">
            <td><div class="row-name"><div :style="{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--neutral-50)', border: '1px dashed var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fg-4)' }"><Icon name="mail" /></div>{{ p.email }}</div></td>
            <td><span class="badge" :style="{ background: roleMap[p.role].bg, color: roleMap[p.role].fg, borderColor: roleMap[p.role].bd }">{{ p.role }}</span></td>
            <td :style="{ color: 'var(--fg-3)', fontSize: '13px', fontVariantNumeric: 'tabular-nums' }">{{ p.sent }}</td>
            <td :style="{ textAlign: 'right' }">
              <Btn variant="ghost"><span :style="{ whiteSpace: 'nowrap' }">Resend</span></Btn>
              <Btn variant="ghost" :style="{ color: '#9F271E' }"><span :style="{ whiteSpace: 'nowrap' }">Revoke</span></Btn>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
