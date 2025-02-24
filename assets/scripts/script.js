// #private, _protected

class Animal {
    /**
     * Animal name
     */
    name = ""
    /**
     * Animal age
     */
    age = 0
    /**
     * Animal picture url
     */
    img = ""
    /**
     * Audio object
     */
    sound = null
    /**
     * leg count
     */
    legCount = 4

    constructor(obj){
        // destrukturizace
        const {name, age, src, sound, legCount} = obj;

        // kontrola vstupních dat
        if (typeof name !== "string" || name.length < 3) {
            throw new Error("Name je nesprávně zadán! Min. 3 znaky a text!");
        }
        if (typeof age !== "number" || age > 200) {
            throw new Error("Age je nesprávně zadán! Číslo, max 200 let!");
        }
        if (typeof src !== "string" || src.length < 5) {
            throw new Error("Img je nesprávně zadán!");
        }
        // opraveno legCount.length - nefunkční
        if (typeof legCount !== "number" || legCount < 2) {
            throw new Error("Počet nohou je nesprávně zadán!");
        }
        // ošetření zvuku
        const audio = new Audio(sound);
        if (!audio) {
            throw new Error("Sound je nesprávně zadán!");
        }
        // prirazeni hodnot po kontrole
        this.name = name;
        this.age = age;
        this.img = src;
        this.sound = audio;
        this.legCount = legCount;
        }

    /**
     * Render zvířete do HTML stránky
     * 
     * @param DOMElement Root to render animal into
     */
    render(zoo) {
        if (typeof zoo !== "object" || zoo.appendChild === undefined) {
            throw new Error("Zoo musí být HTML DOM element!");
        }

        const anim = document.createElement("div");
        anim.className = "animal";

        const h2 = document.createElement("h2");
        h2.innerText = this.name;
        anim.appendChild(h2);

        const p = document.createElement("p");
        // ošetření věku v textu
        if (this.age === 1) {
        p.innerHTML = `Říkají mi <span style="font-weight: bold;">${this.name}</span>, je mi <span style="font-weight: bold;">${this.age}</span> rok a mám <span style="font-weight: bold;">${this.legCount}</span> nohy.`;
        } else if (this.age === 2 || this.age === 3 || this.age === 4) {
            p.innerHTML = `Říkají mi <span style="font-weight: bold;">${this.name}</span>, jsou mi <span style="font-weight: bold;">${this.age}</span> roky a mám <span style="font-weight: bold;">${this.legCount}</span> nohy.`;
        } else {
            p.innerHTML = `Říkají mi <span style="font-weight: bold;">${this.name}</span>, je mi <span style="font-weight: bold;">${this.age}</span> let a mám <span style="font-weight: bold;">${this.legCount}</span> nohy.`; 
        }
        // ošetření počtu nohou
        if (this.legCount > 4) {
            p.innerHTML = `Říkají mi <span style="font-weight: bold;">${this.name}</span>, je mi <span style="font-weight: bold;">${this.age}</span> rok a mám <span style="font-weight: bold;">${this.legCount}</span> nohou.`;
        }

        anim.appendChild(p);

        const img = document.createElement("img");
        img.src = this.img;
        anim.appendChild(img);

        /**
         * přidání audio objektu
         */
        anim.addEventListener("click", (event) => {
            if (!this.sound.paused) {
                this.sound.pause();
            } else {
                this.sound.currentTime = 0;
                this.sound.play();
            }
        });

        zoo.appendChild(anim);

    }
}

const zvirata = [
    [
      'Dog',
      'Ben',
      4,
      7,
      './assets/img/small-dog.jpg',
      './assets/sound/small-dog-woof-woof-sound.mp3'
    ],
    [
      'Pig',
      'Tonda',
      4,
      1,
      './assets/img/pig.jpg',
      './assets/sound/pig.mp3'],
    [
      'Duck',
      'Donald',
      2,
      3,
      './assets/img/duck-quack.jpg',
      './assets/sound/duck-quack.mp3'],
    [
      'Fox',
      'Foxy',
      4,
      9,
      './assets/img/fox.jpg',
      './assets/sound/the_fox.mp3'],
   ];

   const zoo = document.getElementById("zoo");

// for each animal in the list
   zvirata.map((zvire) => {
       const jednoZvire = new Animal({
           name: zvire[1],
           legCount: zvire[2],
           age: zvire[3],
           src: zvire[4],
           sound: zvire[5]
       });
       jednoZvire.render(zoo);
   })
   
// zvire[0] je tam tedy proč?