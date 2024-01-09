'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { Button } from '@/elements/root/button/button'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

export const LinkGithubIconButton = () => {
  const { dictionary } = useDictionary()

  return (
    <Tooltip
      trigger={
        <Button asChild variant="ghost" size="icon">
          <Link href={urlService.root.githubRepo()} target="_blank">
            <GitHubLogoIcon width="16" height="16" />
          </Link>
        </Button>
      }
      content={<span>{dictionary.HEADER.LINK_GITHUB_TOOLTIP}</span>}
    />
  )
}
