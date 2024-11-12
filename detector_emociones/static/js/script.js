document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');
    const charCounter = document.querySelector('.char-counter');

    // Actualizar contador de caracteres
    textInput.addEventListener('input', function() {
        const length = this.value.length;
        charCounter.textContent = `${length}/5.000`;
    });

    // Analizar texto
    let typingTimer;
    textInput.addEventListener('input', function() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(analyzeText, 1000); // Esperar 1 segundo después de que el usuario deje de escribir
    });

    function analyzeText() {
        const text = textInput.value;
        if (!text) return;

        fetch('/analyze/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(text)}`
        })
        .then(response => response.json())
        .then(data => updateResults(data))
        .catch(error => console.error('Error:', error));
    }

    function updateResults(data) {
        // Actualizar cada emoción
        for (const [emotion, value] of Object.entries(data.emotions)) {
            const element = document.getElementById(emotion);
            if (element) element.textContent = `${value}%`;
        }

        // Actualizar emoción predominante
        document.getElementById('emotion-name').textContent = data.predominant.emotion;
        document.getElementById('emotion-percentage').textContent = data.predominant.percentage;
    }

    // Función auxiliar para obtener el token CSRF
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});