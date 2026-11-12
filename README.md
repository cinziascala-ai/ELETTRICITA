# TecnoLab · Elettricità & Magnetismo
> **Corso Multimediale Interattivo di Tecnologia per la Scuola Secondaria di I Grado**  
> Autrice: Prof.ssa Cinzia Scala — I.C. Almese

---

## 🌐 Pubblicazione su GitHub Pages

Questo progetto è configurato appositamente per essere pubblicato su **GitHub Pages** con **percorsi relativi (`base: './'`)** e **routing ad ancore (Hash Deep-Linking)**. 

Ciò consente di pubblicare l'intero progetto su un **singolo indirizzo web GitHub Pages** e di condividere o collegare **blocchi didattici separati** (lezioni, simulatori, verifiche) tramite URL diretti.

---

### 🚀 Come attivare GitHub Pages in 2 passaggi

1. **Carica il progetto su una repository GitHub** (es. `https://github.com/tuo-username/elettricita-magnetismo`).
2. Vai su **Settings** della repository ➔ **Pages**:
   - In **Build and deployment** ➔ **Source**, seleziona **GitHub Actions**.
   - Fatto! Il file di automazione `.github/workflows/deploy.yml` incluso nel progetto compilerà e pubblicherà automaticamente il sito ad ogni `git push`.
3. Il tuo sito sarà visibile all'indirizzo:
   ```text
   https://tuo-username.github.io/elettricita-magnetismo/
   ```

---

## 📌 Indice dei Blocchi & Artefatti (Link Diretti)

Puoi condividere ciascun blocco didattico direttamente con gli studenti (ad esempio su **Google Classroom**, **Registro Elettronico**, **Teams** o **Bacheca**):

| Blocco Didattico / Artefatto | Indirizzo Diretto (Hash) | Descrizione Contenuto |
| :--- | :--- | :--- |
| **Presentazione: Lezione 1** | `.../#presentation-l1` | Slide multimediali con audio su atomo, cariche, grandezze SI e circuiti |
| **Presentazione: Lezione 2** | `.../#presentation-l2` | Slide su calamite, Oersted, Faraday, elettromagnete e treni Maglev |
| **Laboratorio Circuiti** | `.../#circuit-simulator` | Banco di prova con elettroni animati, lampadine e serie/parallelo |
| **Laboratorio Magnetismo** | `.../#magnet-simulator` | Calamita, bussola orientabile ed elettrocalamita con graffette |
| **Analogia Idraulica (BES/DSA)**| `.../#hydraulic-analogy` | Modello ad acqua con dislivello (Volt), strozzatura (Ohm) e turbina (Ampere) |
| **Triangolo Magico di Ohm** | `.../#ohm-triangle` | Metodo della mano coprente per ricavare e calcolare le formule di Ohm |
| **Quaderno: Lezione 1** | `.../#study-guide-l1` | Dispensa approfondita capitolo 1 con tabelle e definizioni |
| **Quaderno: Lezione 2** | `.../#study-guide-l2` | Dispensa approfondita capitolo 2 su magnetismo e macchine elettriche |
| **Quiz di Verifica 1** | `.../#quiz-l1` | 10 domande con voto in decimi e feedback immediato del docente |
| **Quiz di Verifica 2** | `.../#quiz-l2` | 10 domande con spiegazione dell'errore su magnetismo ed elettromagnetismo |
| **Quiz Completo (20 Domande)** | `.../#quiz-all` | Verifica sommativa complessiva su entrambe le lezioni |
| **Glossario Tecnologico** | `.../#glossary` | 30 termini tecnici cercabili con formule e spiegazioni semplici |
| **Scheda di Sintesi Stampabile**| `.../#print-summary` | Compendio A4 pronto per la stampa o esportazione in PDF |

---

## 💻 Esecuzione in Locale (Opzionale)

Se desideri visualizzarlo in locale sul tuo computer:

```bash
# 1. Installa le dipendenze
npm install

# 2. Avvia il server di sviluppo
npm run dev

# 3. Apri nel browser
http://localhost:3000
```

Per generare la cartella statica di produzione:
```bash
npm run build
# I file pronti saranno generati nella cartella /dist
```
