from django.urls import path, include
from django.contrib import admin


urlpatterns = [
    path('', include('rest_api.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls)
]
