import SignInButton from "@/components/button-sign-in"
import { ArrowUpRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TextEffect } from "@/components/ui/text-effect"
import { createClientForServer } from "@/supabase/server"

export default async function Hero() {
  const supabase = await createClientForServer()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  
  return (
    <section className="relative mx-auto flex w-full max-w-3xl flex-col items-center p-10 pt-24">
      {/* <div className="flex items-center justify-center mb-4 size-32 rounded-lg border-2 border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900" /> */}
      <TextEffect
        className="text-center text-4xl font-medium text-neutral-900 sm:text-6xl dark:text-neutral-100"
        per="word"
        as="h1"
        preset="slide">
        Manage your tasks simply and efficiently
      </TextEffect>
      <TextEffect
        className="mt-6 text-center text-xs leading-6 text-neutral-500 md:text-sm dark:text-neutral-300"
        as="p"
        per="char"
        delay={1}>
        Organize your tasks intuitively with our task management. Drag and
        drop to move tasks between lists, set priorities, and keep everything
        under control.
      </TextEffect>
      <div className="mt-4">
        {user ? (
          <Link prefetch className="group" href="/app">
            <Button variant="outline" size="md" rippleColor="#202724">
              Get Started
              <ArrowUpRightIcon className="size-4 text-neutral-900 transition-transform duration-200 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-neutral-500" />
            </Button>
          </Link>
        ) : (
          <SignInButton />
        )}
      </div>
    </section>
  )
}