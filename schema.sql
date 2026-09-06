-- Cloudflare D1 SQL Schema for JomConsult CMS

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT DEFAULT 'superadmin',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. General Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    description TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. Official Agents Table (Anti-Scam Directory)
CREATE TABLE IF NOT EXISTS agents (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    staff_id TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    phone TEXT NOT NULL,
    phone_display TEXT NOT NULL,
    branch TEXT NOT NULL,
    zone TEXT NOT NULL,
    status TEXT DEFAULT 'AKTIF & BERDAFTAR',
    rating TEXT DEFAULT '5.0 / 5.0',
    initials TEXT,
    specialty TEXT,
    avatar_bg TEXT DEFAULT 'bg-emerald-700',
    verification_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Leads / Loan Eligibility Submissions Table
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    applicant_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    sector TEXT NOT NULL,
    salary TEXT,
    commitment TEXT,
    loan_purpose TEXT DEFAULT 'Penyatuan Hutang',
    credit_issues TEXT,
    assigned_agent_id INTEGER,
    status TEXT DEFAULT 'BARU', -- BARU, DALAM SEMAKAN, HANTAR KE BANK, LULUS, DITOLAK
    notes TEXT,
    source TEXT DEFAULT 'Website Wizard',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(assigned_agent_id) REFERENCES agents(id)
);

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    profession TEXT NOT NULL,
    original_issue TEXT NOT NULL,
    loan_approved TEXT NOT NULL,
    monthly_savings TEXT,
    story TEXT,
    is_featured INTEGER DEFAULT 1,
    display_order INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Initial Seed Data
