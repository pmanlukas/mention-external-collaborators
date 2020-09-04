# Mention external collaborators javascript action

This action gathers the GitHub Id of the external collaborators and comments on an issue with an @-mention of these.

created by @pmanlukas

## Inputs

### `GitHub_Token`

**Required** The token used to identify with Octokit. Default `"github.token"`.

### `Issue_Number`

**Required** The number of the issue to comment on.

## Outputs

### `comment_id`

The id of the created comment.

## Usage
```
- name: Comment Issue with mention of collaborators
      uses: pmanlukas/mention-external-collaborators@v1.5
      with:
        GitHub_Token: ${{ secrets.GH_PAT }}
        Issue_Number: ${{ steps.create-issue.outputs.number }}
```