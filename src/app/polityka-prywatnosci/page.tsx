{/* TODO: review with legal before production */}
import type { Metadata } from "next";
import { Nav } from "@/app/(landing)/_sections/nav";
import { Footer } from "@/app/(landing)/_sections/footer";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description:
    "Polityka prywatności PLANY Sp. z o.o. — administrator danych, cele przetwarzania, prawa użytkownika.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PolitykaPrywatnosci() {
  return (
    <>
      <Nav />
      <LegalLayout title="Polityka prywatności" effectiveDate="8 kwietnia 2026 r.">
        <h2>1. Administrator danych osobowych</h2>
        <p>Administratorem Twoich danych osobowych jest:</p>
        <p>
          <strong>PLANY Spółka z ograniczoną odpowiedzialnością</strong>
          <br />
          ul. Długa 29, 00-238 Warszawa
          <br />
          KRS: 0001125454
          <br />
          NIP: 5253016152
          <br />
          REGON: 529591804
          <br />
          e-mail: biuro@plany.com.pl
        </p>
        <p>
          W sprawach dotyczących danych osobowych możesz kontaktować się z nami
          pod powyższym adresem e-mail lub korespondencyjnie na adres siedziby.
        </p>

        <h2>2. Zakres zbieranych danych</h2>
        <p>Zbieramy następujące dane:</p>
        <ul>
          <li>
            <strong>Z formularza kontaktowego:</strong> imię i nazwisko, nazwa
            firmy, adres e-mail, numer telefonu, typ projektu, metraż, treść
            wiadomości.
          </li>
          <li>
            <strong>Automatycznie:</strong> adres IP, informacje o przeglądarce
            i urządzeniu, dane o sposobie korzystania ze strony (pliki cookies
            i podobne technologie).
          </li>
        </ul>

        <h2>3. Cele i podstawy prawne przetwarzania</h2>
        <p>Twoje dane przetwarzamy w następujących celach:</p>
        <table>
          <thead>
            <tr>
              <th>Cel</th>
              <th>Podstawa prawna</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                Odpowiedź na zapytanie przesłane przez formularz kontaktowy,
                przygotowanie wyceny, kontakt w sprawie Twojego projektu
              </td>
              <td>
                art. 6 ust. 1 lit. b RODO — działania zmierzające do zawarcia
                umowy
              </td>
            </tr>
            <tr>
              <td>
                Prowadzenie korespondencji i obsługa zapytań niezwiązanych
                bezpośrednio z zawarciem umowy
              </td>
              <td>
                art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes
                administratora
              </td>
            </tr>
            <tr>
              <td>
                Prowadzenie działań marketingowych (jeśli wyraziłeś zgodę)
              </td>
              <td>art. 6 ust. 1 lit. a RODO — zgoda</td>
            </tr>
            <tr>
              <td>Analityka strony internetowej, poprawa jakości usług</td>
              <td>
                art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes
              </td>
            </tr>
            <tr>
              <td>
                Realizacja obowiązków prawnych (np. podatkowych, rachunkowych)
              </td>
              <td>art. 6 ust. 1 lit. c RODO — obowiązek prawny</td>
            </tr>
            <tr>
              <td>Ustalenie, dochodzenie lub obrona roszczeń</td>
              <td>
                art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes
              </td>
            </tr>
          </tbody>
        </table>

        <h2>4. Okres przechowywania danych</h2>
        <ul>
          <li>
            Dane z formularza kontaktowego przechowujemy przez okres niezbędny
            do udzielenia odpowiedzi i prowadzenia korespondencji, a następnie
            przez okres do 3 lat w celach archiwizacyjnych i ewentualnych
            roszczeń.
          </li>
          <li>
            Dane związane z zawartą umową przechowujemy przez okres trwania
            umowy oraz przez okres wymagany przepisami prawa (podatkowymi,
            rachunkowymi) — zwykle 5 lat od końca roku kalendarzowego, w którym
            upłynął termin płatności podatku.
          </li>
          <li>Dane przetwarzane na podstawie zgody — do momentu jej wycofania.</li>
        </ul>

        <h2>5. Odbiorcy danych</h2>
        <p>Twoje dane możemy przekazywać:</p>
        <ul>
          <li>
            dostawcom usług IT i hostingowych (m.in. Vercel Inc. — hosting
            strony),
          </li>
          <li>dostawcom usług pocztowych i kurierskich,</li>
          <li>biurom rachunkowym i doradcom prawnym,</li>
          <li>
            podwykonawcom, jeśli jest to niezbędne do realizacji projektu,
          </li>
          <li>organom państwowym, jeśli wynika to z przepisów prawa.</li>
        </ul>
        <p>
          Wszyscy odbiorcy są zobowiązani do zachowania poufności i
          przetwarzania danych zgodnie z RODO.
        </p>

        <h2>6. Przekazywanie danych poza EOG</h2>
        <p>
          Niektórzy nasi dostawcy usług (np. Vercel Inc., Google LLC) mają
          siedzibę poza Europejskim Obszarem Gospodarczym. W takich przypadkach
          dane przekazywane są w oparciu o standardowe klauzule umowne
          zatwierdzone przez Komisję Europejską, zgodnie z art. 46 ust. 2 lit. c
          RODO, zapewniające odpowiedni poziom ochrony danych.
        </p>

        <h2>7. Twoje prawa</h2>
        <p>
          W związku z przetwarzaniem Twoich danych osobowych masz prawo do:
        </p>
        <ul>
          <li>
            <strong>dostępu</strong> do swoich danych i otrzymania ich kopii,
          </li>
          <li>
            <strong>sprostowania</strong> (poprawiania) danych nieprawidłowych
            lub niekompletnych,
          </li>
          <li>
            <strong>usunięcia</strong> danych („prawo do bycia zapomnianym”),
          </li>
          <li>
            <strong>ograniczenia przetwarzania</strong> danych,
          </li>
          <li>
            <strong>przenoszenia</strong> danych do innego administratora,
          </li>
          <li>
            <strong>wniesienia sprzeciwu</strong> wobec przetwarzania danych,
          </li>
          <li>
            <strong>wycofania zgody</strong> w dowolnym momencie (bez wpływu na
            zgodność z prawem przetwarzania sprzed jej wycofania),
          </li>
          <li>
            <strong>wniesienia skargi</strong> do organu nadzorczego — Prezesa
            Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
          </li>
        </ul>
        <p>
          Aby skorzystać z powyższych praw, napisz do nas na adres:{" "}
          <strong>biuro@plany.com.pl</strong>.
        </p>

        <h2>8. Pliki cookies</h2>
        <p>Strona używa plików cookies i podobnych technologii w celu:</p>
        <ul>
          <li>zapewnienia prawidłowego działania strony (cookies niezbędne),</li>
          <li>analizy ruchu i sposobu korzystania ze strony (cookies analityczne),</li>
          <li>dostosowania treści do preferencji użytkownika.</li>
        </ul>
        <p>
          Cookies niezbędne są zawsze aktywne. Pozostałe cookies ustawiamy
          wyłącznie po uzyskaniu Twojej zgody wyrażonej za pomocą baneru
          cookies.
        </p>
        <p>
          W każdej chwili możesz zmienić ustawienia cookies w swojej
          przeglądarce lub cofnąć zgodę klikając w link „Ustawienia cookies” w
          stopce strony.
        </p>

        <h2>9. Dobrowolność podania danych</h2>
        <p>Podanie danych osobowych jest dobrowolne, ale niezbędne do:</p>
        <ul>
          <li>
            otrzymania odpowiedzi na zapytanie przesłane przez formularz
            kontaktowy,
          </li>
          <li>przygotowania wyceny,</li>
          <li>zawarcia i realizacji umowy.</li>
        </ul>
        <p>Brak podania danych uniemożliwi nam realizację powyższych celów.</p>

        <h2>10. Profilowanie i zautomatyzowane decyzje</h2>
        <p>
          Nie podejmujemy decyzji w sposób zautomatyzowany, w tym nie profilujemy
          Twoich danych osobowych w rozumieniu art. 22 RODO.
        </p>

        <h2>11. Zmiany polityki prywatności</h2>
        <p>
          Zastrzegamy sobie prawo do zmiany niniejszej polityki prywatności. O
          wszelkich zmianach będziemy informować poprzez publikację
          zaktualizowanej wersji na tej stronie. Aktualna wersja obowiązuje od
          daty wskazanej na początku dokumentu.
        </p>
      </LegalLayout>
      <Footer />
    </>
  );
}
