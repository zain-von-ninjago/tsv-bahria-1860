Add-Type -AssemblyName System.Drawing
$logo = [System.Drawing.Bitmap]::FromFile('C:\Users\zaina\Documents\Default Project\public\logo\tsv-bahria-1860-modern.png')
$bg = New-Object System.Drawing.Bitmap ($logo.Width * 2), ($logo.Height * 2)
$g = [System.Drawing.Graphics]::FromImage($bg)
$g.Clear([System.Drawing.Color]::FromArgb(255, 5, 5, 8))
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.DrawImage($logo, 0, 0, $bg.Width, $bg.Height)
$g.Dispose()
$bg.Save('C:\Users\zaina\.local\share\opencode\tool-output\logo-preview.png', [System.Drawing.Imaging.ImageFormat]::Png)
$logo.Dispose()
$bg.Dispose()
'saved'
