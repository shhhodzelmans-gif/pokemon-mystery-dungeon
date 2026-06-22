javascript


// ===== UTILITY FUNCTIONS =====
function createStars() {
    const container = document.getElementById('stars');
    if (!container) return;
    
    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3 + 1}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        container.appendChild(star);
    }
}
function createShootingStars() {
    const container = document.getElementById('shootingStars');
    if (!container) return;
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.left = `${Math.random() * 50}%`;
        star.style.top = `${Math.random() * 50}%`;
        star.style.animationDuration = `${Math.random() * 1 + 0.5}s`;
        container.appendChild(star);
        
        setTimeout(() => star.remove(), 2000);
    }, 3000);
}
function createConfetti() {
    const container = document.getElementById('confetti');
    if (!container) return;
    
    const colors = ['#f9ca24', '#e056fd', '#4a90d9', '#2ecc71', '#e74c3c'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(confetti);
        }, i * 100);
    }
}
// ===== NAVIGATION =====
function startGame() {
    window.location.href = 'level1.html';
}
function goToVictory() {
    localStorage.setItem('level3Complete', 'true');
    window.location.href = 'victory.html';
}
// ===== PROGRESS TRACKING =====
function updateProgress(current, total) {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = `${(current / total) * 100}%`;
    }
    if (progressText) {
        progressText.textContent = `${current}/${total}`;
    }
}
function updateDots(exerciseNum, status) {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index + 1 < exerciseNum) {
            dot.classList.add('completed');
            dot.classList.remove('active');
        } else if (index + 1 === exerciseNum) {
            dot.classList.add('active');
            dot.classList.remove('completed');
        } else {
            dot.classList.remove('active', 'completed');
        }
    });
}
// ===== LEVEL 1 =====
let level1Score = 0;
let level1CurrentExercise = 1;
function initLevel1() {
    updateDots(1, 'active');
    updateProgress(0, 5);
}
function startExercises() {
    document.getElementById('storySection').style.display = 'none';
    document.getElementById('exerciseSection').style.display = 'block';
    updateDots(1, 'active');
}
function showExercise(num) {
    // Hide all exercises
    for (let i = 1; i <= 5; i++) {
        const ex = document.getElementById(`exercise${i}`);
        if (ex) ex.style.display = 'none';
    }
    
    // Show requested exercise
    const exercise = document.getElementById(`exercise${num}`);
    if (exercise) {
        exercise.style.display = 'block';
        exercise.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    level1CurrentExercise = num;
    updateDots(num, 'active');
}
function checkExercise1() {
    const answers = {
        q1: 'b', // To enter the hideout
        q2: 'c', // Ekans
        q3: 'b'  // The moon
    };
    
    let correct = 0;
    
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const feedbackEl = document.getElementById(`feedback${q.slice(1)}`);
        const options = document.querySelectorAll(`input[name="${q}"]`);
        
        options.forEach(opt => {
            opt.closest('.option').classList.remove('correct', 'incorrect');
        });
        
        if (selected) {
            if (selected.value === answers[q]) {
                selected.closest('.option').classList.add('correct');
                feedbackEl.textContent = '✓ Correct!';
                feedbackEl.className = 'feedback show correct';
                correct++;
            } else {
                selected.closest('.option').classList.add('incorrect');
                feedbackEl.textContent = '✗ Try again!';
                feedbackEl.className = 'feedback show incorrect';
                // Show correct answer
                options.forEach(opt => {
                    if (opt.value === answers[q]) {
                        opt.closest('.option').classList.add('correct');
                    }
                });
            }
        }
    }
    
    level1Score += correct * 7; // ~21 points for exercise 1
    
    if (correct === 3) {
        document.getElementById('next1').style.display = 'inline-block';
        updateProgress(1, 5);
        updateDots(1, 'completed');
    }
}
function checkExercise2() {
    const correctClues = ['footprints', 'paper', 'sign'];
    const checkboxes = document.querySelectorAll('input[name="clue"]');
    let allCorrect = true;
    let correctCount = 0;
    
    checkboxes.forEach(cb => {
        const card = cb.nextElementSibling;
        card.classList.remove('correct', 'incorrect');
        
        const isCorrect = correctClues.includes(cb.value);
        
        if (cb.checked) {
            if (isCorrect) {
                card.classList.add('correct');
                correctCount++;
            } else {
                card.classList.add('incorrect');
                allCorrect = false;
            }
        } else if (isCorrect) {
            allCorrect = false;
        }
    });
    
    const feedbackEl = document.getElementById('feedback-ex2');
    
    if (allCorrect && correctCount === 3) {
        feedbackEl.textContent = '✓ Perfect! You found all the clues!';
        feedbackEl.className = 'feedback show correct';
        level1Score += 20;
        document.getElementById('next2').style.display = 'inline-block';
        updateProgress(2, 5);
        updateDots(2, 'completed');
    } else {
        feedbackEl.textContent = `Found ${correctCount}/3 correct clues. Try again!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise3() {
    const answers = {
        fill1: 'looks',
        fill2: 'has',
        fill3: 'help',
        fill4: 'is'
    };
    
    let correct = 0;
    
    for (let id in answers) {
        const select = document.getElementById(id);
        select.classList.remove('correct', 'incorrect');
        
        if (select.value === answers[id]) {
            select.classList.add('correct');
            correct++;
        } else if (select.value !== '') {
            select.classList.add('incorrect');
        }
    }
    
    const feedbackEl = document.getElementById('feedback-ex3');
    
    if (correct === 4) {
        feedbackEl.textContent = '✓ Excellent! All verbs are correct!';
        feedbackEl.className = 'feedback show correct';
        level1Score += 20;
        document.getElementById('next3').style.display = 'inline-block';
        updateProgress(3, 5);
        updateDots(3, 'completed');
    } else {
        feedbackEl.textContent = `${correct}/4 correct. Keep trying!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise4() {
    const answers = {
        battle1: 'b', // Poison Sting
        battle2: 'a', // Vine Whip
        battle3: 'b'  // Bulbasaur
    };
    
    let correct = 0;
    
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const options = document.querySelectorAll(`input[name="${q}"]`);
        
        options.forEach(opt => {
            opt.closest('.option').classList.remove('correct', 'incorrect');
        });
        
        if (selected) {
            if (selected.value === answers[q]) {
                selected.closest('.option').classList.add('correct');
                correct++;
            } else {
                selected.closest('.option').classList.add('incorrect');
                options.forEach(opt => {
                    if (opt.value === answers[q]) {
                        opt.closest('.option').classList.add('correct');
                    }
                });
            }
        }
    }
    
    const feedbackEl = document.getElementById('feedback-ex4');
    
    if (correct === 3) {
        feedbackEl.textContent = '✓ Great job! You understood the battle!';
        feedbackEl.className = 'feedback show correct';
        level1Score += 19;
        document.getElementById('next4').style.display = 'inline-block';
        updateProgress(4, 5);
        updateDots(4, 'completed');
    } else {
        feedbackEl.textContent = `${correct}/3 correct. Read carefully and try again!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise5() {
    const input = document.getElementById('codeAnswer');
    const feedbackEl = document.getElementById('feedback-ex5');
    const answer = input.value.toUpperCase().trim();
    
    if (answer === 'PIKACHU') {
        feedbackEl.textContent = '✓ Correct! You cracked the code!';
        feedbackEl.className = 'feedback show correct';
        level1Score += 20;
        updateProgress(5, 5);
        updateDots(5, 'completed');
        
        // Show completion after delay
        setTimeout(() => {
            document.getElementById('exerciseSection').style.display = 'none';
            document.getElementById('completionSection').style.display = 'block';
            document.getElementById('finalScore').textContent = Math.min(level1Score, 100);
            localStorage.setItem('level1Complete', 'true');
        }, 1500);
    } else {
        feedbackEl.textContent = '✗ Not quite right. Try unscrambling again!';
        feedbackEl.className = 'feedback show incorrect';
    }
}
function unlockLevel2() {
    const input = document.getElementById('unlockCode');
    const feedbackEl = document.getElementById('unlockFeedback');
    const code = input.value.toUpperCase().trim();
    
    if (code === 'PIKACHU') {
        feedbackEl.textContent = '✓ Level 2 Unlocked!';
        feedbackEl.className = 'unlock-feedback success';
        localStorage.setItem('level2Unlocked', 'true');
        
        setTimeout(() => {
            window.location.href = 'level2.html';
        }, 1000);
    } else {
        feedbackEl.textContent = '✗ Incorrect code. Try again!';
        feedbackEl.className = 'unlock-feedback error';
    }
}
// ===== LEVEL 2 =====
let level2Score = 0;
let level2CurrentExercise = 1;
function initLevel2() {
    // Check if level is unlocked
    const unlocked = localStorage.getItem('level2Unlocked');
    if (unlocked === 'true') {
        document.getElementById('lockScreen').style.display = 'none';
        document.getElementById('storySection').style.display = 'block';
    }
    updateDots(1, 'active');
    updateProgress(0, 5);
}
function checkAccessCode2() {
    const input = document.getElementById('accessCode');
    const feedbackEl = document.getElementById('accessFeedback');
    const code = input.value.toUpperCase().trim();
    
    if (code === 'PIKACHU') {
        feedbackEl.textContent = '✓ Access Granted!';
        feedbackEl.className = 'unlock-feedback success';
        localStorage.setItem('level2Unlocked', 'true');
        
        setTimeout(() => {
            document.getElementById('lockScreen').style.display = 'none';
            document.getElementById('storySection').style.display = 'block';
        }, 1000);
    } else {
        feedbackEl.textContent = '✗ Incorrect code';
        feedbackEl.className = 'unlock-feedback error';
    }
}
function checkExercise1_L2() {
    const answers = {
        q1: 'a', // A map
        q2: 'c', // Medicham
        q3: 'b'  // On a mountain
    };
    
    let correct = 0;
    
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const feedbackEl = document.getElementById(`feedback${q.slice(1)}`);
        const options = document.querySelectorAll(`input[name="${q}"]`);
        
        options.forEach(opt => {
            opt.closest('.option').classList.remove('correct', 'incorrect');
        });
        
        if (selected) {
            if (selected.value === answers[q]) {
                selected.closest('.option').classList.add('correct');
                feedbackEl.textContent = '✓ Correct!';
                feedbackEl.className = 'feedback show correct';
                correct++;
            } else {
                selected.closest('.option').classList.add('incorrect');
                feedbackEl.textContent = '✗ Try again!';
                feedbackEl.className = 'feedback show incorrect';
                options.forEach(opt => {
                    if (opt.value === answers[q]) {
                        opt.closest('.option').classList.add('correct');
                    }
                });
            }
        }
    }
    
    level2Score += correct * 7;
    
    if (correct === 3) {
        document.getElementById('next1').style.display = 'inline-block';
        updateProgress(1, 5);
        updateDots(1, 'completed');
    }
}
function checkExercise2_L2() {
    const answers = {
        tf1: 'true',  // The moon is gone - TRUE
        tf2: 'true',  // Gengar escapes - TRUE
        tf3: 'true',  // Squirtle follows the map - TRUE
        tf4: 'false', // Ekans guards coordinates - FALSE
        tf5: 'true'   // Medicham guards coordinates - TRUE
    };
    
    let correct = 0;
    const items = document.querySelectorAll('.tf-item');
    
    items.forEach((item, index) => {
        const tfNum = index + 1;
        const selected = document.querySelector(`input[name="tf${tfNum}"]:checked`);
        item.classList.remove('correct', 'incorrect');
        
        if (selected) {
            if (selected.value === answers[`tf${tfNum}`]) {
                item.classList.add('correct');
                correct++;
            } else {
                item.classList.add('incorrect');
            }
        }
    });
    
    const feedbackEl = document.getElementById('feedback-ex2');
    
    if (correct === 5) {
        feedbackEl.textContent = '✓ Perfect! All answers correct!';
        feedbackEl.className = 'feedback show correct';
        level2Score += 20;
        document.getElementById('next2').style.display = 'inline-block';
        updateProgress(2, 5);
        updateDots(2, 'completed');
    } else {
        feedbackEl.textContent = `${correct}/5 correct. Review and try again!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise3_L2() {
    const answers = {
        fill1: 'follows',
        fill2: 'guards',
        fill3: 'help',
        fill4: 'runs'
    };
    
    let correct = 0;
    
    for (let id in answers) {
        const select = document.getElementById(id);
        select.classList.remove('correct', 'incorrect');
        
        if (select.value === answers[id]) {
            select.classList.add('correct');
            correct++;
        } else if (select.value !== '') {
            select.classList.add('incorrect');
        }
    }
    
    const feedbackEl = document.getElementById('feedback-ex3');
    
    if (correct === 4) {
        feedbackEl.textContent = '✓ Excellent! All verbs are correct!';
        feedbackEl.className = 'feedback show correct';
        level2Score += 20;
        document.getElementById('next3').style.display = 'inline-block';
        updateProgress(3, 5);
        updateDots(3, 'completed');
    } else {
        feedbackEl.textContent = `${correct}/4 correct. Keep trying!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise4_L2() {
    const answers = {
        battle1: 'b', // Psychic
        battle2: 'a', // Water Gun
        battle3: 'b'  // Squirtle
    };
    
    let correct = 0;
    
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const options = document.querySelectorAll(`input[name="${q}"]`);
        
        options.forEach(opt => {
            opt.closest('.option').classList.remove('correct', 'incorrect');
        });
        
        if (selected) {
            if (selected.value === answers[q]) {
                selected.closest('.option').classList.add('correct');
                correct++;
            } else {
                selected.closest('.option').classList.add('incorrect');
                options.forEach(opt => {
                    if (opt.value === answers[q]) {
                        opt.closest('.option').classList.add('correct');
                    }
                });
            }
        }
    }
    
    const feedbackEl = document.getElementById('feedback-ex4');
    
    if (correct === 3) {
        feedbackEl.textContent = '✓ Great job! You understood the battle!';
        feedbackEl.className = 'feedback show correct';
        level2Score += 19;
        document.getElementById('next4').style.display = 'inline-block';
        updateProgress(4, 5);
        updateDots(4, 'completed');
    } else {
        feedbackEl.textContent = `${correct}/3 correct. Read carefully and try again!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise5_L2() {
    const input = document.getElementById('codeAnswer');
    const feedbackEl = document.getElementById('feedback-ex5');
    const answer = input.value.toUpperCase().trim();
    
    if (answer === 'B2-F7') {
        feedbackEl.textContent = '✓ Correct! You found the coordinates!';
        feedbackEl.className = 'feedback show correct';
        level2Score += 20;
        updateProgress(5, 5);
        updateDots(5, 'completed');
        
        setTimeout(() => {
            document.getElementById('exerciseSection').style.display = 'none';
            document.getElementById('completionSection').style.display = 'block';
            document.getElementById('finalScore').textContent = Math.min(level2Score, 100);
            localStorage.setItem('level2Complete', 'true');
        }, 1500);
    } else {
        feedbackEl.textContent = '✗ Not quite right. Remember: letter-number-dash-letter-number';
        feedbackEl.className = 'feedback show incorrect';
    }
}
function unlockLevel3() {
    const input = document.getElementById('unlockCode');
    const feedbackEl = document.getElementById('unlockFeedback');
    const code = input.value.toUpperCase().trim();
    
    if (code === 'B2-F7') {
        feedbackEl.textContent = '✓ Level 3 Unlocked!';
        feedbackEl.className = 'unlock-feedback success';
        localStorage.setItem('level3Unlocked', 'true');
        
        setTimeout(() => {
            window.location.href = 'level3.html';
        }, 1000);
    } else {
        feedbackEl.textContent = '✗ Incorrect coordinates. Try again!';
        feedbackEl.className = 'unlock-feedback error';
    }
}
// ===== LEVEL 3 =====
let level3Score = 0;
let level3CurrentExercise = 1;
function initLevel3() {
    const unlocked = localStorage.getItem('level3Unlocked');
    if (unlocked === 'true') {
        document.getElementById('lockScreen').style.display = 'none';
        document.getElementById('storySection').style.display = 'block';
    }
    updateDots(1, 'active');
    updateProgress(0, 4);
    initDragAndDrop();
}
function checkAccessCode3() {
    const input = document.getElementById('accessCode');
    const feedbackEl = document.getElementById('accessFeedback');
    const code = input.value.toUpperCase().trim();
    
    if (code === 'B2-F7') {
        feedbackEl.textContent = '✓ Access Granted!';
        feedbackEl.className = 'unlock-feedback success';
        localStorage.setItem('level3Unlocked', 'true');
        
        setTimeout(() => {
            document.getElementById('lockScreen').style.display = 'none';
            document.getElementById('storySection').style.display = 'block';
        }, 1000);
    } else {
        feedbackEl.textContent = '✗ Incorrect coordinates';
        feedbackEl.className = 'unlock-feedback error';
    }
}
function checkExercise1_L3() {
    const answers = {
        q1: 'b', // In the cave
        q2: 'b', // The moon
        q3: 'c'  // Gengar
    };
    
    let correct = 0;
    
    for (let q in answers) {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        const feedbackEl = document.getElementById(`feedback${q.slice(1)}`);
        const options = document.querySelectorAll(`input[name="${q}"]`);
        
        options.forEach(opt => {
            opt.closest('.option').classList.remove('correct', 'incorrect');
        });
        
        if (selected) {
            if (selected.value === answers[q]) {
                selected.closest('.option').classList.add('correct');
                feedbackEl.textContent = '✓ Correct!';
                feedbackEl.className = 'feedback show correct';
                correct++;
            } else {
                selected.closest('.option').classList.add('incorrect');
                feedbackEl.textContent = '✗ Try again!';
                feedbackEl.className = 'feedback show incorrect';
                options.forEach(opt => {
                    if (opt.value === answers[q]) {
                        opt.closest('.option').classList.add('correct');
                    }
                });
            }
        }
    }
    
    level3Score += correct * 8;
    
    if (correct === 3) {
        document.getElementById('next1').style.display = 'inline-block';
        updateProgress(1, 4);
        updateDots(1, 'completed');
    }
}
function checkExercise2_L3() {
    const correctItems = ['moon', 'crystal', 'gengar'];
    const checkboxes = document.querySelectorAll('input[name="clue"]');
    let allCorrect = true;
    let correctCount = 0;
    
    checkboxes.forEach(cb => {
        const card = cb.nextElementSibling;
        card.classList.remove('correct', 'incorrect');
        
        const isCorrect = correctItems.includes(cb.value);
        
        if (cb.checked) {
            if (isCorrect) {
                card.classList.add('correct');
                correctCount++;
            } else {
                card.classList.add('incorrect');
                allCorrect = false;
            }
        } else if (isCorrect) {
            allCorrect = false;
        }
    });
    
    const feedbackEl = document.getElementById('feedback-ex2');
    
    if (allCorrect && correctCount === 3) {
        feedbackEl.textContent = '✓ Perfect! You identified everything correctly!';
        feedbackEl.className = 'feedback show correct';
        level3Score += 25;
        document.getElementById('next2').style.display = 'inline-block';
        updateProgress(2, 4);
        updateDots(2, 'completed');
    } else {
        feedbackEl.textContent = `Found ${correctCount}/3 correct items. Try again!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
function checkExercise3_L3() {
    const answers = {
        fill1: 'guards',
        fill2: 'steps',
        fill3: 'help',
        fill4: 'enters'
    };
    
    let correct = 0;
    
    for (let id in answers) {
        const select = document.getElementById(id);
        select.classList.remove('correct', 'incorrect');
        
        if (select.value === answers[id]) {
            select.classList.add('correct');
            correct++;
        } else if (select.value !== '') {
            select.classList.add('incorrect');
        }
    }
    
    const feedbackEl = document.getElementById('feedback-ex3');
    
    if (correct === 4) {
        feedbackEl.textContent = '✓ Excellent! All verbs are correct!';
        feedbackEl.className = 'feedback show correct';
        level3Score += 25;
        document.getElementById('next3').style.display = 'inline-block';
        updateProgress(3, 4);
        updateDots(3, 'completed');
    } else {
        feedbackEl.textContent = `${correct}/4 correct. Keep trying!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
// Drag and Drop functionality
function initDragAndDrop() {
    const container = document.getElementById('orderingContainer');
    if (!container) return;
    
    const items = container.querySelectorAll('.order-item');
    let draggedItem = null;
    
    items.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            draggedItem = this;
            setTimeout(() => this.classList.add('dragging'), 0);
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
            draggedItem = null;
            updateOrderNumbers();
        });
        
        item.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        item.addEventListener('drop', function(e) {
            e.preventDefault();
            if (this !== draggedItem) {
                const allItems = [...container.querySelectorAll('.order-item')];
                const draggedIndex = allItems.indexOf(draggedItem);
                const targetIndex = allItems.indexOf(this);
                
                if (draggedIndex < targetIndex) {
                    this.after(draggedItem);
                } else {
                    this.before(draggedItem);
                }
            }
            updateOrderNumbers();
        });
        
        // Touch support
        item.addEventListener('touchstart', function(e) {
            draggedItem = this;
            this.classList.add('dragging');
        });
        
        item.addEventListener('touchmove', function(e) {
            e.preventDefault();
            const touch = e.touches[0];
            const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
            const target = elements.find(el => el.classList.contains('order-item') && el !== draggedItem);
            
            if (target) {
                const rect = target.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                if (touch.clientY < midY) {
                    target.before(draggedItem);
                } else {
                    target.after(draggedItem);
                }
            }
        });
        
        item.addEventListener('touchend', function() {
            this.classList.remove('dragging');
            draggedItem = null;
            updateOrderNumbers();
        });
    });
}
function updateOrderNumbers() {
    const items = document.querySelectorAll('#orderingContainer .order-item');
    items.forEach((item, index) => {
        item.querySelector('.order-number').textContent = index + 1;
    });
}
function checkExercise4_L3() {
    const container = document.getElementById('orderingContainer');
    const items = container.querySelectorAll('.order-item');
    const correctOrder = [1, 2, 3, 4, 5];
    let correct = 0;
    
    items.forEach((item, index) => {
        const itemOrder = parseInt(item.dataset.order);
        item.classList.remove('correct', 'incorrect');
        
        if (itemOrder === correctOrder[index]) {
            item.classList.add('correct');
            correct++;
        } else {
            item.classList.add('incorrect');
        }
    });
    
    const feedbackEl = document.getElementById('feedback-ex4');
    
    if (correct === 5) {
        feedbackEl.textContent = '✓ Perfect order! Gengar is defeated!';
        feedbackEl.className = 'feedback show correct';
        level3Score += 26;
        updateProgress(4, 4);
        updateDots(4, 'completed');
        
        setTimeout(() => {
            document.getElementById('exerciseSection').style.display = 'none';
            document.getElementById('completionSection').style.display = 'block';
            document.getElementById('finalScore').textContent = Math.min(level3Score, 100);
            localStorage.setItem('level3Complete', 'true');
        }, 2000);
    } else {
        feedbackEl.textContent = `${correct}/5 in correct position. Drag items to reorder!`;
        feedbackEl.className = 'feedback show incorrect';
    }
}
// ===== RESET PROGRESS (for testing) =====
function resetProgress() {
    localStorage.clear();
    location.reload();
}