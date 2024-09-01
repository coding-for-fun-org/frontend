export const dictionary = {
  AUTH: {
    SIGN_IN_WITH_GITHUB: 'GitHub에 로그인',
    SESSION_EXPIRED_ALERT_TITLE: '세션 만료',
    SESSION_EXPIRED_ALERT_DESCRIPTION:
      '세션이 만료되었습니다, 다시 로그인 하세요'
  },
  COMMON: {
    APP_NAME: 'Coding For Fun',
    ALERT_NO_DATA_TITLE: '데이터 없음',
    ALERT_NO_DATA_DESCRIPTION: '표시할 데이터가 없습니다',
    ALERT_DEFAULT_SUCCESS_TITLE: '성공',
    ALERT_DEFAULT_ERROR_TITLE: '에러',
    TOAST_DEFAULT_SUCCESS_TITLE: '성공',
    TOAST_DEFAULT_ERROR_TITLE: '에러',
    TOAST_DEFAULT_ERROR_DESCRIPTION:
      '문제가 발생했습니다, 나중에 다시 시도해 주세요.',
    ALERT_DIALOG_DEFAULT_CANCEL_BUTTON: '취소',
    ALERT_DIALOG_DEFAULT_CONTINUE_BUTTON: '계속',
    ALERT_DIALOG_DEFAULT_SUBMIT_BUTTON: '완료',
    ALERT_DIALOG_DEFAULT_CONFIRM_BUTTON: '확인',
    DIALOG_LINK_TO_PULL_REQUEST_BUTTON: '풀 리퀘스트로 이동',
    DIALOG_REVIEW_BUTTON: '리뷰'
  },
  GITHUB: {
    CONNECTION_TABLE_HEADER_CONNECTION: '연결',
    CONNECTION_DELETE_CONNECTION_TITLE: '연결 끊기',
    CONNECTION_DELETE_CONNECTION_ERROR:
      '{{connection}}  연결 끊기에 실패했습니다.',
    PULL_REVIEW_FORM_COMMENT_BUTTON: '리뷰 작성',
    PULL_REVIEW_FORM_APPROVE_BUTTON: '승인',
    START_REVIEW_BUTTON: '리뷰 시작',
    EXPAND_ALL_BUTTON: '목록 펼치기',
    PULL_REVIEW_FORM_REQUEST_CHANGES_BUTTON: '변경 요청',
    SELECT_ALL_DEPENDABOT_PULL_REQUESTS: 'Dependabot 전체 선택',
    SETTINGS_DROPDOWN: '설정',
    FILTER_DROPDOWN: '필터',
    ALL_DROPDOWN: '전체',
    PULL_REVIEW_FORM_COMMENT_PLACEHOLDER: '리뷰 작성',
    TOAST_ADD_CONNECTION_SUCCESS_DESCRIPTION: '연결 추가 성공',
    TOAST_DELETE_CONNECTION_SUCCESS_DESCRIPTION: '연결 삭제 성공',
    PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO: '- 저장소명: {{repoName}}',
    PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL:
      '- Pull Request 명: {{pullTitle}}',
    CONNECTION_DELETE_CONNECTION_DESCRIPTION_1:
      '{{installationOwner}}의 연결을 끊겠습니까?',
    CONNECTION_DELETE_CONNECTION_DESCRIPTION_2:
      '확인시 이전으로 돌아갈 수 없습니다',
    TAB_BULK_PULL_REVIEWS_LABEL: '대량 Pull Request 리뷰',
    TAB_CONNECTIONS_LABEL: '연결',
    PULL_CHECK_STATUS_TEXT: '{{successCount}} / {{totalCount}} checks OK'
  },
  HEADER: {
    LINK_GITHUB_TOOLTIP: 'GitHub에서 소스코드 확인',
    TOGGLE_THEME_TOOLTIP: '테마 변경',
    TOGGLE_LANGUAGE_TOOLTIP: '언어 변경',
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
