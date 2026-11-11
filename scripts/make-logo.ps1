Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class LogoMaker
{
    // Converts white-ink-on-black artwork into white ink with alpha = luminance.
    public static void WhiteOnBlackToAlpha(Bitmap src, Rectangle rect, string outPath)
    {
        using (Bitmap crop = src.Clone(rect, PixelFormat.Format32bppArgb))
        {
            BitmapData d = crop.LockBits(new Rectangle(0, 0, crop.Width, crop.Height), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            int bytes = Math.Abs(d.Stride) * crop.Height;
            byte[] buf = new byte[bytes];
            Marshal.Copy(d.Scan0, buf, 0, bytes);
            for (int i = 0; i < bytes; i += 4)
            {
                byte b = buf[i], g = buf[i + 1], r = buf[i + 2];
                byte lum = (byte)((r * 299 + g * 587 + b * 114) / 1000);
                buf[i] = 255; buf[i + 1] = 255; buf[i + 2] = 255; // white ink
                buf[i + 3] = lum;                                 // alpha from luminance
            }
            Marshal.Copy(buf, 0, d.Scan0, bytes);
            crop.UnlockBits(d);
            crop.Save(outPath, ImageFormat.Png);
        }
    }
}
"@

$srcPath = "C:\TSV Bahria 1860\logos\TSV Bahria 1860 modern logos.jfif"
$src = [System.Drawing.Bitmap]::FromFile($srcPath)
$halfW = [int][Math]::Floor($src.Width / 2)
$halfH = [int][Math]::Floor($src.Height / 2)

# Bottom-left quadrant (white crest on black), trimmed 6% margins
$insetX = [int]($halfW * 0.06)
$insetY = [int]($halfH * 0.06)
$rect = New-Object System.Drawing.Rectangle ($insetX), ($halfH + $insetY), ($halfW - 2 * $insetX), ($halfH - 2 * $insetY)
[LogoMaker]::WhiteOnBlackToAlpha($src, $rect, "C:\Users\zaina\Documents\Default Project\public\logo\tsv-bahria-1860-modern.png")

# Top-left quadrant (crest + wordmark, white on black), trimmed margins
$rect2 = New-Object System.Drawing.Rectangle ($insetX), ($insetY), ($halfW - 2 * $insetX), ($halfH - 2 * $insetY)
[LogoMaker]::WhiteOnBlackToAlpha($src, $rect2, "C:\Users\zaina\Documents\Default Project\public\logo\tsv-bahria-1860-modern-full.png")

$src.Dispose()
Get-ChildItem "C:\Users\zaina\Documents\Default Project\public\logo" | Select-Object Name, Length
