/* =========================
   BOOT SCREEN
========================= */

const bootScreen =
    document.getElementById("bootScreen");

const bootLog =
    document.getElementById("bootLog");

const bootSteps = [
    ["OK", "Started Data Flow Service"],
    ["OK", "Loaded Linux knowledge base"],
    ["OK", "Mounted /dev/penguins"],
    ["OK", "Started systemd-udevd kernel device manager"],
    ["OK", "Reached YouTube API target"],
    ["OK", "Started Discord Community daemon"],
    ["WARN", "rm -rf / was prevented (you are welcome)"],
    ["OK", "Reached multi-user.target"],
    ["OK", "Data Flow ready."]
];

let bootStep = 0;

function runBootSequence() {

    if (bootStep >= bootSteps.length) {

        window.setTimeout(() => {
            bootScreen.classList.add("is-hidden");
        }, 550);

        return;
    }

    const [status, message] = bootSteps[bootStep];
    const line = document.createElement("div");
    const statusClass = status === "WARN" ? "boot-warn" : "boot-ok";

    line.className = "boot-line";
    line.innerHTML = `<span class="${statusClass}">[ ${status} ]</span> ${message}`;
    bootLog.insertBefore(line, bootLog.querySelector(".boot-cursor"));
    bootStep++;

    window.setTimeout(runBootSequence, 190);
}

window.setTimeout(runBootSequence, 220);


/* =========================
   LUCIDE
========================= */

lucide.createIcons();


/* =========================
   THEME
========================= */

const themeButton =
    document.getElementById("themeButton");

const codeButton =
    document.getElementById("codeButton");

const terminalModal =
    document.getElementById("terminalModal");

const terminalClose =
    document.getElementById("terminalClose");

const terminalInput =
    document.getElementById("terminalInput");

const terminalContent =
    document.getElementById("terminalContent");

const terminalPromptLine =
    terminalInput.closest(".terminal-prompt-line");

const terminalCommands = {
    help: `Comandos disponíveis:
  help                    - mostra esta mensagem
    about                   - sobre o phsystem
  neofetch                - informações do site
  skills                  - tecnologias utilizadas
  links                   - links importantes
  fortune                 - citação aleatória
  cowsay <texto>          - vaca ASCII com mensagem
  figlet <texto>          - texto em ASCII art
  tux                     - pinguim ASCII
  whoami                  - quem é o Pedro?
  ls                      - lista arquivos do site
  date                    - data e hora atual
  uptime                  - tempo desde que o site abriu
  ping flowdedados.com    - ping (fake)
  cat readme.txt          - bio em formato readme
  rm -rf /                - ...`,
    whoami: "Pedro"
};

function appendTerminalOutput(text) {
    const output = document.createElement("pre");
    output.className = "terminal-output";
    output.textContent = text;
    terminalContent.insertBefore(output, terminalPromptLine);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

terminalInput.addEventListener("keydown", event => {
    if (event.key !== "Enter") {
        return;
    }

    const command = terminalInput.value.trim().toLowerCase();
    terminalInput.value = "";

    if (!command) {
        return;
    }

    appendTerminalOutput(`ph@system:~$ ${command}`);
    appendTerminalOutput(
        terminalCommands[command] || `Comando não encontrado: ${command}`
    );
});

function openTerminal() {
    terminalModal.classList.add("is-open");
    terminalModal.setAttribute("aria-hidden", "false");
    terminalInput.focus();
}

function closeTerminal() {
    terminalModal.classList.remove("is-open");
    terminalModal.setAttribute("aria-hidden", "true");
    codeButton.focus();
}

codeButton.addEventListener("click", openTerminal);
terminalClose.addEventListener("click", closeTerminal);

terminalModal.addEventListener("click", event => {
    if (event.target === terminalModal) {
        closeTerminal();
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && terminalModal.classList.contains("is-open")) {
        closeTerminal();
    }
});

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const icon =
        document.body.classList.contains("light")
            ? "moon"
            : "sun";

    themeButton.innerHTML =
        `<i data-lucide="${icon}"></i>`;

    lucide.createIcons();

});


/* =========================
   PARTICLES
========================= */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.size =
            Math.random() * 2.5 + .5;

        this.speedX =
            (Math.random() - .5) * .25;

        this.speedY =
            (Math.random() - .5) * .25;

        this.opacity =
            Math.random() * .5 + .1;
    }


    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0)
            this.x = canvas.width;

        if (this.x > canvas.width)
            this.x = 0;

        if (this.y < 0)
            this.y = canvas.height;

        if (this.y > canvas.height)
            this.y = 0;
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(38, 128, 255, ${this.opacity})`;

        ctx.fill();
    }
}


function createParticles() {

    particles = [];

    const amount =
        Math.min(
            130,
            Math.floor(
                (canvas.width *
                    canvas.height) /
                15000
            )
        );

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        particles.push(
            new Particle()
        );
    }
}


createParticles();

window.addEventListener(
    "resize",
    createParticles
);


function animateParticles() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );

    requestAnimationFrame(
        animateParticles
    );
}

animateParticles();


/* =========================
   LINKS - EFEITO
========================= */

document
    .querySelectorAll(".link-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            () => {

                card.style.transform =
                    "scale(.985)";

                setTimeout(() => {

                    card.style.transform =
                        "";

                }, 130);

            }
        );

    });


/* =========================
   TYPING
========================= */

const typing =
    document.querySelector(".typing");

const words = [
    "Servidores",
    "Linux",
    "Programação",
    "Tecnologia",
    "Homelab",
    "DevOps"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typeEffect() {

    const word =
        words[wordIndex];

    if (!deleting) {

        charIndex++;

        typing.innerHTML =
            word.substring(
                0,
                charIndex
            ) +
            '<span>|</span>';

        if (
            charIndex >= word.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1400
            );

            return;
        }

    } else {

        charIndex--;

        typing.innerHTML =
            word.substring(
                0,
                charIndex
            ) +
            '<span>|</span>';

        if (charIndex <= 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1)
                % words.length;
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();