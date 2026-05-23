# publish.ps1
Write-Host "--- Iniciando proceso de build y publish ---" -ForegroundColor Cyan

# 1. Limpieza de builds anteriores
Write-Host "Limpiando carpetas antiguas..." -ForegroundColor Gray
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path "dist_electron") { Remove-Item -Recurse -Force "dist_electron" }

# 2. Compilar
Write-Host "Compilando aplicación..." -ForegroundColor Cyan
npm run build
npm run electron:build

# 3. Obtener la versión del package.json
$version = (Get-Content package.json | ConvertFrom-Json).version
$tagName = "v$version"

# 4. Commit y Push del código
Write-Host "Subiendo código a GitHub..." -ForegroundColor Cyan
git add .
git commit -m "Build $tagName"
git push origin main

# 5. Crear Release en GitHub
Write-Host "Creando release $tagName..." -ForegroundColor Green
gh release create $tagName --title "Versión $version" --notes "Release automática del build $version"

# 6. Subir los binarios
Write-Host "Subiendo binarios a la Release..." -ForegroundColor Yellow
gh release upload $tagName dist_electron/*.exe dist_electron/*.yml --clobber

# 7. Abrir la página de Releases en el navegador
Write-Host "Abriendo página de releases..." -ForegroundColor Magenta
$repoUrl = gh repo view --json url -q .url
start "$repoUrl/releases/tag/$tagName"

Write-Host "--- ¡Proceso completado con éxito! ---" -ForegroundColor Green