const db = require('./db');

// Clear existing data
db.exec(`
  DELETE FROM announcements;
  DELETE FROM testimonials;
  DELETE FROM placement_stats;
  DELETE FROM placement_branch;
  DELETE FROM recruiters;
  DELETE FROM fees;
  DELETE FROM deadlines;
`);

// ── Announcements ────────────────────────────────────────────────────────────
const insertAnn = db.prepare('INSERT INTO announcements (text) VALUES (?)');
[
  'Placements 2025: Highest Package ₹51.5 LPA · 968 Students Placed',
  'NAAC A++ Grade · CGPA 3.83/4.0 – Highest in India',
  'NIRF 2024 Engineering Rank: #101-150 Band Nationally',
  'Phase Shift Tech Fest 2025 — Registration Open',
  'New 5G Use-Case Lab Launched — Funded by Government of India',
  'UGC Autonomous Status Extended: 2022–23 to 2031–32',
  'Admissions 2025–26 Open via KCET & COMEDK',
].forEach(t => insertAnn.run(t));

// ── Testimonials ─────────────────────────────────────────────────────────────
const insertTest = db.prepare('INSERT INTO testimonials (name, batch, company, avatar, quote) VALUES (?,?,?,?,?)');
[
  ['Arjun Nair',        'B.E. CSE · Batch of 2023', 'Amazon SDE',        'A', 'BMSCE gave me the foundation to build a career at a top tech firm. The faculty support, lab facilities, and placement training were genuinely world-class.'],
  ['Priya Subramaniam', 'B.E. ECE · Batch of 2024', 'Texas Instruments',  'P', 'As a girl from a small town, BMSCE felt welcoming from day one. The campus is safe, the professors are accessible, and the alumni network opened doors I never expected.'],
  ['Rahul Krishnaswamy','B.E. ECE · Batch of 2022', 'Qualcomm',           'R', 'The autonomy in curriculum means we actually studied cutting-edge topics. My final year project on 5G beamforming got me a direct research role.'],
].forEach(r => insertTest.run(...r));

// ── Placement Stats ───────────────────────────────────────────────────────────
const insertStat = db.prepare('INSERT INTO placement_stats (year,students_placed,highest_package,avg_package,placement_rate,companies_count) VALUES (?,?,?,?,?,?)');
[
  ['2024-25', 968,  '₹51.5L', '₹11.4L', '74%', 383],
  ['2023-24', 952,  '₹33.1L', '₹10.0L', '71%', 346],
  ['2022-23', 1059, '₹30.0L', '₹8.5L',  '68%', 358],
].forEach(r => insertStat.run(...r));

// ── Branch-wise Placements ────────────────────────────────────────────────────
const insertBranch = db.prepare('INSERT INTO placement_branch (year,branch,eligible,placed,placement_pct,avg_package,highest_package,status) VALUES (?,?,?,?,?,?,?,?)');
const branches2025 = [
  ['2024-25','CSE + AI&ML',        240,228,'95%','₹14.2 LPA','₹51.5 LPA','Excellent'],
  ['2024-25','Information Science', 120,110,'91%','₹13.1 LPA','₹46.0 LPA','Excellent'],
  ['2024-25','ECE / EI',            180,148,'82%','₹10.8 LPA','₹32.0 LPA','Good'],
  ['2024-25','EEE',                  90, 69,'76%','₹9.0 LPA', '₹22.0 LPA','Average'],
  ['2024-25','Mechanical',          120, 84,'70%','₹7.5 LPA', '₹18.0 LPA','Average'],
  ['2024-25','Civil',                60, 38,'63%','₹6.0 LPA', '₹12.0 LPA','Average'],
  ['2024-25','Chemical / Bio-tech',  60, 35,'58%','₹5.2 LPA', '₹10.0 LPA','Average'],
  ['2024-25','MBA',                  60, 46,'76%','₹8.5 LPA', '₹20.0 LPA','Average'],
];
branches2025.forEach(r => insertBranch.run(...r));

// ── Recruiters ────────────────────────────────────────────────────────────────
const insertRec = db.prepare('INSERT INTO recruiters (name,emoji,package) VALUES (?,?,?)');
[
  ['Amazon',    '🟡', 'Up to ₹24L'],
  ['Microsoft', '🔷', 'Up to ₹40L'],
  ['Accenture', '🟣', '₹4.5–8L'],
  ['JP Morgan', '🔵', 'Up to ₹45L'],
  ['Cohesity',  '🟠', 'Up to ₹51.5L'],
  ['Oracle',    '🔴', 'Up to ₹22L'],
  ['Infosys',   '🟢', '₹3.6–8L'],
  ['IBM',       '⬛', '₹4–14L'],
  ['TCS',       '🔶', '₹3.3–7L'],
  ['Wipro',     '🔵', '₹3.5–6.5L'],
  ['L&T',       '🟤', '₹6–12L'],
  ['Flipkart',  '🟡', 'Up to ₹30L'],
].forEach(r => insertRec.run(...r));

// ── Fees ──────────────────────────────────────────────────────────────────────
const insertFee = db.prepare('INSERT INTO fees (category,program,amount) VALUES (?,?,?)');
const feeData = [
  ['kcet',   'cse',  '₹88,240'],
  ['kcet',   'ece',  '₹88,240'],
  ['kcet',   'mech', '₹88,240'],
  ['kcet',   'mba',  '₹1,20,000'],
  ['kcet',   'mca',  '₹55,600'],
  ['comedk', 'cse',  '₹2,29,000'],
  ['comedk', 'ece',  '₹2,00,000'],
  ['comedk', 'mech', '₹1,80,000'],
  ['comedk', 'mba',  '₹2,50,000'],
  ['comedk', 'mca',  '₹1,20,000'],
  ['mgmt',   'cse',  '₹11,50,000'],
  ['mgmt',   'ece',  '₹9,00,000'],
  ['mgmt',   'mech', '₹7,50,000'],
  ['mgmt',   'mba',  '₹4,50,000'],
  ['mgmt',   'mca',  '₹3,00,000'],
  ['nri',    'cse',  '₹30,00,000'],
  ['nri',    'ece',  '₹25,00,000'],
  ['nri',    'mech', '₹20,00,000'],
  ['nri',    'mba',  '₹15,00,000'],
  ['nri',    'mca',  '₹10,00,000'],
];
feeData.forEach(r => insertFee.run(...r));

// ── Deadlines ─────────────────────────────────────────────────────────────────
const insertDl = db.prepare('INSERT INTO deadlines (label,date,year) VALUES (?,?,?)');
[
  ['KCET Exam',               'Apr 2025', '2025-26'],
  ['COMEDK UGET',             'May 2025', '2025-26'],
  ['KCET Counselling Rd 1',   'Jul 2025', '2025-26'],
  ['COMEDK Counselling',      'Jul–Aug 2025', '2025-26'],
  ['Mgmt. Quota Last Date',   'Aug 2025', '2025-26'],
  ['Classes Commence',        'Sep 2025', '2025-26'],
  ['MBA / MCA Applications',  'Feb–May 2025', '2025-26'],
].forEach(r => insertDl.run(...r));

console.log('✅ Database seeded successfully.');
