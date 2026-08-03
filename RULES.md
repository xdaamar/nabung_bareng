# Couple Saving Rules

## Tech Rules

* Next.js 15 App Router
* TypeScript strict mode
* Tailwind CSS only
* Mobile-first design
* Server Components by default
* Client Components hanya jika ada interaksi

## Database Rules

* Semua perubahan saldo melalui tabel `transactions`
* Dilarang menyimpan field `balance`
* Saldo dihitung dari SUM transaksi
* Semua nominal disimpan dalam integer (rupiah)

## UI Rules

* Warna utama pink pastel
* Text harus kontras dan mudah dibaca
* Semua tombol minimal tinggi 44px
* Loading state wajib ada

## Security Rules

* PIN wajib di-hash menggunakan bcryptjs
* Token Turso hanya di server
* Jangan expose env ke client component
