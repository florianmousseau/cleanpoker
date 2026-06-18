# CleanPoker — Setup initial
# Lance ce script une seule fois après avoir cloné le repo

Write-Host "=== CleanPoker Setup ===" -ForegroundColor Green

# Backend Go
Write-Host "`n[1/3] Backend — go mod tidy" -ForegroundColor Cyan
Set-Location backend
go mod tidy
Set-Location ..

# Frontend SvelteKit
Write-Host "`n[2/3] Frontend — npm install" -ForegroundColor Cyan
Set-Location frontend
npm install
Copy-Item .env.example .env -ErrorAction SilentlyContinue
Set-Location ..

Write-Host "`n[3/3] Prêt !" -ForegroundColor Green
Write-Host "  Backend  : cd backend && go run ./cmd/server"
Write-Host "  Frontend : cd frontend && npm run dev"
