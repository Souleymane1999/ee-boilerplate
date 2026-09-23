<script setup>
// Contra-style mini-game for the auth screen footer.
// Ported from index.html `ContraGame`. Controls: ←/→ move, Space jump,
// Shift fire, R restart. Keys ignored while a form input is focused.
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let raf = null
let keyDown = null
let keyUp = null

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const W = canvas.width
  const H = canvas.height
  const GROUND_Y = H - 30
  const G = 0.55
  const JUMP_V = -10.5
  const MOVE_V = 2.6
  const BULLET_V = 8
  const ENEMY_V = 1.7
  const FIRE_COOLDOWN = 180

  const state = {
    player: { x: 60, y: GROUND_Y - 28, w: 16, h: 28, vy: 0, onGround: true, facing: 1, invuln: 90 },
    bullets: [],
    enemies: [],
    obstacles: [],
    stars: Array.from({ length: 38 }, () => ({
      x: Math.random() * W,
      y: Math.random() * (GROUND_Y - 10),
      s: Math.random() < 0.6 ? 1 : 2,
      v: 0.15 + Math.random() * 0.35,
    })),
    hills: Array.from({ length: 5 }, (_, i) => ({ x: i * 240, h: 30 + Math.random() * 20 })),
    keys: {},
    score: 0,
    lives: 3,
    gameOver: false,
    lastFire: 0,
    nextEnemyAt: 1500,
    nextObstacleAt: 2500,
  }

  const isTypingInForm = () => {
    const a = document.activeElement
    return a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA')
  }

  const reset = (now) => {
    state.bullets = []
    state.enemies = []
    state.obstacles = []
    state.score = 0
    state.lives = 3
    state.gameOver = false
    state.lastFire = 0
    state.nextEnemyAt = now + 1500
    state.nextObstacleAt = now + 2500
    state.player.x = 60
    state.player.y = GROUND_Y - state.player.h
    state.player.vy = 0
    state.player.invuln = 90
    state.player.facing = 1
  }

  keyDown = (e) => {
    if (isTypingInForm()) return
    state.keys[e.code] = true
    if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'ShiftLeft', 'ShiftRight', 'KeyR', 'KeyA', 'KeyD', 'KeyW'].includes(e.code)) {
      e.preventDefault()
    }
    if (e.code === 'KeyR' && state.gameOver) reset(performance.now())
  }
  keyUp = (e) => { delete state.keys[e.code] }
  window.addEventListener('keydown', keyDown)
  window.addEventListener('keyup', keyUp)

  const tick = (now) => {
    if (!state.gameOver) {
      const p = state.player
      const left = state.keys['ArrowLeft'] || state.keys['KeyA']
      const right = state.keys['ArrowRight'] || state.keys['KeyD']
      const jump = state.keys['Space'] || state.keys['ArrowUp'] || state.keys['KeyW']
      const fire = state.keys['ShiftLeft'] || state.keys['ShiftRight']

      if (left) { p.x -= MOVE_V; p.facing = -1 }
      if (right) { p.x += MOVE_V; p.facing = 1 }
      p.x = Math.max(8, Math.min(W - p.w - 8, p.x))

      if (jump && p.onGround) { p.vy = JUMP_V; p.onGround = false }
      p.vy += G
      p.y += p.vy
      if (p.y >= GROUND_Y - p.h) { p.y = GROUND_Y - p.h; p.vy = 0; p.onGround = true }

      if (fire && now - state.lastFire > FIRE_COOLDOWN) {
        state.bullets.push({ x: p.x + (p.facing > 0 ? p.w : -2), y: p.y + 12, vx: BULLET_V * p.facing })
        state.lastFire = now
      }

      for (const b of state.bullets) b.x += b.vx
      state.bullets = state.bullets.filter((b) => b.x > -10 && b.x < W + 10 && !b.dead)

      if (now >= state.nextEnemyAt) {
        state.enemies.push({ x: W + 24, y: GROUND_Y - 22, w: 18, h: 22, walkPhase: 0 })
        state.nextEnemyAt = now + 1200 + Math.random() * 1100
      }
      if (now >= state.nextObstacleAt) {
        state.obstacles.push({ x: W + 24, y: GROUND_Y - 18, w: 22, h: 18 })
        state.nextObstacleAt = now + 2200 + Math.random() * 1400
      }

      for (const e of state.enemies) { e.x -= ENEMY_V; e.walkPhase += 0.18 }
      for (const o of state.obstacles) o.x -= ENEMY_V * 1.15

      for (const b of state.bullets) {
        for (const en of state.enemies) {
          if (en.dead) continue
          if (b.x >= en.x && b.x <= en.x + en.w && b.y >= en.y && b.y <= en.y + en.h) {
            en.dead = true; b.dead = true; state.score += 10
          }
        }
      }
      state.bullets = state.bullets.filter((b) => !b.dead)
      state.enemies = state.enemies.filter((en) => !en.dead && en.x > -40)
      state.obstacles = state.obstacles.filter((o) => o.x > -40)

      if (p.invuln > 0) {
        p.invuln--
      } else {
        const aabbHit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
        const hitEnemy = state.enemies.some((en) => aabbHit(p, en))
        const hitObs = state.obstacles.some((o) => aabbHit(p, o))
        if (hitEnemy || hitObs) {
          state.lives--
          p.invuln = 90
          if (state.lives <= 0) state.gameOver = true
        }
      }

      for (const s of state.stars) {
        s.x -= s.v
        if (s.x < 0) { s.x = W; s.y = Math.random() * (GROUND_Y - 10) }
      }
      for (const h of state.hills) {
        h.x -= 0.4
        if (h.x < -240) h.x += 240 * state.hills.length
      }
    }

    // ─── Draw ────────────────────────────────────────────────────────
    ctx.fillStyle = '#0E1110'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = 'rgba(244,244,241,0.55)'
    for (const s of state.stars) ctx.fillRect(s.x, s.y, s.s, s.s)

    ctx.fillStyle = '#1A1D1F'
    for (const h of state.hills) {
      ctx.beginPath()
      ctx.moveTo(h.x, GROUND_Y)
      ctx.lineTo(h.x + 120, GROUND_Y - h.h)
      ctx.lineTo(h.x + 240, GROUND_Y)
      ctx.closePath()
      ctx.fill()
    }

    ctx.fillStyle = '#22221D'
    ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y)
    ctx.fillStyle = '#BBCB44'
    ctx.fillRect(0, GROUND_Y - 1, W, 2)

    for (const o of state.obstacles) {
      ctx.fillStyle = '#525249'
      ctx.fillRect(o.x, o.y, o.w, o.h)
      ctx.fillStyle = '#36362F'
      ctx.fillRect(o.x + 2, o.y + 2, o.w - 4, 2)
      ctx.fillRect(o.x + 2, o.y + o.h - 4, o.w - 4, 2)
      ctx.fillRect(o.x + o.w / 2 - 1, o.y + 2, 2, o.h - 4)
    }

    for (const e of state.enemies) {
      ctx.fillStyle = '#C8362D'
      ctx.fillRect(e.x, e.y, e.w, e.h)
      ctx.fillStyle = '#F4F4F1'
      ctx.fillRect(e.x + 3, e.y + 5, 3, 3)
      ctx.fillRect(e.x + 11, e.y + 5, 3, 3)
      const legOffset = Math.sin(e.walkPhase) > 0 ? 0 : 2
      ctx.fillStyle = '#7E1F18'
      ctx.fillRect(e.x + 3, e.y + e.h - 3, 4, 3 + legOffset)
      ctx.fillRect(e.x + 11, e.y + e.h - 3, 4, 5 - legOffset)
    }

    ctx.fillStyle = '#F2F6D6'
    for (const b of state.bullets) ctx.fillRect(b.x - 3, b.y, 6, 3)

    const p = state.player
    const flash = p.invuln > 0 && Math.floor(p.invuln / 5) % 2 === 0
    ctx.fillStyle = flash ? 'rgba(187,203,68,0.45)' : '#BBCB44'
    ctx.fillRect(p.x, p.y + 8, p.w, p.h - 8)
    ctx.fillStyle = flash ? 'rgba(228,236,170,0.6)' : '#E4ECAA'
    ctx.fillRect(p.x + 2, p.y, p.w - 4, 10)
    ctx.fillStyle = '#22221D'
    ctx.fillRect(p.x + 2, p.y + 8, p.w - 4, 2)
    if (p.facing > 0) ctx.fillRect(p.x + p.w, p.y + 13, 9, 3)
    else ctx.fillRect(p.x - 9, p.y + 13, 9, 3)

    ctx.fillStyle = '#F4F4F1'
    ctx.font = 'bold 12px "Open Sans", system-ui, sans-serif'
    ctx.textAlign = 'left'
    ctx.fillText('SCORE ' + String(state.score).padStart(4, '0'), 12, 18)
    for (let i = 0; i < state.lives; i++) {
      ctx.fillStyle = '#BBCB44'
      ctx.fillRect(W - 14 - (i + 1) * 11, 10, 8, 8)
    }
    ctx.fillStyle = 'rgba(244,244,241,0.25)'
    ctx.font = '10px "Open Sans", system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('— DELTA FORCE · MARINES ONLY —', W / 2, GROUND_Y + 18)

    if (state.gameOver) {
      ctx.fillStyle = 'rgba(14,17,16,0.78)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#C8362D'
      ctx.font = 'bold 20px "Open Sans", system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('MARINE DOWN', W / 2, H / 2 - 4)
      ctx.fillStyle = '#F4F4F1'
      ctx.font = '12px "Open Sans", system-ui, sans-serif'
      ctx.fillText('Press R to redeploy · Final score ' + state.score, W / 2, H / 2 + 18)
    }

    raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (raf) cancelAnimationFrame(raf)
  if (keyDown) window.removeEventListener('keydown', keyDown)
  if (keyUp) window.removeEventListener('keyup', keyUp)
})
</script>

<template>
  <div class="ds-game">
    <canvas ref="canvasRef" class="ds-game-canvas" :width="960" :height="200" />
    <div class="ds-game-hud">
      <div class="ds-game-hud-title">Delta Force · Field Drill</div>
      <div class="ds-game-hud-mission">
        <b>Mission</b> — take out the red walkers and jump over the crates. You have <b>3 lives</b>;
        each enemy hit scores <b>+10</b>. Survive as long as you can, soldier.
      </div>
      <div class="ds-game-hud-controls">
        <span><kbd>←</kbd><kbd>→</kbd> move</span>
        <span><kbd>Space</kbd> jump</span>
        <span><kbd>Shift</kbd> fire (hold for auto-fire)</span>
        <span><kbd>R</kbd> redeploy after KIA</span>
      </div>
      <div class="ds-game-hud-tip">
        Tip — click anywhere outside the login fields to take control. Keys are ignored while you're typing credentials.
      </div>
    </div>
  </div>
</template>
