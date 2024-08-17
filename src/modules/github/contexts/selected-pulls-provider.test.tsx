import {
  type TSelectedPullActionType,
  type TState,
  selectedPullsReducer
} from './selected-pulls-provider'

describe('selectedPullsReducer', () => {
  it('should checked pull request to true when select-all-dependabot is dispatched', () => {
    const initialState: TState = {
      repos: [
        {
          installationId: 1,
          owner: 'owner1',
          name: 'repo1',
          url: 'http://coding-for-fun/PR/1',
          pulls: [
            {
              number: 1,
              title: 'feature123',
              url: 'http://coding-for-fun/PR/1',
              baseRef: 'main',
              headRef: '',
              checked: false,
              user: { login: 'user1' },
              body: ''
            }
          ],
          isOpen: false
        }
      ]
    }

    const action: TSelectedPullActionType = {
      type: 'select-all-dependabot',
      payload: {
        owner: 'owner1',
        repo: 'repo1',
        pullNumber: 1
      }
    }

    const newState = selectedPullsReducer(initialState, action)

    expect(newState.repos![0].pulls![0].checked).toBe(true)
  })

  it('should not modify state if the target repo has no pull requests', () => {
    const initialState: TState = {
      repos: [
        {
          installationId: 1,
          owner: 'owner1',
          name: 'repo1',
          url: 'http://coding-for-fun/PR/1',
          pulls: [],
          isOpen: false
        }
      ]
    }

    const action: TSelectedPullActionType = {
      type: 'select-all-dependabot',
      payload: {
        owner: 'owner1',
        repo: 'repo1',
        pullNumber: 1
      }
    }

    const newState = selectedPullsReducer(initialState, action)

    expect(newState).toEqual(initialState)
  })
})
