from django.urls import path

from api.views.views import category_list, category_detail
from api.views.author_views import author_detail, author_list

urlpatterns = [
    path('categories/', category_list),
    path('categories/<int:category_id>/', category_detail),
    path('authors/', author_list),
    path('authors/<int:author_id>/', author_detail),
]

