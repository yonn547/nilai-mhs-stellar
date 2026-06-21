import { useState, type FormEvent } from "react";
// Pastikan kamu sudah men-generate ulang bindings setelah build smart contract data-mahasiswa
import { type Mahasiswa } from "../bindings/index.ts"; 
import { connectFreighter, createContractClient } from "./stellar";

export default function App() {
  const [wallet, setWallet] = useState("");
  const [mahasiswaResult, setMahasiswaResult] = useState<Mahasiswa | null>(null);
  const [searchStatus, setSearchStatus] = useState("");
  const [error, setError] = useState("");

  const btn = "cursor-pointer rounded-lg px-6 py-3 text-base font-medium transition-opacity hover:opacity-90";
  const fail = (err: unknown) => setError(err instanceof Error ? err.message : "Terjadi kesalahan");

  // 1. Fungsi untuk MENYIMPAN Data (Write ke Blockchain)
  async function handleSimpanData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);

    try {
      setError("");
      submitBtnLoadingState(formEl, true);

      // Panggil fungsi simpan() di smart contract
      const client = createContractClient(wallet);
      const tx = await client.simpan({
        nim: String(form.get("nim")),
        nama: String(form.get("nama")),
      });
      
      // Sign (Tanda tangan dompet Freighter) dan kirim ke blockchain
      await tx.signAndSend();

      formEl.reset();
      alert("Data mahasiswa berhasil disimpan ke blockchain!");
    } catch (err) {
      fail(err);
    } finally {
      submitBtnLoadingState(formEl, false);
    }
  }

  // 2. Fungsi untuk MENCARI Data (Read dari Ledger)
  async function handleCariData(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const nimToSearch = String(form.get("searchNim"));

    try {
      setError("");
      setSearchStatus("Mencari data di blockchain...");
      setMahasiswaResult(null);

      // Panggil fungsi ambil() dari smart contract
      const client = createContractClient(wallet);
      const tx = await client.ambil({ nim: nimToSearch });

      // tx.result akan berisi data Mahasiswa jika ada, atau undefined/null jika None
      if (tx.result) {
        setMahasiswaResult(tx.result);
        setSearchStatus("");
      } else {
        setSearchStatus(`Data dengan NIM ${nimToSearch} tidak ditemukan.`);
      }
    } catch (err) {
      fail(err);
      setSearchStatus("");
    }
  }

  // Helper untuk mengubah state tombol saat loading
  const submitBtnLoadingState = (form: HTMLFormElement, isLoading: boolean) => {
    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (btn) {
      btn.disabled = isLoading;
      btn.innerText = isLoading ? "Menyimpan ke Blockchain..." : "Simpan Data";
      btn.className = isLoading 
        ? `${btn.className.replace('opacity-100', 'opacity-50')} cursor-not-allowed`
        : `${btn.className.replace('opacity-50', 'opacity-100')} cursor-pointer`;
    }
  };

  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50 p-6 font-sans text-gray-900">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-blue-600 tracking-tighter">Portal Mahasiswa</h1>
          <p className="text-sm text-gray-500 font-medium">Decentralized Student Identity</p>
        </div>

        {!wallet ? (
          <button
            type="button"
            className={`${btn} bg-slate-900 text-white w-full max-w-xs mt-4`}
            onClick={async () => {
              try {
                setError("");
                setWallet(await connectFreighter());
              } catch (err) {
                fail(err);
              }
            }}>
            Connect Freighter
          </button>
        ) : (
          <div className="w-full flex flex-col gap-6">
            <div className="flex flex-col items-center">
              <p className="break-all text-center font-mono text-xs bg-gray-200 px-3 py-1 rounded-full">{wallet}</p>
              <button
                type="button"
                className="mt-2 text-sm text-gray-500 underline hover:text-red-500"
                onClick={() => {
                  setWallet("");
                  setMahasiswaResult(null);
                  setSearchStatus("");
                }}>
                Disconnect Wallet
              </button>
            </div>

            {/* FORM INPUT DATA BARU */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
              <h2 className="font-bold mb-4 text-gray-800">Simpan Data Mahasiswa Baru</h2>
              <form className="flex w-full flex-col gap-3" onSubmit={handleSimpanData}>
                <div className="grid grid-cols-2 gap-3">
                  <input name="nim" placeholder="Masukkan NIM" className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                  <input name="nama" placeholder="Nama Lengkap" className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                
                <button type="submit" className={`${btn} bg-blue-600 text-sm text-white mt-2 opacity-100`}>
                  Simpan Data
                </button>
              </form>
            </div>

            {/* FORM CARI DATA */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm w-full">
              <h2 className="font-bold mb-4 text-gray-800">Cari Data Berdasarkan NIM</h2>
              <form className="flex w-full gap-3" onSubmit={handleCariData}>
                <input name="searchNim" placeholder="Masukkan NIM untuk dicari..." className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" required />
                <button type="submit" className="cursor-pointer rounded-lg px-6 py-2 bg-slate-900 text-sm text-white font-medium hover:bg-slate-800 transition-colors">
                  Cari
                </button>
              </form>

              {/* HASIL PENCARIAN */}
              <div className="mt-4">
                {searchStatus && <p className="text-sm text-gray-500 italic">{searchStatus}</p>}
                
                {mahasiswaResult && (
                  <div className="mt-2 rounded-xl border border-green-200 bg-green-50 p-4 text-left shadow-sm flex flex-col gap-2">
                    <p className="text-xs text-green-700 font-bold uppercase tracking-wider mb-1">Data Ditemukan</p>
                    <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-green-100">
                      <div>
                        <p className="text-xs text-gray-500">NIM</p>
                        <p className="text-base font-mono font-bold text-gray-900">{mahasiswaResult.nim}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Nama Lengkap</p>
                        <p className="text-base font-semibold text-gray-900">{mahasiswaResult.nama}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {error && <p className="text-center text-sm font-medium text-red-600 bg-red-50 py-2 px-4 rounded-lg w-full">{error}</p>}
      </div>
    </main>
  );
}