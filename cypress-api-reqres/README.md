# Cypress API Automation - Reqres

Project ini berisi automation API menggunakan Cypress untuk website `https://reqres.in/`.

Total request yang dibuat: **11 request**.

## Daftar Request

| No | Method | Endpoint | Validasi Utama |
|---:|---|---|---|
| 1 | GET | `/api/users?page=2&per_page=6` | status 200, page, data user |
| 2 | GET | `/api/users/2` | status 200, detail user |
| 3 | GET | `/api/users/23` | status 404, user tidak ditemukan |
| 4 | GET | `/api/unknown` | status 200, list resource |
| 5 | GET | `/api/unknown/2` | status 200, detail resource |
| 6 | POST | `/api/users` | status 201, create user |
| 7 | PUT | `/api/users/2` | status 200, update user |
| 8 | PATCH | `/api/users/2` | status 200, partial update user |
| 9 | DELETE | `/api/users/2` | status 204, delete user |
| 10 | POST | `/api/login` | status 200, login berhasil |
| 11 | POST | `/api/login` | status 400, login gagal |

## Cara Install

```bash
npm install
```

## Konfigurasi API Key

Reqres membutuhkan header `x-api-key` untuk endpoint `/api/*`.

Buat file `cypress.env.json` dari template:

```bash
cp cypress.env.example.json cypress.env.json
```

Lalu isi API key kamu:

```json
{
  "REQRES_API_KEY": "api_key_kamu"
}
```

> Catatan: `cypress.env.json` sudah masuk `.gitignore`, jadi API key tidak ikut ter-push ke GitHub.

## Cara Menjalankan Test

Mode headless:

```bash
npm run cy:run
```

Mode interactive:

```bash
npm run cy:open
```

## Struktur Folder

```text
cypress-api-reqres/
├── cypress/
│   ├── e2e/
│   │   └── api/
│   │       └── reqres_api.cy.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .github/
│   └── workflows/
│       └── cypress-api.yml
├── .gitignore
├── cypress.config.js
├── cypress.env.example.json
├── package.json
└── README.md
```

## Cara Push ke Repository yang Sama dalam Folder Berbeda

Jalankan dari root repository lama kamu:

```bash
git checkout -b cypress-api-automation
mkdir -p cypress-api-reqres
# copy semua file project ini ke folder cypress-api-reqres

git add cypress-api-reqres
git commit -m "Add Cypress API automation for Reqres"
git push origin cypress-api-automation
```

Kalau ingin push langsung ke branch utama:

```bash
git add cypress-api-reqres
git commit -m "Add Cypress API automation for Reqres"
git push origin main
```

## GitHub Actions Secret

Jika memakai GitHub Actions, tambahkan secret repository:

- Name: `REQRES_API_KEY`
- Value: API key Reqres kamu
