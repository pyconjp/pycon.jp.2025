export default function MdxLayout({children}: { children: React.ReactNode }) {
  return (
    <div
      className="prose text-black marker:text-black prose-p:text-sm prose-h2:text-3xl font-semibold">
      {children}
    </div>
  )
}