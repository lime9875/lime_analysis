const questions = [
    {
        question: "ما هو أفضل وقت لديك في اليوم؟",
        options: ["صباحاً", "ظهراً", "مساءً"],
        correct: "صباحاً"
    },
    {
        question: "ما هي هوايتك المفضلة؟",
        options: ["قراءة", "رياضة", "سفر"],
        correct: "قراءة"
    },
    {
        question: "كيف تفضل قضاء عطلتك؟",
        options: ["في البيت", "في الطبيعة", "في مدينة جديدة"],
        correct: "في الطبيعة"
    },
    {
        question: "هل تفضل العمل بمفردك أم مع فريق؟",
        options: ["بمفردي", "مع فريق", "كلاهما"],
        correct: "مع فريق"
    },
    {
        question: "كيف تتعامل مع الضغط؟",
        options: ["أشعر بالتوتر", "أحب التحدي", "أستطيع التحكم فيه"],
        correct: "أستطيع التحكم فيه"
    },
    {
        question: "ما هو أسلوبك في اتخاذ القرارات؟",
        options: ["عاطفي", "تحليلي", "عشوائي"],
        correct: "تحليلي"
    },
    {
        question: "ما هو نوع الأفلام المفضل لديك؟",
        options: ["دراما", "كوميديا", "أكشن"],
        correct: "دراما"
    },
    {
        question: "كيف تحب أن تعبر عن مشاعرك؟",
        options: ["بصراحة", "أحب الكتمان", "أعبر بالأفعال"],
        correct: "بصراحة"
    },
    {
        question: "ما هو هدفك في الحياة؟",
        options: ["النجاح المهني", "السعادة الشخصية", "مساعدة الآخرين"],
        correct: "السعادة الشخصية"
    },
    {
        question: "كيف تصف نفسك في ثلاثة كلمات؟",
        options: ["مجتهد", "اجتماعي", "مبدع"],
        correct: "اجتماعي"
    },
    {
        question: "هل تفضل القراءة أم مشاهدة الأفلام؟",
        options: ["قراءة", "مشاهدة الأفلام", "كلاهما"],
        correct: "قراءة"
    },
    {
        question: "كيف تتفاعل مع الأشخاص الجدد؟",
        options: ["أحب التعرف عليهم", "أكون متحفظًا", "لا أهتم"],
        correct: "أحب التعرف عليهم"
    },
    {
        question: "ما هو أسلوب حياتك؟",
        options: ["نشط", "هادئ", "متوازن"],
        correct: "متوازن"
    },
    {
        question: "كيف تتعامل مع الانتقادات؟",
        options: ["أشعر بالإحباط", "أعتبرها فرصة للتطوير", "لا أهتم"],
        correct: "أعتبرها فرصة للتطوير"
    },
    {
        question: "ما هو أكثر شيء يهمك في العمل؟",
        options: ["المرتب", "البيئة", "النجاح"],
        correct: "البيئة"
    }
];

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.options.map((option) => `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="question${currentQuestionIndex}" value="${option}" id="option${currentQuestionIndex}${option}">
                <label class="form-check-label" for="option${currentQuestionIndex}${option}">
                    ${option}
                </label>
            </div>
        `).join('')}
    `;
}

document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestionIndex].correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    } else {
        alert("يرجى اختيار إجابة.");
    }
});

function showResult() {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `نتيجتك: ${score}/${questions.length}`;

    let personalityType = '';
    if (score === questions.length) {
        personalityType = "أنت شخص متميز، تتمتع بقدرات عالية في التفكير وتحليل الأمور.";
    } else if (score >= questions.length / 2) {
        personalityType = "أنت شخص متوازن، تمتلك شخصية قوية وقدرات اجتماعية جيدة.";
    } else {
        personalityType = "أنت بحاجة إلى تحسين بعض الجوانب في حياتك، حاول الانفتاح أكثر.";
    }

    resultDiv.innerHTML += `<p>${personalityType}</p>`;

    const pyramidDiv = document.createElement('div');
    pyramidDiv.className = 'pyramid';

    for (let i = 0; i < questions.length; i++) {
        const block = document.createElement('div');
        block.className = (i < score) ? 'high' : 'low';
        pyramidDiv.appendChild(block);
    }
    resultDiv.appendChild(pyramidDiv);
}

// بدء الاختبار عند تحميل الصفحة
showQuestion();
