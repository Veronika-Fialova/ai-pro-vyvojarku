{/* ZADÁNÍ */}

// Ukázkové pole studentů
const students = [
  { name: 'Charlie', score: 85 },
  { name: 'Bob', score: 95 },
  { name: 'Dave', score: 90 },
  { name: null, score: 100 },
  { name: 'Alice', score: 85 },
  { name: 'Eve' },
]

// Funkce, která seřadí studenty podle více kritérií:
// 1. Seřadí podle skóre v sestupném pořadí. (100, 99, ...)
// 2. Pokud mají dva studenti stejné skóre, seřadí podle jména v abecedním pořadí. (Adam, Bert, ...)
function sortStudents(students) {
  // Logika pro seřazení studentů
  return students
}

// Volání funkce a zobrazení výsledků
console.log(sortStudents(students)) 


{/* VÝSLEDEK CHAT GPT*/}

/**
 * Seřadí pole studentů podle skóre sestupně a poté podle jména abecedně (case-insensitive).
 * Studenti bez skóre se řadí na konec.
 * Původní pole se nemění, vrací se nové seřazené pole.
 *
 * @param {Array<Object>} students Pole studentů s vlastnostmi 'name' (string) a 'score' (number).
 * @returns {Array<Object>} Nové seřazené pole studentů.
 */
function sortStudents(students) {
  if (!Array.isArray(students)) {
    console.warn("Warning: Input must be an array.");
    return [];
  }

  return [...students].sort((a, b) => {
    const scoreA = a.score ?? -Infinity;
    const scoreB = b.score ?? -Infinity;

    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }

    const nameA = a.name?.toString().toLowerCase() ?? "zzz";
    const nameB = b.name?.toString().toLowerCase() ?? "zzz";

    if (nameA !== nameB) {
      return nameA.localeCompare(nameB);
    }

    return Math.random() - 0.5; // Náhodné pořadí u studentů se stejným jménem/null
  });
}

// Testovací data
const students = [
  { name: 'Charlie', score: 85 },
  { name: 'Bob', score: 95 },
  { name: 'Dave', score: 90 },
  { name: null, score: 100 },
  { name: 'Alice', score: 85 },
  { name: 'Eve' },
  { name: "Filip", score: 100 },
  { name: "filip", score: 100 },
  { name: null, score: 95 },
  { name: 'bob', score: 95 },
  { score: 95 }
];

console.log(sortStudents(students));
console.log("Původní pole:", students);


{/* VÝSLEDEK GEMINI*/}

/**
 * Seřadí pole studentů podle skóre sestupně a poté podle jména abecedně (case-insensitive).
 * Studenti bez skóre se řadí na konec.
 * Původní pole se nemění, vrací se nové seřazené pole.
 *
 * @param {Array<Object>} students Pole studentů s vlastnostmi 'name' (string) a 'score' (number).
 * @returns {Array<Object>} Nové seřazené pole studentů.
 */
function sortStudents(students) {
  if (!Array.isArray(students)) {
      console.error("Error: Input must be an array.");
      return [];
  }

  // Vytvoříme kopii, aby se neměnilo původní pole.
  return [...students].sort((a, b) => {
      const scoreA = a?.score ?? -Infinity;
      const scoreB = b?.score ?? -Infinity;

      // Porovnání podle skóre (sestupně)
      if (scoreA !== scoreB) {
          return scoreB - scoreA;
      }

      const nameA = a?.name?.toString()?.toLowerCase() || '';
      const nameB = b?.name?.toString()?.toLowerCase() || '';

      // Porovnání podle jména (abecedně, case-insensitive)
      return nameA.localeCompare(nameB);
  });
}

// Testovací data
const students = [
    { name: 'Charlie', score: 85 },
    { name: 'Bob', score: 95 },
    { name: 'Dave', score: 90 },
    { name: null, score: 100 },
    { name: 'Alice', score: 85 },
    { name: 'Eve' },
    { name: "Filip", score: 100 },
    { name: "filip", score: 100 },
    { name: null, score: 95 },
    { name: 'bob', score: 95 },
    { score: 95}
];

console.log(sortStudents(students));
console.log("Původní pole:", students);