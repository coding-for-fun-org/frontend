'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { Button } from '@/elements/root/button/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/elements/root/tooltip/tooltip'

import { useDictionary } from '@/contexts/root/DictionaryProvider'

export const LinkGithubIconButton = () => {
  const { dictionary } = useDictionary()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button asChild variant="ghost" size="icon">
          <Link
            href="https://github.com/kafelix496/coding-for-fun"
            target="_blank"
          >
            <GitHubLogoIcon width="16" height="16" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{dictionary.HEADER.LINK_GITHUB_TOOLTIP}</span>
      </TooltipContent>
    </Tooltip>
  )
}
