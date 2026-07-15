
    // === SVG arrow ===
    const termArrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 32"><g transform="scale(0.04) translate(0,-2420)"><path fill="#279059" d="m 2254,3177 -45,-45 31,0 31,0 0,-7 c 1,-29 -16,-46 -47,-55 -5,-2 -56,-2 -983,-2 l -977,-2 -10,-2 c -48,-11 -77,-42 -88,-95 L 165,2960 V 2810 c 0,-160 -0,-154 5,-174 5,-18 14,-33 27,-47 13,-13 27,-21 47,-28 C 267,2554 169,2555 1248,2555 c 881,0 969,-0 976,-2 24,-5 38,-20 45,-46 2,-8 2,-10 3,-58 l 0.37,-50 h 27 27 l 0,52 c 0,56 -1,58 -7,79 -9,30 -32,57 -60,69 -11,5 -13,6 -26,8 -8,2 -60,2 -985,2 l -977,1 -11,4 c -22,8 -34,19 -39,39 -2,6 -2,16 -2,157 0,143 0,150 2,158 4,16 13,30 23,37 3,2 10,5 14,7 l 8,3 977,1 c 896,1 978,1 985,2 12,3 16,4 27,8 33,14 56,39 65,73 2,9 5,27 5,35 0,0 14,1 32,1 h 32 l -45,45 c -25,25 -45,45 -46,45 0,0 -21,-20 -45,-45 z" /></g></svg>`;


    async function getJSONData(path) {
      const response = await fetch(path);
        if (!response.ok) {throw new Error(`Failed to load ${path}`);}
      return await response.json();
    }


    function showKS4SubjectButtons(block) {
      document.getElementById("ks4-gcse-button-block").style.display = "none";
      document.getElementById("ks4-btec-button-block").style.display = "none";
      document.getElementById("ks4-cambnat-button-block").style.display = "none";
      document.getElementById(block).style.display = "flex";
    }


    function renderBox(text) {
      const length = text.length;
      let lines;
      switch (true) {
        case (length > 60):
          lines = splitText(text, length, length / 6);
          break;
        case (length > 45):
          lines = splitText(text, length, length / 5);
          break;
        case (length > 30):
          lines = splitText(text, length, length / 4);
          break;
        case (length > 15):
          lines = splitText(text, length, length / 3);
          break;
        default:
          lines = [text];
      }
      return `<li class="textbox">
        ${lines.map(l => `<span>${l}</span>`).join("")}
      </li>`;
    }


    function splitText(text, length, minLength) {
      const lines = [];
      let startPoint = 0;
      let splitPoint = minLength
      while (splitPoint < length) {
        if (text.at(splitPoint) == " ") {
          const newLine = text.slice(startPoint, splitPoint)
          lines.push(newLine);
          startPoint = splitPoint + 1;
          splitPoint = splitPoint + (minLength)
        }
        splitPoint = splitPoint + 1;
      }
      lines.push(text.slice(startPoint));
      return lines;
    }


    function renderTerm(name, term) {
      if (!term) return "";

      return `
        <section class="term-section">
          ${termArrowSVG}
          <h5 class="term-name">${name} term</h5>
          <h6 class="screenreader-only">${name} term, first half</h6>
          <ul class="term-list first-half">
            ${(term.first || []).map(renderBox).join("")}
          </ul>
          <h6 class="screenreader-only">${name} term, second half</h6>
          <ul class="term-list second-half">
            ${(term.second || []).map(renderBox).join("")}
          </ul>
        </section>
      `;
    }


    function renderJourney(journeys, subject) {

      const data = journeys[subject];
      if (!data) {
        console.warn(`No journey data found for: ${subject}`);
        document.getElementById("learning-journey-root").innerHTML = `<p>No journey found for "${subject}"</p>`;
        return;
      }

      let titleHtml;
      if (subject=="pshee") {  // EDGE CASE!!
        titleHtml = `<h4 style="font-size: 13px;">${data.title}</h4>`
      } else {
        titleHtml = `<h4>${data.title}</h4>`
      }

      document.getElementById("learning-journey-root").innerHTML = `
        <div class="learning-journey-green">

          <section class="top-section">
            <h3>Learning Journey</h3>
            <div class="subject">
              ${titleHtml}
              <h5>${data.level}</h5>
            </div>
          </section>

          ${renderTerm("Autumn", data.terms.autumn)}
          ${renderTerm("Spring", data.terms.spring)}
          ${renderTerm("Summer", data.terms.summer)}

        </div>
      `;

    }


    function populateKS3Buttons(buttons) {
      const block = document.getElementById("ks3-button-block");
      block.replaceChildren()
      for (const [key, label] of Object.entries(buttons)) block.innerHTML += `<button class="ks3-subject-btn" type="button" data-subject="${key}">${label}</button>`;
    }

    function hookUpKS3Buttons(journeys, subject) {
      document.querySelectorAll(".ks3-subject-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {b.classList.remove("current-btn");});  // unhighlight all the buttons
          btn.classList.add("current-btn");                                                                  // highlight the clicked one
          subject = btn.dataset.subject;
          renderJourney(journeys, subject);
        });
      });
    }


    function populateKS4QualificationButtons(buttons) {
      const block = document.getElementById("ks4-qualification-button-block");
      if (!block.hasChildNodes()) for (const [key, label] of Object.entries(buttons)) {block.innerHTML += `<button class="ks4-qualification-btn" type="button" data-qualification="${key}">${label}</button>`;}
    }

    function populateKS4Buttons(blockID, buttonClass, buttons) {
      const block = document.getElementById(blockID);
      if (!block.hasChildNodes()) for (const [key, label] of Object.entries(buttons)) {block.innerHTML += `<button class="${buttonClass}" type="button" data-subject="${key}">${label}</button>`;}
    }

  
    function hookUpKS4(state) {

      document.querySelectorAll(".ks4-qualification-btn").forEach(btn => {
        if (btn.dataset.qualification == state.qualification) {
          btn.classList.add("current-btn");
        } else {
          btn.classList.remove("current-btn");
        }
      });

      // hook up the qualification buttons
      // on click: highlight the current button, show the buttons,
      // specify what data to use and render the current journey
      document.querySelectorAll(".ks4-qualification-btn").forEach(btn => {

        btn.addEventListener("click", () => {

          document.querySelectorAll(".ks4-qualification-btn").forEach(b => {b.classList.remove("current-btn");});  // unhighlight all the buttons
          btn.classList.add("current-btn");                                                                        // highlight the clicked one

          state.qualification = btn.dataset.qualification;

          showKS4SubjectButtons(`ks4-${state.qualification}-button-block`);
          renderJourney(state.gcseJourneys, state.gcseSubject);

        });
      });

      // hook up the gcse subject buttons
      // on click: highlight current button, render the journey
      const GCSEBlock = document.querySelectorAll(".ks4-gcse-subject-btn");
      GCSEBlock.forEach(btn => {
        btn.addEventListener("click", () => {
          GCSEBlock.forEach(b => {b.classList.remove("current-btn");});  // unhighlight all the buttons
          btn.classList.add("current-btn");                              // highlight the clicked one
          state.gcseSubject = btn.dataset.subject;
          renderJourney(state.gcseJourneys, state.gcseSubject);
        });
      });

      // hook up the btec subject buttons
      // on click: highlight current button, render the journey
      const BTECBlock = document.querySelectorAll(".ks4-btec-subject-btn");
      BTECBlock.forEach(btn => {
        btn.addEventListener("click", () => {
          BTECBlock.forEach(b => {b.classList.remove("current-btn");});  // unhighlight all the buttons
          btn.classList.add("current-btn");                              // highlight the clicked one
          state.btecSubject = btn.dataset.subject;
          renderJourney(state.btecJourneys, state.btecSubject);
        });
      });

      // hook up the cambnat subject buttons
      // on click: highlight current button, render the journey
      const CAMBNATBlock = document.querySelectorAll(".ks4-cambnat-subject-btn");
      CAMBNATBlock.forEach(btn => {
        btn.addEventListener("click", () => {
          CAMBNATBlock.forEach(b => {b.classList.remove("current-btn");});  // unhighlight all the buttons
          btn.classList.add("current-btn");                                 // highlight the clicked one
          state.cambnatSubject = btn.dataset.subject;
          renderJourney(state.cambnatJourneys, state.cambnatSubject);
        });
      });

    }


    export async function renderYear(year) {

      document.getElementById("ks3-button-block").replaceChildren()
      document.getElementById("ks4-qualification-button-block").replaceChildren()
      document.getElementById("ks4-gcse-button-block").replaceChildren()
      document.getElementById("ks4-btec-button-block").replaceChildren()
      document.getElementById("ks4-cambnat-button-block").replaceChildren()

      switch(year) {

        case 7:
          const y7State = {
            title: "Key Stage 3: Year 7",
            buttons: await getJSONData("./learning-journeys-data/ks3/y7-btns.json"),
            journeys: await getJSONData("./learning-journeys-data/ks3/y7.json"),
            subject: "art"
          };
    
          document.getElementById("title-container").innerHTML = `<h2>${y7State.title}</h2>`;
          populateKS3Buttons(y7State.buttons);
          hookUpKS3Buttons(y7State.journeys, y7State.subject);
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {if (b.dataset.subject == y7State.subject) {b.classList.add("current-btn");}});
          renderJourney(y7State.journeys, y7State.subject);
          break;

        case 8:
          const y8State = {
            title: "Key Stage 3: Year 8",
            buttons: await getJSONData("./learning-journeys-data/ks3/y8-btns.json"),
            journeys: await getJSONData("./learning-journeys-data/ks3/y8.json"),
            subject: "art"
          };
    
          document.getElementById("title-container").innerHTML = `<h2>${y8State.title}</h2>`;
          populateKS3Buttons(y8State.buttons);
          hookUpKS3Buttons(y8State.journeys, y8State.subject);
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {if (b.dataset.subject == y8State.subject) {b.classList.add("current-btn");}});
          renderJourney(y8State.journeys, y8State.subject);
          break;

        case 9:
          const y9State = {
            title: "Key Stage 3: Year 9",
            buttons: await getJSONData("./learning-journeys-data/ks3/y9-btns.json"),
            journeys: await getJSONData("./learning-journeys-data/ks3/y9.json"),
            subject: "art"
          };
    
          document.getElementById("title-container").innerHTML = `<h2>${y9State.title}</h2>`;
          populateKS3Buttons(y9State.buttons);
          hookUpKS3Buttons(y9State.journeys, y9State.subject);
          document.querySelectorAll(".ks3-subject-btn").forEach(b => {if (b.dataset.subject == y9State.subject) {b.classList.add("current-btn");}});
          renderJourney(y9State.journeys, y9State.subject);
          break;

        case 10:
          const y10State = {
            title: "Key Stage 4: Year 10",
            qualificationButtons: {"gcse": "GCSE", "btec": "BTEC", "cambnat": "Cambridge National"},
            qualification: "gcse",
            gcseSubjectButtons: await getJSONData("./learning-journeys-data/ks4/gcse/y10-btns.json"),
            btecSubjectButtons: await getJSONData("./learning-journeys-data/ks4/btec/y10-btns.json"),
            cambnatSubjectButtons: await getJSONData("./learning-journeys-data/ks4/cambridge-national/y10-btns.json"),
            gcseJourneys: await getJSONData("./learning-journeys-data/ks4/gcse/y10.json"),
            btecJourneys: await getJSONData("./learning-journeys-data/ks4/btec/y10.json"),
            cambnatJourneys: await getJSONData("./learning-journeys-data/ks4/cambridge-national/y10.json"),
            gcseSubject: "art",
            btecSubject: "creative-media-prod",
            cambnatSubject: "engin-manuf",
          };
    
          document.getElementById("title-container").innerHTML = `<h2>${y10State.title}</h2>`;
          populateKS4QualificationButtons(y10State.qualificationButtons);
          populateKS4Buttons("ks4-gcse-button-block", "ks4-gcse-subject-btn", y10State.gcseSubjectButtons);
          populateKS4Buttons("ks4-btec-button-block", "ks4-btec-subject-btn", y10State.btecSubjectButtons);
          populateKS4Buttons("ks4-cambnat-button-block", "ks4-cambnat-subject-btn", y10State.cambnatSubjectButtons);

          hookUpKS4(y10State);
          showKS4SubjectButtons(`ks4-${y10State.qualification}-button-block`);

          document.querySelectorAll(".ks4-gcse-subject-btn").forEach(b => {if (b.dataset.subject == y10State.gcseSubject) {b.classList.add("current-btn");}});
          document.querySelectorAll(".ks4-btec-subject-btn").forEach(b => {if (b.dataset.subject == y10State.btecSubject) {b.classList.add("current-btn");}});
          document.querySelectorAll(".ks4-cambnat-subject-btn").forEach(b => {if (b.dataset.subject == y10State.cambnatSubject) {b.classList.add("current-btn");}});

          renderJourney(y10State.gcseJourneys, y10State.gcseSubject);
          break;

        case 11:
          const y11State = {
            title: "Key Stage 4: Year 11",
            qualificationButtons: {"gcse": "GCSE", "btec": "BTEC", "cambnat": "Cambridge National"},
            qualification: "gcse",
            gcseSubjectButtons: await getJSONData("./learning-journeys-data/ks4/gcse/y11-btns.json"),
            btecSubjectButtons: await getJSONData("./learning-journeys-data/ks4/btec/y11-btns.json"),
            cambnatSubjectButtons: await getJSONData("./learning-journeys-data/ks4/cambridge-national/y11-btns.json"),
            gcseJourneys: await getJSONData("./learning-journeys-data/ks4/gcse/y11.json"),
            btecJourneys: await getJSONData("./learning-journeys-data/ks4/btec/y11.json"),
            cambnatJourneys: await getJSONData("./learning-journeys-data/ks4/cambridge-national/y11.json"),
            gcseSubject: "art",
            btecSubject: "creative-media-prod",
            cambnatSubject: "engin-manuf",
          };
    
          document.getElementById("title-container").innerHTML = `<h2>${y11State.title}</h2>`;
          populateKS4QualificationButtons(y11State.qualificationButtons);
          populateKS4Buttons("ks4-gcse-button-block", "ks4-gcse-subject-btn", y11State.gcseSubjectButtons);
          populateKS4Buttons("ks4-btec-button-block", "ks4-btec-subject-btn", y11State.btecSubjectButtons);
          populateKS4Buttons("ks4-cambnat-button-block", "ks4-cambnat-subject-btn", y11State.cambnatSubjectButtons);

          hookUpKS4(y11State);
          showKS4SubjectButtons(`ks4-${y11State.qualification}-button-block`);

          document.querySelectorAll(".ks4-gcse-subject-btn").forEach(b => {if (b.dataset.subject == y11State.gcseSubject) {b.classList.add("current-btn");}});
          document.querySelectorAll(".ks4-btec-subject-btn").forEach(b => {if (b.dataset.subject == y11State.btecSubject) {b.classList.add("current-btn");}});
          document.querySelectorAll(".ks4-cambnat-subject-btn").forEach(b => {if (b.dataset.subject == y11State.cambnatSubject) {b.classList.add("current-btn");}});

          renderJourney(y11State.gcseJourneys, y11State.gcseSubject);
          break;

        case 12:

          break;

        case 13:

        break;

        default:
          console.log("no such year!");
      }

    }
