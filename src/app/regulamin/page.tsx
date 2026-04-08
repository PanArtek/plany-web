{/* TODO: review with legal before production */}
import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/app/(landing)/_sections/nav";
import { Footer } from "@/app/(landing)/_sections/footer";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Regulamin",
  description:
    "Regulamin świadczenia usług drogą elektroniczną przez PLANY Sp. z o.o.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/regulamin" },
};

export default function Regulamin() {
  return (
    <>
      <Nav />
      <LegalLayout
        title="Regulamin świadczenia usług drogą elektroniczną"
        effectiveDate="8 kwietnia 2026 r."
      >
        <h2>§ 1. Postanowienia ogólne</h2>
        <ol>
          <li>
            Niniejszy regulamin określa zasady świadczenia usług drogą
            elektroniczną za pośrednictwem strony internetowej dostępnej pod
            adresem <strong>plany.com.pl</strong> (dalej: „Serwis”).
          </li>
          <li>
            Właścicielem Serwisu i usługodawcą jest:
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
              Kapitał zakładowy: 5 000,00 zł
              <br />
              e-mail: biuro@plany.com.pl
            </p>
            dalej zwana „Usługodawcą”.
          </li>
          <li>
            Regulamin został wydany na podstawie art. 8 ust. 1 pkt 1 ustawy z
            dnia 18 lipca 2002 r. o świadczeniu usług drogą elektroniczną (Dz.U.
            2020 poz. 344 z późn. zm.).
          </li>
        </ol>

        <h2>§ 2. Definicje</h2>
        <ul>
          <li>
            <strong>Serwis</strong> — strona internetowa Usługodawcy dostępna
            pod adresem plany.com.pl.
          </li>
          <li>
            <strong>Użytkownik</strong> — każda osoba fizyczna, prawna lub
            jednostka organizacyjna korzystająca z Serwisu.
          </li>
          <li>
            <strong>Usługa</strong> — usługa świadczona drogą elektroniczną
            przez Usługodawcę na rzecz Użytkownika za pośrednictwem Serwisu.
          </li>
          <li>
            <strong>Formularz kontaktowy</strong> — interaktywny formularz
            dostępny w Serwisie, umożliwiający przesłanie zapytania do
            Usługodawcy.
          </li>
        </ul>

        <h2>§ 3. Rodzaj i zakres świadczonych usług</h2>
        <ol>
          <li>
            Za pośrednictwem Serwisu Usługodawca świadczy bezpłatnie następujące
            usługi:
            <ol>
              <li>udostępnianie treści informacyjnych o działalności i ofercie Usługodawcy,</li>
              <li>umożliwienie przesłania zapytania za pośrednictwem Formularza kontaktowego,</li>
              <li>prezentacja portfolio zrealizowanych projektów.</li>
            </ol>
          </li>
          <li>
            Przesłanie zapytania przez Formularz kontaktowy nie stanowi zawarcia
            umowy. Warunki ewentualnej współpracy ustalane są indywidualnie.
          </li>
        </ol>

        <h2>§ 4. Warunki techniczne</h2>
        <ol>
          <li>
            Do prawidłowego korzystania z Serwisu niezbędne jest posiadanie:
            <ol>
              <li>urządzenia z dostępem do internetu,</li>
              <li>
                przeglądarki internetowej w aktualnej wersji (Chrome, Firefox,
                Safari, Edge) z włączoną obsługą JavaScript i plików cookies,
              </li>
              <li>
                aktywnego adresu e-mail (w przypadku korzystania z Formularza
                kontaktowego).
              </li>
            </ol>
          </li>
          <li>
            Usługodawca nie ponosi odpowiedzialności za problemy techniczne
            wynikające z niespełnienia powyższych wymagań przez Użytkownika.
          </li>
        </ol>

        <h2>§ 5. Korzystanie z Formularza kontaktowego</h2>
        <ol>
          <li>Korzystanie z Formularza kontaktowego jest bezpłatne i dobrowolne.</li>
          <li>
            Użytkownik zobowiązany jest do podania prawdziwych danych oraz do
            niedostarczania treści o charakterze bezprawnym.
          </li>
          <li>Usługodawca odpowiada na zapytania w ciągu 24 godzin w dni robocze.</li>
          <li>
            Dane osobowe podane w Formularzu kontaktowym przetwarzane są zgodnie
            z{" "}
            <Link href="/polityka-prywatnosci">Polityką prywatności</Link>.
          </li>
        </ol>

        <h2>§ 6. Prawa autorskie</h2>
        <ol>
          <li>
            Wszelkie treści zawarte w Serwisie (teksty, zdjęcia, grafiki, układ
            strony) stanowią własność Usługodawcy lub są wykorzystywane na
            podstawie odpowiednich licencji i są chronione prawem autorskim.
          </li>
          <li>
            Kopiowanie, rozpowszechnianie lub wykorzystywanie treści z Serwisu w
            celach komercyjnych bez pisemnej zgody Usługodawcy jest zabronione.
          </li>
        </ol>

        <h2>§ 7. Reklamacje</h2>
        <ol>
          <li>Użytkownik ma prawo do złożenia reklamacji dotyczącej świadczonych Usług.</li>
          <li>
            Reklamacje należy przesyłać na adres e-mail:{" "}
            <strong>biuro@plany.com.pl</strong> lub pisemnie na adres siedziby
            Usługodawcy.
          </li>
          <li>
            Reklamacja powinna zawierać:
            <ol>
              <li>dane kontaktowe Użytkownika,</li>
              <li>opis problemu,</li>
              <li>oczekiwany sposób rozpatrzenia reklamacji.</li>
            </ol>
          </li>
          <li>Usługodawca rozpatruje reklamację w terminie 14 dni od dnia jej otrzymania.</li>
          <li>
            Odpowiedź na reklamację przesyłana jest na adres e-mail Użytkownika
            lub w inny sposób wskazany w reklamacji.
          </li>
        </ol>

        <h2>§ 8. Odpowiedzialność</h2>
        <ol>
          <li>
            Usługodawca dokłada starań, aby Serwis działał prawidłowo i bez
            zakłóceń, jednak nie gwarantuje nieprzerwanej dostępności Serwisu.
          </li>
          <li>
            Usługodawca zastrzega sobie prawo do czasowego wstrzymania lub
            ograniczenia dostępu do Serwisu w celu przeprowadzenia prac
            konserwacyjnych lub aktualizacji.
          </li>
          <li>
            Usługodawca nie ponosi odpowiedzialności za szkody wynikłe z
            nieprawidłowego korzystania z Serwisu przez Użytkownika, w
            szczególności z podania nieprawdziwych danych.
          </li>
        </ol>

        <h2>§ 9. Zakaz dostarczania treści bezprawnych</h2>
        <ol>
          <li>
            Użytkownik zobowiązuje się do niedostarczania i nieprzekazywania
            treści zabronionych przez przepisy prawa, w szczególności treści
            naruszających majątkowe prawa autorskie osób trzecich, dobra
            osobiste osób trzecich, zawierających treści obraźliwe, wulgarne lub
            naruszające zasady współżycia społecznego.
          </li>
          <li>
            W przypadku naruszenia powyższego zakazu Usługodawca ma prawo do
            zablokowania dostępu do Serwisu dla Użytkownika naruszającego zasady.
          </li>
        </ol>

        <h2>§ 10. Dane osobowe</h2>
        <ol>
          <li>
            Zasady przetwarzania danych osobowych Użytkowników określa{" "}
            <Link href="/polityka-prywatnosci">Polityka prywatności</Link>{" "}
            dostępna w Serwisie.
          </li>
          <li>Administratorem danych osobowych jest Usługodawca.</li>
        </ol>

        <h2>§ 11. Postanowienia końcowe</h2>
        <ol>
          <li>
            Usługodawca zastrzega sobie prawo do zmiany niniejszego regulaminu.
            O wszelkich zmianach Użytkownicy będą informowani poprzez publikację
            zaktualizowanego regulaminu w Serwisie. Zmiany wchodzą w życie w
            terminie wskazanym przez Usługodawcę, nie krótszym niż 7 dni od dnia
            publikacji.
          </li>
          <li>
            W sprawach nieuregulowanych niniejszym regulaminem zastosowanie mają
            przepisy prawa polskiego, w szczególności:
            <ol>
              <li>Kodeks cywilny,</li>
              <li>ustawa o świadczeniu usług drogą elektroniczną,</li>
              <li>ustawa o prawach konsumenta,</li>
              <li>RODO.</li>
            </ol>
          </li>
          <li>
            Wszelkie spory wynikające z korzystania z Serwisu rozstrzygane będą
            przez sąd właściwy dla siedziby Usługodawcy, a w przypadku sporów z
            konsumentami — przez sąd właściwy zgodnie z przepisami Kodeksu
            postępowania cywilnego.
          </li>
          <li>
            Regulamin wchodzi w życie z dniem <strong>8 kwietnia 2026 r.</strong>
          </li>
        </ol>
      </LegalLayout>
      <Footer />
    </>
  );
}
