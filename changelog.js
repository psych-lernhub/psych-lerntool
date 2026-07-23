/* changelog.js — Panel „Änderungen und Updates", umschaltbar nach Inhalte / Technik.
   Rendert in #changelog (no-op, wenn das Div fehlt). Rein clientseitig, neutral
   (keine Noten — wird vom privaten UND vom öffentlichen Hub eingebunden).
   Die 3 neuesten Einträge des aktiven Tabs sind immer sichtbar; „alle anzeigen"
   klappt den Rest in einer intern scrollbaren Liste (~5 Einträge hoch) auf.
   Pflege: pro Änderung EIN Eintrag oben in CHANGELOG ergänzen (neueste zuerst).
   Der Block ist reines JSON (var + Array) — qa.py parst und validiert ihn.
   Setzt das Mount-Div data-doc="…html" [+ data-doc-label], erscheint im Kopf ein
   Link-Button (nur der PRIVATE Hub setzt das — Tool-Referenz bleibt privat).
   Setzt das Mount-Div data-nur="inhalt" (öffentlicher Hub), werden NUR die
   Einträge mit fm:true gezeigt (bearbeitete Fehlermeldungen aus der Mail-Triage,
   FEHLER-TRIAGE-PLAN.md) — ohne Tab-Umschalter, Badge zählt nur diese. Der private
   Hub zeigt weiterhin ALLE Einträge (Tab-Umschalter Inhalte/Technik).
   Felder: d = Datum ISO · t = "technik"|"inhalt" · s = Kurztext · w = Warum (optional)
   · fm = true nur bei einer tatsächlich bearbeiteten Fehlermeldung (öffentlich sichtbar).
   WICHTIG: fm nur bei echten Fehlermeldungs-Fixes setzen — alle anderen Einträge
   (neue Sets, Audits, Technik …) bleiben ohne fm und sind damit NUR privat sichtbar.
   Exponiert window.renderChangelog(). */
