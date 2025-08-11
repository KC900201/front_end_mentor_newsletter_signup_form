import React from "react"

function MainLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex h-screen justify-center">{children}</main>
}

export default MainLayout
