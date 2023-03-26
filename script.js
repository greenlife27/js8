$(document).ready(function() {
  const apiUrl = 'https://random-word-api.herokuapp.com/word?number=1';
  let word = '';
  let maskedWord = '';
  let attempts = 6;
  let availableLetters = 'abcdefghijklmnopqrstuvwxyz';

    function getWord() {
      $.getJSON(apiUrl, function(data) {
        word = data[0].toLowerCase();
        maskedWord = '_'.repeat(word.length);
        attempts = 6;
        availableLetters = 'abcdefghijklmnopqrstuvwxyz';
        resetHangmanGraphics();
        updateDisplay();
        $('#retry-btn').hide();
      });
    }

    function updateDisplay() {
      $('#word').text(maskedWord);
      $('#attempts').text(`Attempts remaining: ${attempts}`);
      $('#tries-left').text(`Tries left: ${attempts}`);
      createLetterSpans();
    }
    
  
    function guessLetter(letter) {
      if (letter.length === 1 && /^[a-z]$/.test(letter)) {
        let found = false;
        for (let i = 0; i < word.length; i++) {
          if (word[i] === letter) {
            maskedWord = maskedWord.slice(0, i) + letter + maskedWord.slice(i + 1);
            found = true;
          }
        }
        if (!found) {
          attempts--;
          updateHangmanGraphics(attempts);
        }
        availableLetters = availableLetters.replace(letter, '');
        updateDisplay();
        checkGameOver();
      }
    }
  
    function checkGameOver() {
      if (word === maskedWord) {
        alert('You won!');
        $('#retry-btn').show();
      } else if (attempts === 0) {
        alert(`You lost! The word was: ${word}`);
        $('#retry-btn').show();
      }
    }
  
    $('#available-letters').on('click', 'span', function() {
      const letter = $(this).text();
      guessLetter(letter);
    });
  
    function createLetterSpans() {
      let letterSpans = '';
      for (const letter of availableLetters) {
        letterSpans += `<span class="letter">${letter}</span>`;
      }
      $('#available-letters').html(letterSpans);
    }
  
    $('#retry-btn').click(function() {
      getWord();
    });
  
    getWord();
  
    function updateHangmanGraphics(attemptsLeft) {
      const headVisibility = attemptsLeft < 6 ? 'visible' : 'hidden';
      const bodyVisibility = attemptsLeft < 5 ? 'visible' : 'hidden';
      const armsVisibility = attemptsLeft < 4 ? 'visible' : 'hidden';
      const leftLegVisibility = attemptsLeft < 3 ? 'visible' : 'hidden';
      const rightLegVisibility = attemptsLeft < 2 ? 'visible' : 'hidden';
  
      $('#hangman-head').find('circle').css('visibility', headVisibility);
      $('#hangman-body').find('line').css('visibility', bodyVisibility);
      $('#hangman-arms').find('line:first-child').css('visibility', armsVisibility);
      $('#hangman-arms').find('line:last-child').css('visibility', armsVisibility);
      $('#hangman-legs').find('line:first-child').css('visibility', leftLegVisibility);
      $('#hangman-legs').find('line:last-child').css('visibility', rightLegVisibility);
    }
  
    function resetHangmanGraphics() {
      $('#hangman-head').find('circle').css('visibility', 'hidden');
      $('#hangman-body').find('line').css('visibility', 'hidden');
      $('#hangman-arms').find('line:first-child').css('visibility', 'hidden');
    $('#hangman-arms').find('line:last-child').css('visibility', 'hidden');
    $('#hangman-legs').find('line:first-child').css('visibility', 'hidden');
    $('#hangman-legs').find('line:last-child').css('visibility', 'hidden');
  }
  
    $('#start-game').click(function() {
      const playerName = $('#username').val().trim();
      if (playerName.length > 0) {
        $('#login-page').hide();
        $('#game-page').show();
        $('#game-title').html(`<span class="hangman-shape">&#x2593;</span> ${playerName}'s Hangman Game <span class="hangman-shape">&#x2593;</span>`);
      } else {
        alert('Please enter your name.');
      }
    });
  });
    