# Book a ticket
## Raport techniczny

## Spis treści

1. [Wymagania](#wymagania)
2. [Uruchamianie](#uruchamianie)
3. [Użyte technologie](#użyte-technologie)
4. [Architektura](#architektura)
4. [Organizacja Pracy](#organizacja-pracy)
5. [Podsumowanie](#podsumowanie)


## Wymagania

 - Docker

## Uruchamianie

```
docker compose up
```
Strona powinna być dostępna na [localhost:3000](localhost:3000)

## Użyte technologie
- [Docker](https://www.docker.com/) - Użyte do stworzenia obrazu środkowiska z buildem produkcyjnym.

**Serwer:**
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Swagger](https://swagger.io/) - Biblioteka generująca dokumentacje API na podstawie komentarzy w kodzie.
- [SQLite3](https://www.sqlite.org/index.html) - Bazadanych wybrana ze względu na to jak łatwo się z nią pracuje.
- [Sequelize](https://sequelize.org/) - ORM dla Sqlite3

**Client:**
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) - Framework frontendowy umożliwiający nam łatwą budowe strony z CSR.
- [shadcn/ui](https://ui.shadcn.com/) - Narzędzie zawierające gotowe komponenty UI. Dużym plusem shadcn jest to, że zaimportowane komponenty znajdują się w naszej bazie kodu i są łatwe do modyfikacji. Komponenty shadcn zbudowane są korzystając z tailwind oraz czasem z radixui, więc te 2 biblioteki również zostały zainstalowane.

## Architektura

Projekt podzielony jast na dwa katalogi: server i client.
W trakcie developmentu za pomocą przygotowanej komendy startowaliśmy osobno serwer kliencki i serwer backendowy, ale produkcyjny build uruchamiany na docker statycznie serwuje zbuildowaną strone z katalogu client.
Cała aplikacja działa zgodnie ze schematem MVC

**Server**:

Plik wejściowy serwera to: index.js. Jego zadania to:
- Stworzenie i uruchomienie serwera express
- Serwowanie plików statycznych
- Uruchomienie potrzebnych middleware'ów
- Użycie zdefiniowanych "routes"

W katalogu routes znajdują się scieżki do endpointów api i deklaracje z jakich funkcji w opdpowiednich kontrolerach mają korzystać.

Kontrolery umieszczone w katalogu controllers komunikują się z bazą danych za pomocą funkcji z definiowanych w katalogu db/queries. Katalog server/db zawiera całą logike obsługującą baze danych.

Dostępne endpointy serwera wylistowane są przez swaggera po uruchomieniu buildu w trybie "development". `localhost:3000/api/api-docs`


**Client**:

Widok aplikacji został wykonany w react. Użyliśmy komponentów shadcn, a własne komponenty wystylizowaliśmy za pomocą tailwind.

Plik wejściowy aplikacji to App.jsx. Komponent App posiada Router zawierający wszystkie Routy dostępne w aplikacji. Router o wrappowany jest w nasz komponent DataProvider odpowiedzialny za z fetchowanie danych z serwera i udostępnienie ich wszystkim komponentą dziecią za pomocą reactowego Context'u.

## Organizacja pracy

Głównym narzędziem organizującym naszą prace był Discord.
Każdy członek zespołu przypisał sobie zadania dostępne z listy wcześniej ustalonych zadań.
Dodatkowo prace ułatwiały dobre i przejrzyste git commit message na podstawie, których można było odczytać co już zostało zrobione.

## Podsumowanie

Cel projektu został osiągnięty, ponieważ powstała aplikacja spełnia ustalone wymagania, czyli umożliwia zakup biletów przez prosty interfejs oraz zapoznanie się z wydarzeniami. Aplikacja zgodnie z założeniami jest skierowana do klientów. W celu rozbudowy projektu możliwe jest utworzenie aplikacji dla firm i instytucji, która umożliwiałaby łatwe zarządzanie dostępnymi wydarzeniami i sprzedażą biletów. Możliwa jest też rozbudowa o nowe funkcje, np. wyświetlanie wydarzeń posortowanych według ustalonych kryteriów lub na podstawie wybranych przez użytkownika kategorii, dzięki czemu mógłby szybko zapoznać się z bardziej interesującą go ofertą.