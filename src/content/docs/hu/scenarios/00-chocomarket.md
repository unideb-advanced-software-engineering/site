---
title: "00: ChocoMarket"
description: "Csokoládékészletező platform."
prev: false
---

## Háttér

> Az [Amerikába jöttem](https://port.hu/adatlap/film/tv/amerikaba-jottem-coming-to-america/movie-11018) és az [Amerikába jöttem 2.](https://port.hu/adatlap/film/tv/amerikaba-jottem-2-coming-2-america/movie-212064) című filmek története alapján.

Jaffe Jofer király halála után Zamunda trónját immár fia, Akeem foglalhatta el. Hallva azonban az idők szavát, Akeem király úgy döntött: az uralkodásba bevonja lányát, Meekát is.

Meeka a modern kor eszközeit használva szeretné felvirágoztatni Zamundát. Felismerte, hogy a fejlődés zálogát a digitális transzformáció jelenti: független IT infrastruktúra és digitális államigazgatás, kombinálva a megújuló energiaforrások és a klímabarát megoldások használatával.

Ez a digitális transzformációs program a Zamunda Digitális Reneszánsz (ZDR).

### A ZDR program általános követelményei

- Mivel egy állami programról van szó, ezért nagyon fontos, hogy minden projekthez megfelelő mennyiségű és minőségű dokumentáció készüljön.
- Zamunda nem szegény ország, de feleslegesen nem is akarja szórni a pénzt: a projektek tervezésénél törekedni kell a takarékosságra. Szintén ezt igénylik a klímabarát célok!
- Figyelembe kell venni, hogy az ország bizonyos területeienek internetlefedettsége hagy némi kívánnivalót maga után. Ahol van internet, ott is előfordulhatnak magasabb késleltetések, alacsonyabb sávszélességek.

## Leírás

Zamunda rendkívül büszke kakaótermesztésére és feltörekvő csokoládéiparára. Jelenleg azonban a gyártók kínálata csak nehezen hozzáférhető és összehasonlítható: a gyorsan változó készleteket csak emailek és telefonhívások útján, vagy elavult weboldalakon keresztül lehet követni. Ezért egy közös, országos platformra van szükség: a ChocoMarketre.

### Valós kapcsolódás

Gondoljunk egy olyan platformra, mint az árukereső, csak itt darabszámokat is kezelünk, valamint minden csoki.

## Felhasználók

- A csokoládégyártók, belőlük jelenleg mintegy 50 található az országban, de a számuk évről évre bővül.
- A céges érdeklődők, akik a világ minden tájáról böngészhetik az oldalt.

## Követelmények

- A gyártók a készleteiket a legkülönbözőbb formákban teszik elérhetővé: feltöltik egy FTP-szerverre, elküldik emailben, HTTP API-val rendelkeznek, és így tovább. Természetesen a fájlformátumok is különbözők lehetnek: XML, CSV, JSON. A ChocoMarketnek e források mindegyikét kezelnie kell.
- Törekednie kell arra, hogy a lehető legfrisebb készletinformáció jelenjen meg.
- A gyártók megtekinthetik a beolvasott készleteiket, valamint a korábbi készletbeolvasási kísérleteket.
- A gyártók rendelkeznek azonos termékekkel (mint például a 100 grammos, 72%-os kakaótartalmú táblás csokoládé), melyekhez tartozó készleteket egyben is kezelni kell. Ne feledjük azonban, hogy bár a termék azonos, egyéb attribútumai (mint például az ár) lehetnek eltérők!
- A termékek, azon belül a gyártónkénti készletek megjelenítése webes formában.
- A termékek készlet- és ártörténetének megjelenítése webes formában.
- Az érdeklődők feliratkozhatnak készletértesítőkre.
- A webes felület legyen több nyelven elérhető.

## Kiegészítések

- A rendszeren keresztül nem lehet vásárolni, csupán a gyártói készletek felmérésére, a gyártók és a vásárlók összekapcsolására szolgál.
- Távlati cél, hogy egyszer majd vásárolni is lehessen a platformon keresztül.
- Akciók, promóciók kezelése nem szükséges.
