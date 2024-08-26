document.addEventListener('DOMContentLoaded', function () {
    const inputField = document.getElementById('input-field');
    const consoleOutput = document.getElementById('console-output');
    const inputSection = document.getElementById('console-input-section');

    const commandHistory = [];
    let historyIndex = -1;

    const commandResponses = {
        help: [
            'Available commands:',
            'help - Display available commands and their use.',
            'whoami - A bit about the developer.',
            'socials - A list of all of my Social media.',
            'projects - Display list of current projects.',
            'skills - Showcase of zenswares current skillset.',
            'contact - Shows you how to get in contact with me.',
            'clear - Clear the console output.',
        ],
        whoami: [
            '• Nickname: zens',
            '• Age: 17',
            '• Location: Copenhagen, Denmark',
            '• Hobbies: Coding, Games, Gym'
        ],
        'socials': [
            '• Discord @ zensware',
            '• Github @ zensware',
            '• Instagram @ zensddk',
            '• Twitch @ zensware'
        ],
        projects: [
            'My projects:',
            'zensware.com | My personal website portfolio which is always in development...',
            'zensware.rpc | A lightweight discord self-bot made for using the discord rich presence.',
        ],
        skills: [
            'My current skillset:',
            '• JavaScript',
            '• Python',
            '• Web Development',
        ],
        contact: [
            'You can reach me here on my discord server!', 
            'https://discord.gg/stWgVnBgHq'
        ],
        clear: []
    };

    function typeWriter(textArray, callback) {
        let i = 0;
        let j = 0;
        const speed = 50;

        function type() {
            if (i < textArray.length) {
                if (j < textArray[i].length) {
                    consoleOutput.innerHTML += textArray[i].charAt(j);
                    j++;
                    consoleOutput.scrollTop = consoleOutput.scrollHeight;
                    setTimeout(type, speed);
                } else {
                    consoleOutput.innerHTML += '<br>';
                    j = 0;
                    i++;
                    setTimeout(type, speed);
                }
            } else if (callback) {
                setTimeout(callback, 500);
            }
        }
        type();
    }

    function displayWelcomeMessage() {
        typeWriter(['Connecting to zensware.com servers...'], function () {
            setTimeout(() => {
                typeWriter(['Connected successfully.'], function () {
                    setTimeout(() => {
                        clearConsole();
                        typeWriter(['Welcome to zensware.com!', 'Type "help" to see all available commands.']);
                    }, 500);
                });
            }, 1000);
        });
    }


    function clearConsole() {
        consoleOutput.innerHTML = '';
    }

    function appendResponse(responseArray) {
        responseArray.forEach(line => {
            const pElement = document.createElement('p');
            pElement.textContent = line;
            consoleOutput.appendChild(pElement);
        });
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }

    displayWelcomeMessage();

    inputField.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            const userInput = inputField.value.trim();
            if (userInput !== '') {
                processCommand(userInput);
                commandHistory.push(userInput);
                historyIndex = commandHistory.length;
                inputField.value = '';
            }
        }
    });

    inputField.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputField.value = commandHistory[historyIndex];
            }
        } else if (event.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputField.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputField.value = '';
            }
        } else if (event.key === 'Tab') {
            event.preventDefault();
            autoCompleteCommand(inputField.value);
        }
    });

    function processCommand(command) {
        const pElement = document.createElement('p');
        pElement.textContent = `zensware@console:~$ ${command}`;
        consoleOutput.appendChild(pElement);

        const lowerCaseCommand = command.toLowerCase();
        if (commandResponses[lowerCaseCommand]) {
            if (lowerCaseCommand === 'clear') {
                clearConsole();
            } else {
                appendResponse(commandResponses[lowerCaseCommand]);
            }
        } else if (lowerCaseCommand.startsWith('theme')) {
            const themeArgs = lowerCaseCommand.split(' ')[1];
            changeTheme(themeArgs);
        } else {
            appendResponse([`Command not recognized: ${command}`]);
        }
    }

    function autoCompleteCommand(input) {
        const matches = Object.keys(commandResponses).filter(cmd => cmd.startsWith(input));
        if (matches.length === 1) {
            inputField.value = matches[0];
        }
    }
});
