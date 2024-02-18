import { BulkPullReviews } from '@/components/github/root/bulk-pull-reviews/bulk-pull-reviews'
import { IndexTabs } from '@/components/github/root/index-tabs/index-tabs'

import { SelectedPullsProvider } from '@/contexts/github/root/selected-pulls-provider'

export default function Page() {
  return (
    <SelectedPullsProvider>
      <IndexTabs />
      <BulkPullReviews />
    </SelectedPullsProvider>
  )
}
