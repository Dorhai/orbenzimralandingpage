Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$src = Join-Path $root 'public\images\email-logo.png'
$out = Join-Path $root 'public\images\email-logo-header.png'

$bmp = [System.Drawing.Bitmap]::FromFile($src)
$width = $bmp.Width
$height = $bmp.Height

function IsNearWhite([System.Drawing.Color]$c) {
  return $c.A -lt 16 -or ($c.R -gt 240 -and $c.G -gt 240 -and $c.B -gt 240)
}

$minX = $width
$minY = $height
$maxX = 0
$maxY = 0

for ($y = 0; $y -lt $height; $y++) {
  for ($x = 0; $x -lt $width; $x++) {
    $c = $bmp.GetPixel($x, $y)
    if (-not (IsNearWhite $c)) {
      if ($x -lt $minX) { $minX = $x }
      if ($y -lt $minY) { $minY = $y }
      if ($x -gt $maxX) { $maxX = $x }
      if ($y -gt $maxY) { $maxY = $y }
    }
  }
}

$cropW = $maxX - $minX + 1
$cropH = $maxY - $minY + 1
$cropped = New-Object System.Drawing.Bitmap $cropW, $cropH

for ($y = 0; $y -lt $cropH; $y++) {
  for ($x = 0; $x -lt $cropW; $x++) {
    $srcColor = $bmp.GetPixel($minX + $x, $minY + $y)
    if (IsNearWhite $srcColor) {
      $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
    }
    else {
      $cropped.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 250, 250, 250))
    }
  }
}

$targetW = 600
$scale = $targetW / $cropW
$targetH = [int][Math]::Ceiling($cropH * $scale)
$padY = 28
$canvasH = $targetH + ($padY * 2)

$header = New-Object System.Drawing.Bitmap $targetW, $canvasH
$g = [System.Drawing.Graphics]::FromImage($header)
$g.Clear([System.Drawing.Color]::FromArgb(255, 5, 5, 5))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($cropped, 0, $padY, $targetW, $targetH)
$g.Dispose()

$header.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$cropped.Dispose()
$header.Dispose()

Write-Output "Wrote $out (${targetW}x${canvasH})"
