# Generates app/opengraph-image.png (1200x630) for social/WhatsApp link previews
Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 630
$bg = [System.Drawing.Color]::FromArgb(255, 0x05, 0x05, 0x08)
$teal = [System.Drawing.Color]::FromArgb(255, 0x00, 0xD4, 0xAA)
$gold = [System.Drawing.Color]::FromArgb(255, 0xE8, 0xC5, 0x6D)

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

# Background
$g.Clear($bg)

# Teal radial glow behind the crest (path gradient)
$glowRect = New-Object System.Drawing.Rectangle(60, 80, 620, 480)
$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$path.AddEllipse($glowRect)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($path)
$pgb.CenterColor = [System.Drawing.Color]::FromArgb(50, 0x00, 0xD4, 0xAA)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0x00, 0xD4, 0xAA))
$g.FillPath($pgb, $path)
$path.Dispose(); $pgb.Dispose()

# Subtle gold glow top-right
$glowRect2 = New-Object System.Drawing.Rectangle(850, -180, 700, 460)
$path2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$path2.AddEllipse($glowRect2)
$pgb2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($path2)
$pgb2.CenterColor = [System.Drawing.Color]::FromArgb(28, 0xE8, 0xC5, 0x6D)
$pgb2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 0xE8, 0xC5, 0x6D))
$g.FillPath($pgb2, $path2)
$path2.Dispose(); $pgb2.Dispose()

# Crest (transparency preserved)
$crest = [System.Drawing.Image]::FromFile((Resolve-Path "public\logo\tsv-bahria-1860-nobg.png"))
$crestSize = 340
$crestX = 88; $crestY = [int](($H - $crestSize) / 2)
$g.DrawImage($crest, $crestX, $crestY, $crestSize, $crestSize)
$crest.Dispose()

# Vertical teal divider (solid, softly transparent)
$divBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(150, 0x00, 0xD4, 0xAA))
$g.FillRectangle($divBrush, 520, 135, 3, 360)
$divBrush.Dispose()

# Text block
$tx = 580
$fontTag = New-Object System.Drawing.Font('Segoe UI Semibold', 16)
$tealBrush = New-Object System.Drawing.SolidBrush $teal
$g.DrawString('F O O T B A L L   A C A D E M Y', $fontTag, $tealBrush, $tx, 190)

$fontTitle = New-Object System.Drawing.Font('Segoe UI', 52, [System.Drawing.FontStyle]::Bold)
$whiteBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 0xF8, 0xF8, 0xF8))
$g.DrawString('TSV Bahria 1860', $fontTitle, $whiteBrush, $tx - 4, 235)

$fontSub = New-Object System.Drawing.Font('Segoe UI', 22)
$subBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(200, 0xF8, 0xF8, 0xF8))
$g.DrawString('Train like a pro. Right here in Karachi.', $fontSub, $subBrush, $tx, 330)

$fontMeta = New-Object System.Drawing.Font('Segoe UI', 15, [System.Drawing.FontStyle]::Bold)
$goldBrush = New-Object System.Drawing.SolidBrush $gold
$g.DrawString('Bahria Town Karachi   |   Ages U9 - U23   |   Boys & Girls', $fontMeta, $goldBrush, $tx, 385)

$g.Dispose()
$bmp.Save((Join-Path (Get-Location) 'app\opengraph-image.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
"OG image saved: app/opengraph-image.png"
