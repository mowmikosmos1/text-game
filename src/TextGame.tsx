import {
  ChangeEvent,
  MouseEventHandler,
  SyntheticEvent,
  useState,
} from "react";

// 1) przenies getRandomPolishNoun do oddzielnego pliku
// 2) dodaj style
// 3) dodaj po prawej okienko z podsumowaniem gier:
//   np 6/10 wygranych
// 4) dodaj limit 10 szans na zgadniecie slowa, kedy uzytkownik wykorzysta 10 szanse, pokaz odpowiedz
// 5) dodaj poczatkowy ekrak na ktorym mozna wybrac: zagraj w prosta gre

function getRandomPolishNoun(): string {
  const polishNouns: string[] = [
    "dom",
    "szkoła",
    "samochód",
    "drzewo",
    "kot",
    "pies",
    "książka",
    "okno",
    "krzesło",
    "stół",
    "długopis",
    "komputer",
    "telefon",
    "słońce",
    "księżyc",
    "gwiazda",
    "morze",
    "rzeka",
    "jezioro",
    "góra",
    "miasto",
    "wioska",
    "ulica",
    "droga",
    "most",
    "zegar",
    "szafa",
    "biurko",
    "łóżko",
    "firanka",
    "lampa",
    "kwiat",
    "trawa",
    "las",
    "park",
    "ogród",
    "kino",
    "teatr",
    "muzeum",
    "biblioteka",
    "sklep",
    "restauracja",
    "kawiarnia",
    "szpital",
    "apteka",
    "szkoła",
    "uniwersytet",
    "bank",
    "poczta",
    "hotel",
    "basen",
    "siłownia",
    "stadion",
    "boisko",
    "kościół",
    "cerkiew",
    "synagoga",
    "meczet",
    "główka",
    "ręka",
    "noga",
    "stopa",
    "palec",
    "ucho",
    "oko",
    "nos",
    "usta",
    "język",
    "zęby",
    "włosy",
    "twarz",
    "brzuch",
    "plecy",
    "klatka piersiowa",
    "serce",
    "wątroba",
    "płuca",
    "żołądek",
    "mózg",
    "nerka",
    "skóra",
    "mięsień",
    "kość",
    "paznokieć",
    "brwi",
    "rzęsy",
    "szyja",
    "ramię",
    "łokieć",
    "kolano",
    "pięta",
    "kciuk",
    "żołądek",
    "gardło",
    "pępek",
    "kręgosłup",
    "pacha",
    "nadgarstek",
    "kostka",
    "broda",
  ];

  const randomIndex = Math.floor(Math.random() * polishNouns.length);
  return polishNouns[randomIndex];
}

export const TextGame = () => {
  const [usersWord, setUsersWord] = useState<string>("");
  const [solved, setSolved] = useState(false);
  const [mainWord, setMainWord] = useState<string>(getRandomPolishNoun());
  const [listWord, setListWord] = useState<string[]>([mainWord]);

  function removeDuplicates(newList: string[]) {
    let noDuplicates: string[] = [];

    // for(let usersWordIndex in newList)  // iteruje po indeksach
    // for(let usersWord of newList)    // iteruje po wartosciach

    for (let usersWord of newList) {
      if (noDuplicates.includes(usersWord)) {
        continue;
      } else {
        noDuplicates.push(usersWord);
      }
    }
    return noDuplicates;
  }

  function removeDuplicatesWithSet(newList: string[]) {
    // [2, 2, 2, 4, 4, 6, 7, 8]
    const newSet = new Set(newList); // zamiana list na set (zostaja tylko unikalne elementy)
    // {2, 4, 6, 7, 8}
    const noDuplicates = [...newSet]; // zamiane set na list

    // skrocona wersja
    // return [...newSet(newList)]

    return noDuplicates;
  }

  // 1. Pobierz slowo od uzytkownika i napisz tak/nie porownujac je do naszego slowa

  // 1) tworzenie obiektowe {id:1, value: "kot", toShow: <div>_______</div>}
  //                         {id:2. value: "dom", toShow: "dom"}

  // 2)  ["dom", "kot", "zamek"]
  // if(word === mainWord) <div> _______</div>

  function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();
    setListWord((prev) => {
      let newList = [...prev]; // nowa tabela (kopia)
      // dodaj element do tablicy

      newList.push(usersWord);
      newList = removeDuplicates(newList);
      newList.sort();

      return newList;
    });
    if (mainWord === usersWord) {
      setSolved(true);
      alert("BRAWO!!! TRAFIŁEŚ SŁOWO !!!");
    } else {
      alert("Wypisz raz jeszcze");
    }
  }

  /// 1. Nie pokazuj duplikatow na liscie ##
  /// 2. Pokaz czerona linie na liscie slow w miejscu gdzie byloby nasze slowo ##
  /// 3. Jesli uzytkownik poda dobre slowo: napisz mainWord na liscie na zielono ##
  /// 4. Jesli uzytkownik poda dobre slowo niech zniknie input i button i pojawi sie button "jeszcze raz" ##

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUsersWord(e.target.value);
  }
  async function handleClick(e: any) {
    const newWord = getRandomPolishNoun();
    setListWord([newWord]);
    setMainWord(newWord);
    setSolved(false);
  }
  function handleGiveUpClick(e: any) {
    setSolved(true);
  }
  return (
    <div>
      <h1>Gra w slownik</h1>

      {!solved && (
        <>
          <form onSubmit={handleSubmit}>
            <input onChange={handleChange}></input>
            <button>Sprawdz</button>
          </form>
          <button onClick={handleGiveUpClick}>Poddaje się!</button>
        </>
      )}
      {solved && <button onClick={handleClick}>SPROBUJ JESZCZE RAZ</button>}
      <ul>
        {listWord.map((word, i) => {
          if (solved && mainWord === word) {
            return (
              <li style={{ color: "green" }} key={i}>
                {word}
              </li>
            );
          }
          if (word === mainWord) {
            return (
              <li style={{ color: "red" }} key={i}>
                ___________
              </li>
            );
          }
          return <li key={i}>{word}</li>;
        })}
      </ul>
    </div>
  );
};
