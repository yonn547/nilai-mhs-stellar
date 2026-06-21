#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Env, String, Symbol, Vec};

// 1. MENDUPLIKASI OBJEK (Struct)
// Ini seperti membuat 'formulir' kosong untuk mencatat setiap transaksi.
#[contracttype]
#[derive(Clone, Debug)]
pub struct TipRecord {
    pub id: u64,
    pub creator_name: String,
    pub fan_name: String,
    pub gross_amount: u64,
    pub creator_share: u64,
    pub platform_fee: u64,
}

// 2. KUNCI PENYIMPANAN
// Bayangkan ini sebagai label di laci lemari tempat kita menyimpan semua formulir transaksi.
const TIP_DATA: Symbol = symbol_short!("TIP_DATA");

#[contract]
pub struct KreavContract;

#[contractimpl]
impl KreavContract {
    
    // 3. FUNGSI MENCATAT TRANSAKSI (Write)
    pub fn record_payment(env: Env, creator: String, fan: String, amount: u64) -> String {
        // A. Buka laci penyimpanan dan ambil daftar transaksi yang sudah ada. 
        // Jika lacinya kosong (belum ada transaksi sama sekali), buat daftar baru (Vec::new).
        let mut tips: Vec<TipRecord> = env.storage().instance().get(&TIP_DATA).unwrap_or(Vec::new(&env));
        
        // B. Logika Matematika (Sangat Penting untuk Audit!)
        // Menghitung 5% untuk platform.
        let platform_fee = (amount * 5) / 100;
        // Sisanya (95%) untuk kreator.
        let creator_share = amount - platform_fee;
        
        // C. Isi formulir baru dengan data yang masuk
        let new_tip = TipRecord {
            id: env.prng().gen::<u64>(), // Bikin ID acak secara otomatis
            creator_name: creator,
            fan_name: fan,
            gross_amount: amount,
            creator_share: creator_share,
            platform_fee: platform_fee,
        };
        
        // D. Masukkan formulir baru ke dalam tumpukan daftar
        tips.push_back(new_tip);
        
        // E. Simpan kembali tumpukan daftar ke dalam laci storage blockchain agar permanen
        env.storage().instance().set(&TIP_DATA, &tips);
        
        return String::from_str(&env, "Berhasil mencatat transaksi KREAV!");
    }

    // 4. FUNGSI MEMBACA TRANSAKSI (Read)
    pub fn get_all_transactions(env: Env) -> Vec<TipRecord> {
        // Buka laci dan tunjukkan semua isinya ke pengguna.
        return env.storage().instance().get(&TIP_DATA).unwrap_or(Vec::new(&env));
    }
}