-- Default Admin: admin / JomConsult2026! (SHA-256 hash)
INSERT OR IGNORE INTO admins (id, username, password_hash, full_name, role) VALUES 
(1, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Admin JomConsult', 'superadmin');

-- Site Settings
INSERT OR REPLACE INTO site_settings (key, value, description) VALUES
('whatsapp_number', '601171191179', 'Nombor WhatsApp Utama HQ'),
('phone_display', '011-7119 1179', 'Paparan Nombor Telefon HQ'),
('office_phone', '03-7832 4539', 'Talian Pejabat HQ'),
('email', 'hello@jomconsult.com.my', 'Emel Rasmi Syarikat'),
('address', '22-2, Jalan Opera G U2/G, Taman TTDI Jaya, 40150 Shah Alam, Selangor', 'Alamat Pejabat HQ'),
('office_hours', 'Isnin - Jumaat: 10:00 AM - 6:00 PM', 'Waktu Operasi Pejabat'),
('min_interest_rate', '2.88%', 'Kadar Faedah Minimum Paparan Web'),
('max_loan_amount', 'RM250,000', 'Had Pembiayaan Maksimum'),
('announcement_text', 'Semakan Kelayakan Pinjaman 100% Percuma Tanpa Sebarang Caj Upfront.', 'Teks Pengumuman Bar Atas'),
('announcement_active', '1', 'Status Paparan Pengumuman (1: Aktif, 0: Tutup)');

-- Seed Official Agents
INSERT OR REPLACE INTO agents (id, staff_id, name, phone, phone_display, status, initials, avatar_bg, role, branch, zone, rating, specialty, verification_count) VALUES
(1, 'JCS0001', 'FARIS FAUZAN', '60195140145', '019-514 0145', 'AKTIF & BERDAFTAR', 'FF', 'bg-emerald-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(2, 'JCS0002', 'AZURA', '60163380319', '016-338 0319', 'AKTIF & BERDAFTAR', 'AZ', 'bg-blue-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(3, 'JCS0004', 'NURSYAMIMI SUHAILAH (MEMEY)', '601155288052', '011-5528 8052', 'AKTIF & BERDAFTAR', 'NS', 'bg-purple-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(4, 'JCS0005', 'NUR HIDAYAH (AIDA)', '601133145485', '011-3314 5485', 'AKTIF & BERDAFTAR', 'NH', 'bg-rose-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(5, 'JCS0006', 'LISECA BASIUS (CHIKA)', '60143751281', '014-375 1281', 'AKTIF & BERDAFTAR', 'LB', 'bg-amber-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(6, 'JCS0008', 'AISHAH JOHAN', '601153545064', '011-5354 5064', 'AKTIF & BERDAFTAR', 'AJ', 'bg-indigo-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(7, 'JCS0009', 'MOHD SHAFIK', '601113174306', '011-1317 4306', 'AKTIF & BERDAFTAR', 'MS', 'bg-teal-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(8, 'JCS0010', 'NINA', '60173145863', '017-314 5863', 'AKTIF & BERDAFTAR', 'NI', 'bg-cyan-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(9, 'JCS0011', 'SITI ZULAIKHA (IKHA)', '60145392670', '014-539 2670', 'AKTIF & BERDAFTAR', 'SZ', 'bg-fuchsia-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(10, 'JCS0012', 'NUR SYIFAA', '60182854356', '018-285 4356', 'AKTIF & BERDAFTAR', 'NS', 'bg-pink-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(11, 'JCS0014', 'SITI ALIFAH', '60182875879', '018-287 5879', 'AKTIF & BERDAFTAR', 'SA', 'bg-emerald-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(12, 'JCS0018', 'AHMAD ZULFADHLI (FAZZLI)', '601123005811', '011-2300 5811', 'AKTIF & BERDAFTAR', 'AZ', 'bg-blue-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(13, 'JCS0023', 'MUHAMAD SAPAWI', '60186141192', '018-614 1192', 'AKTIF & BERDAFTAR', 'MS', 'bg-slate-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(14, 'JCS0024', 'NORZAHIRYAH (CIK NOR)', '601110650883', '011-1065 0883', 'AKTIF & BERDAFTAR', 'NC', 'bg-lime-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(15, 'JCS0025', 'SURAINI', '60194361386', '019-436 1386', 'AKTIF & BERDAFTAR', 'SU', 'bg-amber-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(16, 'JCS0026', 'FARRIEZ DANIAL', '60193210182', '019-321 0182', 'AKTIF & BERDAFTAR', 'FD', 'bg-blue-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(17, 'JCS0028', 'AIMAN HAIKAL', '601167799318', '011-6779 9318', 'AKTIF & BERDAFTAR', 'AH', 'bg-indigo-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(18, 'JCS0038', 'MUNIR YUSOF', '601173044527', '011-7304 4527', 'AKTIF & BERDAFTAR', 'MY', 'bg-amber-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(19, 'JCS0043', 'NOR SYAHIRAH (IRA)', '60173384918', '017-338 4918', 'AKTIF & BERDAFTAR', 'NS', 'bg-rose-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(20, 'JCS0044', 'EISTER RINA', '60148313059', '014-831 3059', 'AKTIF & BERDAFTAR', 'ER', 'bg-purple-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(21, 'JCS0045', 'CATHERINE RENNA', '601123244762', '011-2324 4762', 'AKTIF & BERDAFTAR', 'CR', 'bg-teal-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(22, 'JCS0046', 'NURAINA ALIA', '601126617640', '011-2661 7640', 'AKTIF & BERDAFTAR', 'NA', 'bg-cyan-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(23, 'JCS0049', 'MUHAMAD NUR AZZIQ (AZZIQ)', '60104262806', '010-426 2806', 'AKTIF & BERDAFTAR', 'MA', 'bg-emerald-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(24, 'JCS0050', 'JANNET JACKSON', '60138686490', '013-868 6490', 'AKTIF & BERDAFTAR', 'JJ', 'bg-violet-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(25, 'JCS0052', 'NURUL SYAHIRAH', '601151277650', '011-5127 7650', 'AKTIF & BERDAFTAR', 'NS', 'bg-pink-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(26, 'JCS0055', 'SITI AMIRA', '60102790679', '010-279 0679', 'AKTIF & BERDAFTAR', 'SA', 'bg-fuchsia-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(27, 'JCS0057', 'MOHAMAD FAEZ', '601151137825', '011-5113 7825', 'AKTIF & BERDAFTAR', 'MF', 'bg-slate-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(28, 'JCS0058', 'NURSHAHIRA ALWANI', '60146472319', '014-647 2319', 'AKTIF & BERDAFTAR', 'NA', 'bg-lime-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(29, 'JCS0061', 'NURFARISYA SOFEA', '601136793312', '011-3679 3312', 'AKTIF & BERDAFTAR', 'NS', 'bg-sky-700', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(30, 'JCS0068', 'MUHAMMAD AIMAN', '601137990763', '011-3799 0763', 'AKTIF & BERDAFTAR', 'MA', 'bg-blue-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(31, 'JCS0074', 'NURUL AFIRZA', '601127364273', '011-2736 4273', 'AKTIF & BERDAFTAR', 'NA', 'bg-emerald-600', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(32, 'JCS0076', 'HARITH IRFAN', '60188748024', '018-874 8024', 'AKTIF & BERDAFTAR', 'HI', 'bg-amber-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(33, 'JCS0080', 'ZULHELMI FAIZ', '601111018297', '011-1101 8297', 'AKTIF & BERDAFTAR', 'ZF', 'bg-slate-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0),
(34, 'JCS0082', 'NURUL AIDAYANA', '601116442734', '011-1644 2734', 'AKTIF & BERDAFTAR', 'NA', 'bg-teal-800', 'Loan Strategist', 'TTDI Jaya, Shah Alam', 'Seluruh Malaysia', '5.0 / 5.0', 'Loan Strategist', 0);

-- Seed Testimonials
INSERT OR REPLACE INTO testimonials (id, client_name, profession, original_issue, loan_approved, monthly_savings, story, is_featured, display_order) VALUES
(1, 'Encik Azman & Isteri', 'Eksekutif Swasta (MNC Shah Alam)', 'Hutang 4 Kad Kredit & Pinjaman Peribadi (Komitmen RM4,200/bulan, DSR 82%)', 'RM 145,000', 'RM 1,850 / bulan', 'Alhamdulillah JomConsult bantu satukan semua hutang faedah tinggi kepada 1 akaun sahaja. DSR turun dan baki tunai bulanan kembali positif.', 1, 1),
(2, 'Puan Rozita', 'Penjawat Awam (Jururawat KKM)', 'Rekod CCRIS Tunggakan 2 Bulan & Ditolak 2 Buah Bank', 'RM 95,000', 'RM 920 / bulan', 'Sangat telus, tiada sebarang bayaran upfront. Dokumen disusun semula mengikut selera pembiayaan koperasi berdaftar dan lulus dalam 3 hari.', 1, 2),
(3, 'Tuan Haji Kamil', 'Kakitangan Kerajaan (Kementerian Pendidikan)', 'Perlukan Dana Segera Baik Pulih Rumah & Kos Pendidikan Anak', 'RM 180,000', 'RM 1,200 / bulan', 'Proses dari semakan sehingga akad sangat profesional. Staf verify Staff ID di website bagi keyakinan penuh bebas scam.', 1, 3);
