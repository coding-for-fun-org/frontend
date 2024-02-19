import { memo } from 'react'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Alert } from '@/elements/root/alert/alert'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

export const PullBody = memo(
  ({ description }: { description: string | null }) => {
    const { translate } = useDictionary()

    if (description) {
      return (
        <div className="markdown">
          <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
        </div>
      )
    }
    return (
      <Alert
        variant="info"
        title={translate('COMMON.ALERT_NO_DATA_TITLE')}
        description={translate('COMMON.ALERT_NO_DATA_DESCRIPTION')}
      />
    )
  }
)
