export const dictionary = {
  AUTH: {
    SIGN_IN_WITH_GITHUB: 'Sign In with Github',
    SESSION_EXPIRED_ALERT_TITLE: 'Session Expired',
    SESSION_EXPIRED_ALERT_DESCRIPTION:
      'Your session has expired, please sign in again.'
  },
  COMMON: {
    APP_NAME: 'Coding For Fun',
    ALERT_DIALOG_DEFAULT_CANCEL_BUTTON: 'Cancel',
    ALERT_DIALOG_DEFAULT_CONTINUE_BUTTON: 'Cancel'
  },
  GITHUB: {
    GRANT_PERMISSION_BUTTON: 'Grant Permission',
    PULL_REVIEW_FORM_COMMENT_BUTTON: 'Comment',
    PULL_REVIEW_FORM_APPROVE_BUTTON: 'Approve',
    PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON: 'Request Changes',
    PULL_REVIEW_FORM_COMMENT_PLACEHOLDER: 'Leave a comment',
    PULL_REVIEW_FORM_SUBMIT_TOAST_SUCCESS_TITLE: 'Success',
    PULL_REVIEW_FORM_SUBMIT_TOAST_ERROR_TITLE: 'Error',
    PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO: '- Repository Name: {{repoName}}',
    PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL:
      '- Pull Request Title: {{pullTitle}}'
  },
  HEADER: {
    LINK_GITHUB_TOOLTIP: 'View source code on GitHub',
    TOGGLE_THEME_TOOLTIP: 'Toggle theme'
  },
  ROOT_PAGE: {
    APP_DESCRIPTION: 'This is my personal playground for coding and learning.',
    PLAYGROUND_LIST_TITLE: 'Playground',
    PLAYGROUND_LIST_ITEM_GITHUB_BULK_PULL_REVIEW:
      'GitHub Bulk Pull Request Reviewer'
  }
} as const
