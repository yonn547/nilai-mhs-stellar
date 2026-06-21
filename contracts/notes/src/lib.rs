#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Env, String};

// 1. Mendefinisikan Struktur Data
#[contracttype]
#[derive(Clone)]
pub struct Mahasiswa {
    pub nim: String,
    pub nama: String,
}

// 2. Mendeklarasikan Kontrak
#[contract]
pub struct KontrakMahasiswa;

#[contractimpl]
impl KontrakMahasiswa {
    
    // Fungsi untuk MENYIMPAN data
    pub fn simpan(env: Env, nim: String, nama: String) {
        let data_mhs = Mahasiswa {
            nim: nim.clone(),
            nama,
        };
        
        // Menyimpan data ke 'Persistent Storage'
        // NIM digunakan sebagai 'key' (kunci pencarian)
        env.storage().persistent().set(&nim, &data_mhs);
    }

    // Fungsi untuk MENGAMBIL data
    // Mengembalikan Option karena data bisa saja belum ada (bernilai None)
    pub fn ambil(env: Env, nim: String) -> Option<Mahasiswa> {
        env.storage().persistent().get(&nim)
    }
}