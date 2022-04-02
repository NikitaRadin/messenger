from django.urls import path, include
from django.contrib import admin
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView


urlpatterns = [
    path('', include('authorization.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
    path('openapi-schema/', get_schema_view(
        title='Messenger API',
        description='Messenger API documentation',
        url='http://127.0.0.1:8000/',
        version='1.0.0'
    ), name='openapi-schema'),
    path('swagger-ui/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui')
]
