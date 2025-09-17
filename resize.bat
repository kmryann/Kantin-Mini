@echo off
setlocal enabledelayedexpansion
mkdir output
for %%f in (public\images\menu\*.jpg) do (
    magick "%%f" -resize 600x600 -quality 80 "output\%%~nf.webp"
)
for %%f in (public\images\menu\*.png) do (
    magick "%%f" -resize 600x600 -quality 80 "output\%%~nf.webp"
)
echo Selesai! Semua foto tersimpan di folder "output".
pause
