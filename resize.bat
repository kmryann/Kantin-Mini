@echo off
setlocal enabledelayedexpansion
mkdir output

REM === Loop untuk JPG ===
for %%f in (public\images\menu\*.jpg) do (
    magick "%%f" -resize 1200x1200 -quality 90 "output\%%~nf.webp"
)

REM === Loop untuk PNG ===
for %%f in (public\images\menu\*.png) do (
    magick "%%f" -resize 1200x1200 -quality 90 "output\%%~nf.webp"
)

echo Selesai! Semua foto sudah diubah ke WebP (1200x1200px, quality 90) dan tersimpan di folder "output".
pause
