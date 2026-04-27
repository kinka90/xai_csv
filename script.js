async function callOpenAIcorrect(originalText, dictResult, direction){
  if(!dictResult) return dictResult;

  try{
    const body = {
      model: (typeof OPENAI_MODEL !== 'undefined' ? OPENAI_MODEL : 'gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: `
Kamu adalah AI penyusun kalimat khusus BAHASA GALELA ↔ INDONESIA.

Tugas:
Merapikan hasil kamus agar menjadi kalimat yang benar, alami, dan sesuai struktur bahasa GALELA atau INDONESIA.

========================
🔥 ATURAN UTAMA
========================
1. JANGAN terjemahkan ulang
2. HANYA susun ulang kalimat
3. Gunakan hasil kamus sebagai dasar
4. Jangan hapus kata penting
5. Jangan menambah kata baru tanpa alasan konteks

========================
🌊 STRUKTUR GALELA (WAJIB)
========================
- Urutan: SUBJEK → AKSI → OBJEK → KETERANGAN → ANGKA
- Informasi penting selalu di depan

Contoh:
"saya melihat ikan merah 20"
→ "ngohi takelelo o nao da susawala ngai 20"

========================
🔢 ATURAN ANGKA
========================
- Angka selalu di AKHIR informasi objek
- Gunakan "ngai" sebelum angka

Contoh:
"ikan 20"
→ "o nao ngai 20"

========================
❌ NEGASI
========================
- selalu di akhir
"bisa tidak" → "dadi ua"

========================
🌍 KE INDONESIA
========================
- ubah ke S-P-O-K normal
- hilangkan: ngai, da, o, yo, i, ai, mi
- gabungkan angka ke bentuk Indonesia:
  "moriha de motoha" → "45"

========================
🎯 OUTPUT
========================
- HANYA kalimat akhir
- tanpa penjelasan
- tanpa tambahan teks
          `
        },
        {
          role: 'user',
          content: `
Arah: ${direction}

Kalimat asli:
"${originalText}"

Hasil kamus:
"${dictResult}"

Susun ulang sesuai aturan Galela ↔ Indonesia.
          `
        }
      ],
      temperature: 0.2
    };

    const resp = await fetch((typeof API_PROXY_URL !== 'undefined' ? API_PROXY_URL : '/api/correct'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if(!resp.ok){
      const errBody = await resp.text();
      throw new Error(`AI proxy error ${resp.status}: ${errBody}`);
    }

    const j = await resp.json();
    const corrected = j?.choices?.[0]?.message?.content;

    return (corrected || dictResult).trim();

  }catch(err){
    throw err;
  }
}
