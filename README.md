
# Baza produktów

Aplikacja napisana z użyciem TypeScript w oparciu o frameworki node.js oraz express.js 🙂

<details>
  <summary>Treść zadania</summary>
  
  1. Utwórz API w technologii Node.js przy użyciu dowolnego frameworka z
wykorzystaniem języka Typescript.<br>
  2. Wymagania projektu:<br>
    &nbsp;a. Obsługa następujących metod / routów:<br>
      &nbsp; &nbsp;• Lista produktów<br>
      &nbsp; &nbsp;• Szczegóły produktu<br>
      &nbsp; &nbsp;• Update produktu<br>
      &nbsp; &nbsp;• Utworzenie produktu<br>
      &nbsp; &nbsp;• Usunięcie produktu<br>
    b. Każda metoda powinna odpowiadać na odpowiedni typ zapytania http
    (GET, POST, PUT, DELETE).<br>
    c. Produkty powinny być zapisane w bazie danych (dowolna) lub pliku
    (dowolny format)<br>
    d. Aplikacja powinna być rozdzielona na warstwy - wzorzec do wyboru
    (kontroler / router powinien pełnić jedynie funkcje sterowania przepływem
    danych)<br>
    e. Encja produkt składa się z:<br>
      &nbsp; &nbsp;• Id<br>
      &nbsp; &nbsp;• Name<br>
      &nbsp; &nbsp;• Price<br>
      &nbsp; &nbsp;• UpdateDate<br>
    f. Wejściowe dane w aplikacji powinny być walidowane (w przypadku
    tworzenia produktu nazwa oraz cena jest wymagana, w przypadku
    aktualizacji dodatkowo ID jest wymagany, maksymalna długości nazwy to
    100 znaków)<br>
    g. Dodatkowo wszystkie serwisy i ew. repozytoria mogą być wstrzykiwane z
    kontenera IOC poprzez DI - zadanie opcjonalne.<br>
  3. Kod powinien być hostowany na platformie github.<br>
  4. Dostarczenie rozwiązania nastąpi poprzez przesłanie linku do projektu wraz z
  instrukcjami dotyczącymi uruchomienia.<br>
  5. Rozwiązanie powinno być testowalne z poziomu przeglądarki lub narzędzi typu
  Postman.<br>
  6. Kod powinien zawierać angielskie nazwy (zmienne, funkcje etc).<br>
  
</details>


## Instalacja

##### Środowisko uruchomieniowe aplikacji można zainstalować za pomocą npm

```bash 
git clone https://github.com/Paweu1412/check-task/
cd check-task
npm install
nano .env
```

##### Konfiguracja pliku .env

```bash
HOST='' # adres hosta
USER='' # nazwa użytkownika
PASSWORD='' # hasło
DATABASE='' # nazwa bazy danych
```

##### Import struktury bazy danych (MySQL 5.7.36)

```sql
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `updateDate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf16;
```

##### Uruchomienie środowiska

```bash
npm run dev
```

Port: 8000


## Użycie API

<h3 align="center">Zwróć wszystkie produkty z bazy danych</h3>

```
  GET /products
```

---

<h3 align="center">Zwróć szczegóły produktu o podanym ID</h3>

```
  GET /products/{id}
```

#### Parametry zapytania
| Parametr  | Typ      |
| :-------- | :------- |
| `id`      | `number` | **wymagane**  |

---

<h3 align="center">Zaaktualizuj produkt o podanym ID</h3>

```
  PUT /products/{id}
```

#### Parametry zapytania
| Parametr  | Typ      |
| :-------- | :------- |
| `id`      | `number` | **wymagane**  |

#### Ciało zapytania
| Klucz     | Wartość  |
| :-------- | :------- |
| `name`    | `string` | **wymagane**  |
| `price`   | `number` | **wymagane**  |

###### Przykład ciała / JSON
```json
{
  "name": "Kapelusz",
  "price": 200
}
```

---

<h3 align="center">Stwórz nowy produkt</h3>

```
  POST /products
```
#### Ciało zapytania
| Klucz     | Wartość  |
| :-------- | :------- |
| `name`    | `string` | **wymagane**  |
| `price`   | `number` | **wymagane**  |

###### Przykład ciała / JSON
```json
{
  "name": "Kapelusz",
  "price": 500
}
```

---

<h3 align="center">Usuń produkt o podanym ID</h3>

```
  DELETE /products/{id}
```
#### Parametry zapytania
| Parametr  | Typ      |
| :-------- | :------- |
| `id`      | `number` | **wymagane**  |
