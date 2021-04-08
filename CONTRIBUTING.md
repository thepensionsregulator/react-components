# Contributing

Thanks for being willing to contribute!

**Working on your first Pull Request?** You can learn how from this _free_
series [How to Contribute to an Open Source Project on GitHub][egghead]

## Project setup

1. Fork and clone the repo
2. `yarn install` to setup and validate your clone of the project
3. `yarn build` to lerna link dependencies
4. Create a branch for your PR
5. Create `.env` file in the root of the project and add environment variables (GATSBY_LOOKUP_API_URL)
6. `yarn docz:dev` to start gatsby components site for components development

> Tip: Keep your `master` branch pointing at the original repository and make
> pull requests from branches on your fork. To do this, run:
>
> ```
> git remote add upstream git@github.com:thepensionsregulator/react-components.git
> git fetch upstream
> git branch --set-upstream-to=upstream/master master
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `master`
> branch to use the upstream master branch whenever you run `git pull`. Then you
> can make all of your pull request branches based on this `master` branch.
> Whenever you want to update your version of `master`, do a regular `git pull`.

## Committing and Pushing changes

Please make sure to run the tests before you commit your changes. You can run
`yarn test` which will update any snapshots that need updating.

[issues]: https://github.com/thepensionsregulator/react-components/issues
[egghead]: https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github

## Deployment to NPM

Automatic deployment:

- Branch names will be automatically published to NPM with a `next` tag on a `patch` version, only if they pass build and tests on Azure Pipelines. The status of deployment will be visible on a pull request.

Manual deployment:

- When you're ready to deploy `minor` or `major` versions you can do so from updated `develop` branch in your terminal running command `yarn deploy --message "Release AB#12345"` and follow the instructions in your terminal. Update `AB#12345` to refer to the Azure Boards work item relevant to your work. `Lerna` will bump all versions to chosen ones and will push git refs to Github and new packages to the NPM registry.

- If Azure Pipelines doesn't automatically publish, you can also run `yarn deploy --message "Release AB#12345" --dist-tag next` locally to add the `next` tag.

- Sometimes, you need github to publish to npm on your behalf. To do this, try `npx lerna publish from-git`

## Deployment to Netlify

Automatic deployment:

- Create a PR to master branch and Netlify will build Gatsby's site. If a build is successful, merge it and the production site will be updated.
