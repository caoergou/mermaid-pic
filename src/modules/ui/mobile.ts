import { state } from '../store';
import { STRINGS } from '../i18n';
import { copyShareLink, downloadPng, downloadSvg } from '../export';
import { showToast } from '../utils';
import { openHelp } from './theme';

/**
 * 切换移动端标签页
 * @param {string} tab - 标签名称 ('editor' 或 'preview')
 */
export function switchMobileTab(tab) {
  const tabEditor = document.getElementById('tab-editor');
  const tabPreview = document.getElementById('tab-preview');
  const panelEditor = document.querySelector('.panel--editor');
  const panelPreview = document.querySelector('.panel--preview');

  if (tab === 'editor') {
    tabEditor.classList.add('active');
    tabPreview.classList.remove('active');
    panelEditor.classList.remove('mobile-hidden');
    panelPreview.classList.add('mobile-hidden');
  } else {
    tabPreview.classList.add('active');
    tabEditor.classList.remove('active');
    panelPreview.classList.remove('mobile-hidden');
    panelEditor.classList.add('mobile-hidden');
  }
}

/**
 * 初始化移动端 UI 逻辑
 */
export function initMobileUI() {
  const tabEditor = document.getElementById('tab-editor');
  const tabPreview = document.getElementById('tab-preview');
  
  tabEditor.addEventListener('click', () => { switchMobileTab('editor'); });
  tabPreview.addEventListener('click', () => { switchMobileTab('preview'); });

  // 移动端溢出菜单
  const btnMobileMore = document.getElementById('btn-mobile-more');
  const mobileOverflowMenu = document.getElementById('mobile-overflow-menu');
  const mobileOverflowBackdrop = document.getElementById('mobile-overflow-backdrop');

  if (btnMobileMore && mobileOverflowMenu) {
    btnMobileMore.addEventListener('click', e => {
      e.stopPropagation();
      mobileOverflowMenu.classList.toggle('open');
    });
    mobileOverflowBackdrop.addEventListener('click', () => {
      mobileOverflowMenu.classList.remove('open');
    });

    const mobBtnShare = document.getElementById('mob-btn-share');
    const mobBtnDownloadPng = document.getElementById('mob-btn-download-png');
    const mobBtnDownloadSvg = document.getElementById('mob-btn-download-svg');
    const mobBtnHelp = document.getElementById('mob-btn-help');

    if (mobBtnShare) mobBtnShare.addEventListener('click', () => {
      mobileOverflowMenu.classList.remove('open');
      copyShareLink().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
    });
    if (mobBtnDownloadPng) mobBtnDownloadPng.addEventListener('click', () => {
      mobileOverflowMenu.classList.remove('open');
      downloadPng().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
    });
    if (mobBtnDownloadSvg) mobBtnDownloadSvg.addEventListener('click', () => {
      mobileOverflowMenu.classList.remove('open');
      downloadSvg().catch(e => { showToast(STRINGS[state.currentLang].toastFailed + ': ' + e.message); });
    });
    if (mobBtnHelp) mobBtnHelp.addEventListener('click', () => {
      mobileOverflowMenu.classList.remove('open');
      openHelp();
    });
  }
}
