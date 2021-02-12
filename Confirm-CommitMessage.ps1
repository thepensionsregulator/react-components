$path = Resolve-Path($PSScriptRoot)
While (!(Test-Path -Path (Join-Path -Path $path -ChildPath ".git") -PathType Container)) {
    $path = Resolve-Path(Join-Path -Path $path -ChildPath "..")
    If (($path).Path.Length -eq 3) { Break }
}
If (Test-Path "$path\.git" -PathType Container) {
    If (!((Get-Content "$path/.git/COMMIT_EDITMSG") -Match "AB#\d")) { Write-Warning "Commit aborted. Your commit message must include a Azure DevOps work item reference, eg AB#12345"; Exit 1 } else { Exit 0 }
} 
Else { Exit 0 }