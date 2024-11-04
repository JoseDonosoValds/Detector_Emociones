# emotion_analysis_app/views.py
from django.http import JsonResponse
from .models import emotion_pipeline

def analyze_emotion(request):
    if request.method == 'POST':
        text = request.POST.get('text')
        result = emotion_pipeline(text)
        return JsonResponse({'emotion': result['label']})
    return JsonResponse({'error': 'Solo se permiten solicitudes POST'})
