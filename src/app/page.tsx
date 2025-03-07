import Header from '@/components/Header'
import Button from '@/components/ui/Button'

export default function HomePage() {
	return (
    <>
      <Header page="Home" />
      <div className="flex items-center justify-center h-[90dvh]">
        <a href="/dashboard">
          <Button>Dashboard</Button>
        </a>
      </div>
    </>
  )
}
