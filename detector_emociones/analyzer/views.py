from django.shortcuts import render
from django.http import JsonResponse
import json

def analyze_text(request):
    if request.method == 'POST':
        text = request.POST.get('text', '')
        # Aquí iría tu lógica de análisis de emociones
        # Este es un ejemplo simplificado
        results = {
            'ira': 20,
            'asco': 10,
            'miedo': 15,
            'alegria': 30,
            'tristeza': 15,
            'sorpresa': 10
        }
        
        # Encontrar la emoción predominante
        predominant_emotion = max(results.items(), key=lambda x: x[1])
        
        return JsonResponse({
            'emotions': results,
            'predominant': {
                'emotion': predominant_emotion[0],
                'percentage': predominant_emotion[1]
            }
        })
    
    return render(request, 'analyzer/index.html')