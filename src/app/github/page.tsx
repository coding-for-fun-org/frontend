import { BulkMergePrs } from '@/components/github/root/BulkMergePrs'
import { GrantPermissionButton } from '@/components/github/root/GrantPermissionButton'
import { SignButton } from '@/components/github/root/SignButton'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container min-h-screen">
        <div className="space-x-2">
          <SignButton />
          <GrantPermissionButton />
        </div>

        <BulkMergePrs />
      </div>
    </main>
  )
}
