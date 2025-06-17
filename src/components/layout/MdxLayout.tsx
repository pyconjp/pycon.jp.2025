export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose m-4 text-black marker:text-black prose-p:text-[14px] prose-h2:text-[32px] font-[600] max-lg:mx-12 my-10">
      {children}
    </div>
  )
}