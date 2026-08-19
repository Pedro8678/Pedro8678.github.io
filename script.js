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

function appendTerminalOutput(text) {
    const output = document.createElement("pre");
    output.className = "terminal-output";
    output.textContent = text;
    terminalContent.insertBefore(output, terminalPromptLine);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}

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
   TERMINAL - COMANDOS
========================= */

const bootTime = Date.now();

const fortunes = [
    "Um bom sysadmin nunca reinicia sem fazer backup antes.",
    "Existem 10 tipos de pessoas: as que entendem binário e as que não.",
    "O Linux é gratuito apenas se seu tempo não vale nada.",
    "99 little bugs in the code, take one down, patch it around, 127 little bugs in the code.",
    "sudo não te dá superpoderes, te dá mais responsabilidade.",
    "A nuvem é só o computador de outra pessoa.",
    "Ctrl+Z não desfaz decisões da vida real, infelizmente."
];

function cowsay(text) {
    const msg = text || "Moo!";
    const border = "_".repeat(msg.length + 2);
    return ` ${border}
< ${msg} >
 ${"-".repeat(msg.length + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`;
}

const boldMap = {};
"abcdefghijklmnopqrstuvwxyz".split("").forEach((c, i) => {
    boldMap[c] = String.fromCodePoint(0x1D41A + i);
    boldMap[c.toUpperCase()] = String.fromCodePoint(0x1D400 + i);
});
"0123456789".split("").forEach((c, i) => {
    boldMap[c] = String.fromCodePoint(0x1D7CE + i);
});

function figlet(text) {
    if (!text) return "uso: figlet <texto>";
    return text.split("").map(c => boldMap[c] || c).join("");
}

const tuxArt = `    .--.
   |o_o |
   |:_/ |
  //   \\ \\
 (|     | )
/'\\_   _/\`\\
\\___)=(___/`;

const readmeText = `# Pedro (PH)

Estudante do último ano do ensino médio em Fortaleza, CE.
Curtindo Linux, servidores, homelab e programação.

Feito com tecnologia e café ☕`;

function uptimeString() {
    const seconds = Math.floor((Date.now() - bootTime) / 1000);
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
}

function neofetchOutput() {
    const uaData = navigator.userAgentData;
    const platform = (uaData && uaData.platform) || navigator.platform || "Desconhecido";
    const cores = navigator.hardwareConcurrency || "?";
    const mem = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "N/D";
    const res = `${screen.width}x${screen.height}`;
    const lang = navigator.language;

    return `        _nnnn_
       dGGGGMMb     ph@system
      @p~qp~~qMb    ----------
      M|@||@) M|    OS: ${platform}
      @,----.JM|    Kernel: JavaScript V8
     JS^\\__/  qKKKKK Uptime: ${uptimeString()}
    dZP        qKKKb CPU Threads: ${cores}
   dZP          qKKKb RAM (aprox.): ${mem}
  dZK          qKKKKK Resolução: ${res}
  ZK\\         KKKKKKK Idioma: ${lang}
  KKKKM       KKKKKKK Shell: ph-terminal 1.0
KKKKKKK.       KKKKKKK`;
}

function pingSim(host) {
    const target = host || "flowdedados.com";
    appendTerminalOutput(`PING ${target}: 56 data bytes`);
    let i = 0;
    const interval = setInterval(() => {
        i++;
        const ms = (Math.random() * 30 + 5).toFixed(1);
        appendTerminalOutput(`64 bytes from ${target}: icmp_seq=${i} ttl=57 time=${ms} ms`);
        if (i >= 4) {
            clearInterval(interval);
            appendTerminalOutput(`--- ${target} ping statistics ---
4 packets transmitted, 4 received, 0% packet loss`);
        }
    }, 500);
}

function htopSim() {
    const pre = document.createElement("pre");
    pre.className = "terminal-output";
    terminalContent.insertBefore(pre, terminalPromptLine);

    const procs = ["chrome", "systemd", "node", "sshd", "bash", "Xorg", "code", "docker"];
    let frame = 0;

    const interval = setInterval(() => {
        frame++;
        const cpuTotal = (Math.random() * 40 + 5).toFixed(1);
        const memTotal = (Math.random() * 60 + 20).toFixed(1);

        let out = `Tasks: ${Math.floor(Math.random() * 50 + 120)} total   CPU: ${cpuTotal}%   Mem: ${memTotal}%
`;
        out += "PID    USER   CPU%   MEM%   COMMAND\n";

        procs.forEach((name, idx) => {
            const cpu = (Math.random() * 15).toFixed(1);
            const mem = (Math.random() * 10).toFixed(1);
            out += `${1000 + idx}   ph     ${cpu.padStart(5)}  ${mem.padStart(5)}  ${name}\n`;
        });

        pre.textContent = out;
        terminalContent.scrollTop = terminalContent.scrollHeight;

        if (frame >= 6) {
            clearInterval(interval);
            appendTerminalOutput("(htop encerrado)");
        }
    }, 500);
}

