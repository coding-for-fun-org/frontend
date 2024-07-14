export const dictionary = {
  AUTH: {
    SIGN_IN_WITH_GITHUB: 'GitHub에 로그인',
    SESSION_EXPIRED_ALERT_TITLE: '세션 만료',
    SESSION_EXPIRED_ALERT_DESCRIPTION:
      'Your session has expired, please sign in again.'
  },
  COMMON: {
    APP_NAME: 'Coding For Fun',
    ALERT_NO_DATA_TITLE: 'No Data',
    ALERT_NO_DATA_DESCRIPTION: 'There are no data to display',
    ALERT_DEFAULT_SUCCESS_TITLE: 'Success',
    ALERT_DEFAULT_ERROR_TITLE: 'Error',
    TOAST_DEFAULT_SUCCESS_TITLE: 'Success',
    TOAST_DEFAULT_ERROR_TITLE: 'Error',
    TOAST_DEFAULT_ERROR_DESCRIPTION:
      'Something went wrong. Please try again later.',
    ALERT_DIALOG_DEFAULT_CANCEL_BUTTON: 'Cancel',
    ALERT_DIALOG_DEFAULT_CONTINUE_BUTTON: 'Continue',
    ALERT_DIALOG_DEFAULT_SUBMIT_BUTTON: 'Submit',
    ALERT_DIALOG_DEFAULT_CONFIRM_BUTTON: 'Confirm',
    DIALOG_LINK_TO_PULL_REQUEST_BUTTON: 'Link to Pull Request',
    DIALOG_REVIEW_BUTTON: 'Review'
  },
  GITHUB: {
    CONNECTION_TABLE_HEADER_CONNECTION: 'Connections',
    CONNECTION_DELETE_CONNECTION_TITLE: 'Delete Connection',
    CONNECTION_DELETE_CONNECTION_ERROR:
      'Fail to delete {{connection}} connection.',
    PULL_REVIEW_FORM_COMMENT_BUTTON: 'Comment',
    PULL_REVIEW_FORM_APPROVE_BUTTON: 'Approve',
    START_REVIEW_BUTTON: '리뷰 시작',
    EXPAND_ALL_BUTTON: '목록 펼치기',
    PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON: 'Request Changes',
    PULL_REVIEW_FORM_COMMENT_PLACEHOLDER: 'Leave a comment',
    TOAST_ADD_CONNECTION_SUCCESS_DESCRIPTION: 'Add connection successfully.',
    TOAST_DELETE_CONNECTION_SUCCESS_DESCRIPTION:
      'Delete connection successfully.',
    PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO: '- Repository Name: {{repoName}}',
    PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL:
      '- Pull Request Title: {{pullTitle}}',
    CONNECTION_DELETE_CONNECTION_DESCRIPTION_1:
      'Are you sure you want to delete this {{installationOwner}} connection?',
    CONNECTION_DELETE_CONNECTION_DESCRIPTION_2: 'You can not undo this action.',
    TAB_BULK_PULL_REVIEWS_LABEL: 'Bulk Pull Request Reviews',
    TAB_CONNECTIONS_LABEL: 'Connections',
    PULL_CHECK_STATUS_TEXT: '{{successCount}} / {{totalCount}} checks OK'
  },
  HEADER: {
    LINK_GITHUB_TOOLTIP: 'View source code on GitHub',
    TOGGLE_THEME_TOOLTIP: 'Toggle theme',
    TOGGLE_LANGUAGE_TOOLTIP: 'Languages',
    TOGGLE_LANGUAGE_ENG: 'English',
    TOGGLE_LANGUAGE_KOR: 'Korean (한국어)'
  },
  ROOT_PAGE: {
    APP_DESCRIPTION: '여기는 개인적인 코딩과 학습을 위한 놀이터입니다.',
    PLAYGROUND_LIST_TITLE: '놀이터',
    PLAYGROUND_LIST_ITEM_GITHUB_BULK_PULL_REVIEW:
      'GitHub 대량 Pull Request 리뷰어'
  }
} as const
