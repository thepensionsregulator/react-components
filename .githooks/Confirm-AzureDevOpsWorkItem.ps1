param(
    # Path, relative to the root of the repo, to the file containing the commit message
    [string]$CommitMessageFile
)

# Check for a work item reference
If (!((Get-Content $CommitMessageFile) -Match "AB#\d")) { Write-Warning "Commit aborted. Your commit message must include a Azure DevOps work item reference, eg AB#12345"; Exit 1 } else { Exit 0 }