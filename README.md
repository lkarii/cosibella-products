# Cosibella Products

Zadanie rekrutacyjne na stanowisko Frontend Developer dla Cosibella — aplikacja-katalog produktów.

Frontend developer recruitment task for Cosibella — a product catalog application.

Wersja demo / Live demo: https://lkarii.github.io/cosibella-products/

---

## Polski

### O projekcie

Katalog produktów pobierający dane z testowego API. Produkty można przeglądać w tabeli albo w galerii kart, szukać po nazwie, filtrować po kategorii i cenie, sortować, dzielić na strony i sprawdzać pełne szczegóły w modalu. Stan widoku zapisuje się w adresie URL, więc stronę można odświeżyć albo wysłać link komuś innemu — wróci do tego samego miejsca.

### Stos technologiczny

- JavaScript (moduły ES)
- Vite
- Sass/SCSS
- GitHub Actions + GitHub Pages

### Funkcje

- Tabela albo galeria kart, z przełącznikiem
- Wyszukiwanie po nazwie produktu
- Filtrowanie po kategorii i cenie, z przyciskiem czyszczącym filtry
- Sortowanie po ID, nazwie i cenie
- Paginacja z wyborem liczby elementów na stronie
- Modal ze wszystkimi danymi produktu
- Ikonka dostępności produktu (koszyk / lista oczekujących)
- Jasny i ciemny motyw, zapamiętywany w przeglądarce
- Obsługa stanu wczytywania, błędów i braku wyników

### Jak uruchomić

**Opcja 1 — demo**

https://lkarii.github.io/cosibella-products/

**Opcja 2 — lokalnie**

1. Zainstaluj [Node.js](https://nodejs.org/) (LTS).
2. Sklonuj repozytorium:
   ```
   git clone https://github.com/lkarii/cosibella-products.git
   cd cosibella-products
   ```
3. `npm install` — instaluje zależności projektu.
4. `npm run dev` — odpala serwer deweloperski.
5. Otwórz adres wypisany w terminalu (domyślnie `http://localhost:5173/cosibella-products/`).

Build produkcyjny: `npm run build`, podgląd: `npm run preview`.

---

## English

### About

A product catalog that pulls data from a test API. Browse products as a table or a card gallery, search by name, filter by category and price, sort, paginate, and open a modal for the full details. The view's state lives in the URL, so refreshing the page or sending the link to someone else lands back in the same place.

### Tech stack

- JavaScript (ES modules)
- Vite
- Sass/SCSS
- GitHub Actions + GitHub Pages

### Features

- Table or card gallery, with a toggle
- Search by product name
- Filter by category and price, with a clear-filters button
- Sort by ID, name, and price
- Pagination with a selectable page size
- Modal with all the product's data
- Stock availability icon (cart / waiting list)
- Light and dark theme, remembered between visits
- Loading, error, and empty-result states

### Running it

**Option 1 — demo**

https://lkarii.github.io/cosibella-products/

**Option 2 — locally**

1. Install [Node.js](https://nodejs.org/) (LTS).
2. Clone the repository:
   ```
   git clone https://github.com/lkarii/cosibella-products.git
   cd cosibella-products
   ```
3. `npm install` — installs the project's dependencies.
4. `npm run dev` — starts the dev server.
5. Open the address printed in the terminal (`http://localhost:5173/cosibella-products/` by default).

Production build: `npm run build`, preview: `npm run preview`.
