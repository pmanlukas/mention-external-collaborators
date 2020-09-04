const core = require('@actions/core');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try {
    const github_token = core.getInput('GitHub_Token');
    const issue_number = core.getInput('Issue_Number');

    const context = github.context;
  
    const octokit = new github.getOctokit(github_token);
    const results = await octokit.repos.listCollaborators({
      ...context.repo,
      affiliation: 'outside'
    });

    const collaborators = results.data.map(user => `@${user.login}`);
    console.log(JSON.stringify(collaborators));

    const body = `cc ${collaborators.join(' ')}`;

    const new_comment = await octokit.issues.createComment({
      ...context.repo,
      issue_number: issue_number,
      body: body
    });

    const comment = new_comment.data;

    core.setOutput('comment_id', comment.id.toString())
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
