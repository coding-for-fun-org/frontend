'use client'

import { Github } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/elements/root/button/button'
import { Tooltip } from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { urlService } from '@/services/root/url'

export const LinkGithubIconButton = () => {
  const { translate } = useDictionary()

  return (
    <Tooltip tooltip={translate('HEADER.LINK_GITHUB_TOOLTIP')}>
      <Link href={urlService.root.githubRepo()} target="_blank">
        <Button
          variant="ghost"
          size="icon"
          role="button"
          icon={<Github className="w-full h-full" />}
        />
      </Link>
    </Tooltip>
  )
}
