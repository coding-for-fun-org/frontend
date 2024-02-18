import { BulkPullReviews } from '@/components/github/root/bulk-pull-reviews/bulk-pull-reviews'

import { SelectedPullsProvider } from '@/contexts/github/root/selected-pulls-provider'

export default function Page() {
  return (
    <SelectedPullsProvider>
      <BulkPullReviews />
    </SelectedPullsProvider>
  )
}
