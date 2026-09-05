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
INSERT OR REPLACE INTO agents (id, staff_id, name, role, phone, phone_display, branch, zone, status, rating, initials, specialty, avatar_bg) VALUES
(1, 'JC-1021', 'Mohd Ali bin Osman', 'Pakar Penstrukturan DSR & Penyatuan Hutang', '601171191179', '011-7119 1179', 'Ibu Pejabat (Taman TTDI Jaya, Shah Alam)', 'Selangor & Kuala Lumpur', 'AKTIF & BERDAFTAR', '4.9 / 5.0', 'AO', 'Penyatuan Hutang & Pinjaman Koperasi', 'bg-emerald-700'),
(2, 'JC-1045', 'Siti Nurul Aminah binti Razak', 'Konsultan Pinjaman Peribadi Swasta & Bank', '601171191179', '011-7119 1179', 'Cawangan Wilayah Utara (Pulau Pinang)', 'Penang, Kedah & Perak', 'AKTIF & BERDAFTAR', '4.9 / 5.0', 'SA', 'Pinjaman Swasta MNC & Eksekutif', 'bg-teal-700'),
(3, 'JC-1088', 'Muhammad Farhan bin Rosli', 'Pakar Penstrukturan & Pemulihan Profil CCRIS', '601171191179', '011-7119 1179', 'Cawangan Wilayah Selatan (Johor Bahru)', 'Johor, Melaka & Negeri Sembilan', 'AKTIF & BERDAFTAR', '5.0 / 5.0', 'FR', 'CCRIS / SAA & Mortgage Refinance', 'bg-indigo-700'),
(4, 'JC-1102', 'Noraini binti Kassim', 'Penasihat Pembiayaan Penjawat Awam (AG / KKM / Guru)', '601171191179', '011-7119 1179', 'Cawangan Pantai Timur (Kuantan)', 'Pahang, Terengganu & Kelantan', 'AKTIF & BERDAFTAR', '4.8 / 5.0', 'NK', 'Koperasi BPA Angkasa & PDRM', 'bg-amber-700'),
(5, 'JC-1120', 'Hafiz bin Zainal Abidin', 'Pengurus Khidmat Pelanggan & Analisis Kelayakan', '601171191179', '011-7119 1179', 'Ibu Pejabat (Taman TTDI Jaya, Shah Alam)', 'Seluruh Malaysia', 'AKTIF & BERDAFTAR', '5.0 / 5.0', 'HZ', 'Diagnostik Slip Gaji & Semakan Percuma', 'bg-slate-800');

-- Seed Testimonials
INSERT OR REPLACE INTO testimonials (id, client_name, profession, original_issue, loan_approved, monthly_savings, story, is_featured, display_order) VALUES
(1, 'Encik Azman & Isteri', 'Eksekutif Swasta (MNC Shah Alam)', 'Hutang 4 Kad Kredit & Pinjaman Peribadi (Komitmen RM4,200/bulan, DSR 82%)', 'RM 145,000', 'RM 1,850 / bulan', 'Alhamdulillah JomConsult bantu satukan semua hutang faedah tinggi kepada 1 akaun sahaja. DSR turun dan baki tunai bulanan kembali positif.', 1, 1),
(2, 'Puan Rozita', 'Penjawat Awam (Jururawat KKM)', 'Rekod CCRIS Tunggakan 2 Bulan & Ditolak 2 Buah Bank', 'RM 95,000', 'RM 920 / bulan', 'Sangat telus, tiada sebarang bayaran upfront. Dokumen disusun semula mengikut selera pembiayaan koperasi berdaftar dan lulus dalam 3 hari.', 1, 2),
(3, 'Tuan Haji Kamil', 'Kakitangan Kerajaan (Kementerian Pendidikan)', 'Perlukan Dana Segera Baik Pulih Rumah & Kos Pendidikan Anak', 'RM 180,000', 'RM 1,200 / bulan', 'Proses dari semakan sehingga akad sangat profesional. Staf verify Staff ID di website bagi keyakinan penuh bebas scam.', 1, 3);
