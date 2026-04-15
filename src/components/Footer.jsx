export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-zinc-500">
          &copy; {year} Kevon Senior. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
