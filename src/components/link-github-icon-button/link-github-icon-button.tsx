'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { Button } from '@/elements/root/button/button'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

export const LinkGithubIconButton = () => {
  const { translate } = useDictionary()

  return (
    <Tooltip tooltip={<span>{translate('HEADER.LINK_GITHUB_TOOLTIP')}</span>}>
      <Link href={urlService.root.githubRepo()} target="_blank">
        <Button
          variant="ghost"
          size="icon"
          role="button"
          icon={<GitHubLogoIcon className="w-full h-full" />}
        />
      </Link>
    </Tooltip>
  )
}
