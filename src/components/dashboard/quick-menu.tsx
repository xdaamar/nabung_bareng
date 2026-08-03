import Link from 'next/link'

const menuItems = [
  {
    title: 'Pinjam',
    description: 'Catat pinjaman dari tabungan bersama',
    href: '/dashboard/pinjam',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Objects/Money%20with%20Wings.png',
  },
  {
    title: 'Cicilan',
    description: 'Catat pengembalian pinjaman',
    href: '/dashboard/cicilan',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Objects/Credit%20Card.png',
  },
  {
    title: 'Pemakaian',
    description: 'Pengeluaran untuk kebutuhan berdua',
    href: '/dashboard/pemakaian',
    iconUrl:
      'https://cdn.jsdelivr.net/gh/Tarikul-Islam-Anik/Animated-Fluent-Emojis@master/Emojis/Objects/Receipt.png',
  },
]

export function QuickMenu() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-700">
        Aktivitas Bersama
      </h3>

      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="flex w-full items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 text-left transition hover:border-pink-200 hover:shadow-sm active:scale-[0.99]"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50/80 p-2 shadow-inner">
            <img
              src={item.iconUrl}
              alt={item.title}
              className="h-8 w-8 object-contain drop-shadow"
            />
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-800">{item.title}</p>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
