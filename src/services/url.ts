export const urlService = {
  root: {
    index() {
      return '/'
    },
    githubRepo() {
      return 'https://github.com/kafelix496/coding-for-fun'
    }
  },
  github: {
    signIn() {
      return '/github/auth/sign-in'
    },
    connections() {
      return '/github/t/connections'
    },
    pulls() {
      return '/github/t/pulls'
    }
  }
}
