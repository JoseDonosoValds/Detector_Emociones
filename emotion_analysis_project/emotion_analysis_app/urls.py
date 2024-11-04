from django.urls import path
from .views import analyze_emotion

urlpatterns = [
    path('analyze_emotion/', analyze_emotion, name='analyze_emotion'),
]

# emotion_analysis_project/urls.py
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('emotion/', include('emotion_analysis_app.urls')),
]