(function () {
  /* CHANGELOG:START */
  var CHANGELOG = [
{
  "d": "2026-07-23", "t": "inhalt",
  "s": "M11a: zwei echte Altklausur-Fragen (Spearman-Brown-Parallelität, Kelley-Schätzer/Regressionsansatz) auf 1:1-Original-Wortlaut zurückgesetzt — die Options-Texte waren an zwei Stellen (★ Altklausur ak9, Klausursimulation Set 2 k8) umformuliert bzw. fachlich nachgeschärft worden, statt den echten Prüfungswortlaut zu übernehmen. Nur offensichtliche OCR-Tippfehler still korrigiert, sonst 1:1 Original; fachliche Präzisierungen (z. B. Kelley-Schätzer-Ausnahme x=M) bleiben ausschließlich in der Erklärung, nicht im Options-Text.",
  "w": "Nutzer-Vorgabe: bei echten Altklausurfragen zählt der Original-Wortlaut, auch wenn er (wie \"τ̂ ist immer etwas näher\") fachlich nicht ganz präzise ist — Umformulierungen/Präzisierungen gehören in die Erklärung, nicht in den Options-Text selbst."
},
{
  "d": "2026-07-23", "t": "inhalt",
  "s": "M11a Distraktor-Überarbeitung: 🤖 KI-Übungsset (80 Fragen) — alle Distraktoren neu geschrieben, weil die richtige Antwort bei 70 % der Fragen genau die zweitlängste Option war (leicht erratbares Muster statt echter Distraktoren); jetzt R17/R18/R22-Regeln des Projekts erfüllt. ★ Altklausur (Wedderhoff) — 16 nachträglich angehängte, verräterische Notizen (\"Diese Aussage ist so nicht haltbar.\" u. ä.) entfernt, die nicht im echten Prüfungstext stehen; sonst bewusst unverändert, da echte Prüfungsfragen.",
  "w": "Nutzerfund: im KI-Set war das Muster \"korrekte Antwort = kürzere der zwei langen Optionen\" leicht erkennbar. Bei der Altklausur wurde zusätzlich sichtbar, dass frühere Bearbeitung Distraktoren mit erkennbaren Verräter-Sätzen versehen hatte."
},
{
  "d": "2026-07-23", "t": "inhalt",
  "s": "M11a: externen QA-Gegenbericht zum Antwortschlüssel geprüft (Nutzer hatte die sechs Sets extern nachprüfen lassen). Von 8 näher untersuchten Korrekturvorschlägen 5 übernommen (ICC-Wendepunkt statt Scheitelpunkt, Ranking-Frage ak39 disambiguiert, Part-whole-Wortlaut präzisiert, Kelley-Schätzer-Randfälle ergänzt), 3 abgelehnt (Blaskewitz-Kontrollgruppe, „×100\"-Itemschwierigkeit, „retrograde\" vs. „retrospektive\" Validität) — diese widersprachen bei Gegenprüfung gegen die tatsächlichen Vorlesungsfolien dem Foliewortlaut bzw. dem offiziellen Klausur-Beispielitem.",
  "w": "Externe Zweitmeinungen sind wertvoll, dürfen aber nicht ungeprüft übernommen werden — bei 3 der als „eindeutig falsch\" bezeichneten Fälle zeigte der direkte Foliencheck, dass der ursprüngliche Schlüssel bereits korrekt war."
},
{
  "d": "2026-07-23", "t": "inhalt",
  "s": "M11a Vollaudit der sechs Übungssets (Klausurformat-Übung, Klausursimulation Set 1+2, Altklausur als Voll-Probeklausur, ★ Altklausur, KI-Übungsset): 4→3-Konvertierungsfehler bei Event Sampling (T-61) und Aufmerksamkeitsformen (T-56) korrigiert, zwei Cross-Set-Widersprüche vereinheitlicht (Inhaltsvaliditäts-Kennwerte, Marburger-Modell-Wertebereiche), kleinere Transkriptionsartefakte bereinigt. Zusätzlich: Üben-Modus stellt falsch beantwortete Fragen jetzt so lange erneut, bis sie vollständig korrekt sitzen; 💡 Hinweis und 🔓 Lösung bleiben nach dem Prüfen sichtbar.",
  "w": "Der vorherige Reparaturversuch vom 22.07. wurde zurückgerollt (siehe FEHLERBERICHT_AUDIT_UND_ROLLBACK_2026-07-23.md) — dieser Durchgang prüft jede Frage einzeln gegen Original-Altklausur/Fachwissen statt automatisiert, mit Nutzer-Freigabe pro Fund."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a Anwendungstrainer 01–10: Hinweise und Auflösungen nach Blind-Lösbarkeitstest überarbeitet — gestufte nächste Schritte, vollständige Zuordnungs-/Rechenwege und explizite Distraktorenbegründungen; Antworten und IDs unverändert.",
  "w": "Nutzerfeedback: Mehrere Aufgaben waren ohne Lösungseinsicht nicht zuverlässig lösbar, weil Hinweise zu abstrakt blieben und Auflösungen nur das Ergebnis bestätigten."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Neue Trainingsserie „Anwendungstrainer\" (10 Module + Übersichtsseite) — eigenständige, aufgabenorientierte Fälle mit neuen Zahlen/Items/Datenausschnitten für den ganzen Fragebogenentwicklungsprozess (Polung → Itemanalyse → EFA → Reliabilität → Validität/MTMM → Kriterienqualität → Skalenbildung → Abschlussfall). Kein Folienabbild, ergänzt die bestehenden Module.",
  "w": "Trainiert Anwendungskompetenz (Erkennen → geführt/teilgeführt ausführen → selbstständig lösen → Fehler diagnostizieren → transferieren) statt Faktenwissen — Ergänzung zu den MCQ-Lernmodulen und Kprim-Klausursets."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a Begriffe-Fenster: weitere 14 Definitionen entschärft (u. a. Inhaltsvalidität, Zeichen-/Kategoriensystem, MTMM-Zellenarten, faktorielle Validität) — sie beantworteten die zugehörige Frage direkt statt nur den Begriff zu erklären.",
  "w": "Nutzerhinweis: Inhaltsvalidität-Definition verriet die Antwort. Systematische Nachprüfung (Wortlaut-Überlappung Definition ↔ Optionstext) fand 13 weitere Fälle, die in der ersten Entschärfungsrunde übersehen worden waren."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Optionstext bei der Frage „Was ist keine Aufgabe der neuropsychologischen Diagnostik?\" korrigiert — die Sammel-Option sprach von „Alle drei weiteren Angaben\", obwohl in diesem 3-Optionen-Format nur zwei andere Aussagen existieren.",
  "w": "Nutzerhinweis zu Set 2/44er-Klausur: die Wahr/Falsch-Bewertung der Sammel-Option war korrekt (per Audit V2 vom 13.07. bestätigt), aber die Formulierung war ein Relikt der ursprünglichen 4-Optionen-Fassung."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Das 📖-Begriffe-Fenster ist jetzt spoilerfrei — 65 Definitionen wurden entschärft. Sie erklären weiterhin, WAS ein Begriff ist, nehmen aber nicht mehr die geprüfte Eigenschaft vorweg (keine Schwellenwerte wie „K > .70\", keine Zuordnungen wie „Barthel = formativ\", keine Korrektur-Zusätze).",
  "w": "Das Fenster soll Vokabular klären, nicht die Aufgabe lösen — sonst entwertet es das Üben."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a Klausurformat-Sets: 10 defekte Fragetexte repariert — u. a. „Welche Information beinhaltet das Rasch-Modell?\" (war ein unvollständiges Bruchstück) sowie 7 Fragen, in denen Formatierungsreste wie \\*keine\\* wörtlich angezeigt wurden.",
  "w": "Nutzerhinweis: die Rasch-Frage wirkte unvollständig. Die Prüfung ergab, dass es ein systematisches Transkriptionsproblem war (Reste aus den Gedächtnisprotokollen); Antworten und Auflösungen waren jeweils korrekt."
},
{
  "d": "2026-07-22", "t": "technik",
  "s": "M11a: Die vier Klausurformat-Sets haben jetzt den Knopf „🔀 Fragen & Antworten mischen\" — er würfelt sowohl die Fragenreihenfolge als auch die Reihenfolge der drei Antwortoptionen; die Buchstaben in der Auflösung wandern automatisch mit.",
  "w": "Beim mehrfachen Durcharbeiten lernt man sonst die Reihenfolge statt der Inhalte. Der Knopf fehlte im Klausurformat-Runner bisher ganz (in den übrigen Übungssets gab es ihn schon)."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Alle vier Klausurformat-Sets haben im Üben-Modus jetzt zusätzlich einen 📖-Begriffe-Button — er erklärt kurz alle Fachbegriffe, die in der Frage und in den drei Antwortoptionen vorkommen (Glossar mit 237 Einträgen, Schwerpunkt auf den schwierigen Begriffen: Skalenniveaus, IRT-Parameter, MTMM-Zellen, Beobachtungsfehler, Testkunde).",
  "w": "Fragen scheitern oft nur am Vokabular; so lässt sich ein unbekannter Begriff direkt an der Aufgabe nachschlagen, ohne die Lösung zu sehen. Im Klausur-Modus bewusst ausgeblendet."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Neue Voll-Probeklausur „Altklausur als Klausurformat\" — die 44 echten Altklausur-Fragen als eine durchgehende 44-Aufgaben-Klausur im Malus-Format (mit 💡 Hinweis + 🔓 Lösung). Das bestehende Single-Choice-Altklausurset bleibt separat.",
  "w": "Bisher gab es die 44 Prüfungsfragen nur als Single Choice; so lassen sie sich jetzt auch im echten Klausurformat (Mehrfachwahl + Malus) als Vollklausur üben."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Alle drei Klausurformat-Sets (Klausurformat-Übung 32er + Klausursimulation Set 1/2) haben jetzt im Üben-Modus einen 💡-Hinweis-Button (spoilerfreier Konzept-Hinweis vor dem Antworten) und einen 🔓-Lösung-Button — 98 Hinweise.",
  "w": "Wie bei den übrigen Übungssets: gezieltes Wiederholen, ohne im Üben die Bewertung der Optionen vorwegzunehmen. Im Klausur-Modus bewusst ohne Buttons (Simulation)."
},
{
  "d": "2026-07-22", "t": "technik",
  "s": "Fix: Die beiden neuen M11a-Klausursimulations-Sets luden nicht (leere Seite hinter den Tabs) — build_klausurformat.py ersetzte den Engine-Platzhalter __OPTSHUFFLE__ nicht, der mit der Options-Shuffle-Erweiterung vom 17.07. dazukam.",
  "w": "Der Generator war seit der Engine-Änderung nie mehr gelaufen; das Bestands-Set (32er) war nicht betroffen, weil es davor generiert wurde."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: Neues Übungsmodul „Aufgabenblätter 1–6\" (Vertiefungsseminar: Vom Konstrukt zur validierten Skala, 28 MCQ, quellengebundenes Training in drei Schwierigkeitsstufen) — jetzt im Hub verlinkt.",
  "w": "Das Vertiefungsseminar ist offiziell klausurrelevant (23.07.); die Aufgabenblätter 1–6 waren bisher nur als Wissensbasis erfasst, nicht als Übungsmaterial."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: 2 neue Klausursimulations-Sets (je 33 Aufgaben × 3 Optionen, Mehrfachwahl mit Malus) aus den 3 Altklausuren/Gedächtnisprotokollen — alle 66 überlieferten Fragen, Auflösung mit Erklärung + Folienbeleg je Option.",
  "w": "Klausur 23.07. ist genau dieses Format; die echten Prüfungsfragen ließen sich bisher nur als Single Choice üben. Lösungen KI-bestimmt (2 unabhängige Prüf-Pässe), rekonstruierte Teile gekennzeichnet."
},
{
  "d": "2026-07-22", "t": "inhalt",
  "s": "M11a: 12 der 14 Lernmodule (PD01–PD07, PD09–PD13) durch neu erstellte Fassungen ersetzt — mehr Fragen je Modul (16–24 statt 16), aktualisierte Regelbasis (R17/R18/R22/R25/R26 geprüft). PD08 und das Vertiefungsseminar unverändert.",
  "w": "Neubau mit aktueller Extraktions-/Regelgeneration; check_modul.py + qa.py grün. Hinweis: die neuen Fassungen enthalten (noch) keine eingebetteten Originalfolien und teils weniger Duell-/Zuordnungsaufgaben als die Vorversion — geplante Nacharbeit nach der Klausur."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: KI-Übungsset zu PD13 (Leistungstests) — 83 Fragen in drei Teilen. Damit haben ALLE 13 M11a-Vorlesungen (PD01–PD13) je ein KI-Übungsset — zusammen über 1120 Fragen.",
  "w": "Letztes Deck der M11a-Fragenkette. Leistungs-, Intelligenz- und Konzentrationstests mit ihren Kennwerten und Effektstärken. Alle Sets sind quellengebunden an die Vorlesungsfolien, jeder Distraktor ein belegter Denkfehler."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD12 (Diagnostik der Neuropsychologie) — 50 Fragen in zwei Teilen zu je 25.",
  "w": "Neuropsychologische Testverfahren (Benton, WMS, TAP/KiTAP, AAT, Turm von London, Neglect), Schädigungsarten, prämorbide Leistung und Beschwerdenvalidierung (SVT: MSVT/TOMM/FIT). Die Distraktoren ordnen Verfahren gezielt der falschen Funktion zu."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD11 (Verhaltensbeobachtung) — 76 Fragen in zwei Teilen zu je 38.",
  "w": "Beobachtungsformen (teilnehmend/Feld/systematisch), Beobachtungsfehler (Halo, Milde, zentrale Tendenz) und Beurteilerübereinstimmung mit Cohens Kappa inkl. Rechenbeispielen. Die Distraktoren vertauschen gezielt Fehlerarten und Kappa-Rechenschritte."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD10 (Probabilistische Testtheorie / IRT) — 85 Fragen in drei Teilen zu je 28–29.",
  "w": "Rasch-Modell, latente Fähigkeit, Itemschwierigkeit, spezifische Objektivität, Schätzverfahren (CML/MML), Modellgeltungstests und Infit/Outfit. Die Distraktoren vertauschen gezielt Personen- und Itemparameter (θ ↔ δ) und Schätzverfahren."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD09 (Diagnostische Entscheidungen) — 59 Fragen in zwei Teilen zu je 29–30.",
  "w": "Vierfeldertafel (TP/FP/FN/TN), Sensitivität/Spezifität, prädiktive Werte, Basisrate und Selektionsstrategien. Die Distraktoren vertauschen gezielt Tafel-Zellen und bedingte Wahrscheinlichkeiten — die klassische Verwechslungsfalle."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD08 (Normierung) — 72 Fragen in zwei Teilen zu je 36.",
  "w": "Standardskalen (z, T, IQ, Stanine, PISA), Normstichprobe, Prozentränge, Konfidenzintervall und kritische Differenz — mit Rechenaufgaben. Die Distraktoren vertauschen Skalenparameter (Mittelwert/Streuung) und Rechenschritte gezielt."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD07 (Gütekriterien II: Validität) — 99 Fragen in drei Teilen zu je 33.",
  "w": "Inhalts-, Kriteriums- und Konstruktvalidität mit allen Unterformen: konvergent/diskriminant, retrograd/prädiktiv, MTMM, Minderungskorrektur. Die Distraktoren drehen gezielt Zeitrichtung und Validitätsart gegeneinander."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD06 (Gütekriterien I: Objektivität & Reliabilität) — 91 Fragen in drei Teilen zu je 30–31.",
  "w": "Von den drei Objektivitätsarten über die Reliabilitätsschätzungen bis zu den Äquivalenzformen mit ihren Formeln. Die Distraktoren vertauschen Reliabilitätsverfahren, Objektivitätsphasen und Formel-Indizes gezielt gegeneinander."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD05 (Itemanalyse) — 60 Fragen in zwei Teilen zu je 30.",
  "w": "Itemschwierigkeit, Trennschärfe, Selektionskennwerte und die Formeln dahinter. Die Distraktoren vertauschen gezielt Zähler und Nenner, Decken- und Bodeneffekt oder Schwellenwerte — typische Klausurfallen."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD04 (Explorative Faktorenanalyse) — 119 Fragen in drei Teilen zu je 39–40.",
  "w": "Deckt den kompletten EFA-Ablauf ab: Eignungsprüfung, Faktorenzahl, Rotation, Interpretation — inklusive der Kennwerte und Schwellen aus dem Beispieldatensatz der Vorlesung."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD03 (Klassische Testtheorie) — 56 Fragen in zwei Teilen zu je 28, mit Formel-Aufgaben zu den KTT-Axiomen.",
  "w": "Die Distraktoren arbeiten hier mit echten Formelfehlern: vertauschte Indizes, falsche Gleichungsseiten, verwechselte Operatoren. Wer die Axiome nur auswendig kennt, fällt darauf herein — wer sie versteht, sieht den Fehler sofort."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD02 (Testkonstruktion) — 169 Fragen in fünf Teilen zu je 33–34.",
  "w": "Größtes Fragenset des Moduls. Deckt die Testkonstruktion von der Konstruktdefinition über Aufgabentypen bis zur Itemanalyse ab. Jeder Distraktor ist ein belegter Denkfehler mit Folienbezug, jede Frage hat eine ausführliche Erklärung und einen spoilerfreien Hinweis."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M11a: Neues KI-Übungsset zu PD01 (Einführung) — 108 Fragen in drei Teilen zu je 36, quellengebunden an die Vorlesungsfolien.",
  "w": "Erste Vorlesung der neuen M11a-Fragenkette. Jeder Distraktor ist ein belegter Denkfehler mit Folienbezug, jede Frage hat eine ausführliche Erklärung und einen spoilerfreien Hinweis. Die Teile folgen der Reihenfolge der Vorlesung und überschneiden sich nicht."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M4b: Das 54-Fragen-Altklausurset SoSe 2019 wurde auf die revidierte Masterbank aktualisiert — sechs Fragen sind jetzt ohne versteckte Vorlesungs- oder Darstellungsverweise eigenständig lösbar.",
  "w": "Betroffen sind die Originalfragen 16, 25, 27, 28, 36 und 40. Bei Frage 36 wurde die Antwort zusätzlich korrekt auf die untersuchte Stichprobe begrenzt; Umfang, Ausschlüsse und bisheriger Lernstand bleiben unverändert."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M4b: Vollständige SoSe-2019-Masterbank als eigenes Altklausurset ergänzt — 54 quellengeprüfte Single-Choice-Fragen mit Erklärungen und Hinweisen.",
  "w": "Die neue Bank prüft alle 56 Originalfragen einzeln: 54 eindeutige Kerne wurden übernommen; die zwei mehrdeutigen Originalfragen 22 und 46 bleiben begründet ausgeschlossen. Das Set hat einen eigenen Lernstand und ergänzt das kleinere 9-Fragen-Notizset."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M4b: Eigenständiges Altklausur-Set SoSe 2019 mit 9 rekonstruierten Prüfungsfragen ergänzt — unter anderem Demenzrisiko, Nestor-Effekt, Sternbergs Weisheitsansatz, Altersstereotype, Selbstentwicklung und Person-Umwelt-Transaktionen.",
  "w": "Die Originalsammlung enthielt nur stark verkürzte Notizen. Die Fragen wurden minimal rekonstruiert, gegen die Vorlesungsquellen geprüft und mit fehlkonzeptbasierten Distraktoren, Erklärungen und Hinweisen als Übungs- und Klausurmodus aufbereitet."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M4b: Die großen KI-Übungssets sind jetzt in handliche Teile zu höchstens 40 Fragen aufgeteilt — z. B. „VL04 Demenz · Teil 1/4“ bis „Teil 4/4“. Die Teile folgen der Reihenfolge der Vorlesung und überschneiden sich nicht; jeder Teil hat einen eigenen Fortschritt.",
  "w": "129 Fragen am Stück sind zum Lernen unhandlich. Teil 1 jedes Sets behält den bisherigen Fortschritt; für die weiteren Teile beginnt der Lernstand neu."
},
{
  "d": "2026-07-17", "t": "technik",
  "s": "Lernfortschritts-Panel: Die neuen M4b-Übungssets (und ein Psychodynamik-Set) wurden fälschlich unter „Lernmodule (VL)“ geführt — sie stehen jetzt korrekt unter „KI-Set“. Bestehender Lernstand bleibt unberührt, nur die Gruppierung ändert sich.",
  "w": "Der Übungsset-Bereich der Schlüsselvergabe war im Panel nur teilweise hinterlegt; jetzt deckt er den gesamten für Sets reservierten Bereich ab."
},
{
  "d": "2026-07-17", "t": "technik",
  "s": "Selbstprüfung: Die Regel gegen einen „Positionsbias“ (richtige Antwort zu oft an derselben Stelle) wurde abgeschafft — die Lern-Engine mischt die Antwortoptionen ohnehin bei jedem Durchgang neu, die gespeicherte Position ist für Lernende nicht sichtbar.",
  "w": "Die Regel prüfte damit nur noch eine Eigenschaft der Datenhaltung und blockierte beim Aufteilen von Sets ohne Nutzen. Die Regeln gegen die tatsächlich sichtbaren Muster (Länge, Klammern, Extremwörter, Fragen-Echo) bleiben unverändert scharf."
},
{
  "d": "2026-07-17", "t": "inhalt",
  "s": "M4b: Elf neue KI-Übungssets — je ein Set pro Vorlesung (VL02–VL11) plus ein Überblicks-Set zur Klausurvorbereitung, zusammen 1.051 Fragen. Damit hat M4b jetzt zu 11 von 14 Vorlesungen ein eigenes Fragenset.",
  "w": "Die Fragen entstehen neuerdings über eine zweistufige Kette: erst Frage und richtige Antwort aus den Folien, dann die falschen Antwortoptionen — jede mit Beleg, warum sie falsch ist. Noch offen: VL12–VL14 (folgen später)."
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M4b: Neues reguläres Übungsset „🤖 KI-Übungsset VL01 — 74 Fragen (Einführung)“ — die im Vergleich bestätigte Fassung wurde übernommen; die beiden temporären Vergleichssets sind wieder entfernt.",
  "w": "Der Distraktoren-Vergleich ist entschieden. Eine fachlich strittige Frage wurde vor der Übernahme entfernt (wird an der Quelle korrigiert und später nachgereicht). Lernstand aus dem Vergleichsset der übernommenen Fassung bleibt erhalten."
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M4b: Zwei VL01-Vergleichs-Übungssets neu im Drawer (⚖️ Fassung Opus, 75 Fragen · ⚖️ Fassung GPT, 40 Fragen) — zwei unabhängig erstellte Distraktoren-Fassungen derselben Fragensammlung zum direkten Vergleich; die Fragen 1–40 sind in beiden Fassungen identisch angeordnet (nebeneinander öffnen und synchron durchblättern).",
  "w": "Die MCQ-Erstellung läuft künftig über eine neue zweistufige Kette; die beiden Fassungen machen den Qualitätsvergleich direkt im Tool prüfbar. Achtung: kein reguläres Lernmaterial — eine als strittig markierte Frage ist im Seitenkopf beider Sets ausgewiesen."
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Lernfortschritts-Panel: Drei Übungsset-Arten wurden bisher fälschlich unter „Lernmodule (VL)“ einsortiert — das KI-Übungsset 3 und das große Lernfragen-Set (Sozialpsychologie) sowie die Klausurformat-Übung (Diagnostik I) haben jetzt ihre korrekte Kategorie (KI-Set, Altklausur/Set bzw. neu „Klausurformat-Übung“).",
  "w": "Der Fortschritt dieser Sets tauchte im Panel in der falschen Gruppe auf und war schwer zu finden. Bestehender Lernstand bleibt vollständig erhalten — nur die Gruppierung ändert sich."
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Selbstprüfung weiter gehärtet: Ein neues Lernmaterial ohne hinterlegte Quelldaten blockiert jetzt die Veröffentlichung, ebenso das Verschwinden des Berichtsindex der Begriffs-Herkunftsprüfung. Die Prüf-Logik der Antwortoptions-Regeln liegt außerdem jetzt vollständig in einer gemeinsamen Quelldatei statt doppelt in zwei Werkzeugen.",
  "w": "Mitte Juli entstand einmal ein Übungsset, dessen Quelldaten nie gesichert wurden und verloren gingen — so etwas kann jetzt nicht mehr unbemerkt passieren; und doppelte Prüf-Logik kann nicht mehr auseinanderlaufen."
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Selbstprüfung des Lernsystems geschärft: Fehlende eingebettete Original-Folien, tote Hub-Links und JavaScript-Fehler in Zusatzseiten blockieren jetzt jede Veröffentlichung (vorher nur Warnhinweise).",
  "w": "Die drei Prüfungen liefen seit dem 11.07. eine Beobachtungswoche als Warnung ohne einen einzigen Fehlalarm — als harte Fehler können kaputte Links oder fehlende Folien jetzt gar nicht mehr unbemerkt live gehen."
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Die Qualitätsregeln gegen Antwort-Verratsmuster (Optionslängen, Klammer-Verteilung) gelten jetzt modulweise verbindlich: In bereits überarbeiteten Modulen blockiert ein Rückfall die Veröffentlichung, die übrigen Module zeigen weiterhin Hinweise und werden nach und nach überarbeitet.",
  "w": "So kann sich in bereinigten Modulen kein Verratsmuster mehr einschleichen, ohne dass die Prüfung sofort anschlägt — und der Überarbeitungs-Rückstand der restlichen Module ist jetzt bei jedem Prüflauf sichtbar."
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Qualitätsprüfung der Übungssets erweitert (R18b): Sie erkennt jetzt auch, wenn die richtige Antwort zwar nicht als einzige, aber systematisch zusammen mit genau einem Distraktor eine Klammer trägt — dabei halbiert sich die Ratechance von 4 auf 2 Optionen.",
  "w": "Die bisherige Regel prüfte nur „Klammer nicht ausschließlich bei der richtigen Antwort“. Ein naheliegender Fix dagegen — bei einem Distraktor eine Klammer nachrüsten — erzeugte prompt ein neues, schärferes Verratsmuster. Die neue Prüfung misst die tatsächliche Rate-Chance und fängt genau das."
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M4b: KI-Übungsset V2 über alle Themen (81 Single-Choice-Fragen, Distraktorenrevision, Üben + Klausur-Modus) als zusätzliches, eigenständiges Set ergänzt (neben dem bestehenden ki_set_m4b). Alle Distraktoren neu konstruiert und gegen die neu extrahierte Wissensbasis geprüft.",
  "w": "Weiteres unabhängiges Übungsset mit neu konstruierten Distraktoren zur Vorbereitung auf die Klausur (17.07.) — die Antworten lassen sich jetzt deutlich schlechter ohne Fachwissen erraten"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): KI-Set V2 für VL4 (Konflikte OPD-2, Distraktorenrevision, 40 Single-Choice-Fragen, Üben + Klausur-Modus) als zusätzliches, eigenständiges Set ergänzt (neben dem bestehenden ki_pd4).",
  "w": "Weiteres unabhängiges Übungsset mit neu konstruierten, fehlkonzept-basierten und adversarial geprüften Distraktoren zur Vorbereitung auf die Klausur (16.07.)"
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Der „Fehler melden“-Button sitzt jetzt unten links statt unten rechts (alle Lernmodule, Sets und der Hub).",
  "w": "Position auf Wunsch angepasst — die linke untere Ecke ist auf allen Seiten frei, der Button stört dort nicht."
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b: KI Übungsset 58 Fragen PA+ST V2 (Distraktorenrevision, Üben + Klausur-Modus) als zusätzliches, eigenständiges Set ergänzt (neben dem bestehenden m12b_ki).",
  "w": "Weiteres unabhängiges Übungsset mit geschärften Distraktoren zur Vorbereitung auf die Klausur (16.07.)"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): KI-Set V2 für VL1 (Einführung &amp; Grundlagen, Distraktorenrevision, 40 Single-Choice-Fragen, Üben + Klausur-Modus) als zusätzliches, eigenständiges Set ergänzt (neben dem bestehenden ki_pd1).",
  "w": "Weiteres unabhängiges Übungsset mit geschärften Distraktoren zur Vorbereitung auf die Klausur (16.07.)"
},
{
  "d": "2026-07-16", "t": "technik",
  "s": "Quiz-Engine aller Übungssets/KI-Sets: Die Position der richtigen Antwort wird jetzt bei JEDEM neuen Durchgang (Start, Nur-falsche-wiederholen, Fällige &amp; Schwächen, Neustart) frisch gemischt, statt nur einmal pro Seitenladung fixiert zu bleiben. Alle 27 betroffenen Übungssets (u. a. alle Altklausur-/KI-Sets) neu gebaut.",
  "w": "Bisher blieb die Antwortposition innerhalb einer Sitzung über mehrere Durchgänge gleich — das erleichterte reines Positions-Auswendiglernen statt echtem Faktenwissen"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): KI-Übungsset VL3 (Strukturniveau &amp; OPD, 40 Single-Choice-Fragen, Üben + Klausur-Modus) mit überarbeiteter Fassung ergänzt — Vorgängerversion war am 15.07. wegen R15-Längenbias (60%) zurückgehalten worden, neue Fassung besteht mit 35%.",
  "w": "Zusätzliches Retrieval-Practice-Material vor der Klausur (16.07.) — damit haben jetzt alle 7 Psychodynamik-Vorlesungen ein KI-Übungsset"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): KI-Übungsset VL5 (Objektbeziehungstheorien, 24 Single-Choice-Fragen, Üben + Klausur-Modus) ergänzt. Extern vorbereitet, alle QA-Regeln bestanden.",
  "w": "Zusätzliches Retrieval-Practice-Material vor der Klausur (16.07.) — damit haben jetzt 6 der 7 Psychodynamik-Vorlesungen ein KI-Übungsset"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): KI-Übungsset VL7 (Mentalisierungsbasierte Psychotherapie/MBT, 30 Single-Choice-Fragen, Üben + Klausur-Modus) neu aus geprüfter Extraktion/Lernbasis gebaut.",
  "w": "Zusätzliches Retrieval-Practice-Material vor der Klausur (16.07.)"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): KI-Übungsset VL6 (Die intersubjektive Wende, 32 Single-Choice-Fragen, Üben + Klausur-Modus) neu aus geprüfter Extraktion/Lernbasis gebaut.",
  "w": "Zusätzliches Retrieval-Practice-Material vor der Klausur (16.07.)"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): 2 weitere KI-Übungssets je VL hinzugefügt (VL2 Abwehrmechanismen, VL4 Konflikte OPD-2, je 40 Single-Choice-Fragen, Üben + Klausur-Modus). Extern vorbereitet, alle QA-Regeln (R15 Längenbias 15%/25%) bestanden.",
  "w": "Zusätzliches Retrieval-Practice-Material vor der Klausur (16.07.)"
},
{
  "d": "2026-07-16", "t": "inhalt",
  "s": "M12b.3 (Systemische Therapie): neues KI-Übungsset über alle 8 Vorlesungen (46 Single-Choice-Fragen, Üben + Klausur-Modus). 42 Fragen direkt aus der geprüften Extraktion, 4 Fragen zu Themen ohne VL-Beleg (Problemdeterminiertes System, Kliententypen nach de Shazer, Mixed-Methods-/partizipative Forschung) als markierte Ausnahme aus geprüftem externem Fachwissen ergänzt.",
  "w": "Zusätzliches Retrieval-Practice-Material zur Systemischen Therapie vor der Klausur (16.07.)"
},
{
  "d": "2026-07-15", "t": "inhalt",
  "s": "M12b.1 (Psychodynamik): 4 neue KI-Übungssets je VL hinzugefügt (VL1/VL2/VL5/VL6, je 40 Single-Choice-Fragen, Üben + Klausur-Modus). Extern vorbereitet, alle QA-Regeln (inkl. R15 Längenbias) bestanden.",
  "w": "Zusätzliches Retrieval-Practice-Material vor der Klausur (16.07.); VL3/VL4/VL7 wegen R15-Befund (Länge der korrekten Antwort zu oft auffällig) zunächst zurückgehalten, Remediation offen"
},
{
  "d": "2026-07-14", "t": "technik",
  "s": "Modell-Trainer (alle 5 Module): Der Modellname steht jetzt als eigene, größere und farbig hervorgehobene Überschrift über der Frage statt klein im Fließtext.",
  "w": "Bessere Lesbarkeit — auf den ersten Blick erkennbar, um welches Modell es gerade geht"
},
{
  "d": "2026-07-14", "t": "technik",
  "s": "Modell-Trainer (alle 5 Module): Im Eintippen-Modus wird jetzt bei jeder Anzeige zufällig ein anderer Punkt als „Vorgegeben“ gezeigt statt immer derselbe fest hinterlegte Anker.",
  "w": "Ein immer gleicher vorgegebener Begriff macht die Übung vorhersehbar; zufällige Wahl trainiert alle Punkte eines Modells gleichmäßig"
},
{
  "d": "2026-07-14", "t": "technik",
  "s": "Modell-Trainer (alle 5 Module M5/M11a/M12a/M12b/M4b): Eine Übungssitzung wiederholt jetzt automatisch alle noch nicht mit „✅ sicher“ bewerteten Modelle in immer neuen Runden, bis entweder alle gelöst sind (🎉-Meldung) oder man selbst auf „■ Beenden“ drückt. Vorher ging es nach einem Durchgang unabhängig vom Ergebnis zurück zur Auswahl.",
  "w": "Bisher konnte man ein Modell falsch beantworten und die Sitzung war trotzdem vorbei; jetzt bleibt man an offenen Modellen dran, bis sie sicher sitzen"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 KI-Übungsset 4 (m5_lernfragen_80_FINAL_GEPRUEFT, 80 Fragen aus den 35 offiziellen Lernfragen) neu hinzugefügt — auf Nutzerwunsch ohne Regel-Audit direkt implementiert.",
  "w": "Vom Nutzer als fertig geprüft geliefert; Implementierung ohne zusätzlichen R1-R24-Check"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 KI-Übungsset 3 (m5_ki_uebungsset_3, 50 Fragen) neu hinzugefügt — anwendungs- und transferorientiert. Besteht alle Regeln R1/R15–R18/R22 ohne einen einzigen Hinweis (0/50 bei allen automatisierten Checks).",
  "w": "Drittes, komplementäres KI-Übungsset für M5, direkt nach den neuen Regeln R19–R24 geschrieben"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 Lernfragen-Set (m5_lernfragen, 37 Fragen): neue Regeln R19–R24 angewendet — 32 Fragen bearbeitet. Nutzer-Notizen behoben: Kovariationstheorie-Distraktor widersprach dem Stem direkt, Gruppenfunktionen-Distraktoren waren absurde Totalverneinungen, Replikationskrise-Distraktor war selbstwidersprüchlich, Rebound-Effekt-Distraktoren zu extrem. R22 65%→0%, R15 30%→0%.",
  "w": "Direkte Anwendung der neuen Verrats-Regeln auf Basis konkreter Nutzer-Notizen zu zu einfachen Distraktoren"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 KI-Übungsset 1 (m5_ki, 50 Fragen): neue Regeln R19–R24 angewendet — 29 Distraktoren von Extremmarkern (immer/nie/grundsätzlich/ausschließlich/stets/…) bereinigt, ohne Meta-Kommentare. R22 48%→0%, R15 20%→0%.",
  "w": "Direkte Anwendung der neu eingeführten Verrats-Regeln auf das erste M5-Bestandsset statt nur auf Neubauten"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 KI-Übungsset 1 (m5_ki) zurückgebaut auf die vorherige Fassung (50 Fragen alle Themen) — die neue Transferfragen-Version wurde wieder verworfen.",
  "w": "Nutzerentscheidung: Neubau zurückgestellt, Vorgängerversion bleibt aktiv"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 KI-Übungsset 1 (m5_ki, 50 Fragen) komplett ersetzt durch eine neue, quellenkalibrierte Transferfragen-Fassung (Fall-/Anwendungsszenarien, Distraktoren aus demselben Konzeptraum). 13 R15-Längenbias-Fixes ohne Meta-Kommentare in den Optionen. check_modul.py bestanden, qa.py 148 Configs grün.",
  "w": "Review zeigte in der alten Fassung systematische Verratsmuster (Extremmarker/Selbstausschluss-Distraktoren); neue Fassung besteht die frisch eingeführten Regeln R19–R24 deutlich besser"
},
{
  "d": "2026-07-14", "t": "technik",
  "s": "Sechs neue MCQ-Qualitätsregeln R19–R24 in MODUL_REGELN.md (§C8–C13): Originaltreue bei Dozentin-Lernfragen, Selbstausschluss-Test, Konzeptraum-Homogenität, Extremmarker-Exklusivität, adversarialer Blind-Rate-Test vor Hub-Aufnahme, Desirable-Difficulty-Anker. R22 als automatischer warn-only Check in check_modul.py + prep_data.py implementiert.",
  "w": "Nutzer-Review deckte zu einfache Fragen und Verratsmuster im M5-Lernfragen-Set auf; neue Regeln sollen das systematisch verhindern statt nur einzelne Fragen zu reparieren"
},
{
  "d": "2026-07-14", "t": "inhalt",
  "s": "M5 Lernfragen-Set (m5_lernfragen, 37 MC): Material-Vollprüfung — 36/36 vorhandene Schlüssel bestätigt, 0 falsche Schlüssel. Folientreue und Lernfragenabdeckung nachgeschärft: u. a. Aktivierung=Zugänglichkeit+Passung, die sechs Misinformation-Strategien, Cyberball-Befunde, Einstellungs-/Aggressions-/Bystander-Begriffe und MC-Metadaten. Neu ergänzt: Introspektion vs. Selbstwahrnehmung.",
  "w": "20. Einheit der M5-Vollprüfung — die echten Dozentin-Lernfragen sind jetzt vollständig und mit aktuellem MC-Klausurformat umgesetzt"
},
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 KI-Übungsset 2 (m5_ki2, 50 komplementäre Fragen): Material-Vollprüfung — 0 falsche Schlüssel, alle VL-Bezüge korrekt. 6 Befunde gefixt: ein erfundenes Handtuch/Hotel-Beispiel durch das belegte Graffiti-Littering-Beispiel (Keizer et al. 2008) ersetzt, drei Fremdbegriffe auf Folienterminologie umgestellt (Mehrkomponenten→Multikomponentenmodell, lose→Lockere Verbindung), zwei unbelegte Zusatzbehauptungen entfernt (Cyberball „Kontrolle“, Kontrast-Mechanismus bei Tür-ins-Gesicht).",
      "w": "19. Einheit der M5-Vollprüfung — deutlich sauberer als das erste KI-Set, da es laut Config gezielt an den 12 Modulen kalibriert wurde"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 KI-Übungsset (m5_ki, 50 Fragen über alle 12 VL): Material-Vollprüfung — 0 falsche Schlüssel. 13 Befunde gefixt: 2 erfundene/nicht folienbelegte Fachbegriffe als Lehrbuch-Ergänzung gekennzeichnet (Koordinationsverlust, ultimater Attributionsfehler), 5 falsch zugeordnete VL-Bezüge korrigiert (u. a. Halo-Effekt→VL11, Need-to-Belong→VL07, Confirmation-Bias→VL02), 4 Fremdbegriffe auf Folienterminologie umgestellt (relationale→indirekte Aggression, Kompatibilitäts→Korrespondenzprinzip, automatisch/kontrolliert→heuristisch/tief, unabhängiges/interdependentes Selbst→Autonomie/Verbindungen zu anderen), 1 unbelegte Zusatzbehauptung entfernt (Milgram-Prestige-Kontext).",
      "w": "18. Einheit der M5-Vollprüfung — Übungssets streuen über alle 12 VL-Themen, daher viele Fundstellen; kein Schlüssel war falsch, nur Quellenzuordnung/Terminologie"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "Korrektur: die M5-Klausurformat-Änderung von vor Kurzem war falsch — die aktuelle Klausur (Veit, 14.07.) ist entgegen einem veralteten Vermerk ebenfalls MC (50 Fragen, je eine richtige Antwort), nicht Freitext. Alle 10 Fundstellen in den 5 Vertiefungsmodulen + im Lernfragen-Set zurück auf „(MC)“ gestellt; CLAUDE.md und Projekt-Memory korrigiert.",
      "w": "Nutzer-Korrektur direkt vor der Klausur morgen — der vorherige Fix hatte sich auf einen veralteten CLAUDE.md-Vermerk gestützt"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VT04 (Helfen & Eingreifen): Material-Vollprüfung — 24/24 MCQ + 12 corr-Zuordnungen bestätigt, 0 falsche Schlüssel, 0 Fix-Bedarf (Philpot et al. 2020, Fischer/Krueger/Greitemeyer 2011, General Aggression Model korrekt dargestellt). M5 VT05 (Selbstbild, Urteilsfehler & Beziehungen): Material-Vollprüfung — 24/24 MCQ + 12 corr-Zuordnungen bestätigt, 0 falsche Schlüssel (Dunning-Kruger, Better-than-average, Taylor & Brown 1988, Finkel et al. 2012 Online-Dating-Framework fachlich verifiziert). Dabei ein Klausurformat-Fehler in ALLEN 5 Vertiefungsmodulen entdeckt und korrigiert: der Untertitel nannte „Klausur 14.07.2026 (MC)“ statt korrekt „(Freitext)“ — die aktuelle Klausur (Veit) prüft Freitext, nur die alte SoSe23-Altklausur (Vrecko) war MC. Damit sind alle 5 M5-Vertiefungsmodule der Vollprüfung durch.",
      "w": "16./17. Einheit der M5-Vollprüfung — der Klausurformat-Fehler betraf alle 5 VT-Module identisch (Serien-Template-Fehler) und war kurz vor der Klausur morgen besonders dringend zu korrigieren"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VT02 (Social Media, Persuasion & Desinformation): Material-Vollprüfung — 24/24 MCQ + 12 corr-Zuordnungen bestätigt, 0 falsche Schlüssel, 0 inhaltliche Befunde (alle Kernbefunde von ELM bis Instagram-Studie per Web-Recherche verifiziert). M5 VT03 (Vorurteile abbauen): Material-Vollprüfung — 24/24 MCQ + 12 corr-Zuordnungen bestätigt (0 falsche Schlüssel; Mousa-2020-Fußballstudie Irak inkl. aller Prozentwerte per Primärquelle verifiziert). Ein Konsistenz-Fix: eine Bonusfrage-Option nannte das Fußballstudie-Ergebnis „bester Neuling“ statt einheitlich „Fairness-Preis“ wie im Rest des Moduls.",
      "w": "13./14./15. Einheit der M5-Vollprüfung — beide Vertiefungsmodule inhaltlich außergewöhnlich solide, VT02 sogar fehlerfrei"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VT01 (Schlüsselstudien & Replikationskrise): Material-Vollprüfung — 24/24 MCQ + 12 corr-Zuordnungen bestätigt (0 falsche Schlüssel; alle vier Fallstudien Power Posing/Hungry Judges/Stereotype Threat/Unterschrift-am-Anfang per Primärliteratur verifiziert). Ein Zahlenfehler: die Cheating-Rate der Unterschrift-Studie stand mit „79 %“ statt korrekt „63 %“ in der Prosa-Karte.",
      "w": "Erste Vertiefungseinheit der M5-Vollprüfung — hier zählt vor allem fachliche Korrektheit von Studienzahlen/Autoren statt reiner Folientreue, da Vertiefungsmodule bewusst über die VL-Folien hinausgehen"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL12 (Beziehungen & Kultur, letzte VL des Moduls): Material-Vollprüfung — 28/28 MCQ + 16 corr-Zuordnungen bestätigt (0 falsche Schlüssel). Sechs Folientreue-Fixes: die Einsamkeits-Gründe-Erklärung widersprach der eigenen Prosa-Karte („fehlende Infrastruktur“ statt „Klimawandel“) und wurde angeglichen; die Duelle Bonding/Bridging, Kultur/Nation und Individualismus/Kollektivismus verloren erfundene Zusatzbegriffe (Herkunft/Status, Werte/Normen/dynamisch, dyadische Beziehungen, kollektive Verpflichtungen); der Sternberg-Liebesdreieck-Simulator verlor vier erfundene Beispielszenarien; die Ibasho-Karte benennt jetzt die zwei Länder (Philippinen/Nepal) statt einer verschmolzenen Aussage; „und Unabhängigkeit“ bei der vermeidenden Bindung entfernt. Damit sind alle 12 M5-VL-Lernmodule der Vollprüfung durch.",
      "w": "Zwölfte und letzte VL-Einheit der M5-Vollprüfung — durchgehend stilistische Fremdbegriffe/Konkretisierungen in Duellen und Simulator, kein einziger Faktenfehler"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL11 (Selbst): Material-Vollprüfung — 28/28 MCQ + 19 corr-Zuordnungen bestätigt (0 falsche Schlüssel). Drei Folientreue-Fixes: „Niedergeschlagenheit“ als Ideal-Selbst-Diskrepanzfolge durch die Folienbegriffe Traurigkeit/Enttäuschung/Depression/Frustration ersetzt, der Fachbegriff „Metakompetenz“ beim Dunning-Kruger-Effekt durch die Folien-Umschreibung ersetzt, und der Terminus „Better-than-average-Effekt“ entfernt (Folie nennt nur die Beschreibung, keinen Fachbegriff).",
      "w": "Elfte Einheit der M5-Vollprüfung — alle drei Funde folgen demselben Muster wie der frühere „Skript“-Fund (VL02): fachlich korrekte, aber nicht auf der Folie stehende Termini als tragende Erklärung"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL10 (Aggression): Material-Vollprüfung — 28/28 MCQ + 18 corr-Zuordnungen bestätigt (0 falsche Schlüssel). Zwei Folientreue-Fixes: der Fremdbegriff „relational“ für indirekte Aggression (8 Fundstellen in MCQ, Duell und Prosa) durch den echten Folienbegriff „indirekt“ ersetzt, und die Testosteron-Behauptung „steigt nach einem Sieg“ auf die beiden belegten Befunde umgestellt (erhöhte Werte bei hochaggressiven Männern, Anstieg nach dem Hantieren mit einer Schusswaffe).",
      "w": "Zehnte Einheit der M5-Vollprüfung — inhaltlich sehr solides Modul, beide Funde waren korrektes Fachwissen, das aber nicht aus dieser Foliendeck-Quelle stammte"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL09 (Prosoziales Verhalten & Hilfeverhalten): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel). Drei Folientreue-Fixes: General Benevolence bezieht sich jetzt korrekt auf die drei Messmethoden (Selbstbericht/Spenden/fMRI) statt pauschal „Lebensbereiche“, impulsives Hilfeverhalten wird an sechs Stellen (MCQ, Duell, drei Prosa-Karten) ohne die erfundene Erregungs-/Eindeutigkeits-Bedingung beschrieben, und die Bystander-Effekt-Grenze bei hoher Gefahr ist jetzt als „Effekt tritt nicht auf“ statt als unbelegte „meist wird doch geholfen“-Prognose formuliert; zusätzlich die erfundene Notsituationen-Karte auf die echten Titanic/WTC/London-Beispiele der Folie zurückgeführt.",
      "w": "Neunte Einheit der M5-Vollprüfung — eine parallele KI-Sitzung hatte die 3 MCQ-Kernbefunde richtig gefunden, aber dieselbe erfundene Erregungs-/Eindeutigkeits-Formulierung tauchte noch an drei weiteren, ungeprüften Stellen (Duell, zwei Prosa-Karten) auf; hier direkt vollständig samt Fundstellen-Grep übernommen und gefixt"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL08 (Intergruppenbeziehungen): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel). Sieben Folientreue-Fixes: Die drei Begriffe Stereotyp/Vorurteil/Diskriminierung werden nicht mehr als unbelegte ABC-Komponenten einer gemeinsamen Einstellung gerahmt, Systemrechtfertigung folgt jetzt dem Folien-Mechanismus „kognitive Dissonanz + Überzeugungsanpassung“, die Befundkarte trennt Arbeitsmarkt/Gesundheit sauber von der Kita-Folie, und mehrere erfundene Duell-Beispiele/Zusatzformulierungen wurden auf den echten Folienwortlaut zurückgeführt.",
      "w": "Achte Einheit der M5-Vollprüfung — die Gegenprüfung zeigte erneut, dass vor allem Duell-Punkte, Sektionsuntertitel und Theorie-Rahmungen atomar gegen die Quelle geprüft werden müssen"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL06 (Sozialer Einfluss): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel). Fünf Folientreue-Fixes: der Vicary-Punkt jetzt ohne Übertreibung als Mythos mit bedingungsabhängigen realen Effekten, Reziprozität ohne das zu absolute „stets“, Foot-in-the-Door im Duell nur noch über „Konsistenz“ statt „Selbstbild“, die Definition von sozialem Einfluss am Originalzitat ausgerichtet und das präskriptive Norm-Beispiel auf das Rauchverbots-Piktogramm statt ein erfundenes Müll-Beispiel zurückgeführt.",
      "w": "Siebte Einheit der M5-Vollprüfung — die Gegenprüfung zeigte, dass diesmal vor allem Duell-Punkte, Definitionssätze und Beispiele einzeln gegen die Folien geschärft werden mussten"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL05 (Einstellungen, Verhalten & Persuasion): Nachkorrektur zur Vollprüfung — alle verbliebenen `reflektiv`-Reste systematisch auf den Folienbegriff `reflexiv` bereinigt (inkl. config/data/HTML), der Korrespondenz-Begriff auf `Gegenstand` statt `Objekt` folientreu angeglichen und die Prebunking-Karte auf die drei belegten Wirkungen umformuliert statt eines unbelegten Debunking-Vergleichs.",
      "w": "Unabhängige Gegenevaluation der Einheit deckte unvollständige Textbereinigung und zwei zusätzliche Folientreue-Befunde auf"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL05 (Einstellungen, Verhalten & Persuasion): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel), aber ein mehrdeutiges Aggregations-Item präzisiert, der Abschnittsrahmen enger an den Folienwortlaut gebunden (Korrespondenz, Verhaltensbereich, Struktur, Persönlichkeit statt pauschal „Moderatoren“) und RIM sprachlich auf den Folienbegriff „reflexiv“ angeglichen.",
      "w": "Sechste Einheit der M5-Vollprüfung — keine neuen Schlüsselfehler, nur Entmehrdeutigung und Folientreue"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL04 (Einstellungen): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel). Fünf Nachschärfungen: das Hunde-Beispiel widersprach der direkt eingebetteten Originalfolie und wurde daran angeglichen, die fehlende „Ich-Verteidigungsfunktion“ (5. von 5 Einstellungsfunktionen) ergänzt, die Freiwilligkeits-Bedingung der Selbstwahrnehmungstheorie ergänzt, alle 5 Wege der Dissonanzreduktion statt nur 3 aufgeführt, und eine zu enge IAT-Formulierung verallgemeinert.",
      "w": "Fünfte Einheit der M5-Vollprüfung — Prosa widersprach teils der direkt daneben eingebetteten Originalfolie"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL02 (Soziale Kognition): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel). Fünf Nachschärfungen: „Spreading Activation“ auf den Folienbegriff korrigiert, die dritte (bisher fehlende) Form der Zugänglichkeit „zielabhängig“ ergänzt, das Repräsentativitäts-Beispiel auf die Folien-Vignette „John“ umgestellt, „wärmer“ auf den Folienwortlaut „freundlicher“ präzisiert, und ein Social-Media-Beispiel als Lehrbuch-Ergänzung gekennzeichnet.",
      "w": "Vierte Einheit der M5-Vollprüfung — durchgängig Folientreue-Nachschärfungen, keine Schlüsselfehler"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL07 (Soziale Gruppen): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel), aber ein kompletter Abschnitt („Prozessverluste“ mit Koordinationsverlust/Trittbrettfahren/Köhler-Effekt) beruhte auf Begriffen, die in keiner M5-Folie vorkommen — Abschnitt vollständig entfernt (Modul jetzt 7 statt 8 Sektionen, 26 statt 28 Fragen). Zusätzlich ein Logikfehler in der Gruppentyp-Zuordnung korrigiert sowie zwei kleinere Begriffs-Präzisierungen.",
      "w": "Dritte Einheit der M5-Vollprüfung — größerer Fund: ein ganzer Modul-Abschnitt ohne Folien-Grundlage"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL03 (Eindrucksbildung & Attribution): Material-Vollprüfung — 28/28 MCQ bestätigt (0 falsche Schlüssel). Zwei Nachschärfungen: Fremdbegriff „Begabung“ auf den Folienbegriff „Erfolg“ (Begabungslob in Klammern) korrigiert, und der KKD-Attributions-Simulator um zwei bisher als „unklar“ ausgegebene, aber folienbelegte Attributionsmuster ergänzt.",
      "w": "Zweite Einheit der M5-Vollprüfung — Fremdbegriff-Regel (Folienwortlaut = Primärbegriff) konsequent angewendet"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5 VL01 (Einführung): Material-Vollprüfung nach der V2-Neuextraktion aufgedeckt und behoben — ein falscher Antwortschlüssel (Frage zu interner/externer Validität zeigte auf die falsche Option) sowie drei Stellen mit Begriffen, die nicht auf den Folien stehen (Gütekriterien-Ergänzung, „kulturvergleichend“ statt „indirekte Methoden“, ein nicht belegter Moderator). Bedeutung/Fachinhalt sonst unverändert.",
      "w": "Erste Einheit der M5-Vollprüfung nach abgeschlossener V2-Neuextraktion aller 12 Decks — deckt Altfehler auf, die vor der eigenen heutigen Options-Bearbeitung schon im Material steckten"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5: zwei versteckte Muster in den Antwortoptionen behoben — die korrekte Antwort war projektweit meist die zweitlängste Option und trug oft als einzige eine Klammer-Präzisierung. Für alle 12 VL-Module, die 5 Vertiefungsmodule und die 3 KI-/Lernfragen-Sets wurden die Optionslängen ausgeglichen und die Klammer-Hinweise in Fließtext aufgelöst (592 Fragen), ohne Inhalt/Bedeutung zu ändern. Neue automatische Prüfregeln (R17 Längenrang, R18 Klammer-Exklusivität) verhindern das Muster künftig projektweit.",
      "w": "Nutzer bemerkte, dass sich Fragen anhand der Optionslänge/-form statt des Fachwissens lösen ließen — M5-Klausur steht kurz bevor"
    },
    {
      "d": "2026-07-13", "t": "technik",
      "s": "Übungssets: Die Antwortoptionen werden jetzt bei jedem Aufruf zufällig angeordnet (durchgemischt), und die a/b/c/d-Bezeichnungen entfallen — so kann man sich nicht mehr die Position der richtigen Antwort merken. Fragen, deren Erklärung im Text auf einen Buchstaben verweist (z. B. „Richtig ist c)“), bleiben automatisch in fester Reihenfolge, damit die Erklärung stimmt. Betrifft nur die Übungssets; die Lernmodul-Quizze und das Klausurformat-Set bleiben unverändert. Der Lernstand bleibt erhalten.",
      "w": "Fördert das Lernen der Inhalte statt der Antwortposition"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5: neues zweites KI-Übungsset mit 50 Fragen (im Übungssets-Bereich als „KI-Übungsset 2“). Es ergänzt das erste KI-Set und fragt gezielt bislang wenig getestete Themen ab — u. a. Weiner-Ursachenattribution & gelernte Hilflosigkeit, Zwei-Faktoren-Theorie der Emotion, Theorie des überlegten/geplanten Verhaltens, Cialdinis Prinzipien, Stereotyp-Inhaltsmodell & BIAS-Map, evolutionäres Helfen, Quellen & Motive des Selbst sowie Beziehungen & Kultur (WEIRD). Anwendungs-/Szenariostil, an den Folien geprüft.",
      "w": "Mehr Übungsmaterial für M5 mit anderen inhaltlichen Schwerpunkten als das erste KI-Set"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M11a-Inhalts-Audit abgeschlossen (Übungssets inkl. Klausurformat/Malus, 14 Lernmodule, Modell-Trainer) — sehr sauber: keine falschen Lösungen. Präzisiert wurden v. a. zwei Modell-Trainer-Einträge zur Klassischen Testtheorie: die KTT-Axiome sind jetzt folienkonform gegliedert (Existenz-/Verknüpfungsaxiom als Axiome; „Erwartungswert des Fehlers = 0“ und die Varianzzerlegung als abgeleitete Sätze) und die Kriteriumskontamination korrekt als konstruktirrelevante Varianz definiert. Dazu einige Folienwortlaut-Feinheiten (Ratingskala „symbolisch“, τ-Äquivalenz, Kategorienzahl 2–9/7–9) und ein Lösungs-Spoiler entfernt.",
      "w": "Vor der Klausur am 23.07.: die „Axiom oder Satz?“-Unterscheidung der KTT ist eine klassische Prüfungsfalle"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M4b-Inhalts-Audit abgeschlossen (Übungssets, 14 Lernmodule, Modell-Trainer) — 13 Korrekturen. Wichtig: In der Altklausur waren zwei Lösungen falsch gesetzt und wurden richtiggestellt (Höhepunkt in der Lebensmitte = primäres Kontrollpotential; höchstes Autonomieerleben = mittleres Erwachsenenalter). Außerdem Autoren/Jahre an die Folien angeglichen (u. a. Websters Weisheitsmodell HERO(E) statt „HERMES“, Kreismodell affektiver Zustände nach Barrett & Russell 1999, Info-Ströme nach Murre 2006) und ein Lösungs-Spoiler in einem Tipp entfernt.",
      "w": "Vor der Klausur am 17.07.: zwei falsche Lösungen hätten sonst falsch gelernt; Autoren/Jahre sind bei M4b Prüfstoff"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5-Wissensbasis vollständig auf Extraktion V2 umgestellt — jetzt alle 12 Vorlesungs-Decks neu geprüft (12/12). Die letzten drei (Einführung, Eindrucksbildung/Attribution, Soziale Gruppen) sind fertig: Diagramm-Ablesewerte und Studienzahlen per Original-Folien-Vergleich bestätigt, jede Fassung mit Qualitäts-Gate und Stichproben-Test abgesichert.",
      "w": "Sichert, dass Zahlen, Studien und Grafikwerte in der M5-Wissensbasis exakt den Dozentenfolien entsprechen"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M12b-Lernmodule & Modell-Trainer: 13 folienbezogene Präzisierungen aus dem Inhalts-Audit. U. a. die systemischen Perspektiven auf sechs ergänzt (die 6. = lösungs-/ressourcenorientiert: de Shazer & Insoo Kim Berg); Jahreszahlen an die Folien angeglichen (Selvini-Palazzoli 1980, postmoderne Ansätze ab ca. 1980, neurowissenschaftliche Vorhersage ca. 8 s); Abwehr↔Strukturniveau im OPD-Simulator folienkonform (Verschiebung = gutes Niveau); Genogramm-Symbole präzisiert (ein Schrägstrich = Trennung, zwei = Scheidung); das Trainer-Modell korrekt als „OPD-Aktualkonflikte“ benannt.",
      "w": "Vor der Klausur am 16.07.: Autoren, Jahreszahlen und Zuordnungen sind bei M12b Prüfstoff — maßgeblich ist die Dozentenfolie"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M12b-Übungssets (Altklausur + KI-Set): Jahreszahl zur Systemischen Therapie an die Dozentenfolie angeglichen — die sozialrechtliche Anerkennung für Erwachsene (G-BA) ist 2018 (Wissenschaftlichkeit durch den WBP: 2008), statt der bisherigen Angabe „2020“. Zwei Erklärtexte enger an den Folienwortlaut geführt (Mehrgenerationen-Begriffe, Perspektiven-Etikett).",
      "w": "Vor der Klausur am 16.07.: Jahreszahlen sind bei M12b Prüfstoff, und die Dozentenfolie ist maßgeblich"
    },
    {
      "d": "2026-07-13", "t": "inhalt",
      "s": "M5-Wissensbasis: VL07 „Soziale Gruppen“ komplett neu geprüft und aktualisiert (Extraktion V2, Deck 10/12) — u. a. Keizer-Diagrammwerte bestätigt und Detail-Ergänzungen auf 2 Folien.",
      "w": "Drei unabhängige Durchsichten der Original-Folien sichern, dass Zahlen und Studien exakt stimmen"
    },
    {
      "d": "2026-07-13", "t": "technik",
      "s": "M12a-Modulkarte korrigiert: Die Karte unten zeigte noch den alten Klausurtermin (Mi 22. Jul · Altes Gymnasium), obwohl die Klausur in den Wiederholungszeitraum 14.–25. Sep verschoben ist — jetzt wie beim Countdown „WH-Zeitraum 14.–25. Sep · Klausur verschoben“.",
      "w": "Countdown (oben) und Modulkarte (unten) zeigten widersprüchliche Termine"
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "M5-Lernmodule: Fachbegriffe an den Folienwortlaut angeglichen — der Folienbegriff steht jetzt vorn, der geläufige Fachbegriff in Klammern (z. B. „Denken & Körper (Embodied Cognition)“, „Objekt“ statt „Stimulus“, „Form (physisch/verbal)“ statt „Modalität“). Zwei über die Folien hinausgehende Begriffe (Reproduktion, Social Loafing) sind als Zusatzwissen gekennzeichnet.",
      "w": "Folientreue der Terminologie vor der Klausur; Inhalte, Fragen und Antworten bleiben unverändert"
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "M5 Modell-Trainer: acht Modelle folientreu korrigiert (u. a. Aggressions-Dimensionen, Allports Kontaktbedingungen, Strategien der Kategorienveränderung, ELM-Beispiel, Dissonanz-Wege) — Modell-IDs und Lernstand bleiben unverändert. Vertiefung VT05: Simulator-Hinweis zu positiven Illusionen neutraler formuliert (Fachterm ohne belegte Regel entfernt).",
      "w": "Folientreue der Modell-Struktur; euer gespeicherter Lernstand bleibt erhalten"
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "Interner Qualitäts-Check aller 12 M5-Vorlesungs-Lernmodule: keine falsche Musterlösung gefunden; einige Erklärungen, Prosa- und Simulator-Stellen folientreu präzisiert — u. a. VL07 (Wartende = lockere Verbindung/Gruppe, jetzt konsistent), VL02 (heuristische vs. automatische Verarbeitung), VL01 (Abgrenzung zur Allgemeinen Psychologie), VL04 (Körperzustände/Einstellung), VL08 & VL12 (Werte und Begriffe an die Folie angeglichen).",
      "w": "Folientreue der Lerninhalte; Antworten und Musterlösungen bleiben unverändert"
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "Fehlermeldung VL07 Soziale Gruppen (Simulator „Gruppe oder keine Gruppe?“): Gemeldet wurde, dass „Wartende an einer Bushaltestelle“ laut Vorlesung sehr wohl als (temporäre) Gruppe gelten. Prüfung an der Original-Folie: BESTÄTIGT — die Folie führt genau dieses Beispiel als „lockere Verbindung“ auf, die „als Gruppe gilt, aber kaum Funktion hat“; der Simulator hatte es fälschlich als „keine Gruppe“ gewertet (und widersprach damit auch der modul-eigenen Zuordnungsfrage). Korrigiert: Einstufung, Feedback und Einstiegsfrage folientreu auf „lockere Verbindung / gilt als Gruppe“ umgestellt.",
      "w": "Danke an die Melder:in — der Simulator entsprach nicht der Dozentenfolie; Antwort- und Fragetexte der übrigen Aufgaben unverändert",
      "fm": true
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "Fehlermeldung VL09 Prosoziales & Hilfeverhalten (Verwandtenselektion): Gemeldet wurde, dass die Verwandtenselektion über „indirekte Fitness“ laufe. Prüfung an der Original-Folie: BESTÄTIGT — die Folie unterscheidet direkte und indirekte Fitness und ordnet die Verwandtenselektion der indirekten Fitness zu (die „Gesamt-/inklusive Fitness“ ist nur der Oberbegriff). Das Modul nutzte durchgängig „inklusive Fitness“ — sachlich vertretbar, aber nicht folientreu. Korrigiert: an allen betroffenen Stellen (Fragen, Erklärungen, Duelle, Text) auf „indirekte Fitness“ umgestellt.",
      "w": "Danke an die Melder:in — jetzt mit dem exakten Folienbegriff",
      "fm": true
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "Geprüfte Fehlermeldung OHNE inhaltliche Änderung — VL06 Sozialer Einfluss (Vicary-Frage zu subliminaler Werbung): Gemeldet wurde, die Frage müsse mit Option a beantwortet werden. Ergebnis der Prüfung (an der Original-Folie): Das Material war korrekt — der Schlüssel (die spektakulären Effekte waren erfunden) ist folienrichtig (Folie „FAKE“), Option a gibt gerade Vicarys widerlegte Behauptung wieder. Die richtige Antwort bleibt deshalb unverändert. Berechtigt war nur der Nebenpunkt, dass „Was besagt der Vicary-Fall“ mehrdeutig klingt — deshalb lautet der Fragestamm jetzt „Was zeigt der berühmte Vicary-Fall über subliminale Werbung?“ (Antwort und Optionen gleich).",
      "w": "Danke an die Melder:in — jede Meldung wird geprüft; hier war die vorgeschlagene Antwort nicht korrekt (Material stimmte), die Frage ist aber nun eindeutiger",
      "fm": true
    },
    {
      "d": "2026-07-12", "t": "inhalt",
      "s": "M5-Übungssets: drei Erklärungstexte präzisiert — im Altklausur-Set die Erläuterungen zur Rollen-Frage (Rollendiversifikation) und zur Selbstaufmerksamkeits-Frage, im Lernfragen-Set die 4. Gruppenfunktion Sicherheit & Schutz folientreu ergänzt.",
      "w": "Faktentreue der Erklärungen; Fragen, Optionen und Lösungen bleiben unverändert"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Arbeitsteilung der KI-Modelle verfeinert: Das stärkere Modell erstellt jetzt auch die Lernmaterialien; was es nicht bearbeiten kann, wird automatisch markiert und vom zweiten Modell ergänzt — die Prüf-Gates garantieren, dass nichts fehlt. Geprüft wird weiterhin vom jeweils anderen Modell (Vier-Augen-Prinzip).",
      "w": "Beste Qualität beim Erstellen, unabhängige Prüfung, garantierte Vollständigkeit"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Kampagnen-Prompts als Kopier-Karten auf der Tool-Referenz-Seite: Start/Fortsetzung der M5-Neuextraktion, Nachtragsrunde, Material-Audit und Fehler-Triage — je ein Klick zum Kopieren.",
      "w": "Jede Sitzung startet mit demselben Prompt — kein Suchen in Chats oder Dateien"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Extraktions-Workflow verfeinert: Zwei Modelle arbeiten zusammen — das stärkere extrahiert zuerst, ausgelassene Folien werden markiert und vom zweiten Modell nachgetragen; Vollständigkeit prüft weiterhin das automatische Gate.",
      "w": "Beste Extraktionsqualität bei garantierter Vollständigkeit"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Kampagnen-Dashboard auf der Tool-Referenz-Seite: Der Stand aller Verbesserungs-Kampagnen (Neuextraktionen, Prüfungen, Sanierungen, Fehler-Triage) ist jetzt auf einen Blick sichtbar — mit Fortschrittsbalken und nächstem Schritt.",
      "w": "Überblick, wo die Qualitätsarbeit an den Modulen gerade steht"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Extraktion V2: Die Folien-Extraktion bekommt maschinelle Vollständigkeits-Garantien — Soll-Liste je Folie (jede Zahl, jeder Name), ein hartes 0-Verlust-Gate und ein Drei-Blick-Voting für Grafik-Folien.",
      "w": "Die Extraktion ist die Wurzel aller Lernmaterialien — Fehler dort vererben sich; Maximalqualität nach Nutzer-Vorgabe"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Projekt-Check + Aufräum-Runde: Alt-Experimente archiviert, Caches und API-Ära-Reste entfernt, alle Repos geprüft (sauber & synchron) — keine Änderung an Lernmaterialien.",
      "w": "Ordnung und Platz (~180 MB) ohne Risiko für Inhalte"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Doku-Konsistenz-Runde: Alle Anleitungen und Übersichten führen jetzt auf den Abo-Weg (Inhalte → Opus, Technik → Fable) — veraltete API-Anleitungen sind klar als solche markiert.",
      "w": "Keine Anleitung soll mehr in die alte API-Welt führen"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Projekt komplett API-frei: Die Folien-Extraktion läuft jetzt ausschließlich über das Claude-Abo (Opus) statt über bezahlte API-Aufrufe; die alte API-Pipeline ist archiviert, alle Qualitäts-Gates bleiben aktiv.",
      "w": "Keine API-Kosten mehr; ein Weg statt zwei"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Mail-Fehler-Triage vorbereitet: Gemeldete Fehler (per „Fehler melden“-Mail) werden künftig einzeln geprüft — mit Kurzbericht und Einschätzung pro Meldung; Status-Übersicht auf der Tool-Referenz-Seite.",
      "w": "Die Meldungen aus dem Fehler-Button sollen systematisch und sorgfältig abgearbeitet werden"
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Tool-Referenz-Seite (Befehls-Spickzettel mit Kopier-Buttons und Filter) im privaten Hub — Button „🛠 Tool-Referenz“ oben in diesem Panel."
    },
    {
      "d": "2026-07-12", "t": "technik",
      "s": "Neues Panel „Änderungen und Updates“ auf beiden Seiten — umschaltbar nach Inhalten und Technik, die drei neuesten Einträge direkt sichtbar, mit „neu“-Zähler seit dem letzten Aufklappen."
    },
    {
      "d": "2026-07-11", "t": "technik",
      "s": "Technik-Härtung abgeschlossen: Ein-Befehl-Deploy, zusätzlicher Schutz der Hub-Verschlüsselung, automatische Engine-Tests — und eine Erinnerung, wenn der Lernstand länger nicht gesichert wurde."
    },
    {
      "d": "2026-07-11", "t": "technik",
      "s": "Qualitäts-Audit V2 einsatzbereit: Im Pilottest wurden alle absichtlich eingebauten Fehler gefunden, ohne Fehlalarme.",
      "w": "Die Lerninhalte der Juli-Klausurmodule werden damit vor den Prüfungen blind gegengeprüft"
    },
    {
      "d": "2026-07-07", "t": "inhalt",
      "s": "M11a: Klausurformat-Übung im echten Prüfungsformat (32 Aufgaben, Mehrfachwahl mit Maluspunkten) + neues Lernmodul zum Vertiefungsseminar; Modell-Trainer und KI-Set erweitert.",
      "w": "Die offizielle Klausur-Info korrigiert das Format — kein Single Choice, Stoff inkl. Vertiefungsseminar"
    },
    {
      "d": "2026-07-07", "t": "inhalt",
      "s": "M11a: neues Lernmodul PD12 Neuropsychologie mit Simulator, Trainer- und KI-Fragen.",
      "w": "Neue Vorlesungsfolie — schließt eine dokumentierte Themenlücke vor der Klausur am 23.07."
    },
    {
      "d": "2026-07-07", "t": "inhalt",
      "s": "M12b: neues Lernmodul VL7 Mentalisierungsbasierte Psychotherapie (MBT) mit Simulator; die beiden Freud-Module sind in die Vertiefungs-Kategorie umgezogen.",
      "w": "Neue Vorlesungsfolie; der Umzug macht den VL7-Platz frei (Lernstand der zwei Vertiefungsmodule beginnt dort neu)"
    },
    {
      "d": "2026-07-07", "t": "inhalt",
      "s": "Alle 9 Übungssets der Juli-Module (M5, M12b, M4b, M11a) haben jetzt zwei Hilfe-Buttons pro Frage: „🔓 Lösung“ (volle Auflösung) und „💡 Erklärung“ (spoilerfreier Denk-Hinweis).",
      "w": "Nutzerfeedback — erst selbst denken mit Hinweis, statt sofort die Lösung zu sehen"
    },
    {
      "d": "2026-07-06", "t": "inhalt",
      "s": "M4b: neues Lernmodul VL14 „Tod und Sterben“ — damit sind alle 14 Vorlesungen abgedeckt.",
      "w": "Letzte fehlende Vorlesung vor der Klausur am 17.07."
    },
    {
      "d": "2026-07-06", "t": "inhalt",
      "s": "M5: echte Altklausur (SoSe 2023, 50 Fragen) als Übungsset aufbereitet — mit Üben- und Klausur-Modus.",
      "w": "Originale Klausurfragen zum realistischen Üben vor der Klausur am 14.07."
    },
    {
      "d": "2026-07-05", "t": "inhalt",
      "s": "M5: alle 12 Lernmodule überarbeitet — mehr Fragen (28 je Modul), zusätzliche Duelle und Simulatoren.",
      "w": "Neu-Extraktion der Vorlesungsfolien; Klausur am 14.07."
    }
  ];
  /* CHANGELOG:END */

  var SEEN_KEY = "lm-changelog-seen";   // lm-Präfix → wandert mit dem Fortschritts-Backup mit
  var TABS = [["inhalt", "📚 Inhalte"], ["technik", "🔧 Technik"]];
  var PREVIEW = 3;                      // immer sichtbare neueste Einträge je Tab

  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }
  function fmtDate(iso) { var p = iso.split("-"); return p.length === 3 ? p[2] + "." + p[1] + "." : iso; }
  function newCount(liste) {
    var seen = localStorage.getItem(SEEN_KEY) || "";
    var n = 0;
    for (var i = 0; i < liste.length; i++) if (liste[i].d > seen) n++;
    return n;
  }
  function markSeen(liste) {
    var max = "";
    for (var i = 0; i < liste.length; i++) if (liste[i].d > max) max = liste[i].d;
    if (max) try { localStorage.setItem(SEEN_KEY, max); } catch (e) { }
  }

  function listHtml(liste, tab, expanded) {
    var items = liste.filter(function (e) { return e.t === tab; });
    if (!items.length) return '<div class="cl-none">Noch keine Einträge in dieser Ansicht.</div>';
    var rest = items.length - PREVIEW;
    var h = (expanded ? items : items.slice(0, PREVIEW)).map(function (e) {
      return '<div class="cl-item"><span class="cl-date">' + esc(fmtDate(e.d)) + '</span>' +
        '<div class="cl-body">' + esc(e.s) +
        (e.w ? '<div class="cl-why">Warum: ' + esc(e.w) + '</div>' : '') + '</div></div>';
    }).join('');
    if (expanded) h = '<div class="cl-scroll">' + h + '</div>';   // intern scrollen statt Seite fluten
    if (rest > 0) h += '<button type="button" class="cl-more" data-cl-more="1">' +
      (expanded ? '▴ weniger anzeigen' : '▾ alle anzeigen (' + rest + ' weitere)') + '</button>';
    return h;
  }

  function renderChangelog() {
    var el = document.getElementById("changelog"); if (!el) return;
    // data-nur="inhalt" (öffentlicher Hub): nur Inhalts-Einträge, kein Tab-Umschalter
    var nurInhalte = el.getAttribute("data-nur") === "inhalt";
    var eintraege = nurInhalte
      ? CHANGELOG.filter(function (e) { return e.t === "inhalt" && e.fm === true; })
      : CHANGELOG;
    var tab = "inhalt", expanded = false;
    var n = newCount(eintraege);
    // Optionaler Doku-Link (nur wo das Mount-Div ihn setzt — der öffentliche Hub tut das nicht)
    var doc = el.getAttribute("data-doc");
    var docLabel = el.getAttribute("data-doc-label") || "🛠 Tool-Referenz";
    el.innerHTML =
      '<div class="cl-box"><div class="cl-head">🆕 Änderungen und Updates' +
      (n ? '<span class="cl-badge">' + n + ' neu</span>' : '') +
      (doc ? '<a class="cl-doc" href="' + esc(doc) + '" target="_blank">' + esc(docLabel) + '</a>' : '') +
      '<span class="cl-sub">neueste zuerst</span></div>' +
      (nurInhalte ? '' :
        '<div class="cl-tabs">' + TABS.map(function (t) {
          return '<button type="button" class="cl-tab" data-cl-tab="' + t[0] + '">' + t[1] + '</button>';
        }).join('') + '</div>') +
      '<div class="cl-list"></div></div>';

    var list = el.querySelector(".cl-list");
    function paint() {
      list.innerHTML = listHtml(eintraege, tab, expanded);
      el.querySelectorAll(".cl-tab").forEach(function (b) {
        b.classList.toggle("on", b.getAttribute("data-cl-tab") === tab);
      });
    }
    el.addEventListener("click", function (ev) {
      var t = ev.target.closest ? ev.target.closest("[data-cl-tab],[data-cl-more]") : null;
      if (!t) return;
      if (t.hasAttribute("data-cl-tab")) { tab = t.getAttribute("data-cl-tab"); expanded = false; }
      else {
        expanded = !expanded;
        if (expanded) {                       // alles gesehen → Badge weg
          markSeen(eintraege);
          var badge = el.querySelector(".cl-badge");
          if (badge) badge.remove();
        }
      }
      paint();
    });
    paint();
  }
  window.renderChangelog = renderChangelog;

  var css =
    '#changelog{max-width:700px;margin:0 auto 22px;font-family:system-ui,sans-serif}' +
    '.cl-box{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}' +
    '.cl-head{display:flex;align-items:center;gap:8px;padding:12px 14px 8px;font-weight:700;font-size:.9rem;color:var(--text);flex-wrap:wrap}' +
    '.cl-badge{background:var(--accent);color:#0f172a;border-radius:99px;padding:1px 8px;font-size:.68rem;font-weight:800}' +
    '.cl-doc{margin-left:auto;border:1px solid var(--accent);color:var(--accent);border-radius:8px;padding:2px 10px;font-size:.72rem;font-weight:700;text-decoration:none}' +
    '.cl-doc:hover{background:var(--bg)}' +
    '.cl-sub{font-weight:500;font-size:.72rem;color:var(--text3);margin-left:auto}' +
    '.cl-doc~.cl-sub{margin-left:0}' +
    '.cl-tabs{display:flex;gap:6px;padding:0 14px 10px}' +
    '.cl-tab{border:1px solid var(--border);background:var(--bg);color:var(--text2);border-radius:8px;padding:5px 12px;cursor:pointer;font-size:.78rem;font-family:inherit}' +
    '.cl-tab.on{border-color:var(--accent);color:var(--accent);font-weight:700}' +
    '.cl-list{padding:0 14px 12px}' +
    '.cl-scroll{max-height:330px;overflow-y:auto;overscroll-behavior:contain;padding-right:6px}' +
    '.cl-item{display:flex;gap:10px;padding:8px 0;border-top:1px solid var(--border);font-size:.8rem;line-height:1.5}' +
    '.cl-date{font-family:"SF Mono",Menlo,monospace;color:var(--text3);font-size:.72rem;white-space:nowrap;padding-top:2px}' +
    '.cl-body{color:var(--text2)}' +
    '.cl-why{color:var(--text3);font-style:italic;font-size:.74rem;margin-top:2px}' +
    '.cl-none{color:var(--text3);font-size:.8rem;padding:6px 0}' +
    '.cl-more{border:1px solid var(--border);background:var(--bg);color:var(--text2);border-radius:8px;padding:5px 12px;cursor:pointer;font-size:.74rem;font-family:inherit;margin-top:8px}';
  var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);

  if (document.readyState !== "loading") renderChangelog();
  else document.addEventListener("DOMContentLoaded", renderChangelog);
})();
