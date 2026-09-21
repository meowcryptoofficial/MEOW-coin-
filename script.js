// ===== COPY CONTRACT =====
function copyContract() {
  const addr = document.getElementById('contractAddr').innerText;
  navigator.clipboard.writeText(addr).then(() => {
    const btn = document.getElementById('copyBtn');
    btn.innerText = '✅ Copied';
    setTimeout(() => { btn.innerText = '📋 Copy'; }, 2000);
  });
}

// ===== STAKING CALCULATOR =====
function calcReward() {
  const amount = parseFloat(document.getElementById('calcAmount').value) || 0;
  const days = parseFloat(document.getElementById('calcDays').value) || 0;
  const APY = 0.85; // 85%

  const reward = amount * APY * (days / 365);
  const total = amount + reward;

  document.getElementById('calcResult').innerHTML =
    `🎁 Reward: <strong>${reward.toLocaleString('en-US', { maximumFractionDigits: 2 })} MEOW</strong><br>
     💰 Total: <strong>${total.toLocaleString('en-US', { maximumFractionDigits: 2 })} MEOW</strong>`;
}

// ===== FAQ TOGGLE =====
function toggleFaq(button) {
  const item = button.parentElement;
  const isOpen = item.classList.contains('open');

  document.querySelectorAll('.faq-item').forEach(faq => {
    faq.classList.remove('open');
  });

  if (!isOpen) {
    item.classList.add('open');
  }
}

// ===== TECHNICAL NOTICE BANNER =====
function closeNotice() {
  const banner = document.getElementById('noticeBanner');
  if (banner) {
    banner.style.transition = 'opacity 0.4s ease, transform 0.4s ease, max-height 0.4s ease';
    banner.style.opacity = '0';
    banner.style.transform = 'translateY(-20px)';
    banner.style.maxHeight = '0';
    banner.style.overflow = 'hidden';
    banner.style.padding = '0';

    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);

    sessionStorage.setItem('noticeClosed', 'true');
  }
}

// ===== LIVE PRICE =====
const CMC_ID = 15973;

async function fetchLivePrice() {
  try {
    // Demo data (used until live API is connected)
    const d = {
      price: 0.0004198,
      change24h: 2.21,
      marketCap: 617040,
      fdv: 4240000,
      volume24h: 0,
      holders: 9630,
      liquidity: 42500,
    };

    document.getElementById('livePrice').innerText = '$' + d.price.toFixed(7);
    document.getElementById('statPrice').innerText = '$' + d.price.toFixed(7);

    const changeEl = document.getElementById('liveChange');
    changeEl.innerText = (d.change24h >= 0 ? '+' : '') + d.change24h.toFixed(2) + '%';
    changeEl.style.color = d.change24h >= 0 ? '#10b981' : '#ef4444';

    document.getElementById('statMcap').innerText = '$' + (d.marketCap / 1000).toFixed(2) + 'K';
    document.getElementById('statFdv').innerText = '$' + (d.fdv / 1000000).toFixed(2) + 'M';
    document.getElementById('statVol').innerText = '$' + d.volume24h.toLocaleString();
    document.getElementById('statHolders').innerText = d.holders.toLocaleString();
    document.getElementById('statLiquidity').innerText = '$' + (d.liquidity / 1000).toFixed(1) + 'K';

  } catch (err) {
    console.error('Price fetch failed:', err);
  }
}

// ===== IMAGE MODAL =====
function initImageModal() {
  const modal = document.createElement('div');
  modal.id = 'imgModal';
  modal.style.cssText = `
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,0.9); z-index:999;
    justify-content:center; align-items:center;
    cursor:pointer; padding:20px;
  `;
  modal.innerHTML = '<img id="modalImg" style="max-width:90%; max-height:90%; border-radius:12px;" />';
  document.body.appendChild(modal);

  modal.addEventListener('click', () => { modal.style.display = 'none'; });

  document.querySelectorAll('.proof-item img').forEach(img => {
    img.addEventListener('click', () => {
      document.getElementById('modalImg').src = img.src;
      modal.style.display = 'flex';
    });
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  fetchLivePrice();
  initImageModal();
  initSmoothScroll();

  // Check if notice was closed this session
  const banner = document.getElementById('noticeBanner');
  if (banner && sessionStorage.getItem('noticeClosed') === 'true') {
    banner.style.display = 'none';
  }

  // Refresh price every 60 seconds
  setInterval(fetchLivePrice, 60000);
});
