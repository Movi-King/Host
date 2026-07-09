// =====================================================
// HONOR OF KINGS — DRAFT PHASE (script.js)
// =====================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDCEUQ2buPUozZQ4IrNpk7qqSJmtT90fJ0",
  authDomain: "hokdb-d23de.firebaseapp.com",
  projectId: "hokdb-d23de",
  storageBucket: "hokdb-d23de.firebasestorage.app",
  messagingSenderId: "669973001193",
  appId: "1:669973001193:web:57d9a0c3870d3351cf5178",
  measurementId: "G-MY4RNW8L24"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ─── Hero Database ───────────────────────────────────
const HEROES = [
  { name: "Annette", role: "roam", color: "#ec4899", avatar: "https://camp.honorofkings.com/camp/admin/hero/head_128-128/49o0xBua.png" },
  { name: "Ata", role: "clash lane", color: "#f97316", avatar: "https://hokstats.gg/heroes-icons/ata.jpg" },
  { name: "Devara", role: "clash lane", color: "#f97316", avatar: "https://camp.honorofkings.com/camp/admin/default/MagzAk8i.png" },
  { name: "Fatih", role: "clash lane", color: "#f97316", avatar: "https://hokstats.gg/heroes-icons/fatih.png" },

  { name: "Garuda", role: "mid", color: "#6366f1", avatar: "https://hokstats.gg/heroes-icons/garuda.png" },
  { name: "Luara", role: "farm", color: "#22c55e", avatar: "https://hokstats.gg/heroes-icons/luara.png" },
  { name: "Agudo", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg" },
  { name: "Alessio", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/545/545.jpg" },
  { name: "Allain", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/514/514.jpg" },
  { name: "Angela", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" },
  { name: "Loong", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/519/519.jpg" },
  { name: "Arke", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" },
  { name: "Arli", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" },
  { name: "Arthur", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" },
  { name: "Athena", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" },
  { name: "Augran", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/517/517.jpg" },
  { name: "Bai Qi", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" },
  { name: "Biron", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" },
  { name: "Cai Yan", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" },
  { name: "Chano", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" },
  { name: "Charlotte", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/536/536.jpg" },
  { name: "Chicha", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/172/172.jpg" },
  { name: "Cirrus", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" },
  { name: "Consort Yu", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" },
  { name: "Da Qiao", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" },
  { name: "Daji", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" },
  { name: "Dharma", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" },
  { name: "Di Renjie", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" },
  { name: "Dian Wei", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" },
  { name: "Diaochan", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" },
  { name: "Dolia", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/159/159.jpg" },
  { name: "Donghuang", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" },
  { name: "Dr Bian", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" },
  { name: "Dun", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" },
  { name: "Dyadia", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/577/577.jpg" },
  { name: "Erin", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/155/155.jpg" },
  { name: "Fang", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" },
  { name: "Feyd", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/542/542.jpg" },
  { name: "Fuzi", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" },
  { name: "Gan & Mo", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" },
  { name: "Gao", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" },
  { name: "Prince of Lanling", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" },
  { name: "Garo", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" },
  { name: "Guan Yu", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" },
  { name: "Guiguzi", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" },
  { name: "Han Xin", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" },
  { name: "Haya", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/521/521.jpg" },
  { name: "Heino", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/563/563.jpg" },
  { name: "Hou Yi", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" },
  { name: "Huang Zhong", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" },
  { name: "Jing", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg" },
  { name: "Kaizer", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" },
  { name: "Kongming", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" },
  { name: "Kui", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" },
  { name: "Lady Sun", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" },
  { name: "Lady Zhen", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" },
  { name: "Lam", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/528/528.jpg" },
  { name: "Li Bai", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" },
  { name: "Li Xin", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" },
  { name: "Lian Po", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" },
  { name: "Liang", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" },
  { name: "Liu Bang", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" },
  { name: "Liu Bei", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" },
  { name: "Liu Shan", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" },
  { name: "Lu Bu", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" },
  { name: "Luban No.7", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" },
  { name: "Luna", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" },
  { name: "Mai Shiranui", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" },
  { name: "Marco Polo", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" },
  { name: "Mayene", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/564/564.jpg" },
  { name: "Meng Ya", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg" },
  { name: "Menki", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" },
  { name: "Mi Yue", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" },
  { name: "Milady", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" },
  { name: "Ming", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" },
  { name: "Mozi", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" },
  { name: "Mulan", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" },
  { name: "Musashi", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" },
  { name: "Nakoruru", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" },
  { name: "Nezha", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" },
  { name: "Nuwa", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" },
  { name: "Pei", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" },
  { name: "Sakeer", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/534/534.jpg" },
  { name: "Shangguan", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" },
  { name: "Shi", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg" },
  { name: "Shouyue", role: "farm", color: "#22c55e", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" },
  { name: "Sima Yi", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" },
  { name: "Sun Bin", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" },
  { name: "Sun Ce", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" },
  { name: "Ukyo Tachibana", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" },
  { name: "Umbrosa", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/558/558.jpg" },
  { name: "Princess Frost", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" },
  { name: "Wukong", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" },
  { name: "Wuyan", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" },
  { name: "Xiang Yu", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" },
  { name: "Xiao Qiao", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" },
  { name: "Xuance", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" },
  { name: "Yang Jian", role: "clash lane", color: "#f97316", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" },
  { name: "Yango", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" },
  { name: "Yao", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg" },
  { name: "Yaria", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" },
  { name: "Ying", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/538/538.jpg" },
  { name: "Yixing", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" },
  { name: "Yuhuan", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" },
  { name: "Zhang Fei", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" },
  { name: "Zhou Yu", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" },
  { name: "Zhuangzi", role: "roam", color: "#ec4899", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" },
  { name: "Zilong", role: "jungle", color: "#a855f7", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" },
  { name: "Ziya", role: "mid", color: "#6366f1", avatar: "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" },
];


// ─── Role Colors ─────────────────────────────────────
const ROLE_COLORS = {
  "clash lane": "#f97316",
  "jungle": "#a855f7",
  "mid": "#6366f1",
  "farm": "#22c55e",
  "roam": "#ec4899",
  warrior: "#f97316",
  tank: "#06b6d4",
  assassin: "#a855f7",
  mage: "#6366f1",
  marksman: "#22c55e",
  support: "#ec4899",
};

// ─── Draft Order ─────────────────────────────────────
// Standard competitive HOK draft order
// B = blue, R = red, 'ban' or 'pick'
const DRAFT_ORDER = [
  // Ban Phase 1: B-R-B-R
  { team: "blue", type: "ban" },
  { team: "red",  type: "ban" },
  { team: "blue", type: "ban" },
  { team: "red",  type: "ban" },
  // Pick Phase 1: B-R-R-B-B-R
  { team: "blue", type: "pick" },
  { team: "red",  type: "pick" },
  { team: "red",  type: "pick" },
  { team: "blue", type: "pick" },
  { team: "blue", type: "pick" },
  { team: "red",  type: "pick" },
  // Ban Phase 2: R-B-R-B
  { team: "red",  type: "ban" },
  { team: "blue", type: "ban" },
  { team: "red",  type: "ban" },
  { team: "blue", type: "ban" },
  // Pick Phase 2: R-B-B-R
  { team: "red",  type: "pick" },
  { team: "blue", type: "pick" },
  { team: "blue", type: "pick" },
  { team: "red",  type: "pick" },
];

// ─── State ───────────────────────────────────────────
let currentUser = localStorage.getItem('hokCurrentUser') || null;

let state = {
  currentStep: 0,
  selectedHero: null,
  blueBans: [],
  redBans: [],
  bluePicks: [],
  redPicks: [],
  timer: 30,
  timerInterval: null,
  filterRole: "all",
  searchQuery: "",
  isStarted: false,
    isPaused: false,
  history: []
};

// ─── DOM Elements ────────────────────────────────────
const heroGrid = document.getElementById("hero-grid");
const heroSearch = document.getElementById("hero-search");
const roleFilters = document.getElementById("role-filters");
const btnConfirm = document.getElementById("btn-confirm");
const confirmText = document.getElementById("confirm-text");
const btnReset = document.getElementById("btn-reset");
const btnAuto = document.getElementById("btn-auto");
const btnStart = document.getElementById("btn-start");
const btnPause = document.getElementById("btn-pause");
const historyList = document.getElementById("history-list");
const btnNewDraft = document.getElementById("btn-new-draft");
const phaseLabel = document.getElementById("phase-label");
const phaseTeam = document.getElementById("phase-team");
const timerText = document.getElementById("timer-text");
const timerProgress = document.getElementById("timer-progress");
const progressDots = document.getElementById("progress-dots");

// ─── Init ────────────────────────────────────────────
let draftCount = 1;

async function addDraftToHistory() {
  const matchRecord = {
    bluePicks: [...state.bluePicks],
    redPicks: [...state.redPicks],
    blueBans: [...state.blueBans],
    redBans: [...state.redBans],
    date: new Date().toISOString()
  };
  state.history.push(matchRecord);
  await saveHistoryToStorage();
  
  draftCount++;
  renderHistoryList();
}

// ─── Persistence ──────────────────────────────────────
async function loadHistoryFromStorage() {
  if (!currentUser) return;
  try {
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      state.history = docSnap.data().history || [];
    } else {
      state.history = [];
    }
  } catch (e) {
    console.error("Error loading history:", e);
    state.history = [];
  }
  draftCount = state.history.length + 1;
  renderHistoryList();
}

async function saveHistoryToStorage() {
  if (!currentUser) return;
  try {
    const docRef = doc(db, "users", currentUser);
    await setDoc(docRef, { history: state.history });
  } catch (e) {
    console.error("Error saving history:", e);
  }
}

function renderHistoryList() {
  historyList.innerHTML = '';
  if (state.history.length === 0) {
    historyList.innerHTML = '<div style="text-align:center; color: #888; padding: 20px;">No drafts yet</div>';
    return;
  }
  // Render in reverse so newest is on top
  [...state.history].reverse().forEach((match, index) => {
    const realMatchNum = state.history.length - index;
    const dateStr = match.date ? new Date(match.date).toLocaleString() : '';
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    historyItem.style.display = "block";
    historyItem.style.padding = "12px";
    
    const heroImg = (name, border) => {
      const h = HEROES.find(x => x.name === name);
      return `<img src="${h ? h.avatar : ''}" style="width:28px; height:28px; border-radius:4px; object-fit:cover; border:2px solid ${border};" title="${name}" onerror="this.style.background='#444'">`;
    };

    historyItem.innerHTML = `
      <div style="font-weight:bold; margin-bottom: 6px; color: var(--gold-primary); display:flex; justify-content:space-between; align-items:center;">
        <span>MATCH ${realMatchNum}</span>
        <span style="font-size:10px; color:#888; font-weight:normal;">${dateStr}</span>
      </div>
      <div style="display:flex; justify-content:space-between; font-size:11px; gap:8px;">
        <div style="flex:1;">
          <div style="color:var(--blue-primary); margin-bottom:4px; font-weight:bold; font-size:10px;">BLUE PICKS</div>
          <div style="display:flex; gap:3px; flex-wrap:wrap; margin-bottom:6px;">
            ${(match.bluePicks||[]).map(p => heroImg(p, 'var(--blue-primary)')).join('')}
          </div>
          <div style="color:#ff6b6b; margin-bottom:3px; font-weight:bold; font-size:10px;">BLUE BANS</div>
          <div style="display:flex; gap:3px; flex-wrap:wrap; opacity:0.6;">
            ${(match.blueBans||[]).map(p => heroImg(p, '#ff6b6b')).join('')}
          </div>
        </div>
        <div style="flex:1; text-align:right;">
          <div style="color:var(--red-primary); margin-bottom:4px; font-weight:bold; font-size:10px;">RED PICKS</div>
          <div style="display:flex; gap:3px; flex-wrap:wrap; justify-content:flex-end; margin-bottom:6px;">
            ${(match.redPicks||[]).map(p => heroImg(p, 'var(--red-primary)')).join('')}
          </div>
          <div style="color:#ff6b6b; margin-bottom:3px; font-weight:bold; font-size:10px;">RED BANS</div>
          <div style="display:flex; gap:3px; flex-wrap:wrap; justify-content:flex-end; opacity:0.6;">
            ${(match.redBans||[]).map(p => heroImg(p, '#ff6b6b')).join('')}
          </div>
        </div>
      </div>
    `;
    historyList.appendChild(historyItem);
  });
}

async function init() {
  if (currentUser) {
    await Promise.all([loadHistoryFromStorage(), loadTiersFromStorage()]);
  }
  resetState();
  renderHeroGrid();
  renderProgressDots();
  updateUI();
  // Don't start timer automatically
  bindEvents();
  initParticles();
}

function resetState() {
  clearInterval(state.timerInterval);
  const currentHistory = state.history || [];
  state = {
    currentStep: 0,
    selectedHero: null,
    blueBans: [],
    redBans: [],
    bluePicks: [],
    redPicks: [],
    timer: 30,
    timerInterval: null,
    filterRole: "all",
    searchQuery: "",
    isStarted: false,
    isPaused: false,
    history: currentHistory
  };
  heroSearch.value = "";
    state.isPaused = false;
  document.getElementById("btn-pause").classList.remove("active");
  if(btnStart) btnStart.style.display = "inline-flex";
  state.isStarted = false;

  // Reset all slots
  document.querySelectorAll(".ban-slot").forEach((s) => {
    s.classList.remove("filled", "active");
    s.innerHTML = "";
  });
  document.querySelectorAll(".pick-slot").forEach((s) => {
    s.classList.remove("filled", "active", "locked-anim");
    const num = s.dataset.index;
    s.innerHTML = `<div class="pick-number">${parseInt(num) + 1}</div>`;
  });
}

// ─── Hero Grid Rendering ─────────────────────────────
function renderHeroGrid() {
  heroGrid.innerHTML = "";

  const filtered = HEROES.filter((h) => {
    const filter = String(state.filterRole).trim().toLowerCase();
    const heroRole = String(h.role).trim().toLowerCase();
    const roleMatch = filter === "all" || heroRole === filter;
    const searchMatch = h.name
      .toLowerCase()
      .includes(state.searchQuery.toLowerCase());
    return roleMatch && searchMatch;
  });

  filtered.forEach((hero) => {
    const card = document.createElement("div");
    card.className = "hero-card";
    card.dataset.heroName = hero.name;

    // Check if hero is banned or picked
    const isBanned =
      state.blueBans.includes(hero.name) ||
      state.redBans.includes(hero.name);
    const isPicked =
      state.bluePicks.includes(hero.name) ||
      state.redPicks.includes(hero.name);

    if (isBanned) card.classList.add("banned");
    if (isPicked) card.classList.add("disabled");
    if (state.selectedHero === hero.name) card.classList.add("selected");

    // Initials for avatar
    const initials = hero.name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .substring(0, 2);

    card.innerHTML = `
      <img src="${hero.avatar}" class="hero-avatar" style="object-fit:cover;" onerror="this.style.background='${hero.color}'" />
      <div class="hero-card-name">${hero.name}</div>
      <div class="hero-role-dot" style="background: ${ROLE_COLORS[hero.role]}"></div>
      ${tierState[hero.name] ? `<div class="tier-badge ${tierState[hero.name].toLowerCase()}">${tierState[hero.name]}</div>` : ''}
    `;

    if (!isBanned && !isPicked) {
      card.addEventListener("click", () => selectHero(hero.name));
    }

    heroGrid.appendChild(card);
  });
}

function adjustColor(hex, amount) {
  let color = hex.replace("#", "");
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  let g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  let b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

// ─── Selection ───────────────────────────────────────
function selectHero(heroName) {
  if (!state.isStarted || state.currentStep >= DRAFT_ORDER.length) return;
  state.selectedHero = heroName;
  renderHeroGrid();
  updateConfirmButton();
}

function updateConfirmButton() {
  if (state.selectedHero) {
    btnConfirm.disabled = false;
    const step = DRAFT_ORDER[state.currentStep];
    confirmText.textContent = `LOCK IN ${state.selectedHero.toUpperCase()}`;
  } else {
    btnConfirm.disabled = true;
    confirmText.textContent = "SELECT A HERO";
  }
}

// ─── Confirm / Lock ──────────────────────────────────
function confirmSelection() {
  if (!state.selectedHero || state.currentStep >= DRAFT_ORDER.length) return;

  const step = DRAFT_ORDER[state.currentStep];
  const hero = HEROES.find((h) => h.name === state.selectedHero);

  if (step.type === "ban") {
    if (step.team === "blue") {
      state.blueBans.push(state.selectedHero);
      fillBanSlot("blue", state.blueBans.length - 1, hero);
    } else {
      state.redBans.push(state.selectedHero);
      fillBanSlot("red", state.redBans.length - 1, hero);
    }
  } else {
    if (step.team === "blue") {
      state.bluePicks.push(state.selectedHero);
      fillPickSlot("blue", state.bluePicks.length - 1, hero);
    } else {
      state.redPicks.push(state.selectedHero);
      fillPickSlot("red", state.redPicks.length - 1, hero);
    }
  }

state.selectedHero = null;
  state.currentStep++;

  if (state.currentStep >= DRAFT_ORDER.length) {
    clearInterval(state.timerInterval);
    addDraftToHistory();
  } else {
    resetTimer();
  }

  renderHeroGrid();
  renderProgressDots();
  updateUI();
  updateConfirmButton();
}

function fillBanSlot(team, index, hero) {
  const container = document.getElementById(`${team}-bans`);
  const slot = container.querySelectorAll(".ban-slot")[index];
  if (!slot) return;

  const initials = hero.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2);

    slot.classList.add("filled");
  slot.classList.remove("active");
  slot.innerHTML = `<img src="${hero.avatar}" class="hero-avatar" style="width:100%; height:100%; border-radius:4px; object-fit:cover;" onerror="this.src=''; this.style.background='${hero.color}'" />`;
}

function fillPickSlot(team, index, hero) {
  const container = document.getElementById(`${team}-picks`);
  const slot = container.querySelectorAll(".pick-slot")[index];
  if (!slot) return;

  const initials = hero.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2);

    slot.classList.add("filled");
  slot.classList.remove("active");
  slot.classList.add("locked-anim");
  slot.innerHTML = `
    <img src="${hero.avatar}" class="hero-avatar" style="object-fit:cover;" onerror="this.style.background='${hero.color}'" />
    <div>
      <div class="hero-pick-name">${hero.name}</div>
      <div class="hero-pick-role">${hero.role}</div>
    </div>
  `;
}

// ─── UI Update ───────────────────────────────────────
function updateUI() {
  if (!state.isStarted || state.currentStep >= DRAFT_ORDER.length) return;

  const step = DRAFT_ORDER[state.currentStep];

  // Phase label
  const banCount =
    state.blueBans.length + state.redBans.length;
  const pickCount =
    state.bluePicks.length + state.redPicks.length;

  if (step.type === "ban") {
    phaseLabel.textContent = banCount < 4 ? "BAN PHASE 1" : "BAN PHASE 2";
  } else {
    phaseLabel.textContent = pickCount < 4 ? "PICK PHASE 1" : pickCount < 8 ? "PICK PHASE 2" : "PICK PHASE 3";
  }

  // Phase team
  phaseTeam.textContent = step.team === "blue" ? "BLUE TEAM" : "RED TEAM";
  phaseTeam.className = "phase-team " + step.team;

  // Team panel active state
  document
    .querySelectorAll(".team-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelector(`.team-${step.team}`)
    .classList.add("active");

  // Active slots
  document
    .querySelectorAll(".ban-slot, .pick-slot")
    .forEach((s) => s.classList.remove("active"));

  if (step.type === "ban") {
    const banIndex =
      step.team === "blue" ? state.blueBans.length : state.redBans.length;
    const container = document.getElementById(`${step.team}-bans`);
    const slot = container.querySelectorAll(".ban-slot")[banIndex];
    if (slot) slot.classList.add("active");
  } else {
    const pickIndex =
      step.team === "blue" ? state.bluePicks.length : state.redPicks.length;
    const container = document.getElementById(`${step.team}-picks`);
    const slot = container.querySelectorAll(".pick-slot")[pickIndex];
    if (slot) slot.classList.add("active");
  }
}

// ─── Progress Dots ───────────────────────────────────
function renderProgressDots() {
  progressDots.innerHTML = "";
  DRAFT_ORDER.forEach((step, i) => {
    const dot = document.createElement("div");
    dot.className = "progress-dot";

    if (i < state.currentStep) {
      dot.classList.add(
        step.team === "blue"
          ? step.type === "ban"
            ? "blue-ban"
            : "blue-pick"
          : step.type === "ban"
            ? "red-ban"
            : "red-pick"
      );
    } else if (i === state.currentStep) {
      dot.classList.add("current");
    }

    progressDots.appendChild(dot);
  });
}

// ─── Timer ───────────────────────────────────────────
const TIMER_DURATION = 30;
const CIRCUMFERENCE = 2 * Math.PI * 54; // r=54

function startTimer() {
  if (!state.isStarted) return;
  state.timer = TIMER_DURATION;
  updateTimerDisplay();
    state.timerInterval = setInterval(() => {
    if (state.isPaused) return;
    state.timer--;
    updateTimerDisplay();
    if (state.timer <= 0) {
      autoSelectRandom();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(state.timerInterval);
  startTimer();
}

function updateTimerDisplay() {
  timerText.textContent = state.timer;
  const offset =
    CIRCUMFERENCE * (1 - state.timer / TIMER_DURATION);
  timerProgress.style.strokeDasharray = CIRCUMFERENCE;
  timerProgress.style.strokeDashoffset = offset;

  if (state.timer <= 10) {
    timerProgress.classList.add("urgent");
    timerText.classList.add("urgent");
  } else {
    timerProgress.classList.remove("urgent");
    timerText.classList.remove("urgent");
  }
}

function autoSelectRandom() {
  const available = HEROES.filter(
    (h) =>
      !state.blueBans.includes(h.name) &&
      !state.redBans.includes(h.name) &&
      !state.bluePicks.includes(h.name) &&
      !state.redPicks.includes(h.name)
  );
  if (available.length === 0) return;

  const random = available[Math.floor(Math.random() * available.length)];
  state.selectedHero = random.name;
  confirmSelection();
}

// ─── Auto Draft ──────────────────────────────────────
function autoDraft() {
  if (!state.isStarted || state.currentStep >= DRAFT_ORDER.length) return;

  const step = () => {
    if (!state.isStarted || state.currentStep >= DRAFT_ORDER.length) return;
    autoSelectRandom();
    if (state.currentStep < DRAFT_ORDER.length) {
      setTimeout(step, 400);
    }
  };
  step();
}

// ─── Events ──────────────────────────────────────────
function bindEvents() {
  btnConfirm.addEventListener("click", confirmSelection);
  btnStart.addEventListener("click", () => {
    if (!state.isStarted) {
      state.isStarted = true;
      btnStart.style.display = "none"; // Hide start button once started
      startTimer();
      renderHeroGrid();
    }
  });
  btnReset.addEventListener("click", () => {
    resetState();
    renderHeroGrid();
    renderProgressDots();
    updateUI();
    startTimer();
    updateConfirmButton();
  });
    btnPause.addEventListener("click", () => {
    state.isPaused = !state.isPaused;
    if (state.isPaused) {
      btnPause.classList.add("active");
    } else {
      btnPause.classList.remove("active");
    }
  });
  
  btnAuto.addEventListener("click", autoDraft);


  // Search
  heroSearch.addEventListener("input", (e) => {
    state.searchQuery = e.target.value;
    renderHeroGrid();
  });

  // Role filters
  roleFilters.addEventListener("click", (e) => {
    const btn = e.target.closest(".role-btn");
    if (!btn) return;

    roleFilters
      .querySelectorAll(".role-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.filterRole = btn.dataset.role;
    renderHeroGrid();
  });

  // Keyboard shortcut - Enter to confirm
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && state.selectedHero) {
      confirmSelection();
    }
  });
}

// ─── Particle Background ─────────────────────────────
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.5 ? 40 : 220; // gold or blue
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (
        this.x < 0 ||
        this.x > canvas.width ||
        this.y < 0 ||
        this.y > canvas.height
      ) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(245, 158, 11, ${0.03 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  animate();
}

// ─── Start ───────────────────────────────────────────
document.addEventListener("DOMContentLoaded", init);

// ─── Login Logic ──────────────────────────────────────
const USERS = {
  "acolyte": "marrymeold",
  "movila": "movila"
};

const loginOverlay = document.getElementById("login-overlay");
const btnLogin = document.getElementById("btn-login");
const loginUsername = document.getElementById("login-username");
const loginPassword = document.getElementById("login-password");
const loginError = document.getElementById("login-error");
const btnLogout = document.getElementById("btn-logout");
const displayUsername = document.getElementById("display-username");

if (currentUser) {
  loginOverlay.style.display = "none";
  displayUsername.textContent = "(" + currentUser + ")";
}

btnLogin.addEventListener("click", async () => {
  const user = loginUsername.value.trim().toLowerCase();
  const pass = loginPassword.value.trim();
  
  if (USERS[user] && USERS[user] === pass) {
    currentUser = user;
    localStorage.setItem('hokCurrentUser', user);
    loginOverlay.style.display = "none";
    loginError.style.display = "none";
    displayUsername.textContent = "(" + user + ")";
    
    // Load history for this user
    await loadHistoryFromStorage();
    renderHeroGrid();
  } else {
    loginError.style.display = "block";
  }
});

btnLogout.addEventListener("click", () => {
  currentUser = null;
  localStorage.removeItem('hokCurrentUser');
  loginUsername.value = "";
  loginPassword.value = "";
  loginOverlay.style.display = "flex";
  resetState();
  state.history = [];
  renderHistoryList();
});

// =====================================================
// TIER LIST
// =====================================================

const TIERS = ['SS', 'S', 'A', 'B', 'C', 'D'];

// tierState maps heroName -> tier string (e.g. 'SS', 'A') or undefined
let tierState = {};

async function loadTiersFromStorage() {
  if (!currentUser) return;
  try {
    const docRef = doc(db, 'tiers', currentUser);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      tierState = docSnap.data().tiers || {};
    } else {
      tierState = {};
    }
  } catch (e) {
    console.error('Error loading tiers:', e);
    tierState = {};
  }
}

async function saveTiersToStorage() {
  if (!currentUser) return;
  try {
    const docRef = doc(db, 'tiers', currentUser);
    await setDoc(docRef, { tiers: tierState });
  } catch (e) {
    console.error('Error saving tiers:', e);
  }
}

function renderTierList() {
  const table = document.getElementById('tierlist-table');
  const unrankedPool = document.getElementById('tierlist-unranked');
  if (!table || !unrankedPool) return;

  table.innerHTML = '';

  // Build a set of ranked heroes
  const ranked = new Set(Object.keys(tierState));

  // Render each tier row
  TIERS.forEach(tier => {
    const row = document.createElement('div');
    row.className = 'tier-row';
    row.dataset.tier = tier;

    const label = document.createElement('div');
    label.className = `tier-label ${tier.toLowerCase()}`;
    label.textContent = tier;

    const heroesZone = document.createElement('div');
    heroesZone.className = 'tier-heroes';
    heroesZone.dataset.tier = tier;

    // Add heroes in this tier
    HEROES.forEach(hero => {
      if (tierState[hero.name] === tier) {
        heroesZone.appendChild(makeChip(hero));
      }
    });

    // Drag-over highlight
    heroesZone.addEventListener('dragover', e => {
      e.preventDefault();
      heroesZone.classList.add('drag-over');
    });
    heroesZone.addEventListener('dragleave', () => heroesZone.classList.remove('drag-over'));
    heroesZone.addEventListener('drop', e => {
      e.preventDefault();
      heroesZone.classList.remove('drag-over');
      const heroName = e.dataTransfer.getData('heroName');
      if (!heroName) return;
      tierState[heroName] = tier;
      saveTiersToStorage();
      renderTierList();
      renderHeroGrid(); // refresh draft badges
    });

    row.appendChild(label);
    row.appendChild(heroesZone);
    table.appendChild(row);
  });

  // Unranked pool
  unrankedPool.innerHTML = '';
  HEROES.forEach(hero => {
    if (!ranked.has(hero.name)) {
      unrankedPool.appendChild(makeChip(hero));
    }
  });

  // Drop on unranked = remove from tier
  unrankedPool.addEventListener('dragover', e => {
    e.preventDefault();
    unrankedPool.classList.add('drag-over');
  });
  unrankedPool.addEventListener('dragleave', () => unrankedPool.classList.remove('drag-over'));
  unrankedPool.addEventListener('drop', e => {
    e.preventDefault();
    unrankedPool.classList.remove('drag-over');
    const heroName = e.dataTransfer.getData('heroName');
    if (!heroName) return;
    delete tierState[heroName];
    saveTiersToStorage();
    renderTierList();
    renderHeroGrid();
  });
}

function makeChip(hero) {
  const chip = document.createElement('div');
  chip.className = 'tier-hero-chip';
  chip.draggable = true;
  chip.dataset.heroName = hero.name;
  chip.title = hero.name;
  chip.innerHTML = `
    <img src="${hero.avatar}" onerror="this.style.background='${hero.color}'" />
    <div class="chip-name">${hero.name}</div>
  `;
  chip.addEventListener('dragstart', e => {
    e.dataTransfer.setData('heroName', hero.name);
    chip.classList.add('dragging');
  });
  chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
  return chip;
}

// ─── Tab switching ────────────────────────────────────
const appTabs = document.getElementById('app-tabs');
const viewDraft = document.getElementById('view-draft');
const viewTierlist = document.getElementById('view-tierlist');

appTabs.addEventListener('click', async e => {
  const tab = e.target.closest('.app-tab');
  if (!tab) return;
  const view = tab.dataset.view;

  appTabs.querySelectorAll('.app-tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');

  if (view === 'draft') {
    viewDraft.style.display = '';
    viewTierlist.style.display = 'none';
  } else if (view === 'tierlist') {
    viewDraft.style.display = 'none';
    viewTierlist.style.display = '';
    if (currentUser && Object.keys(tierState).length === 0) {
      await loadTiersFromStorage();
    }
    renderTierList();
  }
});

// Load tiers when user logs in (alongside history)
document.getElementById('btn-login').addEventListener('click', async () => {
  // tiers loaded after auth succeeds — handled by wrapping init
}, { once: false });

// Patch the existing login handler to also load tiers
const _origBtnLogin = document.getElementById('btn-login');
const _alreadyPatched = _origBtnLogin.dataset.tierpatch;
if (!_alreadyPatched) {
  _origBtnLogin.dataset.tierpatch = '1';
  _origBtnLogin.addEventListener('click', async () => {
    if (currentUser) {
      await loadTiersFromStorage();
    }
  });
}

