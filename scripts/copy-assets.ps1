# Copy images and static downloads into public/ for Astro
$root = Split-Path -Parent $PSScriptRoot

$imageSrc = Join-Path $root "images"
$imageDest = Join-Path $root "public\images"
if (Test-Path $imageSrc) {
  New-Item -ItemType Directory -Force -Path $imageDest | Out-Null
  Copy-Item -Path (Join-Path $imageSrc "*") -Destination $imageDest -Recurse -Force
  Write-Host "Copied images to public/images/"
}

$staticFiles = @(
  "CV_ManuelaRunge.pdf",
  "resume_ManuelaRunge.docx"
)
foreach ($file in $staticFiles) {
  $src = Join-Path $root $file
  if (Test-Path $src) {
    Copy-Item $src (Join-Path $root "public\$file") -Force
    Write-Host "Copied $file to public/"
  }
}

Write-Host "Done."