/* Modo Matrix */
function toggleMatrixMode() {
    if (document.getElementById("matrixOverlay")) return;

    const overlay = document.createElement("canvas");
    overlay.id = "matrixOverlay";
    document.body.appendChild(overlay);
    overlay.width = window.innerWidth;
    overlay.height = window.innerHeight;

    const mctx = overlay.getContext("2d");
    const chars = "アイウエオカキクケコ01ABCDEFPHフローデ";
    const fontSize = 16;
    const columns = Math.floor(overlay.width / fontSize);
    const drops = new Array(columns).fill(1);

    function draw() {
        mctx.fillStyle = "rgba(0, 0, 0, 0.08)";
        mctx.fillRect(0, 0, overlay.width, overlay.height);
        mctx.fillStyle = "#00ff6a";
        mctx.font = fontSize + "px monospace";

        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            mctx.fillText(char, i * fontSize, y * fontSize);
            if (y * fontSize > overlay.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    const matrixInterval = setInterval(draw, 40);

    function exitMatrix() {
        clearInterval(matrixInterval);
        overlay.remove();
        document.removeEventListener("keydown", exitMatrix);
        document.removeEventListener("click", exitMatrix);
    }

    document.addEventListener("keydown", exitMatrix);
    document.addEventListener("click", exitMatrix);
}

function toggleHackerMode() {
    document.body.classList.toggle("hacker-mode");
    return document.body.classList.contains("hacker-mode")
        ? "Modo hacker ATIVADO. Digite 'hackermode' de novo pra sair."
        : "Modo hacker desativado.";
}

const terminalCommands = {
    help: `Comandos disponíveis:
  help                    - mostra esta mensagem
  about                   - sobre o phsystem
  neofetch                - informações do sistema (navegador)
  htop                    - monitor de processos animado
  matrix                  - modo matrix (aperte qualquer tecla pra sair)
  hackermode              - liga/desliga o tema hacker verde
  skills                  - tecnologias utilizadas
  links                   - links importantes
  fortune                 - citação aleatória
  cowsay <texto>          - vaca ASCII com mensagem
  figlet <texto>          - texto estilizado
  tux                     - pinguim ASCII
  whoami                  - quem é o Pedro?
  ls                      - lista arquivos do site
  date                    - data e hora atual
  uptime                  - tempo desde que o site abriu
  ping <host>             - ping (simulado)
  cat readme.txt          - bio em formato readme
  rm -rf /                - ...`,
    about: "phsystem v1.0 — um terminal falso feito com HTML, CSS e JS puro, por Pedro.",
    whoami: "Pedro",
    skills: "Linux, Bash, HTML, CSS, JavaScript, Git/GitHub, redes e servidores.",
    links: "Currículo | GitHub: github.com/Pedro8678 | Instagram: @pedroo.hg0",
    tux: tuxArt,
    ls: "index.html  style.css  script.js  README.md",
    date: () => new Date().toString(),
    uptime: () => `Site ativo há ${uptimeString()}`,
    fortune: () => fortunes[Math.floor(Math.random() * fortunes.length)],
    neofetch: () => neofetchOutput(),
    "cat readme.txt": readmeText,
    "rm -rf /": "Permissão negada. Boa tentativa 😄",
    matrix: () => { toggleMatrixMode(); return "Entrando na Matrix..."; },
    htop: () => { htopSim(); return null; },
    hackermode: () => toggleHackerMode(),
    sudo: "Você não está no arquivo sudoers. Este incidente será reportado.",
    exit: "Este não é esse tipo de terminal 😉",
    "42": "A resposta para a vida, o universo e tudo mais.",
    konami: "↑ ↑ ↓ ↓ ← → ← → B A — você desbloqueou nada, mas parabéns!"
};

function runCommand(raw) {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();

    if (lower.startsWith("cowsay ")) {
        return cowsay(trimmed.slice(7));
    }
    if (lower.startsWith("figlet ")) {
        return figlet(trimmed.slice(7));
    }
    if (lower.startsWith("ping")) {
        const host = trimmed.slice(4).trim();
        pingSim(host);
        return null;
    }

    const entry = terminalCommands[lower];
    if (entry === undefined) {
        return `Comando não encontrado: ${trimmed}`;
    }
    return typeof entry === "function" ? entry() : entry;
}

terminalInput.addEventListener("keydown", event => {
    if (event.key !== "Enter") {
        return;
    }

    const command = terminalInput.value.trim();
    terminalInput.value = "";

    if (!command) {
        return;
    }

    appendTerminalOutput(`ph@system:~$ ${command}`);

    const result = runCommand(command);
    if (result !== null) {
        appendTerminalOutput(result);
    }
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
