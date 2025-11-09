// Neon Stake Automator Bot 🌌
(async function () {
  // === Internationalization (i18n) ===
  let currentLang = localStorage.getItem('bot_lang') || 'id';
  const i18n = {
    id: {
      title: 'XZEIN CLAIMER',
      status_offline: 'OFFLINE',
      status_active: 'AKTIF',
      status_standby: 'SIAGA',
      status_connected: 'TERHUBUNG',
      status_error: 'GALAT',
      status_reconnecting: 'MENGHUBUNGKAN ULANG',
      user_id: 'USER ID',
      credit_label: 'KREDIT',
      api_tokens: 'API TOKEN (SATU PER BARIS)',
      save_start: 'SIMPAN & MULAI BOT',
      license_key: 'LICENSE KEY',
      verify_license: 'VERIFIKASI LISENSI',
      not_verified: 'BELUM TERVERIFIKASI',
      verified: 'TERVERIFIKASI',
      reload_scheduler: 'PENJADWAL RELOAD',
      off: 'MATI',
      start_reload: 'MULAI RELOAD',
      bonus_code: 'KODE BONUS',
      code_placeholder: 'Masukkan kode bonus',
      claim: 'KLAIM',
      filter_amount: 'Filter Nominal:',
      clear: 'BERSIHKAN',
      claim_success_table: 'TABEL CLAIM SUKSES',
      system_logs: 'LOG SISTEM',
      history_claim: 'RIWAYAT CLAIM',
      bot_initialized: '[SISTEM] Bot siap. Menunggu konfigurasi...',
      waiting_code: 'Menunggu kode...',
      no_accounts: 'Tidak ada akun dikonfigurasi',
      enter_tokens_start: 'Masukkan token & mulai',
      show_bot: 'Tampilkan Bot',
      hide_bot: 'Sembunyikan Bot'
    },
    en: {
      title: 'XZEIN CLAIMER',
      status_offline: 'OFFLINE',
      status_active: 'ACTIVE',
      status_standby: 'STANDBY',
      status_connected: 'CONNECTED',
      status_error: 'ERROR',
      status_reconnecting: 'RECONNECTING',
      user_id: 'USER ID',
      credit_label: 'CREDIT',
      api_tokens: 'API TOKENS (ONE PER LINE)',
      save_start: 'SAVE & START BOT',
      license_key: 'LICENSE KEY',
      verify_license: 'VERIFY LICENSE',
      not_verified: 'NOT VERIFIED',
      verified: 'VERIFIED',
      reload_scheduler: 'RELOAD SCHEDULER',
      off: 'OFF',
      start_reload: 'START RELOAD',
      bonus_code: 'BONUS CODE',
      code_placeholder: 'Enter bonus code',
      claim: 'CLAIM',
      filter_amount: 'Filter Amount:',
      clear: 'CLEAR',
      claim_success_table: 'CLAIM SUCCESS TABLE',
      system_logs: 'SYSTEM LOGS',
      history_claim: 'HISTORY CLAIM',
      bot_initialized: '[SYSTEM] Bot initialized. Waiting for configuration...',
      waiting_code: 'Waiting for code...',
      no_accounts: 'No accounts configured',
      enter_tokens_start: 'Enter tokens & start'
      ,show_bot: 'Show Bot'
      ,hide_bot: 'Hide Bot'
    }
  };

  function t(key) {
    const dict = i18n[currentLang] || i18n.en;
    return dict[key] || key;
  }
  // Mode popup: jangan hapus halaman dan biarkan scroll normal
  // document.body.innerHTML = '';
  // document.documentElement.style.overflow = 'hidden';
  // document.body.style.margin = '0';
  // document.body.style.padding = '0';

  // Main container with cyberpunk aesthetic
  const overlay = document.createElement('div');
  overlay.id = 'stake-bot-overlay';
  overlay.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(135deg, #0a0a1a 0%, #10102a 100%);
    z-index: 9999999;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 0;
    padding: 0;
    color: #00f3ff;
    font-family: 'Rajdhani', 'Orbitron', sans-serif;
    overflow: auto;
    border-radius: 0;
    box-shadow: 0 12px 32px rgba(0,0,0,0.5);
    border: 1px solid rgba(0, 243, 255, 0.25);
    backdrop-filter: blur(6px);
  `;
  document.body.appendChild(overlay);

  // Create cyber grid background
  const createCyberGrid = () => {
    const grid = document.createElement('div');
    grid.style = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: 
        linear-gradient(rgba(0, 243, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 243, 255, 0.05) 1px, transparent 1px);
      background-size: 20px 20px;
      z-index: 1;
    `;
    overlay.appendChild(grid);
  };
  createCyberGrid();

  // Add moving neon lines
  const createNeonLines = () => {
    const linesContainer = document.createElement('div');
    linesContainer.style = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      z-index: 2;
    `;
    
    for (let i = 0; i < 8; i++) {
      const line = document.createElement('div');
      line.style = `
        position: absolute;
        height: 1px;
        width: 200%;
        background: linear-gradient(90deg, transparent, #00f3ff, transparent);
        top: ${Math.random() * 100}%;
        left: 0;
        animation: moveLine ${15 + Math.random() * 15}s linear infinite;
        opacity: 0.3;
      `;
      
      const keyframes = `
        @keyframes moveLine {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `;
      
      const style = document.createElement('style');
      style.innerHTML = keyframes;
      document.head.appendChild(style);
      
      linesContainer.appendChild(line);
    }
    overlay.appendChild(linesContainer);
  };
  createNeonLines();

  // Main bot interface
  const botInterface = document.createElement('div');
  botInterface.style = `
    width: 100%;
    height: 100%;
    background: rgba(10, 10, 26, 0.8);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.1);
    backdrop-filter: blur(5px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto 1fr;
    gap: 20px;
    padding: 25px;
    z-index: 10;
    overflow: hidden;
  `;

  // Header section
  const header = document.createElement('div');
  header.style = `
    grid-column: 1 / -1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  `;
  
  const title = document.createElement('h1');
  title.textContent = t('title');
  title.style = `
    font-size: 24px;
    font-weight: 700;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  `;
  
  const statusIndicator = document.createElement('div');
  statusIndicator.id = 'status-indicator';
  statusIndicator.textContent = t('status_offline');
  statusIndicator.style = `
    background: #e74c3c;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
  `;

  // Tombol minimize untuk menyembunyikan panel
  const minimizeBtn = document.createElement('button');
  minimizeBtn.textContent = '−';
  minimizeBtn.title = t('hide_bot');
  minimizeBtn.style = `
    margin-left: 8px;
    background: rgba(0,0,0,0.35);
    border: 1px solid rgba(0,243,255,0.3);
    color: #00f3ff;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
  `;
  minimizeBtn.onclick = () => {
    overlay.style.display = 'none';
    launcherBtn.style.display = 'block';
  };
  
  // Language selector
  const langSelect = document.createElement('select');
  langSelect.id = 'lang-select';
  langSelect.style = `background: rgba(0,0,0,0.3); border: 1px solid rgba(0,243,255,0.3); color: #00f3ff; border-radius: 6px; padding: 6px 10px; margin-left: 12px; font-weight: 600;`;
  const optId = document.createElement('option'); optId.value = 'id'; optId.textContent = 'ID';
  const optEn = document.createElement('option'); optEn.value = 'en'; optEn.textContent = 'EN';
  langSelect.appendChild(optId); langSelect.appendChild(optEn);
  langSelect.value = currentLang;
  langSelect.addEventListener('change', () => { currentLang = langSelect.value; localStorage.setItem('bot_lang', currentLang); refreshTexts(); });

  header.appendChild(title);
  header.appendChild(langSelect);
  header.appendChild(statusIndicator);
  header.appendChild(minimizeBtn);
  botInterface.appendChild(header);

  // Left panel - Controls
  const controlsPanel = document.createElement('div');
  controlsPanel.style = `
    background: rgba(16, 16, 42, 0.5);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-y: auto;
  `;
  
  // User ID (read-only from verify_ack)
  const userIdGroup = document.createElement('div');
  userIdGroup.style = `display: flex; flex-direction: column; gap: 8px;`;
  
  const userIdLabel = document.createElement('label');
  userIdLabel.textContent = t('user_id');
  userIdLabel.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  
  const userIdDisplay = document.createElement('input');
  userIdDisplay.id = 'user-id-display';
  userIdDisplay.type = 'text';
  userIdDisplay.readOnly = true;
  userIdDisplay.placeholder = t('bot_initialized');
  userIdDisplay.style = `
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 6px;
    padding: 12px 15px;
    color: #00f3ff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
  `;
  // Kredit badge di samping User ID
  const creditInfo = document.createElement('div');
  creditInfo.id = 'credit-info';
  creditInfo.textContent = `${t('credit_label')}: 0`;
  creditInfo.style = `
    padding: 10px 12px;
    border-radius: 6px;
    background: rgba(0, 243, 255, 0.12);
    border: 1px solid rgba(0, 243, 255, 0.3);
    color: #00f3ff;
    font-weight: 700;
    letter-spacing: 1px;
    white-space: nowrap;
  `;

  // Baris berisi User ID + Credit
  const userIdRow = document.createElement('div');
  userIdRow.style = `display: flex; gap: 10px; align-items: center;`;
  userIdRow.appendChild(userIdDisplay);
  userIdRow.appendChild(creditInfo);

  userIdGroup.appendChild(userIdLabel);
  userIdGroup.appendChild(userIdRow);
  controlsPanel.appendChild(userIdGroup);

  // Coin selection
  const coinGroup = document.createElement('div');
  coinGroup.style = `display: flex; flex-direction: column; gap: 8px;`;
  
  const coinLabel = document.createElement('label');
  coinLabel.textContent = 'SELECT COIN';
  coinLabel.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  
  const coinSelect = document.createElement('select');
  coinSelect.id = 'coin-select';
  coinSelect.style = `
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 6px;
    padding: 12px 15px;
    color: #00f3ff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2300f3ff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 15px;
  `;
  
  const coins = [
    { value: 'doge', text: 'DOGE (Default)' },
    { value: 'trx', text: 'TRX' },
    { value: 'usdt', text: 'USDT' },
    { value: 'xrp', text: 'XRP' }
  ];
  
  coins.forEach(coin => {
    const option = document.createElement('option');
    option.value = coin.value;
    option.textContent = coin.text;
    if (coin.value === 'doge') option.selected = true;
    coinSelect.appendChild(option);
  });
  
  coinSelect.addEventListener('focus', () => {
    coinSelect.style.borderColor = '#00f3ff';
    coinSelect.style.boxShadow = '0 0 0 2px rgba(0, 243, 255, 0.2)';
  });
  
  coinSelect.addEventListener('blur', () => {
    coinSelect.style.borderColor = 'rgba(0, 243, 255, 0.3)';
    coinSelect.style.boxShadow = 'none';
  });
  
  coinGroup.appendChild(coinLabel);
  coinGroup.appendChild(coinSelect);
  controlsPanel.appendChild(coinGroup);

  // API Tokens input
  const tokensGroup = document.createElement('div');
  tokensGroup.style = `display: flex; flex-direction: column; gap: 8px;`;
  
  const tokensLabel = document.createElement('label');
  tokensLabel.textContent = t('api_tokens');
  tokensLabel.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  
  const tokensTextarea = document.createElement('textarea');
  tokensTextarea.id = 'api-tokens-input';
  tokensTextarea.rows = 8;
  tokensTextarea.style = `
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 6px;
    padding: 12px 15px;
    color: #00f3ff;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    outline: none;
    resize: vertical;
    transition: all 0.2s;
  `;
  
  tokensTextarea.addEventListener('focus', () => {
    tokensTextarea.style.borderColor = '#00f3ff';
    tokensTextarea.style.boxShadow = '0 0 0 2px rgba(0, 243, 255, 0.2)';
  });
  
  tokensTextarea.addEventListener('blur', () => {
    tokensTextarea.style.borderColor = 'rgba(0, 243, 255, 0.3)';
    tokensTextarea.style.boxShadow = 'none';
  });
  
  tokensGroup.appendChild(tokensLabel);
  tokensGroup.appendChild(tokensTextarea);
  controlsPanel.appendChild(tokensGroup);

  // Save & Start button
  const saveButton = document.createElement('button');
  saveButton.id = 'save-start-button';
  saveButton.textContent = t('save_start');
  saveButton.style = `
    background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 15px;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
    box-shadow: 0 4px 15px rgba(0, 180, 219, 0.2);
  `;
  
  saveButton.addEventListener('mouseenter', () => {
    saveButton.style.transform = 'translateY(-2px)';
    saveButton.style.boxShadow = '0 6px 20px rgba(0, 180, 219, 0.3)';
  });
  
  saveButton.addEventListener('mouseleave', () => {
    saveButton.style.transform = 'translateY(0)';
    saveButton.style.boxShadow = '0 4px 15px rgba(0, 180, 219, 0.2)';
  });
  
  saveButton.addEventListener('mousedown', () => {
    saveButton.style.transform = 'translateY(1px)';
  });
  
  // === License Key input + Verify ===
  const licenseGroup = document.createElement('div');
  licenseGroup.style = `display: flex; flex-direction: column; gap: 8px;`;
  const licenseLabel = document.createElement('label');
  licenseLabel.textContent = t('license_key');
  licenseLabel.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  const licenseInputGroup = document.createElement('div');
  licenseInputGroup.style = `display: flex; gap: 10px;`;
  const licenseInput = document.createElement('input');
  licenseInput.id = 'license-key-input';
  licenseInput.type = 'text';
  licenseInput.placeholder = t('license_key');
  licenseInput.style = `
    flex: 1;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 6px;
    padding: 12px 15px;
    color: #00f3ff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
  `;
  const verifyButton = document.createElement('button');
  verifyButton.id = 'verify-license-button';
  verifyButton.textContent = t('verify_license');
  verifyButton.style = `
    background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 180, 219, 0.2);
  `;
  const licenseVerifiedContainer = document.createElement('div');
  licenseVerifiedContainer.style = `display: flex; align-items: center; gap: 10px; margin-top: 6px;`;
  const licenseVerifiedIndicator = document.createElement('div');
  licenseVerifiedIndicator.id = 'license-verified-indicator';
  licenseVerifiedIndicator.style = `width: 10px; height: 10px; border-radius: 50%; background: #e74c3c;`;
  const licenseVerifiedText = document.createElement('div');
  licenseVerifiedText.id = 'license-verified-text';
  licenseVerifiedText.textContent = t('not_verified');
  licenseVerifiedText.style = `font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8);`;
  licenseVerifiedContainer.appendChild(licenseVerifiedIndicator);
  licenseVerifiedContainer.appendChild(licenseVerifiedText);
  licenseInputGroup.appendChild(licenseInput);
  licenseInputGroup.appendChild(verifyButton);
  licenseGroup.appendChild(licenseLabel);
  licenseGroup.appendChild(licenseInputGroup);
  licenseGroup.appendChild(licenseVerifiedContainer);
  controlsPanel.appendChild(licenseGroup);

  // === Reload Scheduler controls ===
  const reloadGroup = document.createElement('div');
  reloadGroup.style = `display: flex; flex-direction: column; gap: 8px; margin-top: 8px;`;
  const reloadLabel = document.createElement('label');
  reloadLabel.textContent = t('reload_scheduler');
  reloadLabel.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  const reloadRow = document.createElement('div');
  reloadRow.style = `display: flex; gap: 10px; align-items: center;`;
  const reloadStatus = document.createElement('div');
  reloadStatus.id = 'reload-status';
  reloadStatus.textContent = t('off');
  reloadStatus.style = `
    font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8);
    padding: 6px 10px; border-radius: 6px; background: rgba(0,0,0,0.3);
  `;
  const reloadToggleButton = document.createElement('button');
  reloadToggleButton.id = 'reload-toggle-button';
  reloadToggleButton.textContent = t('start_reload');
  reloadToggleButton.style = `
    background: linear-gradient(135deg, #2d3436 0%, #2c3e50 100%);
    color: white; border: none; border-radius: 6px; padding: 0 16px;
    font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;
    cursor: pointer; transition: all 0.3s; box-shadow: 0 4px 15px rgba(0, 243, 255, 0.1);
  `;
  // Disabled until license verified & credit ≥ RELOAD_CREDIT_PER_CLAIM
  reloadToggleButton.disabled = true;
  reloadToggleButton.style.opacity = '0.6';
  reloadToggleButton.style.cursor = 'not-allowed';
  reloadRow.appendChild(reloadStatus);
  reloadRow.appendChild(reloadToggleButton);
  reloadGroup.appendChild(reloadLabel);
  reloadGroup.appendChild(reloadRow);
  controlsPanel.appendChild(reloadGroup);

  

  controlsPanel.appendChild(saveButton);
  // Disable Save until license verified
  saveButton.disabled = true;
  saveButton.style.opacity = '0.6';
  saveButton.style.cursor = 'not-allowed';
  botInterface.appendChild(controlsPanel);

  // Right panel - Dashboard
  const dashboardPanel = document.createElement('div');
  dashboardPanel.style = `
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
  `;
  
  // Code display
  const codeDisplay = document.createElement('div');
  codeDisplay.style = `
    background: rgba(16, 16, 42, 0.5);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
  `;
  
  const codeLabel = document.createElement('div');
  codeLabel.textContent = t('bonus_code');
  codeLabel.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
  `;
  
  const codeInputGroup = document.createElement('div');
  codeInputGroup.style = `
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
  `;
  
  const codeInput = document.createElement('input');
  codeInput.id = 'code-input';
  codeInput.type = 'text';
  codeInput.placeholder = t('code_placeholder');
  codeInput.style = `
    flex: 1;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 243, 255, 0.3);
    border-radius: 6px;
    padding: 12px 15px;
    color: #00f3ff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 15px;
    outline: none;
    transition: all 0.2s;
  `;
  
  const claimButton = document.createElement('button');
  claimButton.id = 'claim-button';
  claimButton.textContent = t('claim');
  claimButton.style = `
    background: linear-gradient(135deg, #00b4db 0%, #0083b0 100%);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 0 20px;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s;
    box-shadow: 0 4px 15px rgba(0, 180, 219, 0.2);
  `;
  // Disable Claim until license verified
  claimButton.disabled = true;
  claimButton.style.opacity = '0.6';
  claimButton.style.cursor = 'not-allowed';
  
  claimButton.addEventListener('click', () => {
    const code = document.getElementById('code-input').value.trim();
    if (code) {
      lastCode = code;
      document.getElementById('code-display').textContent = code;
      if (accounts.length > 0) {
        const readyAccounts = accounts.filter(acc => acc.captchaToken);
        if (readyAccounts.length > 0) {
          claimForAllAccounts(code, readyAccounts);
        } else {
          addLog('No accounts ready to claim, waiting for captcha tokens...', '#f1c40f');
        }
      }
    }
  });
  
  codeInputGroup.appendChild(codeInput);
  codeInputGroup.appendChild(claimButton);
  
  const codeValue = document.createElement('div');
  codeValue.id = 'code-display';
  codeValue.textContent = 'Enter code above';
  codeValue.style = `
    font-size: 22px;
    font-weight: 700;
    color: white;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
    padding: 15px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    border: 1px dashed rgba(0, 243, 255, 0.3);
  `;
  
  codeDisplay.appendChild(codeLabel);
  codeDisplay.appendChild(codeInputGroup);
  codeDisplay.appendChild(codeValue);
  // Amount Filters UI
  const amountFilterContainer = document.createElement('div');
  amountFilterContainer.id = 'amount-filter-container';
  amountFilterContainer.style = `
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    position: relative;
    z-index: 10;
    pointer-events: auto;
  `;
  const amountFilterLabel = document.createElement('span');
  amountFilterLabel.textContent = t('filter_amount');
  amountFilterLabel.style = `
    color: #00f3ff;
    font-weight: 600;
    margin-right: 8px;
    font-size: 20px;
    font-family: 'Orbitron', sans-serif;
    letter-spacing: 2px;
  `;
  amountFilterContainer.appendChild(amountFilterLabel);

  // Style untuk warna checkbox saat checked (neon green)
  try {
    const existingStyle = document.getElementById('amount-filter-style');
    if (!existingStyle) {
      const amountFilterStyle = document.createElement('style');
      amountFilterStyle.id = 'amount-filter-style';
      amountFilterStyle.textContent = `
        .amount-filter-checkbox { accent-color: #00f3ff; }
        .amount-filter-checkbox:checked { accent-color: #39ff14; }
      `;
      document.head.appendChild(amountFilterStyle);
    }
  } catch (_) {}

  const amountOptions = [
    { id: 'amount-filter-1', label: '1$', key: '1' },
    { id: 'amount-filter-2', label: '2$', key: '2' },
    { id: 'amount-filter-3', label: '3$', key: '3' },
    { id: 'amount-filter-4', label: '4$', key: '4' },
    { id: 'amount-filter-5', label: '5$', key: '5' },
    { id: 'amount-filter-gt5', label: '> 5$', key: 'gt5' },
  ];
  window.amountFilters = window.amountFilters || { '1': false, '2': false, '3': false, '4': false, '5': false, 'gt5': false };
  for (const opt of amountOptions) {
    const labelEl = document.createElement('label');
    labelEl.style = 'color: #fff; display: flex; align-items: center; gap: 6px; cursor: pointer; font-size: 20px; font-family: \'Orbitron\', sans-serif; letter-spacing: 2px;';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.id = opt.id;
    cb.className = 'amount-filter-checkbox';
    cb.style = 'cursor: pointer; pointer-events: auto; transform: scale(1.5); margin-right: 6px;';
    cb.checked = !!window.amountFilters[opt.key];
    cb.addEventListener('change', () => {
      window.amountFilters[opt.key] = cb.checked;
      // Visual feedback on selection
      labelEl.style.color = cb.checked ? '#39ff14' : '#fff';
    });
    labelEl.appendChild(cb);
    const span = document.createElement('span');
    span.textContent = opt.label;
    span.style = 'font-size: 20px; font-family: \'Orbitron\', sans-serif; letter-spacing: 2px;';
    labelEl.appendChild(span);
    // Initialize visual state
    labelEl.style.color = cb.checked ? '#39ff14' : '#fff';
    amountFilterContainer.appendChild(labelEl);
  }
  codeDisplay.appendChild(amountFilterContainer);
  dashboardPanel.appendChild(codeDisplay);

  // Account status
  const accountStatus = document.createElement('div');
  accountStatus.style = `
    background: rgba(16, 16, 42, 0.5);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  `;
  
  const accountStatusHeader = document.createElement('div');
  accountStatusHeader.style = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  `;
  
  const accountStatusTitle = document.createElement('div');
  accountStatusTitle.textContent = 'ACCOUNT STATUS';
  accountStatusTitle.style = `
    font-size: 14px;
    font-weight: 600;
    color: #00f3ff;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;
  
  const accountCount = document.createElement('div');
  accountCount.id = 'account-count';
  accountCount.textContent = '0 accounts';
  accountCount.style = `
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 243, 255, 0.7);
  `;
  
  accountStatusHeader.appendChild(accountStatusTitle);
  accountStatusHeader.appendChild(accountCount);
  accountStatus.appendChild(accountStatusHeader);

  // Indikator rencana klaim & daftar akun terpilih
  const claimPlan = document.createElement('div');
  claimPlan.id = 'claim-plan';
  claimPlan.style = `
    margin-bottom: 10px;
    font-size: 13px;
    color: rgba(255,255,255,0.8);
  `;
  claimPlan.textContent = 'CLAIM PLAN: belum ada';
  accountStatus.appendChild(claimPlan);
  
  const accountStatusContainer = document.createElement('div');
  accountStatusContainer.id = 'account-status-area';
  accountStatusContainer.style = `
    flex: 1;
    overflow-y: auto;
    padding-right: 5px;
  `;
  
  // Scrollbar styling
  const scrollbarStyle = document.createElement('style');
  scrollbarStyle.textContent = `
    #account-status-area::-webkit-scrollbar {
      width: 6px;
    }
    #account-status-area::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 3px;
    }
    #account-status-area::-webkit-scrollbar-thumb {
      background: rgba(0, 243, 255, 0.4);
      border-radius: 3px;
    }
    #account-status-area::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 243, 255, 0.6);
    }
  `;
  document.head.appendChild(scrollbarStyle);
  
  accountStatus.appendChild(accountStatusContainer);
  dashboardPanel.appendChild(accountStatus);
  botInterface.appendChild(dashboardPanel);

  // Log panel
  const logPanelContainer = document.createElement('div');
  logPanelContainer.style = `
    grid-column: 1 / -1;
    background: rgba(16, 16, 42, 0.5);
    border: 1px solid rgba(0, 243, 255, 0.2);
    border-radius: 8px;
    padding: 20px;
    height: 320px;
    display: flex;
    flex-direction: column;
  `;
  
  const logPanelHeader = document.createElement('div');
  logPanelHeader.style = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  `;
  
  // Tabs container (SYSTEM LOGS / HISTORY CLAIM)
  const tabsContainer = document.createElement('div');
  tabsContainer.style = `
    display: flex;
    gap: 12px;
    align-items: center;
  `;
  
  const clearLogs = document.createElement('div');
  clearLogs.textContent = t('clear');
  clearLogs.style = `
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 243, 255, 0.7);
    cursor: pointer;
    transition: all 0.2s;
  `;
  
  clearLogs.addEventListener('mouseenter', () => {
    clearLogs.style.color = '#00f3ff';
  });
  
  clearLogs.addEventListener('mouseleave', () => {
    clearLogs.style.color = 'rgba(0, 243, 255, 0.7)';
  });
  
  clearLogs.addEventListener('click', () => {
    const logPanel = document.getElementById('log-panel');
    if (logPanel) logPanel.innerHTML = '';
  });
  
  logPanelHeader.appendChild(tabsContainer);
  logPanelHeader.appendChild(clearLogs);
  logPanelContainer.appendChild(logPanelHeader);

  // === Claim Success Table ===
  const claimTableContainer = document.createElement('div');
  claimTableContainer.id = 'claim-table-container';
  claimTableContainer.style = `
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 10px;
  `;

  const claimTableTitle = document.createElement('div');
  claimTableTitle.textContent = t('claim_success_table');
  claimTableTitle.style = `
    font-size: 12px;
    font-weight: 600;
    color: rgba(0, 243, 255, 0.9);
    letter-spacing: 1px;
  `;
  claimTableContainer.appendChild(claimTableTitle);

  const claimTableHeader = document.createElement('div');
  claimTableHeader.style = `
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
    gap: 8px;
    padding: 6px 8px;
    background: rgba(0,0,0,0.25);
    border-radius: 6px;
    color: #00f3ff;
    font-size: 12px;
    font-family: 'Orbitron', sans-serif;
  `;
  for (const col of ['username','value','$','waktuclaim','code']) {
    const c = document.createElement('div');
    c.textContent = col.toUpperCase();
    claimTableHeader.appendChild(c);
  }
  claimTableContainer.appendChild(claimTableHeader);

  const claimTableBody = document.createElement('div');
  claimTableBody.id = 'claim-table-body';
  claimTableBody.style = `
    max-height: 120px;
    overflow-y: auto;
    padding-right: 6px;
  `;
  claimTableContainer.appendChild(claimTableBody);

  // Scrollbar styling for table
  const claimTableScrollbarStyle = document.createElement('style');
  claimTableScrollbarStyle.textContent = `
    #claim-table-body::-webkit-scrollbar { width: 6px; }
    #claim-table-body::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 3px; }
    #claim-table-body::-webkit-scrollbar-thumb { background: rgba(0, 243, 255, 0.4); border-radius: 3px; }
    #claim-table-body::-webkit-scrollbar-thumb:hover { background: rgba(0, 243, 255, 0.6); }
  `;
  document.head.appendChild(claimTableScrollbarStyle);

  // Initially hide table; shown when History tab active
  claimTableContainer.style.display = 'none';
  logPanelContainer.appendChild(claimTableContainer);
  
  const logPanel = document.createElement('div');
  logPanel.id = 'log-panel';
  logPanel.style = `
    flex: 1;
    overflow-y: auto;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
    padding: 12px;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.5;
  `;
  
  // Add initial log message (i18n)
  logPanel.innerHTML = `<div style="color: #00f3ff;">${t('bot_initialized')}</div>`;
  
  logPanelContainer.appendChild(logPanel);
  botInterface.appendChild(logPanelContainer);
  overlay.appendChild(botInterface);

  // Tombol peluncur kecil untuk memunculkan panel kembali
  const launcherBtn = document.createElement('button');
  launcherBtn.id = 'stake-bot-launcher';
  launcherBtn.textContent = t('show_bot');
  launcherBtn.style = `
    position: fixed;
    top: 16px;
    right: 16px;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(0,243,255,0.4);
    color: #00f3ff;
    border-radius: 12px;
    width: 8rem;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    z-index: 10000000;
    display: none;
  `;
  launcherBtn.onclick = () => {
    overlay.style.display = 'flex';
    launcherBtn.style.display = 'none';
  };
  document.body.appendChild(launcherBtn);

  // Add font imports
  const font1 = document.createElement('link');
  font1.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap';
  font1.rel = 'stylesheet';
  
  const font2 = document.createElement('link');
  font2.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&display=swap';
  font2.rel = 'stylesheet';
  
  document.head.appendChild(font1);
  document.head.appendChild(font2);

  // Build Tabs (after both views exist)
  const logsTab = document.createElement('div');
  logsTab.textContent = t('system_logs');
  logsTab.style = `
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 243, 255, 0.9);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
  `;
  const historyTab = document.createElement('div');
  historyTab.textContent = t('history_claim');
  historyTab.style = `
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 243, 255, 0.6);
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
  `;
  tabsContainer.appendChild(logsTab);
  tabsContainer.appendChild(historyTab);

  // Refresh all static UI labels based on current language
  function refreshTexts() {
    title.textContent = t('title');
    const si = document.getElementById('status-indicator');
    if (si) si.textContent = t('status_offline');
    userIdLabel.textContent = t('user_id');
    userIdDisplay.placeholder = t('bot_initialized');
    const creditVal = (typeof userCredit === 'number') ? userCredit : 0;
    creditInfo.textContent = `${t('credit_label')}: ${creditVal}`;
    tokensLabel.textContent = t('api_tokens');
    saveButton.textContent = t('save_start');
    licenseLabel.textContent = t('license_key');
    verifyButton.textContent = t('verify_license');
    licenseVerifiedText.textContent = licenseVerified ? t('verified') : t('not_verified');
    reloadLabel.textContent = t('reload_scheduler');
    reloadStatus.textContent = t('off');
    reloadToggleButton.textContent = t('start_reload');
    codeLabel.textContent = t('bonus_code');
    codeInput.placeholder = t('code_placeholder');
    claimButton.textContent = t('claim');
    amountFilterLabel.textContent = t('filter_amount');
    clearLogs.textContent = t('clear');
    claimTableTitle.textContent = t('claim_success_table');
    logsTab.textContent = t('system_logs');
    historyTab.textContent = t('history_claim');
  }

  function setActiveTab(kind) {
    const isLogs = kind === 'logs';
    logPanel.style.display = isLogs ? 'block' : 'none';
    claimTableContainer.style.display = isLogs ? 'none' : 'flex';
    clearLogs.style.display = isLogs ? 'block' : 'none';
    logsTab.style.color = isLogs ? '#00f3ff' : 'rgba(0, 243, 255, 0.6)';
    logsTab.style.borderBottomColor = isLogs ? '#00f3ff' : 'transparent';
    historyTab.style.color = isLogs ? 'rgba(0, 243, 255, 0.6)' : '#00f3ff';
    historyTab.style.borderBottomColor = isLogs ? 'transparent' : '#00f3ff';
  }
  logsTab.onclick = () => setActiveTab('logs');
  historyTab.onclick = () => setActiveTab('history');
  setActiveTab('logs');

  // Apply initial language to UI
  try { refreshTexts(); } catch {}

  // === Claim History (Local Storage) ===
  function _loadClaimHistory() {
    try {
      const raw = localStorage.getItem('claimHistory');
      return raw ? JSON.parse(raw) : [];
    } catch (_) { return []; }
  }
  function _saveClaimHistory(items) {
    try { localStorage.setItem('claimHistory', JSON.stringify(items.slice(-200))); } catch (_) {}
  }
  function _formatSecondsID(sec) {
    try { return String(sec.toFixed(2)).replace('.', ',') + ' s'; } catch (_) { return sec + ' s'; }
  }
  function _appendClaimRowToTable(item) {
    const row = document.createElement('div');
    row.style = `
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
      gap: 8px;
      padding: 6px 8px;
      border-bottom: 1px dashed rgba(0, 243, 255, 0.15);
      color: rgba(255,255,255,0.85);
      font-size: 12px;
      font-family: 'Rajdhani', sans-serif;
    `;
    const cols = [item.username, (Number(item.value).toFixed(2)), item.currency, _formatSecondsID(item.waktuSec), item.code];
    for (const val of cols) { const c = document.createElement('div'); c.textContent = val; row.appendChild(c); }
    const body = document.getElementById('claim-table-body');
    if (body) { body.appendChild(row); body.scrollTop = body.scrollHeight; }
  }
  function renderClaimHistory() {
    const body = document.getElementById('claim-table-body');
    if (!body) return;
    body.innerHTML = '';
    const items = _loadClaimHistory();
    for (const it of items) _appendClaimRowToTable(it);
  }
  renderClaimHistory();

  // === BOT FUNCTIONALITY ===
  // (All the original bot functionality goes here, unchanged)
  // Lisensi & Kredit kontrol
  let licenseVerified = false;
  let userCredit = 0;
  let userId = '';
  let botRunning = false;
  // Harga kredit per klaim (dinamis): default 500, server akan sinkron
  let CURRENT_CLAIM_RATE = 500;
  const RELOAD_CREDIT_PER_CLAIM = 200; // Kredit per klaim reload
  const DISABLE_TOKEN_REGEN = true; // Paksa matikan regenerasi token meski instan ON
  const CAPTCHA_MAX_AGE_MS = 120000; // Umur maksimal captcha token (120 detik)

  // Flag untuk jeda reload saat proses klaim kode sedang berjalan
  let isCodeClaimInProgress = false;
  // Status scheduler reload
  let reloadSchedulerActive = false;
  let reloadTimerId = null;

  let COIN = "doge";
  document.getElementById('coin-select').onchange = function() {
    COIN = this.value;
    addLog('Claim coin changed to: ' + COIN, '#00f3ff');
  };
  // Telegram notifications are disabled; tokens removed per request.
  
  let lastCode = null;
  let accounts = []; // { apiToken, captchaToken, loopController, displayName, uiElement }

  // Helper: hitung umur captcha token dalam detik
  function getCaptchaAgeSeconds(account) {
    return account && account.captchaTokenTimestamp
      ? Math.floor((Date.now() - account.captchaTokenTimestamp) / 1000)
      : null;
  }

  // Helper: pastikan captcha token segar (< 120 detik). Jika kadaluarsa atau kosong, refresh.
  async function ensureFreshCaptchaToken(account) {
    const ageMs = account.captchaTokenTimestamp ? (Date.now() - account.captchaTokenTimestamp) : Infinity;
    if (!account.captchaToken || ageMs > CAPTCHA_MAX_AGE_MS) {
      const ageSec = account.captchaTokenTimestamp ? Math.floor(ageMs / 1000) : null;
      updateAccountStatus(account, `Refreshing captcha token${ageSec != null ? ` (age ${ageSec}s)` : ''}...`, "#f1c40f");
      const newToken = await getTurnstileToken();
      account.captchaToken = newToken;
      account.captchaTokenTimestamp = Date.now();
      updateAccountStatus(account, "Captcha Ready! (refreshed)", "#00f3ff");
    }
  }

  // Handler tombol Verify License
  const verifyBtnEl = document.getElementById('verify-license-button');
  const licenseInputEl = document.getElementById('license-key-input');
  const licenseVerifiedIndicatorEl = document.getElementById('license-verified-indicator');
  const licenseVerifiedTextEl = document.getElementById('license-verified-text');
  const saveStartBtnEl = document.getElementById('save-start-button');
  const claimBtnEl = document.getElementById('claim-button');
  const reloadToggleBtnEl = document.getElementById('reload-toggle-button');
  const reloadStatusEl = document.getElementById('reload-status');
  const creditInfoEl = document.getElementById('credit-info');
  if (verifyBtnEl) {
    verifyBtnEl.onclick = function() {
      const key = (licenseInputEl && licenseInputEl.value || '').trim();
      if (!key) {
        addLog('Masukkan license key terlebih dahulu.', '#e74c3c');
        return;
      }
      const ws = window.dashboardWS;
      if (!ws || ws.readyState !== 1) {
        addLog('WebSocket belum terhubung. Menunggu koneksi...', '#f39c12');
        return;
      }
      addLog('Mengirim verifikasi lisensi ke server...', '#00f3ff');
      ws.send(JSON.stringify({ type: 'verify_license', license_key: key }));
    };
  }
  
  // === Fungsi untuk Testing ===
  window.testMultiClaim = function(testCode) { if (testCode && accounts.length > 0) claimForAllAccounts(testCode); }

  // === Reload scheduler basic implementation ===
  function updateReloadControlsEnable() {
    const canReload = licenseVerified && userCredit >= RELOAD_CREDIT_PER_CLAIM;
    if (reloadToggleBtnEl) {
      reloadToggleBtnEl.disabled = !canReload;
      reloadToggleBtnEl.style.opacity = canReload ? '1' : '0.6';
      reloadToggleBtnEl.style.cursor = canReload ? 'pointer' : 'not-allowed';
    }
  }

  

  async function performReloadCycle() {
    if (!reloadSchedulerActive) return;
    if (!licenseVerified || !userId) {
      addLog('Reload paused: license not verified.', '#f39c12');
      return;
    }
    if (isCodeClaimInProgress) {
      addLog('Reload paused during bonus code claim.', '#f39c12');
      scheduleNextReload();
      return;
    }
    const readyAccounts = accounts.filter(acc => acc.captchaToken);
    if (readyAccounts.length === 0) {
      addLog('No accounts ready for reload yet.', '#f1c40f');
      scheduleNextReload();
      return;
    }
    // Ensure tokens fresh
    for (const acc of readyAccounts) {
      try { await ensureFreshCaptchaToken(acc); } catch (_) {}
    }
    // For now, only deduct credit per ready account to integrate accounting; actual reload claim handled elsewhere
    const successCount = readyAccounts.length;
    try {
      const ws = window.dashboardWS;
      if (ws && ws.readyState === 1 && userId) {
        ws.send(JSON.stringify({ type: 'deduct_credit', userId: userId, successCount: successCount, source: 'reload_claim', creditPerClaim: RELOAD_CREDIT_PER_CLAIM }));
        addLog(`Requested reload deduction: ${successCount} x ${RELOAD_CREDIT_PER_CLAIM}.`, '#00f3ff');
      }
    } catch (_) {}
    scheduleNextReload();
  }

  function scheduleNextReload() {
    if (reloadTimerId) clearTimeout(reloadTimerId);
    // Default interval: 60 seconds; adjust as needed
    reloadTimerId = setTimeout(performReloadCycle, 60000);
  }

  if (reloadToggleBtnEl) {
    reloadToggleBtnEl.addEventListener('click', function() {
      if (!licenseVerified) return;
      const canReload = userCredit >= RELOAD_CREDIT_PER_CLAIM;
      if (!canReload) {
        addLog(`Credit insufficient for reload. Need ${RELOAD_CREDIT_PER_CLAIM}.`, '#e74c3c');
        return;
      }
      reloadSchedulerActive = !reloadSchedulerActive;
      reloadStatusEl.textContent = reloadSchedulerActive ? 'ON' : 'OFF';
      reloadToggleBtnEl.textContent = reloadSchedulerActive ? 'STOP RELOAD' : 'START RELOAD';
      if (reloadSchedulerActive) {
        addLog('Reload scheduler started.', '#2ecc71');
        scheduleNextReload();
      } else {
        addLog('Reload scheduler stopped.', '#f39c12');
        if (reloadTimerId) clearTimeout(reloadTimerId);
        reloadTimerId = null;
      }
    });
  }

  

  // === Fungsi log panel ===
  function addLog(message, color = '#f1c40f') {
    const logPanel = document.getElementById('log-panel');
    if (!logPanel) return;
    const time = new Date().toLocaleTimeString();
    const entry = document.createElement('div');
    entry.textContent = `[${time}] ${message}`;
    entry.style.color = color;
    logPanel.appendChild(entry);
    logPanel.scrollTop = logPanel.scrollHeight;
  }

  // === Turnstile token ===
  async function getTurnstileToken() {
    try {
      const capmonsterKey = "6232da3eb635cd2788907e6b8e8afb1a";
      const siteKey = "0x4AAAAAAAGD4gMGOTFnvupz";
      const websiteURL = "https://stake.com/";
      const create = await fetch("https://api.capmonster.cloud/createTask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientKey: capmonsterKey, task: { type: "TurnstileTaskProxyless", websiteURL, websiteKey: siteKey } }), }).then(res => res.json());
      if (!create.taskId) throw new Error("Failed to create task");
      // Poll setiap 1 detik sampai hasil siap
      while (true) {
        await new Promise(r => setTimeout(r, 1000));
        const result = await fetch("https://api.capmonster.cloud/getTaskResult", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ clientKey: capmonsterKey, taskId: create.taskId }), }).then(r => r.json());
        if (result.status === "ready") return result.solution.token;
        if (result.errorId > 0 && result.errorCode !== "TASK_NOT_READY") throw new Error(result.errorDescription || "Error");
      }
    } catch (e) { throw e; }
  }
  
  // === Klaim Otomatis untuk SATU akun ===
  async function performClaim(account, code) {
    const startTime = Date.now();
    // Guard: hindari mengklaim ulang kode yang sama untuk akun ini
    if (!account.claimedCodes) account.claimedCodes = [];
    if (account.claimedCodes.includes(code)) {
      updateAccountStatus(account, `✓ Already processed code: ${code}`, "#3498db");
      return;
    }
    // Pastikan captcha token masih segar (<120s); jika tidak, refresh sebelum klaim
    if (!account.captchaToken || !account.captchaTokenTimestamp || (Date.now() - account.captchaTokenTimestamp) > CAPTCHA_MAX_AGE_MS) {
      try {
        await ensureFreshCaptchaToken(account);
      } catch (e) {
        updateAccountStatus(account, `❌ Failed to refresh captcha: ${e.message}`, "#e74c3c");
        return;
      }
    }
    const ageSecBeforeClaim = getCaptchaAgeSeconds(account);
    if (ageSecBeforeClaim != null) {
      addLog(`${account.displayName}: Captcha age ${ageSecBeforeClaim}s`, '#00f3ff');
    }
    updateAccountStatus(account, "Claiming...", "#f1c40f");
    try {
      const headers = { "accept": "application/json", "content-type": "application/json", "x-access-token": account.apiToken };
      const payload = { "query": "mutation ClaimConditionBonusCode($code: String!, $currency: CurrencyEnum!, $turnstileToken: String!) {\n  claimConditionBonusCode(\n    code: $code\n    currency: $currency\n    turnstileToken: $turnstileToken\n  ) {\n    bonusCode {\n      id\n      code\n    }\n    amount\n    currency\n  }\n}\n", "variables": { "code": code, "currency": COIN, "turnstileToken": account.captchaToken } };
      const res = await fetch(`${window.location.origin}/_api/graphql`, { method: "POST", headers, body: JSON.stringify(payload) });
      const data = await res.json();
       if (data.errors && data.errors.length > 0) {
        const errorMessage = data.errors[0].message || "Unknown error";
        updateAccountStatus(account, `❌ ${errorMessage}`, "#e74c3c");
        addLog(`${account.displayName}: Claim failed - ${errorMessage}`, '#e74c3c');
      } else if (data.data && data.data.claimConditionBonusCode) {
        const claimData = data.data.claimConditionBonusCode;
        updateAccountStatus(account, `✅ ${claimData.amount} ${claimData.currency}!`, "#00f3ff");
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        addLog(`${account.displayName}: Successfully claimed - ${claimData.amount} ${claimData.currency} in ${duration.toFixed(2)}s`, '#39ff14');
        // Simpan ke riwayat klaim & tampilkan pada tabel
        try {
          const items = _loadClaimHistory();
          const entry = { username: account.displayName, value: Number(claimData.amount||0), currency: String(claimData.currency||COIN).toUpperCase(), waktuSec: Number(duration||0), code: String(code||'') };
          items.push(entry);
          _saveClaimHistory(items);
          _appendClaimRowToTable(entry);
        } catch (_) {}
        // Kirim ke dashboard WebSocket jika tersedia
        if (window.dashboardWS && window.dashboardWS.readyState === 1) {
          account.totalClaimed = (account.totalClaimed || 0) + claimData.amount;
          saveTotalClaimed(account);
          window.dashboardWS.send(JSON.stringify({
            id: window.BOT_ID || 'unknown',
            username: account.displayName,
            totalClaimed: account.totalClaimed,
            currency: claimData.currency,
            timestamp: Date.now()
          }));
        }
        // Regenerate captcha token after successful claim
        account.captchaToken = null;
        account.captchaTokenTimestamp = null;
        return true;
      } else {
        updateAccountStatus(account, "⚠️ Unknown response", "#f1c40f");
        addLog(`${account.displayName}: Unknown response`, '#f1c40f');
        account.captchaToken = null;
        account.captchaTokenTimestamp = null;
        return false;
      }
    } catch (e) {
      updateAccountStatus(account, `❌ Error: ${e.message}`, "#e74c3c");
      addLog(`${account.displayName}: Claim error - ${e.message}`, '#e74c3c');
      return false;
    }
    // Tandai kode sebagai sudah diproses agar tidak mengulang klaim
    if (!account.claimedCodes) account.claimedCodes = [];
    account.claimedCodes.push(code);
    if (account.claimedCodes.length > 50) {
      account.claimedCodes = account.claimedCodes.slice(-50);
    }
    
    // Immediately get new token after claim attempt
    try {
      const newToken = await getTurnstileToken();
      account.captchaToken = newToken;
      account.captchaTokenTimestamp = Date.now();
      updateAccountStatus(account, "New token generated!", "#00f3ff");
    } catch (e) {
      account.captchaToken = null;
      account.captchaTokenTimestamp = null;
      updateAccountStatus(account, `❌ Failed to generate new token: ${e.message}`, "#e74c3c");
    }
  }

  // === Klaim Otomatis untuk SEMUA akun ===
  async function claimForAllAccounts(code, accountsToClaim = accounts) {
    isCodeClaimInProgress = true;
    addLog(`Attempting to claim code: ${code} for ${accountsToClaim.length} accounts...`);
    // Guard kredit sebelum klaim
    const requiredCredit = CURRENT_CLAIM_RATE;
    if (userCredit < requiredCredit) {
      addLog(`Kredit tidak cukup. Minimal ${requiredCredit} diperlukan. Meminta update kredit...`, '#e74c3c');
      try {
        if (ws && ws.readyState === 1 && userId) {
          ws.send(JSON.stringify({ type: 'check_credit', user_id: userId }));
        }
      } catch (_) {}
      const cp = document.getElementById('claim-plan');
      if (cp) cp.textContent = `CLAIM PLAN: dibatalkan (kredit kurang: ${userCredit}/${requiredCredit})`;
      isCodeClaimInProgress = false;
      return;
    }
    // Tandai kode sedang diproses untuk sinkronisasi dengan polling
    lastProcessedCode = code;

    // Segarkan token kadaluarsa sebelum klaim
    await Promise.all(
      accountsToClaim.map(async (acc) => {
        try {
          await ensureFreshCaptchaToken(acc);
        } catch (e) {
          updateAccountStatus(acc, `❌ Failed to refresh captcha: ${e.message}`, "#e74c3c");
        }
      })
    );

    // Klaim hanya untuk akun yang memiliki token setelah upaya refresh
    let preparedAccounts = accountsToClaim.filter(acc => acc.captchaToken);
    // Batasi jumlah akun sesuai saldo kredit
    const maxAccounts = Math.floor(userCredit / CURRENT_CLAIM_RATE);
    if (preparedAccounts.length > maxAccounts) {
      addLog(`Membatasi klaim ke ${maxAccounts} akun sesuai kredit (${userCredit}).`, '#f39c12');
      preparedAccounts = preparedAccounts.slice(0, Math.max(0, maxAccounts));
    }
    // Update UI: tampilkan rencana klaim dan daftar akun terpilih
    try {
      const cp = document.getElementById('claim-plan');
      if (cp) {
        const names = preparedAccounts.map(a => a.displayName).join(', ');
        cp.textContent = `CLAIM PLAN: ${preparedAccounts.length} akun (maks ${maxAccounts} by credit ${userCredit}) → [${names || 'tidak ada'}]`;
      }
    } catch (_) {}
    addLog(`Claiming accounts: ${preparedAccounts.map(a => a.displayName).join(', ') || 'none'}`);
    const results = await Promise.all(preparedAccounts.map(account => performClaim(account, code)));
    const successfulClaims = results.filter(Boolean).length;
    // Jika ada klaim sukses, minta server mengurangi kredit
    if (successfulClaims > 0) {
      try {
        if (ws && ws.readyState === 1 && userId) {
          ws.send(JSON.stringify({ type: 'deduct_credit', userId: userId, successCount: successfulClaims, source: 'claim_success' }));
        }
      } catch (_) {}
      addLog(`${successfulClaims} klaim sukses. Meminta pengurangan kredit ${successfulClaims} x ${CURRENT_CLAIM_RATE}.`, '#00f3ff');
      // Update UI: tandai selesai klaim sejumlah akun
      try {
        const cp = document.getElementById('claim-plan');
        if (cp) cp.textContent += ` • selesai: ${successfulClaims} sukses`;
      } catch (_) {}
    }
    if (!finishedLoggedCodes.has(code)) {
      addLog('Finished claim attempts for all ready accounts.');
      finishedLoggedCodes.add(code);
    }
    isCodeClaimInProgress = false;
  }

  // === Loop Regenerate Token untuk SATU akun ===
  async function regenerateTurnstileTokenLoop(account) {
    // Gating: Jangan regenerasi jika dimatikan atau bot belum berjalan
    if (DISABLE_TOKEN_REGEN || !botRunning) {
      addLog('Regenerate loop dibatalkan: DISABLE_TOKEN_REGEN aktif atau bot OFF', '#f39c12');
      if (account.loopController) account.loopController.active = false;
      return;
    }
    while (account.loopController.active) {
      try {
        updateAccountStatus(account, "Getting captcha...", "#f1c40f");
        const newToken = await getTurnstileToken();
        account.captchaToken = newToken;
        account.captchaTokenTimestamp = Date.now();
        updateAccountStatus(account, "Captcha Ready! (regenerated)", "#00f3ff");
        const waitTime = 110000; // 110 seconds
        await new Promise(res => setTimeout(res, waitTime));
      } catch (e) {
        updateAccountStatus(account, "Captcha Failed!", "#e74c3c");
        account.captchaToken = null;
        await new Promise(res => setTimeout(res, 10000));
      }
    }
  }

  let instanStatus = 'off';
  let instanInterval = null;
  // Guard untuk mencegah klaim berulang pada kode yang sama
  let lastProcessedCode = null;
  // Log guard: tampilkan pesan selesai hanya sekali per kode
  const finishedLoggedCodes = new Set();
  // Track amount for the last received code (if provided)
  let lastCodeAmount = null;

  // Helper: cek apakah amount lolos filter
  function isAmountAllowed(amount) {
    try {
      const filters = window.amountFilters || { '1': false, '2': false, '3': false, '4': false, '5': false, 'gt5': false };
      const anySelected = Object.values(filters).some(Boolean);
      if (!anySelected) return true; // jika tidak ada yang dicentang, jangan saring
      const matchesExact = (amount === 1 && filters['1'])
        || (amount === 2 && filters['2'])
        || (amount === 3 && filters['3'])
        || (amount === 4 && filters['4'])
        || (amount === 5 && filters['5']);
      const matchesGt5 = amount > 5 && filters['gt5'];
      return matchesExact || matchesGt5;
    } catch (_) {
      return true;
    }
  }

  // === Polling Utama (cek kode dan status instan) ===
  async function poll() {
    try {
      // Jangan paksa instan ON di polling; hormati status dari WebSocket
      if (instanStatus === 'on') {
        if (DISABLE_TOKEN_REGEN || !botRunning) {
          addLog('Instan ON (poll) diabaikan: regenerasi disabled atau bot OFF', '#f39c12');
          for (const acc of accounts) { if (acc.loopController) acc.loopController.active = false; }
          document.getElementById('status-indicator').textContent = botRunning ? t('status_active') : t('status_standby');
          document.getElementById('status-indicator').style.background = botRunning ? '#2ecc71' : '#f39c12';
        } else {
          for (const acc of accounts) {
            if (!acc.loopController) acc.loopController = { active: true };
            acc.loopController.active = true;
            if (!acc.regenLoopStarted) { acc.regenLoopStarted = true; regenerateTurnstileTokenLoop(acc); }
          }
          document.getElementById('status-indicator').textContent = t('status_active');
          document.getElementById('status-indicator').style.background = '#2ecc71';
        }
      } else {
        for (const acc of accounts) { if (acc.loopController) acc.loopController.active = false; }
        document.getElementById('status-indicator').textContent = t('status_standby');
        document.getElementById('status-indicator').style.background = '#f39c12';
      }

      // Proses klaim hanya untuk kode yang belum diproses
      if (lastCode && lastCode !== lastProcessedCode) {
        // Jika lastCode memiliki amount, terapkan filter
        if (lastCodeAmount != null && !isAmountAllowed(lastCodeAmount)) {
          addLog(`Code ${lastCode} ignored by amount filter (${lastCodeAmount}$).`, '#f39c12');
          // Jangan set lastProcessedCode agar kode baru yang berbeda tetap bisa diproses nanti
          return;
        }
        document.getElementById('code-display').textContent = lastCode;
        if (accounts.length > 0) {
          const readyAccounts = accounts.filter(acc => acc.captchaToken);
          if (readyAccounts.length > 0) {
            claimForAllAccounts(lastCode, readyAccounts);
            lastProcessedCode = lastCode;
          } else {
            addLog('No accounts ready to claim, waiting for captcha tokens...', '#f1c40f');
          }
        }
      }
    } catch (e) {
      addLog(`Polling error: ${e.message}`, '#e74c3c');
    }
    setTimeout(poll, 1000);
  }

  // === WebSocket untuk dashboard dan kode (1 server) ===
  let wsPingInterval = null;
  function connectWebSocket() {
    if (window.dashboardWS && window.dashboardWS.readyState === 1) {
      return;
    }
    let ws = new window.WebSocket('wss://fdcae0ea6c3f.ngrok-free.app');
    window.dashboardWS = ws;
    ws.onopen = function() {
      ws.send(JSON.stringify({type: 'bot'}));
      addLog('Connected to WebSocket server (dashboard & codes) via ngrok!', '#00f3ff');
      document.getElementById('status-indicator').textContent = t('status_connected');
      document.getElementById('status-indicator').style.background = '#2ecc71';
      
      if (wsPingInterval) clearInterval(wsPingInterval);
      wsPingInterval = setInterval(() => {
        if (ws.readyState === 1) {
          ws.send(JSON.stringify({type: 'ping'}));
        }
      }, 30000);
    };
    ws.onerror = function(e) {
      addLog('WebSocket error: ' + (e.message || e), '#e74c3c');
      document.getElementById('status-indicator').textContent = t('status_error');
      document.getElementById('status-indicator').style.background = '#e74c3c';
    };
    ws.onclose = function() {
      addLog('WebSocket disconnected, attempting to reconnect in 1 second...', '#e74c3c');
      document.getElementById('status-indicator').textContent = t('status_reconnecting');
      document.getElementById('status-indicator').style.background = '#f39c12';
      if (wsPingInterval) clearInterval(wsPingInterval);
      setTimeout(connectWebSocket, 1000);
    };
    ws.onmessage = function(event) {
      try {
        const data = JSON.parse(event.data);
        // Lisensi & kredit events
        if (data.type === 'verify_ack' && (data.ok === true || data.user_id || data.userId)) {
          userId = String(data.user_id ?? data.userId);
          licenseVerified = true;
          if (licenseVerifiedIndicatorEl) licenseVerifiedIndicatorEl.style.background = '#2ecc71';
          if (licenseVerifiedTextEl) licenseVerifiedTextEl.textContent = t('verified');
          // Tampilkan User ID pada UI dan simpan
          const uidEl = document.getElementById('user-id-display');
          if (uidEl) uidEl.value = userId;
          try { localStorage.setItem('botId', userId); } catch {}
          // Jika kredit sudah dikirim dalam verify_ack, gunakan langsung
          if (typeof data.credit === 'number') {
            userCredit = Math.floor(data.credit);
            addLog(`Lisensi OK. Kredit: ${userCredit}`, '#2ecc71');
            if (creditInfoEl) creditInfoEl.textContent = `${t('credit_label')}: ${userCredit}`;
          } else {
            addLog('Lisensi OK. Meminta data kredit...', '#2ecc71');
            if (ws.readyState === 1) ws.send(JSON.stringify({ type: 'check_credit', user_id: userId }));
          }
          // Sinkronkan rate dinamis jika dikirim server
          if (typeof data.claimRate === 'number') {
            CURRENT_CLAIM_RATE = Math.floor(data.claimRate);
            addLog(`Claim rate sekarang: ${CURRENT_CLAIM_RATE} kredit/claim`, '#00f3ff');
          }
          // Aktifkan tombol jika memenuhi syarat
          const enable = licenseVerified && userCredit >= CURRENT_CLAIM_RATE;
          if (saveStartBtnEl) { saveStartBtnEl.disabled = !enable; saveStartBtnEl.style.opacity = enable ? '1' : '0.6'; saveStartBtnEl.style.cursor = enable ? 'pointer' : 'not-allowed'; }
          if (claimBtnEl) { claimBtnEl.disabled = !enable; claimBtnEl.style.opacity = enable ? '1' : '0.6'; claimBtnEl.style.cursor = enable ? 'pointer' : 'not-allowed'; }
          updateReloadControlsEnable();
        }
        if (data.type === 'verify_error') {
          licenseVerified = false;
          userId = '';
          addLog('Verifikasi lisensi gagal. Periksa license key.', '#e74c3c');
          if (licenseVerifiedIndicatorEl) licenseVerifiedIndicatorEl.style.background = '#e74c3c';
          if (licenseVerifiedTextEl) licenseVerifiedTextEl.textContent = 'NOT VERIFIED';
            if (creditInfoEl) creditInfoEl.textContent = `${t('credit_label')}: 0`;
          if (saveStartBtnEl) { saveStartBtnEl.disabled = true; saveStartBtnEl.style.opacity = '0.6'; saveStartBtnEl.style.cursor = 'not-allowed'; }
          if (claimBtnEl) { claimBtnEl.disabled = true; claimBtnEl.style.opacity = '0.6'; claimBtnEl.style.cursor = 'not-allowed'; }
          updateReloadControlsEnable();
        }
        if (data.type === 'credit' && typeof data.credit === 'number') {
          userCredit = Math.floor(data.credit);
          addLog(`Kredit tersedia: ${userCredit}`, '#00f3ff');
            if (creditInfoEl) creditInfoEl.textContent = `${t('credit_label')}: ${userCredit}`;
          if (typeof data.claimRate === 'number') {
            CURRENT_CLAIM_RATE = Math.floor(data.claimRate);
            addLog(`Claim rate sekarang: ${CURRENT_CLAIM_RATE} kredit/claim`, '#00f3ff');
          }
          // Enable kontrol hanya jika kredit cukup
          const enable = licenseVerified && userCredit >= CURRENT_CLAIM_RATE;
          if (saveStartBtnEl) {
            saveStartBtnEl.disabled = !enable;
            saveStartBtnEl.style.opacity = enable ? '1' : '0.6';
            saveStartBtnEl.style.cursor = enable ? 'pointer' : 'not-allowed';
          }
          if (claimBtnEl) {
            claimBtnEl.disabled = !enable;
            claimBtnEl.style.opacity = enable ? '1' : '0.6';
            claimBtnEl.style.cursor = enable ? 'pointer' : 'not-allowed';
          }
          updateReloadControlsEnable();
        }
        if (data.type === 'deduct_ack' && typeof data.remaining === 'number') {
          userCredit = Math.floor(data.remaining);
            if (creditInfoEl) creditInfoEl.textContent = `${t('credit_label')}: ${userCredit}`;
          if (typeof data.creditPerClaim === 'number') {
            CURRENT_CLAIM_RATE = Math.floor(data.creditPerClaim);
          }
          updateReloadControlsEnable();
        }
        if (data.type === 'code' && data.code) {
          if (data.code !== lastCode) {
            // Jika payload menyertakan amount, lakukan filter
            const incomingAmount = typeof data.amount === 'number' ? data.amount : (typeof data.Amount === 'number' ? data.Amount : null);
            if (incomingAmount != null) {
              if (!isAmountAllowed(incomingAmount)) {
                addLog(`Code ${data.code} ignored by amount filter (${incomingAmount}$).`, '#f39c12');
                return; // abaikan kode jika tidak lolos filter
              }
              lastCodeAmount = incomingAmount;
              addLog(`Incoming code amount: ${incomingAmount}$`, '#00f3ff');
            } else {
              lastCodeAmount = null; // tidak ada amount, jangan terapkan filter
            }

            lastCode = data.code;
            document.getElementById('code-display').textContent = lastCode;
            if (accounts.length > 0) {
              const readyAccounts = accounts.filter(acc => acc.captchaToken);
              if (readyAccounts.length > 0) {
                claimForAllAccounts(lastCode, readyAccounts);
                // Tandai kode sudah diproses agar polling tidak mengulang
                lastProcessedCode = lastCode;
              } else {
                addLog('No accounts ready to claim, waiting for captcha tokens...', '#f1c40f');
              }
            }
            if (typeof addLog === 'function') addLog('New code from WebSocket: ' + lastCode, '#39ff14');
          }
        }
        if (data.type === 'instan' && data.status) {
          instanStatus = data.status.toLowerCase();
          addLog('Instant status: ' + instanStatus, '#00f3ff');
          if (instanStatus === 'on') {
            // Hormati DISABLE_TOKEN_REGEN dan status botRunning
            if (DISABLE_TOKEN_REGEN || !botRunning) {
              addLog('Instan ON diabaikan: regenerasi token dimatikan atau bot OFF', '#f39c12');
              for (const acc of accounts) {
                if (acc.loopController) acc.loopController.active = false;
              }
              document.getElementById('status-indicator').textContent = botRunning ? t('status_active') : t('status_standby');
              document.getElementById('status-indicator').style.background = botRunning ? '#2ecc71' : '#f39c12';
            } else {
              for (const acc of accounts) {
                if (!acc.loopController) acc.loopController = { active: true };
                acc.loopController.active = true;
                if (!acc.regenLoopStarted) {
                  acc.regenLoopStarted = true;
                  regenerateTurnstileTokenLoop(acc);
                }
              }
              document.getElementById('status-indicator').textContent = t('status_active');
              document.getElementById('status-indicator').style.background = '#2ecc71';
            }
          } else {
            for (const acc of accounts) {
              if (acc.loopController) acc.loopController.active = false;
            }
            document.getElementById('status-indicator').textContent = 'STANDBY';
            document.getElementById('status-indicator').style.background = '#f39c12';
          }
        }
      } catch (e) {}
    };
  }
  connectWebSocket();

  function maskUsername(username) {
    if (!username || username.length < 6) return username;
    return username.slice(0, 3) + '****' + username.slice(-2);
  }


  function updateAccountStatus(account, message, color) {
    const statusEl = account.uiElement.querySelector('.account-status');
    if (!statusEl) return;
    
    statusEl.textContent = message;
    statusEl.style.color = color;

  }
  
  // === Fungsi untuk ambil username dari Stake ===
  async function fetchStakeUsername(apiToken) {
    try {
      const headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "x-access-token": apiToken
      };
      const payload = {
        query: "query User { user { id name } }",
        variables: {}
      };
      const res = await fetch(`${window.location.origin}/_api/graphql`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      return data?.data?.user?.name || null;
    } catch (e) {
      return null;
    }
  }

  // Fungsi untuk generate key unik totalClaimed di localStorage
  function getTotalClaimedKey(account) {
    return 'totalClaimed_' + btoa(account.apiToken).replace(/[^a-zA-Z0-9]/g, '');
  }

  // Fungsi untuk load totalClaimed dari localStorage
  function loadTotalClaimed(account) {
    const key = getTotalClaimedKey(account);
    const val = localStorage.getItem(key);
    return val ? parseFloat(val) : 0;
  }

  // Fungsi untuk simpan totalClaimed ke localStorage
  function saveTotalClaimed(account) {
    const key = getTotalClaimedKey(account);
    localStorage.setItem(key, account.totalClaimed);
  }

  // === Manajemen Akun dan UI ===
  async function saveAndStart() {
    // Guard lisensi & kredit
    if (!licenseVerified) {
      addLog('Lisensi belum terverifikasi. Klik VERIFY terlebih dahulu.', '#e74c3c');
      return;
    }
    if (userCredit < CURRENT_CLAIM_RATE) {
      addLog(`Kredit tidak cukup (tersedia: ${userCredit}). Hubungi admin.`, '#e74c3c');
      return;
    }
    if (!userId) {
      addLog('ERROR: User ID belum tersedia dari verifikasi lisensi.', '#e74c3c');
      return;
    }
    window.BOT_ID = String(userId);
    localStorage.setItem('botId', String(userId));
    const tokensText = document.getElementById('api-tokens-input').value;
    localStorage.setItem('stakeApiTokens', tokensText);
    
    // Stop any existing loops
    for (const acc of accounts) {
      if (acc.loopController) acc.loopController.active = false;
    }
    
    const statusContainer = document.getElementById('account-status-area');
    statusContainer.innerHTML = '';
    
    const newTokens = tokensText.split('\n').map(t => t.trim()).filter(t => t);
    accounts = [];
    
    // Update account count
    document.getElementById('account-count').textContent = `${newTokens.length} accounts`;
    
    for (const token of newTokens) {
      const displayName = `Token...${token.slice(-5)}`;
      const accountId = 'acc-' + btoa(token).replace(/[^a-zA-Z0-9]/g, '').slice(0, 8) + '-' + Math.floor(Math.random()*10000);
      
      const row = document.createElement('div');
      row.className = 'account-row';
      row.id = accountId;
      row.style = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        margin-bottom: 8px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 6px;
        border-left: 3px solid #00f3ff;
      `;
      
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 8px; height: 8px; border-radius: 50%; background: #f39c12;"></div>
          <span class="account-name" style="font-weight: 600; color: #00f3ff;">${displayName}</span>
        </div>
        <span class="account-status" style="font-size: 13px; color: #f39c12;">Getting username...</span>
      `;
      
      statusContainer.appendChild(row);
      
      const account = {
        id: accountId,
        apiToken: token,
        captchaToken: null,
        loopController: { active: instanStatus === 'on' },
        displayName: displayName,
        uiElement: row,
        totalClaimed: 0
      };
      
      // Load totalClaimed dari localStorage
      account.totalClaimed = loadTotalClaimed(account);
      accounts.push(account);
      
      fetchStakeUsername(token).then(username => {
        if (username) {
          account.displayName = username;
          row.querySelector('.account-name').textContent = username;
          row.querySelector('.account-status').textContent = "Getting captcha...";
          
          getTurnstileToken()
            .then(token => {
              account.captchaToken = token;
              account.captchaTokenTimestamp = Date.now();
              row.querySelector('.account-status').textContent = "Captcha Ready!";
              row.querySelector('.account-status').style.color = "#00f3ff";
              row.querySelector('div > div').style.background = "#2ecc71";
              
              // Jika lastCode sudah ada, terapkan filter amount (jika tersedia) lalu klaim
              if (lastCode) {
                if (lastCodeAmount != null && !isAmountAllowed(lastCodeAmount)) {
                  addLog(`Account ${account.displayName}: code ${lastCode} ignored by amount filter (${lastCodeAmount}$).`, '#f39c12');
                } else {
                  addLog(`Account ${account.displayName} ready, attempting to claim last code: ${lastCode}`);
                  claimForAllAccounts(lastCode, [account]);
                }
              }
            })
            .catch(e => {
              row.querySelector('.account-status').textContent = `❌ Captcha error: ${e.message}`;
              row.querySelector('.account-status').style.color = "#e74c3c";
              row.querySelector('div > div').style.background = "#e74c3c";
            });
        } else {
          row.querySelector('.account-status').textContent = "Failed to get username";
          row.querySelector('.account-status').style.color = "#e74c3c";
          row.querySelector('div > div').style.background = "#e74c3c";
        }
      });
    }
    
    document.getElementById('code-display').textContent = accounts.length > 0 
      ? t('waiting_code') 
      : t('no_accounts');
    
    // Tandai bot berjalan
    botRunning = true;
    addLog(`Bot started with ${accounts.length} accounts`, '#00f3ff');
    document.getElementById('status-indicator').textContent = t('status_active');
    document.getElementById('status-indicator').style.background = '#2ecc71';
  }

  function loadAccounts() {
    const savedBotId = localStorage.getItem('botId');
    if (savedBotId) {
      const uidEl = document.getElementById('user-id-display');
      if (uidEl) uidEl.value = savedBotId;
      window.BOT_ID = savedBotId;
    }
    
    const savedTokens = localStorage.getItem('stakeApiTokens');
    if (savedTokens) {
      document.getElementById('api-tokens-input').value = savedTokens;
      saveAndStart();
    } else {
      document.getElementById('code-display').textContent = t('enter_tokens_start');
      document.getElementById('status-indicator').textContent = t('status_offline');
      document.getElementById('status-indicator').style.background = '#e74c3c';
    }
  }

  // === Inisialisasi ===
  document.getElementById('save-start-button').onclick = saveAndStart;
  loadAccounts();
  addLog('Bot initialized. Waiting for configuration...', '#00f3ff');
  document.getElementById('status-indicator').textContent = 'OFFLINE';
  document.getElementById('status-indicator').style.background = '#e74c3c';

  // Start polling
  poll();
})();
